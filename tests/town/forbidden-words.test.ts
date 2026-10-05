/**
 * 禁則語の走査。語はリポ外（.env.forbidden.local か環境変数）からだけ読み、
 * 失敗時も語そのものは出力せずファイル名と件数だけを示す。
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPO_ROOT } from './helpers/read-file';

const SKIP_DIRS = new Set(['.git', 'node_modules', '.next', 'coverage', 'dist', 'out']);
const TEXT_EXT = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.md', '.mdx',
  '.css', '.scss', '.html', '.txt', '.yml', '.yaml', '.toml', '.svg',
]);

function loadForbiddenWords(): string[] | null {
  const fromEnv = process.env.TOWN_FORBIDDEN_WORDS;
  if (fromEnv && fromEnv.trim()) {
    return fromEnv.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
  }
  const local = path.join(REPO_ROOT, '.env.forbidden.local');
  if (!existsSync(local)) return null;
  return readFileSync(local, 'utf8')
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith('#'));
}

function walk(dir: string, out: string[]): void {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    if (name === '.env.forbidden.local') continue;
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (TEXT_EXT.has(path.extname(name).toLowerCase()) || name === 'Dockerfile') out.push(full);
  }
}

describe('禁則語', () => {
  const words = loadForbiddenWords();

  it.skipIf(!words || words.length === 0)(
    'リポ内テキストに禁則語が無い（語は出力しない）',
    () => {
      const files = walkCollect();
      const hits: { file: string; count: number }[] = [];
      for (const file of files) {
        const text = readFileSync(file, 'utf8');
        let count = 0;
        for (const w of words!) {
          let from = 0;
          while (true) {
            const i = text.indexOf(w, from);
            if (i < 0) break;
            count += 1;
            from = i + w.length;
          }
        }
        if (count > 0) hits.push({ file: path.relative(REPO_ROOT, file), count });
      }
      if (hits.length > 0) {
        const summary = hits.map((h) => `${h.file}:${h.count}`).join(', ');
        expect.fail(`禁則語ヒット ${hits.length} ファイル（${summary}）。語は出さない。`);
      }
      expect(hits).toHaveLength(0);
    },
  );

  it.skipIf(!!words && words.length > 0)(
    '禁則語リストが無いため skip（.env.forbidden.local か TOWN_FORBIDDEN_WORDS を用意）',
    () => {
      expect(words).toBeNull();
    },
  );
});

function walkCollect(): string[] {
  const out: string[] = [];
  walk(REPO_ROOT, out);
  return out;
}
