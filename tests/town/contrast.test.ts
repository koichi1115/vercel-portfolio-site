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
