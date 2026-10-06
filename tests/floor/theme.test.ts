import { describe, expect, it } from 'vitest';
import { contrastRatio } from '@/lib/town/contrast';
import { floorVars, loadTownConfig, resolveFloor } from '@/lib/town/floors';
import { TOWN_PALETTE } from '@/lib/town/palette';
import { BUILDING_COLORS } from '@/lib/town/schema';

const floorKeys = ['ground', 'card', 'border', 'text', 'muted', 'line', 'danger'];

describe('フロアの配色', () => {
  it('区画色は建物色と同じ4キーを持つ', () => {
    expect(Object.keys(TOWN_PALETTE.district)).toEqual([...BUILDING_COLORS]);
    expect(Object.values(TOWN_PALETTE.district)).toEqual([
      '#5B8DEF',
      '#6DB87A',
      '#C47A3A',
      '#8B6BC7',
    ]);
  });

  it.each(['floor', 'floorDark'] as const)('%s は必要な7色を持つ', (key) => {
    expect(Object.keys(TOWN_PALETTE[key])).toEqual(floorKeys);
  });

  it.each(['floor', 'floorDark'] as const)('%s の文字色は背景上で読みやすい', (key) => {
    const colors = TOWN_PALETTE[key];
    expect(contrastRatio(colors.text, colors.ground)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(colors.text, colors.card)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(colors.muted, colors.ground)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(colors.muted, colors.card)).toBeGreaterThanOrEqual(4.5);
  });

  it('区画色は看板灯と重ならない', () => {
    expect(Object.values(TOWN_PALETTE.district)).not.toContain(TOWN_PALETTE.signLight);
  });
});

describe('フロアの解決', () => {
  const config = loadTownConfig();

  it.each([
    ['/projects/x', 'arcade'],
    ['/profiles', null],
    ['/reviews/x', 'extra'],
    ['/', null],
    ['/contact', 'livehouse'],
  ])('%s を解決する', (pathname, expected) => {
    const floor = resolveFloor(config, pathname);
    expect(floor?.kind === 'district' ? floor.id : floor?.kind ?? null).toBe(expected);
  });

  it('CSS変数に区画色を含み、中立フロアは補助色を使う', () => {
    const extra = resolveFloor(config, '/reviews/x');
    const vars = floorVars(extra);
    expect(vars).toHaveProperty('--floor-district', TOWN_PALETTE.floor.muted);
    expect(vars).toHaveProperty('--floor-ground', TOWN_PALETTE.floor.ground);
  });
});
