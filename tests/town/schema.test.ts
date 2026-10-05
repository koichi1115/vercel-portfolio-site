import { describe, expect, it } from 'vitest';
import urawa from '@/data/town/urawa.json';
import { parseTownConfig, TownConfigError } from '@/lib/town/schema';

function clone(): Record<string, unknown> {
  return JSON.parse(JSON.stringify(urawa)) as Record<string, unknown>;
}

function buildingsOf(input: Record<string, unknown>): Record<string, unknown>[] {
  return input.buildings as Record<string, unknown>[];
}

describe('parseTownConfig', () => {
  it('同梱の urawa.json を受け付ける', () => {
    const town = parseTownConfig(urawa);
    expect(town.id).toBe('urawa-station-front');
    expect(town.buildings).toHaveLength(4);
    expect(town.terrainNote).toContain('仮');
    expect(town.extraLinks).toEqual([{ label: 'レビュー', href: '/reviews' }]);
  });

  it('オブジェクト以外は拒否する', () => {
    expect(() => parseTownConfig(null)).toThrow(TownConfigError);
    expect(() => parseTownConfig('town')).toThrow(TownConfigError);
  });

  it('建物 id の重複を拒否する', () => {
    const input = clone();
    buildingsOf(input)[1].id = buildingsOf(input)[0].id;
    expect(() => parseTownConfig(input)).toThrow(/重複/);
  });

  it('/ で始まらない href を拒否する', () => {
    const input = clone();
    buildingsOf(input)[0].href = 'https://example.com';
    expect(() => parseTownConfig(input)).toThrow(TownConfigError);
  });

  it('extraLinks の不正な href も拒否する', () => {
    const input = clone();
    input.extraLinks = [{ label: 'x', href: 'javascript:alert(1)' }];
    expect(() => parseTownConfig(input)).toThrow(TownConfigError);
  });

  it('幅や高さが 0 以下の bounds を拒否する', () => {
    const input = clone();
    (buildingsOf(input)[2].bounds as Record<string, number>).w = 0;
    expect(() => parseTownConfig(input)).toThrow(TownConfigError);
    const input2 = clone();
    (buildingsOf(input2)[2].bounds as Record<string, number>).h = -5;
    expect(() => parseTownConfig(input2)).toThrow(TownConfigError);
  });

  it('未知の kind と color を拒否する', () => {
    const input = clone();
    buildingsOf(input)[0].kind = 'castle';
    expect(() => parseTownConfig(input)).toThrow(/kind/);
    const input2 = clone();
    buildingsOf(input2)[0].color = 'purple';
    expect(() => parseTownConfig(input2)).toThrow(/color/);
  });

  it('空のラベルを拒否する', () => {
    const input = clone();
    buildingsOf(input)[3].label = '  ';
    expect(() => parseTownConfig(input)).toThrow(TownConfigError);
  });

  it('viewBox の欠落を拒否する', () => {
    const input = clone();
    delete input.viewBox;
    expect(() => parseTownConfig(input)).toThrow(TownConfigError);
  });
});
