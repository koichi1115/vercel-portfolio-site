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

describe('フッターの内容', () => {
  it('大見出し、リンクラッパー、斜め矢印を描かない', () => {
    const start = footer.indexOf('Get in touch');
    const end = footer.indexOf('技術とビジネスの両面から');
    const leadArea = footer.slice(start, end);
    expect(footer).not.toContain('Let&apos;s build');
    expect(footer).not.toContain(' together');
    expect(footer).not.toContain('↗');
    expect(footer).not.toContain('signFont');
    expect(leadArea).not.toContain('<Link');
    expect(leadArea).not.toContain('<button');
    expect(leadArea).not.toContain('href="/contact"');
    expect(leadArea).not.toContain('group-hover');
    expect(leadArea).not.toContain('text-aurora');
    expect(leadArea).not.toContain('font-extrabold');
  });

  it('小見出し、説明、リンク一覧、コピーライト、上部導線を残す', () => {
    expect(footer).toContain('Get in touch');
    expect(footer).toContain('技術とビジネスの両面から');
    expect(footer).toContain('Sitemap');
    expect(footer).toContain('Social');
    expect(footer).toContain('© {currentYear}');
    expect(footer).toContain('Back to top');
    expect(footer).toContain('onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}');
    expect(footer).toContain('className="max-w-md text-sm leading-relaxed');
  });
});
