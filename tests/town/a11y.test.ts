import { describe, expect, it } from 'vitest';
import urawa from '@/data/town/urawa.json';
import { parseTownConfig } from '@/lib/town/schema';
import { readRepoFile } from './helpers/read-file';
import { renderScene } from './helpers/render-scene';

const town = parseTownConfig(urawa);

describe('キーボードと読み上げ（a11y）', () => {
  it('未発展の button は type=button と aria-expanded を持つ', () => {
    const html = renderScene(town);
    const buttons = html.match(/<button[^>]*>/g) ?? [];
    expect(buttons.length).toBe(4);
    for (const b of buttons) {
      expect(b).toContain('type="button"');
      expect(b).toContain('aria-expanded');
    }
  });

  it('role="button" の div と onKeyDown を使わない', () => {
    const src = ['BuildingLot.tsx', 'TownScene.tsx', 'useDevelopment.ts']
      .map((f) => readRepoFile(`components/town/${f}`))
      .join('\n');
    expect(src).not.toMatch(/role=["']button["']/);
    expect(src).not.toMatch(/onKeyDown/);
  });

  it('発展後の a に detail と enterLabel がある', () => {
    const html = renderScene(town, { developed: town.buildings.map((b) => b.id) });
    for (const b of town.buildings) expect(html).toContain(b.detail);
    expect(html).toContain(town.settings.enterLabel);
  });

  it('CSS の .lot:focus-visible に outline、.enter の min-height が 44px 以上', () => {
    const css = readRepoFile('components/town/town.module.css');
    expect(css).toMatch(/\.lot:focus-visible\s*\{[^}]*outline/);
    const enter = css.match(/\.enter\s*\{([^}]+)\}/);
    expect(enter).not.toBeNull();
    const mh = enter![1].match(/min-height:\s*(\d+)px/);
    expect(Number(mh?.[1] ?? 0)).toBeGreaterThanOrEqual(44);
  });

  it('TownLinkList は発展層を import しない', () => {
    const src = readRepoFile('components/town/TownLinkList.tsx');
    expect(src).not.toMatch(/development|sessionStore|useDevelopment/);
  });
});
