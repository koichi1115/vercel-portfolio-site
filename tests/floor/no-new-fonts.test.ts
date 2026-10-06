import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPO_ROOT, readRepoFile } from '../town/helpers/read-file';

function walk(directory: string): string[] {
  const files: string[] = [];
  for (const name of readdirSync(directory)) {
    if (['.git', '.next', 'node_modules'].includes(name)) continue;
    const fullPath = path.join(directory, name);
    if (statSync(fullPath).isDirectory()) files.push(...walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

describe('フォント資産', () => {
  it('next/font は既存の2ファイルだけで使う', () => {
    const roots = ['app', 'components', 'lib'];
    const matches = roots.flatMap((root) => walk(path.join(REPO_ROOT, root)))
      .filter((file) => readFileSync(file, 'utf8').includes('next/font'))
      .map((file) => path.relative(REPO_ROOT, file))
      .sort();
    expect(matches).toEqual(['app/layout.tsx', 'components/town/font.ts']);
  });

  it('新しいフォントファイルを持たない', () => {
    const fontFiles = walk(REPO_ROOT).filter((file) => /\.(?:woff2?|ttf|otf)$/i.test(file));
    expect(fontFiles).toEqual([]);
  });

  it('グローバルCSSのimportは既存の1行だけ', () => {
    const imports = readRepoFile('app/globals.css').match(/^\s*@import\b/gm) ?? [];
    expect(imports).toHaveLength(1);
  });
});
