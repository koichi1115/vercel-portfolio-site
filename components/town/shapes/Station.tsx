/**
 * 駅: 改札の屋根と線路1本だけ（地形・配置は仮）。
 */
import type { TownConfig } from '@/lib/town/schema';
import { TOWN_PALETTE } from '@/lib/town/palette';
import { LINE } from './common';

type Props = { station: TownConfig['station']; width: number };

function Rail({ y, width }: { y: number; width: number }) {
  const sleepers = Array.from({ length: Math.floor(width / 18) }, (_, i) => 9 + i * 18);
  return (
    <g>
      {sleepers.map((x) => (
        <line key={x} x1={x} y1={y - 6} x2={x} y2={y + 6} {...LINE} />
      ))}
      <line x1={0} y1={y - 4} x2={width} y2={y - 4} {...LINE} />
      <line x1={0} y1={y + 4} x2={width} y2={y + 4} {...LINE} />
    </g>
  );
}

export function Station({ station, width }: Props) {
  const { x, y, w, h } = station.roof;
  const roofPath = `M${x - 10} ${y + 14} L${x + w / 2} ${y - 6} L${x + w + 10} ${y + 14} Z`;
  return (
    <g data-kind="station">
      <rect x={x} y={y + 14} width={w} height={h - 14} fill={TOWN_PALETTE.window} {...LINE} />
      <path d={roofPath} fill={TOWN_PALETTE.road} {...LINE} />
      {[0.25, 0.5, 0.75].map((r) => (
        <line key={r} x1={x + w * r} y1={y + 24} x2={x + w * r} y2={y + h} {...LINE} />
      ))}
      <Rail y={station.railY} width={width} />
    </g>
  );
}
