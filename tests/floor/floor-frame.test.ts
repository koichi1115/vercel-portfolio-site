import { readdirSync } from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Floor } from '@/components/floor/Floor';
import { loadTownConfig, resolveFloor } from '@/lib/town/floors';
import { REPO_ROOT, readRepoFile } from '../town/helpers/read-file';

const config = loadTownConfig();
const projectFloor = resolveFloor(config, '/projects');
const reviewFloor = resolveFloor(config, '/reviews');

function renderFloor(floor: typeof projectFloor, title: string, lead?: string): string {
  return renderToStaticMarkup(
    createElement(Floor, {
      floor,
      title,
      lead,
      children: createElement('p', null, '内容'),
    }),
  );
}

describe('フロア枠', () => {
  it('街への導線と背景格子を1つずつ描く', () => {
    const html = renderFloor(projectFloor, '作品');
    expect(html.match(/<a[^>]*href="\/"/g) ?? []).toHaveLength(1);
    expect(html).toContain('← 街に戻る');
    expect(html.match(/data-floor-grid/g) ?? []).toHaveLength(1);
    expect(html).toMatch(/data-floor-grid="(?:true)?"[^>]*aria-hidden="true"/);
    expect(html).toContain('data-district="arcade"');
  });

  it('一覧では帯の中に区画名のh1を描く', () => {
    const html = renderFloor(projectFloor, '作品');
    expect(html).toMatch(/<[^>]+><h1[^>]*>作品<\/h1><\/[^>]+>/);
  });

  it('詳細では帯に一覧リンク、帯の下に記事名を描く', () => {
    const html = renderFloor(projectFloor, '記事名', '説明');
    expect(html).toMatch(/<a[^>]+href="\/projects"[^>]*>作品<\/a>/);
    expect(html).toMatch(/<\/[^>]+><h1[^>]*>記事名<\/h1>/);
    expect(html).toContain('説明');
  });

  it.each([
    ['extra', reviewFloor],
    ['null', null],
  ])('%s は中立区画として描く', (_, floor) => {
    const html = renderFloor(floor, 'レビュー');
    expect(html).toContain('data-district="none"');
  });

  it('フロアコンポーネントに禁止された表現が無い', () => {
    const directory = path.join(REPO_ROOT, 'components/floor');
    const files = readdirSync(directory).filter((file) => file.endsWith('.tsx'));
    const source = files.map((file) => readRepoFile(`components/floor/${file}`)).join('\n');
    expect(source).not.toMatch(/#[\da-f]{3,6}\b/i);
    expect(source).not.toContain('framer-motion');
    expect(source).not.toContain('animate-');
  });
});
