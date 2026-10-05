/**
 * 街の配色。色の値はこのファイルだけに置き、描画側（components/town）は名前で参照する。
 * 赤（signLight）は看板の灯りにだけ使う。
 */
import type { BuildingColor } from './schema';

export const TOWN_PALETTE = {
  ground: '#F4F1E8',
  sky: '#EAF3FA',
  road: '#E4DFD2',
  outline: '#1A1A1A',
  window: '#FFFFFF',
  signLight: '#E03131',
  pillBg: '#FFFFFF',
  pillFg: '#111111',
  buildings: {
    arcade: '#22B07A',
    homePark: '#FF8FB1',
    cinema: '#FFC531',
    livehouse: '#2F5BEA',
  } satisfies Record<BuildingColor, string>,
} as const;

export type TownPalette = typeof TOWN_PALETTE;
