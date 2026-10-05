/**
 * 図形の共通部品。線は黒 2px 統一。色は palette からのみ。
 */
import type { BuildingColor, Rect } from '@/lib/town/schema';
import { TOWN_PALETTE } from '@/lib/town/palette';

export type ShapeProps = { bounds: Rect; color: BuildingColor };

export const LINE = {
  stroke: TOWN_PALETTE.outline,
  strokeWidth: 2,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
};

export function fillOf(color: BuildingColor): string {
  return TOWN_PALETTE.buildings[color];
}

export function paleOf(color: BuildingColor): string {
  return TOWN_PALETTE.buildingsPale[color];
}

/** 看板の灯り（赤はここでだけ使う） */
export function SignLight({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r={3.5} fill={TOWN_PALETTE.signLight} {...LINE} />;
}

/** 斜め見下ろしの箱（正面＋上面＋右側面）。ぼかし・グラデなし */
export function IsoBox({
  x, y, w, h, depth, fill,
}: { x: number; y: number; w: number; h: number; depth: number; fill: string }) {
  const top = `${x},${y} ${x + w},${y} ${x + w + depth},${y - depth} ${x + depth},${y - depth}`;
  const side = `${x + w},${y} ${x + w + depth},${y - depth} ${x + w + depth},${y + h - depth} ${x + w},${y + h}`;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} {...LINE} />
      <polygon points={top} fill={TOWN_PALETTE.window} fillOpacity={0.22} {...LINE} />
      <polygon points={side} fill={TOWN_PALETTE.outline} fillOpacity={0.15} {...LINE} />
    </g>
  );
}

/** 草地の小さな記号 */
export function Tuft({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x - 4} y2={y - 8} {...LINE} />
      <line x1={x} y1={y} x2={x} y2={y - 10} {...LINE} />
      <line x1={x} y1={y} x2={x + 4} y2={y - 8} {...LINE} />
    </g>
  );
}
