import { readFileSync } from 'node:fs';
import path from 'node:path';

/** リポジトリのルート（tests/town/helpers から3つ上） */
export const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');

export function readRepoFile(relativePath: string): string {
  return readFileSync(path.join(REPO_ROOT, relativePath), 'utf8');
}
