"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroCanvasProps {
  /** "dark" renders luminous aurora particles, "light" renders inked particles */
  mode: "dark" | "light";
}

const PALETTES = {
  dark: {
    low: new THREE.Color("#155e75"),
    high: new THREE.Color("#c9f73f"),
    mid: new THREE.Color("#5fe9ff"),
    opacity: 1.0,
  },
  light: {
    low: new THREE.Color("#0e6e80"),
    high: new THREE.Color("#5f7c0b"),
    mid: new THREE.Color("#149fb8"),
    opacity: 0.55,
  },
};

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPixelRatio;

  attribute float aRandom;

  varying float vElev;
  varying float vFade;
  varying float vRandom;

  void main() {
    vec3 pos = position;

    // layered travelling waves
    float t = uTime * 0.55;
    float elev =
        sin(pos.x * 0.28 + t)        * 0.55
      + sin(pos.z * 0.22 + t * 1.35) * 0.45
      + sin((pos.x + pos.z) * 0.14 + t * 0.7) * 0.65
      + sin(length(pos.xz) * 0.32 - t * 1.1)  * 0.25;

    // gentle swell toward the pointer
    vec2 pointerWorld = uPointer * vec2(14.0, 9.0);
    float d = distance(pos.xz, pointerWorld);
    elev += smoothstep(7.0, 0.0, d) * 1.35;

    pos.y += elev;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vElev = smoothstep(-1.6, 2.2, elev);
    // fade far rows + extreme edges
    vFade = (1.0 - smoothstep(8.0, 22.0, -mvPosition.z * 0.6 + length(pos.xz) * 0.55));
    vRandom = aRandom;

    float size = (1.4 + aRandom * 1.8 + vElev * 1.6);
    gl_PointSize = size * uPixelRatio * (12.0 / -mvPosition.z);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColorLow;
  uniform vec3 uColorMid;
  uniform vec3 uColorHigh;
  uniform float uOpacity;
  uniform float uTime;

  varying float vElev;
  varying float vFade;
  varying float vRandom;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float sprite = smoothstep(0.5, 0.05, r);

    vec3 color = mix(uColorLow, uColorMid, smoothstep(0.0, 0.55, vElev));
    color = mix(color, uColorHigh, smoothstep(0.55, 1.0, vElev));

    float twinkle = 0.75 + 0.25 * sin(uTime * (1.5 + vRandom * 2.0) + vRandom * 40.0);

    float alpha = sprite * vFade * twinkle * uOpacity;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function HeroCanvas({ mode }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 5.2, 13);
    camera.lookAt(0, 0.4, 0);

    // --- particle wavefield ---
    const cols = isMobile ? 110 : 170;
    const rows = isMobile ? 64 : 96;
    const width = 34;
    const depth = 22;
    const count = cols * rows;

    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        positions[i * 3 + 0] = (x / (cols - 1) - 0.5) * width;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (z / (rows - 1) - 0.5) * depth;
        randoms[i] = Math.random();
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

    const palette = PALETTES[mode];
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: mode === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uColorLow: { value: palette.low.clone() },
        uColorMid: { value: palette.mid.clone() },
        uColorHigh: { value: palette.high.clone() },
        uOpacity: { value: palette.opacity },
      },
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    points.position.y = -1.2;
    scene.add(points);

    // --- sizing ---
    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // --- pointer parallax ---
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // --- render loop (paused when offscreen / hidden) ---
    let rafId = 0;
    let running = false;
    let visible = true;
    const clock = new THREE.Clock();
    let elapsed = 0;

    const renderFrame = () => {
      const dt = clock.getDelta();
      elapsed += dt;
      pointer.x += (target.x - pointer.x) * 0.05;
      pointer.y += (target.y - pointer.y) * 0.05;

      material.uniforms.uTime.value = elapsed;
      material.uniforms.uPointer.value.set(pointer.x, pointer.y);

      camera.position.x = pointer.x * 1.4;
      camera.position.y = 5.2 + pointer.y * 0.7;
      camera.lookAt(0, 0.4, 0);

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running) return;
      renderFrame();
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || prefersReducedMotion) return;
      running = true;
      clock.getDelta();
      rafId = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (prefersReducedMotion) {
      // static, but still composed
      elapsed = 4;
      material.uniforms.uTime.value = elapsed;
      renderFrame();
    } else {
      start();
    }

    return () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
      materialRef.current = null;
    };
    // mode changes are handled by the effect below without a rebuild
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // swap palette in place when the theme changes
  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;
    const palette = PALETTES[mode];
    (material.uniforms.uColorLow.value as THREE.Color).copy(palette.low);
    (material.uniforms.uColorMid.value as THREE.Color).copy(palette.mid);
    (material.uniforms.uColorHigh.value as THREE.Color).copy(palette.high);
    material.uniforms.uOpacity.value = palette.opacity;
    material.blending =
      mode === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending;
    material.needsUpdate = true;
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full"
      aria-hidden="true"
    />
  );
}
