import { describe, expect, it } from 'vitest';
import { readRepoFile } from '../town/helpers/read-file';

const cssPath = 'components/floor/floor.module.css';

function css(): string {
  return readRepoFile(cssPath);
}

function rule(source: string, selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return source.match(new RegExp(`${escaped}\\s*\\{([^}]+)\\}`))?.[1] ?? '';
}

function withoutRule(source: string, selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return source.replace(new RegExp(`${escaped}\\s*\\{[^}]+\\}`, 'g'), '');
}

function remValue(block: string, property: string): number {
  return Number(block.match(new RegExp(`${property}:\\s*([\\d.]+)rem`))?.[1]);
}

describe('フロアCSSの静的制約', () => {
  it('動的演出、色直書き、外部画像を使わない', () => {
    const source = css();
    expect(source.match(/@keyframes/g) ?? []).toHaveLength(0);
    expect(source.match(/#[\da-f]{3,6}\b/gi) ?? []).toHaveLength(0);
    expect(source.match(/\binfinite\b/g) ?? []).toHaveLength(0);
    expect(source.match(/url\(/g) ?? []).toHaveLength(0);
    const durations = [...source.matchAll(/transition[^;]*?(\d+)ms/g)].map((match) => Number(match[1]));
    expect(durations.every((duration) => duration <= 160)).toBe(true);
  });

  it('タップと動きの抑制を定義する', () => {
    const source = css();
    expect(rule(source, '.tap:active')).toMatch(/transform:\s*scale\(0\.97\)/);
    const reduced = source.match(/prefers-reduced-motion:\s*reduce[\s\S]+$/)?.[0] ?? '';
    expect(reduced).toMatch(/\.tap,\s*\.tap:active,\s*\.btn,\s*\.btnGhost\s*\{/);
    expect(reduced).toMatch(/transition:\s*none/);
    expect(reduced).toMatch(/transform:\s*none\s*!important/);
    expect(reduced).toMatch(/animation:\s*none/);
  });

  it.each(['.back', '.tap', '.btn', '.input', '.districtLink'])('%s は48px以上', (selector) => {
    const block = rule(css(), selector);
    expect(block).toMatch(/min-height:\s*(?:48px|3rem)/);
  });

  it('区画色は選択範囲と見出し帯だけで使う', () => {
    const selectors = ['.floor ::selection', '.headerBand', '.sectionBand'];
    let remainder = css();
    for (const selector of selectors) {
      expect(rule(remainder, selector)).toContain('var(--floor-district)');
      remainder = withoutRule(remainder, selector);
    }
    expect(remainder).not.toContain('var(--floor-district)');
  });

  it('背景格子を1枚の静的CSSとして定義する', () => {
    const block = rule(css(), '.grid');
    expect(block).toContain('background-image:');
    expect(block.match(/repeating-linear-gradient/g) ?? []).toHaveLength(2);
    const opacity = Number(block.match(/opacity:\s*([\d.]+)/)?.[1]);
    expect(opacity).toBeGreaterThanOrEqual(0.06);
    expect(opacity).toBeLessThanOrEqual(0.1);
  });

  it('ダーク時はインライン変数を上書きせずテーマ別名へ切り替える', () => {
    const source = css();
    const dark = rule(source, ':global(.dark) .floor');
    expect(dark).toContain('--floor-bg: var(--floor-ground-dark)');
    expect(dark).toContain('--floor-surface: var(--floor-card-dark)');
    expect(dark).toContain('--floor-ink: var(--floor-text-dark)');
    expect(rule(source, '.floor')).toContain('background: var(--floor-bg)');
  });

  it('カードと間隔の寸法を固定する', () => {
    const source = css();
    const card = rule(source, '.card');
    expect(card).not.toMatch(/background-image|gradient/);
    expect(card).toMatch(/border:\s*1px/);
    expect(card).toMatch(/border-radius:\s*12px/);
    expect(remValue(card, 'padding')).toBe(1.25);
    expect(remValue(rule(source, '.stack'), 'gap')).toBe(0.75);
  });

  it('本文と見出しの寸法を固定する', () => {
    const source = css();
    expect(rule(source, '.floor')).toMatch(/line-height:\s*1\.6/);
    expect(remValue(rule(source, '.h1'), 'font-size')).toBe(1.5);
    expect(remValue(rule(source, '.h2'), 'font-size')).toBe(1.2);
    const inner = rule(source, '.inner');
    expect(remValue(inner, 'max-width')).toBe(40);
    expect(inner).toMatch(/padding:\s*[^;]*1\.25rem/);
  });

  it.each(['.headerBand', '.sectionBand'])('%s は指定した帯寸法', (selector) => {
    const block = rule(css(), selector);
    const height = Number(block.match(/height:\s*(\d+)px/)?.[1]);
    const border = Number(block.match(/border-left:\s*(\d+)px/)?.[1]);
    expect(height).toBeGreaterThanOrEqual(40);
    expect(height).toBeLessThanOrEqual(48);
    expect(border).toBeGreaterThanOrEqual(3);
    expect(border).toBeLessThanOrEqual(4);
  });
});
