import { describe, expect, it } from 'vitest';
import { readRepoFile } from './helpers/read-file';

const CSS_PATH = 'components/town/town.module.css';

function readCss(): string {
  return readRepoFile(CSS_PATH).replace(/\/\*[\s\S]*?\*\//g, '');
}

/** `@media (prefers-reduced-motion: reduce) { ... }` の中身（入れ子の波括弧を数えて取り出す） */
function reducedMotionBlock(css: string): string {
  const start = css.search(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/);
  if (start < 0) return '';
  const open = css.indexOf('{', start);
  let depth = 0;
  for (let i = open; i < css.length; i += 1) {
    if (css[i] === '{') depth += 1;
    if (css[i] === '}') depth -= 1;
    if (depth === 0) return css.slice(open + 1, i);
  }
  return '';
}

function transitionDurationsMs(css: string): number[] {
  const decls = [...css.matchAll(/transition(?:-duration)?\s*:\s*([^;]+);/g)].map((m) => m[1]);
  return decls.flatMap((value) =>
    [...value.matchAll(/(\d*\.?\d+)(ms|s)\b/g)].map((m) =>
      m[2] === 's' ? Number(m[1]) * 1000 : Number(m[1]),
    ),
  );
}

describe('街の動き（town.module.css）', () => {
  it('@keyframes はちょうど1つ', () => {
    expect(readCss().match(/@keyframes\s/g) ?? []).toHaveLength(1);
  });

  it('infinite（常時アニメ）を使わない', () => {
    expect(readCss()).not.toMatch(/infinite/);
  });

  it('prefers-reduced-motion: reduce で animation/transition/transform を止める', () => {
    const block = reducedMotionBlock(readCss());
    expect(block).toMatch(/animation\s*:\s*none/);
    expect(block).toMatch(/transition\s*:\s*none/);
    expect(block).toMatch(/transform\s*:\s*none/);
  });

  it('transition の時間はすべて 160ms 以内', () => {
    const css = readCss().replace(reducedMotionBlock(readCss()), '');
    const durations = transitionDurationsMs(css);
    expect(durations.length).toBeGreaterThan(0);
    for (const ms of durations) expect(ms).toBeLessThanOrEqual(160);
  });

  it('hover/focus-visible で持ち上がり、押下で 0.97 に縮む', () => {
    const css = readCss();
    expect(css).toMatch(/:focus-visible[^{]*\{[^}]*translateY\(-4px\)/);
    expect(css).toMatch(/:hover[^{]*\{[^}]*translateY\(-4px\)|:hover[^{]*,[^{]*\{[^}]*translateY\(-4px\)/);
    expect(css).toMatch(/:active[^{]*\{[^}]*scale\(0\.97\)/);
  });
});
