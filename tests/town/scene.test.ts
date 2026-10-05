import { readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import urawa from '@/data/town/urawa.json';
import { parseTownConfig, type TownConfig } from '@/lib/town/schema';
import { EMPTY_DEVELOPMENT } from '@/lib/town/development';
import { REPO_ROOT, readRepoFile } from './helpers/read-file';
import { renderScene } from './helpers/render-scene';

const town = parseTownConfig(urawa);

function withMode(mode: TownConfig['settings']['clickMode']): TownConfig {
  return { ...town, settings: { ...town.settings, clickMode: mode } };
}

function listTsx(dir: string): string[] {
  return readdirSync(path.join(REPO_ROOT, dir), { withFileTypes: true }).flatMap((e) => {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) return listTsx(rel);
    return e.name.endsWith('.tsx') ? [rel] : [];
  });
}

describe('TownScene 未発展（初期描画）', () => {
  it('区画の <a href> は0、<button type="button"> が4で aria-expanded=false', () => {
    const html = renderScene(town);
    expect(html.match(/<a [^>]*href="/g) ?? []).toHaveLength(0);
    const buttons = html.match(/<button type="button"[^>]*>/g) ?? [];
    expect(buttons).toHaveLength(4);
    for (const b of buttons) expect(b).toContain('aria-expanded="false"');
  });

  it('各 button に label と data-building、集合は id と一致', () => {
    const html = renderScene(town);
    const ids = [...html.matchAll(/data-building="([^"]+)"/g)].map((m) => m[1]).sort();
    expect(ids).toEqual([...town.buildings.map((b) => b.id)].sort());
    for (const b of town.buildings) expect(html).toContain(`>${b.label}<`);
  });

  it('駅は svg 内に1回だけで、data-building="station" は無い', () => {
    const html = renderScene(town);
    expect(html.match(/data-kind="station"/g) ?? []).toHaveLength(1);
    expect(html).not.toContain('data-building="station"');
    const svgs = html.match(/<svg[^>]*>/g) ?? [];
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toContain('aria-hidden="true"');
    expect(html.match(/<pattern[^>]*>/g) ?? []).toHaveLength(1);
  });
});

describe('TownScene 全発展', () => {
  it('<a href> が JSON と同順で label・detail・enterLabel を含む', () => {
    const developed = { developed: town.buildings.map((b) => b.id) };
    const html = renderScene(town, developed);
    const hrefs = [...html.matchAll(/<a [^>]*href="([^"]+)"/g)].map((m) => m[1]);
    expect(hrefs).toEqual(town.buildings.map((b) => b.href));
    for (const b of town.buildings) {
      expect(html).toContain(b.label);
      expect(html).toContain(b.detail);
    }
    expect(html).toContain(town.settings.enterLabel);
    expect(html.match(/data-stage="developed"/g)?.length).toBe(4);
  });
});

describe('TownScene direct モード', () => {
  it('最初から a が4・button 0・detail 無し', () => {
    const html = renderScene(withMode('direct'), EMPTY_DEVELOPMENT);
    expect(html.match(/<a [^>]*href="/g) ?? []).toHaveLength(4);
    expect(html.match(/<button /g) ?? []).toHaveLength(0);
    for (const b of town.buildings) expect(html).not.toContain(b.detail);
  });
});

describe('TownScene 共通制約', () => {
  it('画像参照なし、tsx に hex 直書きなし', () => {
    expect(renderScene(town)).not.toMatch(/<image|<img|\/images\//);
    for (const f of listTsx('components/town')) {
      expect(readRepoFile(f), f).not.toMatch(/#[0-9a-fA-F]{3,6}\b/);
    }
  });
});
