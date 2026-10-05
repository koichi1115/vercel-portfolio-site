/**
 * トップの街メニュー。データ → 絵 → 逃げ道のリンク一覧。
 */
import type { TownConfig } from '@/lib/town/schema';
import { TownLinkList } from './TownLinkList';
import { TownScene } from './TownScene';

type Props = {
  config: TownConfig;
  signFontClassName?: string;
};

export function Town({ config, signFontClassName }: Props) {
  return (
    <section className="mx-auto w-[min(100%-32px,420px)] py-6 text-abyss dark:text-bone">
      <h1 className="sr-only">ホーム — 街のメニュー</h1>
      <TownScene config={config} signFontClassName={signFontClassName} />
      <p className="mt-3 text-center text-xs opacity-70">
        浦和駅周辺のイメージ（{config.terrainNote}）
      </p>
      <p className="mt-1 text-center text-xs opacity-70">{config.settings.hint}</p>
      <TownLinkList buildings={config.buildings} extraLinks={config.extraLinks} />
    </section>
  );
}
