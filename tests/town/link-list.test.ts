import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import urawa from '@/data/town/urawa.json';
import { parseTownConfig } from '@/lib/town/schema';
import { TownLinkList } from '@/components/town/TownLinkList';

const town = parseTownConfig(urawa);

function render(): string {
  return renderToStaticMarkup(
    createElement(TownLinkList, { buildings: town.buildings, extraLinks: town.extraLinks }),
  );
}

function hrefsIn(html: string): string[] {
  return [...html.matchAll(/<a [^>]*href="([^"]+)"/g)].map((m) => m[1]);
}

describe('街の下の通常リンク一覧（TownLinkList）', () => {
  it('nav「メニュー」の中に、建物と同じ順でリンクが並ぶ', () => {
    const html = render();
    const nav = html.match(/<nav aria-label="メニュー"[^>]*>([\s\S]*?)<\/nav>/);
    expect(nav).not.toBeNull();
    const menuHrefs = hrefsIn(nav![1].split('aria-label="そのほか"')[0]);
    expect(menuHrefs).toEqual(town.buildings.map((b) => b.href));
  });

  it('各リンクにメニュー名が実テキストで入る', () => {
    const html = render();
    for (const b of town.buildings) expect(html).toContain(`>${b.label}<`);
  });

  it('「そのほか」に /reviews（レビュー）がある', () => {
    const html = render();
    const extra = html.match(/<ul aria-label="そのほか"[^>]*>([\s\S]*?)<\/ul>/);
    expect(extra).not.toBeNull();
    expect(hrefsIn(extra![1])).toEqual(['/reviews']);
    expect(extra![1]).toContain('レビュー');
  });

  it('全リンク数は建物数＋そのほか数で、画像を使わない', () => {
    const html = render();
    expect(hrefsIn(html)).toHaveLength(town.buildings.length + town.extraLinks.length);
    expect(html).not.toMatch(/<img|<image|\/images\//);
  });
});
