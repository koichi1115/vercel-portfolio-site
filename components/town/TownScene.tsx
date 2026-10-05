'use client';

/**
 * 街の絵（クライアント）。初回は必ず未発展で描き、マウント後に保存から復元。
 */
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import type { DevelopmentState } from '@/lib/town/development';
import { stageOf } from '@/lib/town/development';
import type { TownConfig } from '@/lib/town/schema';
import { TOWN_PALETTE } from '@/lib/town/palette';
import { BuildingLot } from './BuildingLot';
import { useDevelopment } from './useDevelopment';
import { Ground } from './shapes/Ground';
import { Station } from './shapes/Station';
import { LOOKS } from './shapes/looks';
import styles from './town.module.css';

type Props = {
  config: TownConfig;
  signFontClassName?: string;
  initialDevelopment?: DevelopmentState;
};

function sceneStyle(config: TownConfig): CSSProperties {
  return {
    aspectRatio: `${config.viewBox.w} / ${config.viewBox.h}`,
    '--town-ground': TOWN_PALETTE.ground,
    '--town-outline': TOWN_PALETTE.outline,
    '--town-pill-bg': TOWN_PALETTE.pillBg,
    '--town-pill-fg': TOWN_PALETTE.pillFg,
  } as CSSProperties;
}

function TownDrawing({
  config, state, fresh,
}: { config: TownConfig; state: DevelopmentState; fresh: string | null }) {
  return (
    <svg className={styles.svg} viewBox={`0 0 ${config.viewBox.w} ${config.viewBox.h}`} aria-hidden="true" focusable="false">
      <Ground config={config} buildings={config.buildings} />
      <Station station={config.station} width={config.viewBox.w} />
      {config.buildings.map((b) => {
        const stage = stageOf(state, b.id);
        const Shape = LOOKS[b.look[stage]];
        return (
          <g key={b.id} className={fresh === b.id ? styles.grow : undefined}>
            <Shape bounds={b.bounds} color={b.color} />
          </g>
        );
      })}
    </svg>
  );
}

export function TownScene({ config, signFontClassName = '', initialDevelopment }: Props) {
  const ids = useMemo(() => config.buildings.map((b) => b.id), [config.buildings]);
  const { state, fresh, developBuilding } = useDevelopment(ids, initialDevelopment);

  return (
    <div className={styles.scene} style={sceneStyle(config)}>
      <TownDrawing config={config} state={state} fresh={fresh} />
      {config.buildings.map((b) => (
        <BuildingLot
          key={b.id}
          building={b}
          stage={stageOf(state, b.id)}
          settings={config.settings}
          viewBox={config.viewBox}
          fresh={fresh === b.id}
          fontClass={signFontClassName}
          onDevelop={developBuilding}
        />
      ))}
    </div>
  );
}
