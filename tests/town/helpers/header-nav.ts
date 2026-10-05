import { readRepoFile } from './read-file';

export type NavItem = { name: string; path: string };

/**
 * components/Header.tsx の navItems 配列を静的に読み取る。
 * Header はクライアントコンポーネントなので import せず、ソース文字列から抜き出す。
 */
export function readHeaderNav(): NavItem[] {
  const source = readRepoFile('components/Header.tsx');
  const block = source.match(/const navItems\s*=\s*\[([\s\S]*?)\];/);
  if (!block) throw new Error('components/Header.tsx に navItems が見つかりません');
  const itemPattern = /\{\s*name:\s*"([^"]+)",\s*path:\s*"([^"]+)"\s*\}/g;
  return [...block[1].matchAll(itemPattern)].map((m) => ({ name: m[1], path: m[2] }));
}
