/**
 * 斜め見下ろしの菱形タイル地面と、区画ごとの台座。
 * pattern の パターン参照 参照は機械検査で禁じているため、菱形を並べて敷く。
 */
import type { Building, TownConfig } from '@/lib/town/schema';
import { diamondCell, lotPlate } from '@/lib/town/geometry';
import { TOWN_PALETTE } from '@/lib/town/palette';
import { LINE } from './common';

type Props = { config: TownConfig; buildings: Building[] };

function TileField({ viewBox, tile }: { viewBox: TownConfig['viewBox']; tile: TownConfig['tile'] }) {
  const [main] = diamondCell(tile);
  const cells: { x: number; y: number; fill: string }[] = [];
  for (let y = 0; y < viewBox.h; y += tile.h) {
    for (let x = 0; x < viewBox.w; x += tile.w) {
      const odd = ((x / tile.w) + (y / tile.h)) % 2 === 0;
      cells.push({ x, y, fill: odd ? TOWN_PALETTE.tile.grassA : TOWN_PALETTE.tile.grassB });
    }
  }
  return (
    <g>
      <rect x={0} y={0} width={viewBox.w} height={viewBox.h} fill={TOWN_PALETTE.tile.grassA} />
      {cells.map((c) => (
        <polygon
          key={`${c.x}-${c.y}`}
          points={main}
          transform={`translate(${c.x} ${c.y})`}
          fill={c.fill}
          stroke={TOWN_PALETTE.tile.guide}
          strokeWidth={0.75}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </g>
  );
}

export function Ground({ config, buildings }: Props) {
  return (
    <g data-kind="ground">
      <TileField viewBox={config.viewBox} tile={config.tile} />
      {buildings.map((b) => (
        <polygon key={b.id} points={lotPlate(b.bounds)} fill={TOWN_PALETTE.tile.lot} {...LINE} />
      ))}
    </g>
  );
}
