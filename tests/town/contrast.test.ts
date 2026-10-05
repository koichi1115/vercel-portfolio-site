import { describe, expect, it } from 'vitest';
import urawa from '@/data/town/urawa.json';
import { parseTownConfig } from '@/lib/town/schema';
import { TOWN_PALETTE } from '@/lib/town/palette';
import { contrastRatio, relativeLuminance } from '@/lib/town/contrast';

const town = parseTownConfig(urawa);

describe('WCAG コントラスト計算', () => {
  it('白と黒は 21:1、同色は 1:1', () => {
    expect(relativeLuminance('#FFFFFF')).toBeCloseTo(1);
    expect(relativeLuminance('#000000')).toBeCloseTo(0);
    expect(contrastRatio('#FFFFFF', '#000000')).toBeCloseTo(21);
    expect(contrastRatio('#777777', '#777777')).toBeCloseTo(1);
  });

  it('3桁の hex も読める', () => {
    expect(contrastRatio('#fff', '#000')).toBeCloseTo(21);
  });

  it('不正な色は例外', () => {
    expect(() => relativeLuminance('red')).toThrow();
  });
});

describe('街の配色', () => {
  it('看板ピルの文字と背景のコントラストが 4.5 以上', () => {
    const ratio = contrastRatio(TOWN_PALETTE.pillFg, TOWN_PALETTE.pillBg);
    console.log(`ピル文字/背景のコントラスト比: ${ratio.toFixed(2)}:1`);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('建物色はちょうど4色で、互いに違う', () => {
    const colors = Object.values(TOWN_PALETTE.buildings);
    expect(colors).toHaveLength(4);
    expect(new Set(colors.map((c) => c.toUpperCase())).size).toBe(4);
  });

  it('建物データの color はすべて palette に存在する', () => {
    for (const b of town.buildings) {
      expect(Object.keys(TOWN_PALETTE.buildings), b.id).toContain(b.color);
    }
  });

  it('赤（看板の灯り）は建物色に使わない', () => {
    const colors = Object.values(TOWN_PALETTE.buildings).map((c) => c.toUpperCase());
    expect(colors).not.toContain(TOWN_PALETTE.signLight.toUpperCase());
  });
});

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const m = hex.trim().match(/^#([0-9a-f]{6})$/i);
  if (!m) throw new Error(hex);
  const n = parseInt(m[1], 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: h * 360, s, l };
}

function collectPaletteHexes(): string[] {
  const streetPalette = {
    buildings: TOWN_PALETTE.buildings,
    buildingsPale: TOWN_PALETTE.buildingsPale,
    tile: TOWN_PALETTE.tile,
    ground: TOWN_PALETTE.ground,
    sky: TOWN_PALETTE.sky,
    road: TOWN_PALETTE.road,
    outline: TOWN_PALETTE.outline,
    window: TOWN_PALETTE.window,
    signLight: TOWN_PALETTE.signLight,
    pillBg: TOWN_PALETTE.pillBg,
    pillFg: TOWN_PALETTE.pillFg,
  };
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === 'string' && /^#/.test(v)) out.push(v);
    else if (v && typeof v === 'object') Object.values(v as object).forEach(walk);
  };
  walk(streetPalette);
  return out;
}

describe('p2 の淡色と紫禁止', () => {
  it('buildingsPale は4色で buildings と重ならず signLight を含まない', () => {
    const pale = Object.values(TOWN_PALETTE.buildingsPale);
    expect(pale).toHaveLength(4);
    const building = new Set(Object.values(TOWN_PALETTE.buildings).map((c) => c.toUpperCase()));
    for (const c of pale) expect(building.has(c.toUpperCase())).toBe(false);
    expect(pale.map((c) => c.toUpperCase())).not.toContain(TOWN_PALETTE.signLight.toUpperCase());
  });

  it('tile に grassA / grassB / guide / lot がある', () => {
    expect(TOWN_PALETTE.tile.grassA).toMatch(/^#/);
    expect(TOWN_PALETTE.tile.grassB).toMatch(/^#/);
    expect(TOWN_PALETTE.tile.guide).toMatch(/^#/);
    expect(TOWN_PALETTE.tile.lot).toMatch(/^#/);
  });

  it('palette 全色に色相260〜320かつ彩度0.3超の紫が無い', () => {
    const purples = collectPaletteHexes().filter((hex) => {
      const { h, s } = hexToHsl(hex);
      return h >= 260 && h <= 320 && s > 0.3;
    });
    expect(purples).toEqual([]);
  });
});
