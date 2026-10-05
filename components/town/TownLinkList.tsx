/**
 * 街の下に置く通常のリンク一覧。建物と同じ順・同じ行き先で、キーボードと読み上げの逃げ道になる。
 * 街の絵とは独立しており、ここだけで全メニューと「そのほか」に到達できる。
 */
import Link from 'next/link';
import type { Building, TownLink } from '@/lib/town/schema';

type Props = {
  buildings: Building[];
  extraLinks: TownLink[];
};

const linkClass =
  'inline-flex min-h-12 items-center rounded-full px-4 underline-offset-4 hover:underline focus-visible:underline';

export function TownLinkList({ buildings, extraLinks }: Props) {
  return (
    <nav aria-label="メニュー" className="mt-6 text-abyss dark:text-bone">
      <ul className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-base">
        {buildings.map((b) => (
          <li key={b.id}>
            <Link href={b.href} className={linkClass}>
              {b.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hairline mx-auto mt-3 w-full border-t pt-3 text-center text-sm">
        <span className="mr-1 opacity-70">そのほか:</span>
        <ul aria-label="そのほか" className="inline-flex flex-wrap justify-center gap-x-2">
          {extraLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkClass}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
