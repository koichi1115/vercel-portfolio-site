import { describe, expect, it } from 'vitest';
import { readRepoFile } from './helpers/read-file';

const CSS_PATH = 'components/town/town.module.css';

function readCss(): string {
  return readRepoFile(CSS_PATH).replace(/\/\*[\s\S]*?\*\//g, '');
}

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

function durationsMs(css: string, prop: RegExp): number[] {
  return [...css.matchAll(prop)].flatMap((m) =>
    [...m[1].matchAll(/(\d*\.?\d+)(ms|s)\b/g)].map((d) =>
      d[2] === 's' ? Number(d[1]) * 1000 : Number(d[1]),
    ),
  );
}

describe('街の動き（town.module.css）p2', () => {
  it('@keyframes はちょうど1つで名前は town-grow', () => {
    const css = readCss();
    const keys = [...css.matchAll(/@keyframes\s+([A-Za-z0-9_-]+)/g)].map((m) => m[1]);
    expect(keys).toEqual(['town-grow']);
  });

  it('infinite と translateY(-4px) を使わない', () => {
    const css = readCss();
    expect(css).not.toMatch(/infinite/);
    expect(css).not.toMatch(/translateY\(-4px\)/);
  });

  it('prefers-reduced-motion: reduce で animation/transition/transform を止める', () => {
    const block = reducedMotionBlock(readCss());
    expect(block).toMatch(/animation\s*:\s*none/);
    expect(block).toMatch(/transition\s*:\s*none/);
    expect(block).toMatch(/transform\s*:\s*none/);
  });

  it('animation と transition の時間はすべて 160ms 以内', () => {
    const css = readCss().replace(reducedMotionBlock(readCss()), '');
    const anim = durationsMs(css, /animation(?:-duration)?\s*:\s*([^;]+);/g);
    const trans = durationsMs(css, /transition(?:-duration)?\s*:\s*([^;]+);/g);
    expect([...anim, ...trans].length).toBeGreaterThan(0);
    for (const ms of [...anim, ...trans]) expect(ms).toBeLessThanOrEqual(160);
  });

  it(':active で 0.97 に縮み、focus-visible に outline', () => {
    const css = readCss();
    expect(css).toMatch(/:active[^{]*\{[^}]*scale\(0\.97\)/);
    expect(css).toMatch(/:focus-visible[^{]*\{[^}]*outline/);
  });
});
