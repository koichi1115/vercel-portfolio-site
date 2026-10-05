import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPO_ROOT } from './helpers/read-file';

const ROOTS = ['components/town', 'lib/town', 'data/town'];
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg']);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(path.join(REPO_ROOT, dir))) {
    const rel = path.join(dir, name);
    const st = statSync(path.join(REPO_ROOT, rel));
    if (st.isDirectory()) walk(rel, out);
    else out.push(rel);
  }
  return out;
}

describe('アセット上限', () => {
  const files = ROOTS.flatMap((r) => walk(r));

  it('components/town・lib/town・data/town の合計が 200KB 以下', () => {
    const total = files.reduce((sum, f) => sum + statSync(path.join(REPO_ROOT, f)).size, 0);
    console.log(`town 関連合計: ${total} bytes`);
    expect(total).toBeLessThanOrEqual(204800);
  });

  it('画像拡張子のファイルが 0', () => {
    expect(files.filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))).toEqual([]);
  });
});
