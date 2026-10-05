import { describe, expect, it } from 'vitest';
import urawa from '@/data/town/urawa.json';
import { parseTownConfig } from '@/lib/town/schema';
import { readHeaderNav } from './helpers/header-nav';

const town = parseTownConfig(urawa);
const nav = readHeaderNav();

describe('建物と Header のメニューが1対1', () => {
  it('Header から navItems を読み取れる', () => {
    expect(nav.length).toBeGreaterThan(0);
  });

  it('建物の数が navItems と同じ', () => {
    expect(town.buildings).toHaveLength(nav.length);
  });

  it('href が同じ順で並ぶ', () => {
    expect(town.buildings.map((b) => b.href)).toEqual(nav.map((n) => n.path));
  });

  it('看板の文字がメニュー名と同じ', () => {
    expect(town.buildings.map((b) => b.label)).toEqual(nav.map((n) => n.name));
  });
});
