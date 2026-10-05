import { describe, expect, it } from 'vitest';
import { readRepoFile } from './helpers/read-file';

const header = readRepoFile('components/Header.tsx');
const footer = readRepoFile('components/Footer.tsx');

describe('モバイルメニューの背景', () => {
  it('全画面メニューはライト・ダークとも不透明なテーマ背景を持つ', () => {
    const className = header.match(
      /className="([^"]*fixed inset-0 z-40[^"]*)"/,
    )?.[1];
    expect(className).toBeDefined();
    expect(className).toContain('bg-bone');
    expect(className).toContain('dark:bg-abyss');
    expect(className).not.toMatch(/aurora-glow|backdrop|bg-(?:bone|abyss)\/|opacity-/);
  });

  it('共通レイアウトのHeaderなので全ページに適用される', () => {
    const layout = readRepoFile('app/layout.tsx');
    expect(layout).toContain('import Header from "@/components/Header"');
    expect(layout).toContain('<Header />');
  });
});

describe('フッターの見出しフォント', () => {
  it('共通の看板見出しフォントを問い合わせ導線に使う', () => {
    expect(footer).toContain("import { signFont } from './town/font'");
    const headingAt = footer.indexOf('Let&apos;s build');
    const headingSource = footer.slice(Math.max(0, headingAt - 500), headingAt);
    expect(headingSource).toContain('signFont.className');
    expect(headingSource).not.toContain('font-syne');
  });
});
