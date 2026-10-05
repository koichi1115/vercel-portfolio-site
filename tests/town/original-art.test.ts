import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPO_ROOT, readRepoFile } from './helpers/read-file';

const ROOTS = ['components/town', 'data/town', 'lib/town'];
const BINARY_EXT = new Set(['.svg', '.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(path.join(REPO_ROOT, dir))) {
    const rel = path.join(dir, name);
    const st = statSync(path.join(REPO_ROOT, rel));
    if (st.isDirectory()) walk(rel, out);
    else out.push(rel);
  }
  return out;
}

describe('自作 SVG（original-art）', () => {
  const files = ROOTS.flatMap((r) => walk(r));

  it('画像や .svg ファイルを置かない', () => {
    const bad = files.filter((f) => BINARY_EXT.has(path.extname(f).toLowerCase()));
    expect(bad).toEqual([]);
  });

  it('tsx にラスタ参照・文字列注入・SVG text を使わない', () => {
    const tsx = files.filter((f) => f.endsWith('.tsx'));
    for (const f of tsx) {
      const src = readRepoFile(f);
      expect(src, f).not.toMatch(/<image|<img|xlink|href="data:|url\(|dangerouslySetInnerHTML|<foreignObject|<text\b/);
    }
  });

  it('各 path の d= は 200 文字以下、path 出現は合計 60 以下', () => {
    const tsx = files.filter((f) => f.endsWith('.tsx'));
    let pathCount = 0;
    for (const f of tsx) {
      const src = readRepoFile(f);
      pathCount += (src.match(/<path\b/g) ?? []).length;
      for (const m of src.matchAll(/\bd=["']([^"']+)["']/g)) {
        expect(m[1].length, f).toBeLessThanOrEqual(200);
      }
    }
    expect(pathCount).toBeLessThanOrEqual(60);
  });

  it('各 shape ファイルは 120 行以下', () => {
    for (const f of files.filter((f) => f.includes('/shapes/') && f.endsWith('.tsx'))) {
      const lines = readRepoFile(f).split('\n').length;
      expect(lines, f).toBeLessThanOrEqual(120);
    }
  });
});
