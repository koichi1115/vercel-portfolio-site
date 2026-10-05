/**
 * 図形の共通設定。線は黒 2px で統一し、拡大縮小しても太さを変えない。
 */
import type { Rect } from '@/lib/town/schema';
import type { BuildingColor } from '@/lib/town/schema';
import { TOWN_PALETTE } from '@/lib/town/palette';

export type ShapeProps = { bounds: Rect; color: BuildingColor };

export const LINE = {
  stroke: TOWN_PALETTE.outline,
  strokeWidth: 2,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
  vectorEffect: 'non-scaling-stroke',
} as const;

export function fillOf(color: BuildingColor): string {
  return TOWN_PALETTE.buildings[color];
}

/** 看板の灯り（赤はここでだけ使う） */
export function SignLight({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r={3.5} fill={TOWN_PALETTE.signLight} {...LINE} />;
}
