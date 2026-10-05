/**
 * 街の座標計算（純粋関数のみ）。座標は viewBox 単位。
 */
import type { Building, Rect } from './schema';

export type ViewBox = { w: number; h: number };
export type PercentBox = { left: string; top: string; width: string; height: string };

/** 面積を持って重なるときだけ true（辺が接するだけなら false） */
export function rectsIntersect(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}

function percent(value: number, total: number): string {
  return `${Number(((value / total) * 100).toFixed(4))}%`;
}

/** overlay を absolute 配置するための left/top/width/height（%） */
export function toPercentBox(rect: Rect, viewBox: ViewBox): PercentBox {
  return {
    left: percent(rect.x, viewBox.w),
    top: percent(rect.y, viewBox.h),
    width: percent(rect.w, viewBox.w),
    height: percent(rect.h, viewBox.h),
  };
}

/** 街を renderedWidthPx で描いたときの、建物の短い辺の CSS px */
export function minRenderedPx(rect: Rect, viewBox: ViewBox, renderedWidthPx: number): number {
  const scale = renderedWidthPx / viewBox.w;
  return Math.min(rect.w, rect.h) * scale;
}

/** 上から下、同じ段は左から右に並べた id の列 */
export function readingOrder(buildings: Building[]): string[] {
  return [...buildings]
    .sort((a, b) => a.bounds.y - b.bounds.y || a.bounds.x - b.bounds.x)
    .map((b) => b.id);
}
