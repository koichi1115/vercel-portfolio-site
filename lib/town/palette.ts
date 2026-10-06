/**
 * 街の配色。色の値はこのファイルだけに置き、描画側（components/town）は名前で参照する。
 * 赤（signLight）は看板の灯りにだけ使う。紫系は使わない。
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
  tile: {
    grassA: '#DDEBC9',
    grassB: '#D2E3BA',
    guide: '#B9CBA0',
    lot: '#EFE7D2',
  },
  buildings: {
    arcade: '#22B07A',
    homePark: '#FF8FB1',
    cinema: '#FFC531',
    livehouse: '#2F5BEA',
  } satisfies Record<BuildingColor, string>,
  buildingsPale: {
    arcade: '#BDE5D3',
    homePark: '#FFD3E0',
    cinema: '#FFE9AE',
    livehouse: '#C3CFF7',
  } satisfies Record<BuildingColor, string>,
  district: {
    arcade: '#5B8DEF',
    homePark: '#6DB87A',
    cinema: '#C47A3A',
    livehouse: '#8B6BC7',
  } satisfies Record<BuildingColor, string>,
  floor: {
    ground: '#F5F1E8',
    card: '#FFFEFB',
    border: '#E8E2D6',
    text: '#2C2A26',
    muted: '#6B6560',
    line: '#2C2A26',
    danger: '#B42318',
  },
  floorDark: {
    ground: '#1B1A17',
    card: '#24221E',
    border: '#3A362F',
    text: '#F1EDE4',
    muted: '#B5AEA3',
    line: '#F1EDE4',
    danger: '#F19C92',
  },
} as const;

export type TownPalette = typeof TOWN_PALETTE;
