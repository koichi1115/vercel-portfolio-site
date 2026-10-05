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

describe('p2 の settings / detail / look / tile', () => {
  it('同梱 JSON の clickMode は develop-then-enter', () => {
    const town = parseTownConfig(urawa);
    expect(town.settings.clickMode).toBe('develop-then-enter');
    expect(town.settings.enterLabel).toBe('入る');
    expect(town.settings.hint.length).toBeGreaterThan(0);
    expect(town.tile.w).toBeGreaterThan(0);
    expect(town.tile.h).toBeGreaterThan(0);
  });

  it('各 kind がちょうど1回ずつ現れ、look と detail がある', () => {
    const town = parseTownConfig(urawa);
    const kinds = town.buildings.map((b) => b.kind).sort();
    expect(kinds).toEqual(['arcade', 'cinema', 'home-park', 'livehouse']);
    for (const b of town.buildings) {
      expect(b.detail.length).toBeGreaterThanOrEqual(1);
      expect(b.detail.length).toBeLessThanOrEqual(40);
      expect(b.look.undeveloped).toMatch(/-small$/);
      expect(b.look.developed).not.toMatch(/-small$/);
    }
  });

  it('未知の clickMode を拒否する', () => {
    const input = clone();
    (input.settings as Record<string, unknown>).clickMode = 'teleport';
    expect(() => parseTownConfig(input)).toThrow(/clickMode/);
  });

  it('空の enterLabel を拒否する', () => {
    const input = clone();
    (input.settings as Record<string, unknown>).enterLabel = ' ';
    expect(() => parseTownConfig(input)).toThrow(TownConfigError);
  });

  it('detail が無い／41文字以上／改行入りを拒否する', () => {
    const noDetail = clone();
    delete buildingsOf(noDetail)[0].detail;
    expect(() => parseTownConfig(noDetail)).toThrow(TownConfigError);
    const long = clone();
    buildingsOf(long)[0].detail = 'あ'.repeat(41);
    expect(() => parseTownConfig(long)).toThrow(TownConfigError);
    const nl = clone();
    buildingsOf(nl)[0].detail = '一行目\n二行目';
    expect(() => parseTownConfig(nl)).toThrow(TownConfigError);
  });

  it('未知の look キーを拒否する', () => {
    const input = clone();
    (buildingsOf(input)[0].look as Record<string, string>).undeveloped = 'castle-small';
    expect(() => parseTownConfig(input)).toThrow(/look/);
  });

  it('tile の欠落を拒否する', () => {
    const input = clone();
    delete input.tile;
    expect(() => parseTownConfig(input)).toThrow(/tile/);
  });
});
