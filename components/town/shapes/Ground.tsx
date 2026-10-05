/**
 * 斜め見下ろしの菱形タイル地面と、区画ごとの台座。
 */
import type { Building, TownConfig } from '@/lib/town/schema';
import { diamondCell, lotPlate } from '@/lib/town/geometry';
import { TOWN_PALETTE } from '@/lib/town/palette';
import { LINE } from './common';

type Props = { config: TownConfig; buildings: Building[] };

export function Ground({ config, buildings }: Props) {
  const { viewBox, tile } = config;
  const [main, shifted] = diamondCell(tile);
  return (
    <g data-kind="ground">
      <defs>
        <pattern id="town-tile" width={tile.w} height={tile.h} patternUnits="userSpaceOnUse">
          <rect width={tile.w} height={tile.h} fill={TOWN_PALETTE.tile.grassA} />
          <polygon points={main} fill={TOWN_PALETTE.tile.grassB} {...LINE} stroke={TOWN_PALETTE.tile.guide} strokeWidth={0.75} />
          <polygon points={shifted} fill={TOWN_PALETTE.tile.grassA} {...LINE} stroke={TOWN_PALETTE.tile.guide} strokeWidth={0.75} />
        </pattern>
      </defs>
      <rect x={0} y={0} width={viewBox.w} height={viewBox.h} fill="url(#town-tile)" />
      {buildings.map((b) => (
        <polygon key={b.id} points={lotPlate(b.bounds)} fill={TOWN_PALETTE.tile.lot} {...LINE} />
      ))}
    </g>
  );
}
