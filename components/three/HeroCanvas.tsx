"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroCanvasProps {
  /** "dark" renders a luminous galaxy, "light" renders an inked star chart */
  mode: "dark" | "light";
}

const PALETTES = {
  dark: {
    inside: new THREE.Color("#fff3d6"),
    mid: new THREE.Color("#5fe9ff"),
    outside: new THREE.Color("#8b6cff"),
    star: new THREE.Color("#cfe8ff"),
    galaxyOpacity: 1.0,
    starOpacity: 0.9,
  },
  light: {
    inside: new THREE.Color("#3d2f66"),
    mid: new THREE.Color("#0e6e80"),
    outside: new THREE.Color("#5f7c0b"),
    star: new THREE.Color("#2a3049"),
    galaxyOpacity: 0.5,
    starOpacity: 0.35,
  },
};

const GALAXY_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute float aMix;
  attribute float aSeed;

  varying float vMix;
  varying float vSeed;

  void main() {
    vec3 pos = position;

    // differential rotation: inner stars orbit faster
    float dist = length(pos.xz);
    float angle = atan(pos.x, pos.z) + (1.0 / max(dist, 0.4)) * uTime * 0.22;
    pos.x = sin(angle) * dist;
    pos.z = cos(angle) * dist;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = aScale * uPixelRatio * (9.0 / -mvPosition.z);

    vMix = aMix;
    vSeed = aSeed;
  }
`;

const GALAXY_FRAGMENT = /* glsl */ `
  uniform vec3 uColorInside;
  uniform vec3 uColorMid;
  uniform vec3 uColorOutside;
  uniform float uOpacity;
  uniform float uTime;

  varying float vMix;
  varying float vSeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float sprite = pow(smoothstep(0.5, 0.0, r), 1.8);

    vec3 color = mix(uColorInside, uColorMid, smoothstep(0.0, 0.55, vMix));
    color = mix(color, uColorOutside, smoothstep(0.55, 1.0, vMix));

    float twinkle = 0.8 + 0.2 * sin(uTime * (1.0 + vSeed * 2.5) + vSeed * 40.0);

    float alpha = sprite * twinkle * uOpacity;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

const STAR_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute float aSeed;

  varying float vSeed;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * uPixelRatio * (32.0 / -mvPosition.z);
    vSeed = aSeed;
  }
`;

const STAR_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;

  varying float vSeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float sprite = pow(smoothstep(0.5, 0.0, r), 2.2);

    // slow twinkle, a few stars pulse strongly
    float tw = sin(uTime * (0.6 + vSeed * 2.0) + vSeed * 80.0);
    float twinkle = 0.55 + 0.45 * tw * tw;

    float alpha = sprite * twinkle * uOpacity;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function buildGalaxy(count: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const mixes = new Float32Array(count);
  const seeds = new Float32Array(count);

  const radius = 5.2;
  const branches = 4;
  const randomnessPower = 2.6;

  for (let i = 0; i < count; i++) {
    const r = Math.pow(Math.random(), 1.4) * radius;
    const branchAngle = ((i % branches) / branches) * Math.PI * 2;
    const spinAngle = r * 0.9;

    const randX =
      Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * 0.35 * r;
    const randY =
      Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * 0.18 * r;
    const randZ =
      Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * 0.35 * r;

    positions[i * 3 + 0] = Math.cos(branchAngle + spinAngle) * r + randX;
    positions[i * 3 + 1] = randY;
    positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + randZ;

    scales[i] = 0.6 + Math.random() * 1.8;
    mixes[i] = r / radius;
    seeds[i] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("aMix", new THREE.BufferAttribute(mixes, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  return geometry;
}

function buildStarfield(count: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // random point on a large sphere shell so stars surround the camera
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 26 + Math.random() * 14;

    positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    scales[i] = 0.4 + Math.random() * 1.6;
    seeds[i] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  return geometry;
}

export default function HeroCanvas({ mode }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialsRef = useRef<{
    galaxy: THREE.ShaderMaterial;
    stars: THREE.ShaderMaterial;
  } | null>(null);

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
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);
    camera.position.set(0, 2.4, 7.2);
    camera.lookAt(0, 0, 0);

    const palette = PALETTES[mode];
    const blending = mode === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending;

    // --- spiral galaxy ---
    const galaxyGeometry = buildGalaxy(isMobile ? 7000 : 14000);
    const galaxyMaterial = new THREE.ShaderMaterial({
      vertexShader: GALAXY_VERTEX,
      fragmentShader: GALAXY_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uColorInside: { value: palette.inside.clone() },
        uColorMid: { value: palette.mid.clone() },
        uColorOutside: { value: palette.outside.clone() },
        uOpacity: { value: palette.galaxyOpacity },
      },
    });
    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    // tilt the disc and drift it toward the right so the headline breathes
    galaxy.rotation.x = 0.42;
    galaxy.rotation.z = -0.14;
    galaxy.position.set(isMobile ? 0 : 2.3, isMobile ? 0.8 : -0.2, 0);
    galaxy.scale.setScalar(isMobile ? 1.05 : 1.35);
    scene.add(galaxy);

    // --- surrounding starfield ---
    const starGeometry = buildStarfield(isMobile ? 700 : 1400);
    const starMaterial = new THREE.ShaderMaterial({
      vertexShader: STAR_VERTEX,
      fragmentShader: STAR_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uColor: { value: palette.star.clone() },
        uOpacity: { value: palette.starOpacity },
      },
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    materialsRef.current = { galaxy: galaxyMaterial, stars: starMaterial };

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
      pointer.x += (target.x - pointer.x) * 0.04;
      pointer.y += (target.y - pointer.y) * 0.04;

      galaxyMaterial.uniforms.uTime.value = elapsed;
      starMaterial.uniforms.uTime.value = elapsed;

      stars.rotation.y = elapsed * 0.008;

      camera.position.x = pointer.x * 0.9;
      camera.position.y = 2.4 + pointer.y * 0.5;
      camera.lookAt(galaxy.position.x * 0.4, 0, 0);

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
      elapsed = 6;
      galaxyMaterial.uniforms.uTime.value = elapsed;
      starMaterial.uniforms.uTime.value = elapsed;
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
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
      materialsRef.current = null;
    };
    // mode changes are handled by the effect below without a rebuild
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // swap palette in place when the theme changes
  useEffect(() => {
    const materials = materialsRef.current;
    if (!materials) return;
    const palette = PALETTES[mode];
    const blending = mode === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending;

    const g = materials.galaxy;
    (g.uniforms.uColorInside.value as THREE.Color).copy(palette.inside);
    (g.uniforms.uColorMid.value as THREE.Color).copy(palette.mid);
    (g.uniforms.uColorOutside.value as THREE.Color).copy(palette.outside);
    g.uniforms.uOpacity.value = palette.galaxyOpacity;
    g.blending = blending;
    g.needsUpdate = true;

    const s = materials.stars;
    (s.uniforms.uColor.value as THREE.Color).copy(palette.star);
    s.uniforms.uOpacity.value = palette.starOpacity;
    s.blending = blending;
    s.needsUpdate = true;
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full"
      aria-hidden="true"
    />
  );
}
