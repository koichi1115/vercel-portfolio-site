import { readdirSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from './read-file';

function collectPages(dir: string, segments: string[], out: string[]): void {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      collectPages(path.join(dir, entry.name), [...segments, entry.name], out);
    } else if (entry.name === 'page.tsx') {
      out.push('/' + segments.join('/'));
    }
  }
}

/** app/**\/page.tsx からルートを列挙する。api 配下と [slug] などの動的セグメントは除く。 */
export function listAppRoutes(): string[] {
  const out: string[] = [];
  collectPages(path.join(REPO_ROOT, 'app'), [], out);
  return out.filter((route) => !route.startsWith('/api') && !route.includes('['));
}
