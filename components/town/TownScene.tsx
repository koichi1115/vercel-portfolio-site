/**
 * 街の絵。aria-hidden の SVG 1枚に建物を描き、その上に建物ごとのリンクを重ねる。
 * 建物の割当・座標・ラベルはすべて config（data/town/*.json）から来る。ここには持たない。
 */
import type { CSSProperties, ComponentType } from 'react';
import Link from 'next/link';
import type { Building, BuildingKind, TownConfig } from '@/lib/town/schema';
import { toPercentBox } from '@/lib/town/geometry';
import { TOWN_PALETTE } from '@/lib/town/palette';
import { Arcade } from './shapes/Arcade';
import { Backdrop } from './shapes/Backdrop';
import { Cinema } from './shapes/Cinema';
import { HomePark } from './shapes/HomePark';
import { Livehouse } from './shapes/Livehouse';
import { Station } from './shapes/Station';
import type { ShapeProps } from './shapes/common';
import styles from './town.module.css';

/** 建物の種類 → 絵。どの建物をどのメニューにするかは JSON 側で決める */
const SHAPES: Record<BuildingKind, ComponentType<ShapeProps>> = {
  arcade: Arcade,
  'home-park': HomePark,
  cinema: Cinema,
  livehouse: Livehouse,
};

type Props = { config: TownConfig; signFontClassName?: string };

function sceneStyle(config: TownConfig): CSSProperties {
  return {
    aspectRatio: `${config.viewBox.w} / ${config.viewBox.h}`,
    '--town-ground': TOWN_PALETTE.ground,
    '--town-outline': TOWN_PALETTE.outline,
    '--town-pill-bg': TOWN_PALETTE.pillBg,
    '--town-pill-fg': TOWN_PALETTE.pillFg,
  } as CSSProperties;
}

function TownDrawing({ config }: { config: TownConfig }) {
  const { viewBox, station, buildings } = config;
  return (
    <svg className={styles.svg} viewBox={`0 0 ${viewBox.w} ${viewBox.h}`} aria-hidden="true" focusable="false">
      <Backdrop viewBox={viewBox} horizonY={station.railY + 10} buildings={buildings} />
      <Station station={station} width={viewBox.w} />
      {buildings.map((b) => {
        const Shape = SHAPES[b.kind];
        return <Shape key={b.id} bounds={b.bounds} color={b.color} />;
      })}
    </svg>
  );
}

function BuildingLink({ building, index, config, fontClass }: { building: Building; index: number; config: TownConfig; fontClass: string }) {
  const style = { ...toPercentBox(building.bounds, config.viewBox), '--town-delay': `${index * 90}ms` } as CSSProperties;
  return (
    <Link href={building.href} className={styles.building} style={style} data-building={building.id}>
      <span className={`${styles.pill} ${fontClass}`}>{building.label}</span>
    </Link>
  );
}

export function TownScene({ config, signFontClassName = '' }: Props) {
  return (
    <div className={styles.scene} style={sceneStyle(config)}>
      <TownDrawing config={config} />
      {config.buildings.map((b, i) => (
        <BuildingLink key={b.id} building={b} index={i} config={config} fontClass={signFontClassName} />
      ))}
    </div>
  );
}
