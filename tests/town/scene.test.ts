import { readdirSync } from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import urawa from '@/data/town/urawa.json';
import { parseTownConfig } from '@/lib/town/schema';
import { TownScene } from '@/components/town/TownScene';
import { REPO_ROOT, readRepoFile } from './helpers/read-file';

const town = parseTownConfig(urawa);

function render(): string {
  return renderToStaticMarkup(createElement(TownScene, { config: town }));
}

function listTsx(dir: string): string[] {
  return readdirSync(path.join(REPO_ROOT, dir), { withFileTypes: true }).flatMap((e) => {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) return listTsx(rel);
    return e.name.endsWith('.tsx') ? [rel] : [];
  });
}

describe('街の絵（TownScene）', () => {
  it('建物の数だけ <a href> があり、行き先は JSON の href と同じ順', () => {
    const hrefs = [...render().matchAll(/<a [^>]*href="([^"]+)"/g)].map((m) => m[1]);
    expect(hrefs).toEqual(town.buildings.map((b) => b.href));
  });

  it('各リンクの中にメニュー名が実テキストで入る', () => {
    const anchors = [...render().matchAll(/<a [^>]*>([\s\S]*?)<\/a>/g)].map((m) => m[1]);
    town.buildings.forEach((b, i) => expect(anchors[i]).toContain(b.label));
  });

  it('svg は1枚だけで aria-hidden', () => {
    const svgs = render().match(/<svg[^>]*>/g) ?? [];
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toContain('aria-hidden="true"');
  });

  it('画像を参照しない', () => {
    expect(render()).not.toMatch(/<image|<img|\/images\//);
  });

  it('全建物の種類の絵を描く（kind ごとに data-kind が出る）', () => {
    const html = render();
    for (const b of town.buildings) expect(html).toContain(`data-kind="${b.kind}"`);
    expect(html).toContain('data-kind="station"');
  });

  it('線は vector-effect="non-scaling-stroke" で幅2', () => {
    const html = render();
    expect(html).toContain('vector-effect="non-scaling-stroke"');
    expect(html).toMatch(/stroke-width="2"/);
  });

  it('components/town/**/*.tsx に色の hex を直書きしない', () => {
    const files = listTsx('components/town');
    expect(files.length).toBeGreaterThan(0);
    for (const f of files) expect(readRepoFile(f), f).not.toMatch(/#[0-9a-fA-F]{3,6}\b/);
  });
});
