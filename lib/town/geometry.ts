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

/** pattern 1タイル分の菱形2枚（主タイルと半ずらし）の points 文字列 */
export function diamondCell(tile: ViewBox): [string, string] {
  const { w, h } = tile;
  const main = `${w / 2},0 ${w},${h / 2} ${w / 2},${h} 0,${h / 2}`;
  // 半タイルずらした菱形を、タイル矩形の右下に収まるよう切り出した形
  const shifted = `${w / 2},${h / 2} ${w},${h / 2} ${w},${h} ${w / 2},${h}`;
  return [main, shifted];
}

/** 区画の足元の台座（わずかに斜めの平行四辺形） */
export function lotPlate(bounds: Rect): string {
  const { x, y, w, h } = bounds;
  const top = y + h - 14;
  const bottom = y + h - 2;
  const skew = 8;
  return `${x + skew},${top} ${x + w},${top + 2} ${x + w - skew},${bottom} ${x},${bottom - 2}`;
}

export type Point = { x: number; y: number };

export function centroid(rect: Rect): Point {
  return { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 };
}

export type Quadrant = 'nw' | 'ne' | 'sw' | 'se';

export function quadrantOf(point: Point, center: Point): Quadrant {
  const east = point.x >= center.x;
  const south = point.y >= center.y;
  if (!east && !south) return 'nw';
  if (east && !south) return 'ne';
  if (!east && south) return 'sw';
  return 'se';
}
