/**
 * 空・地面・歩道。建物の後ろに敷く背景。歩道は各建物の足元に敷き、位置は街データから決まる。
 */
import type { Building, TownConfig } from '@/lib/town/schema';
import { TOWN_PALETTE } from '@/lib/town/palette';
import { LINE } from './common';

type Props = { viewBox: TownConfig['viewBox']; horizonY: number; buildings: Building[] };

export function Backdrop({ viewBox, horizonY, buildings }: Props) {
  const { w, h } = viewBox;
  return (
    <g data-kind="backdrop">
      <rect x={0} y={0} width={w} height={horizonY} fill={TOWN_PALETTE.sky} />
      <rect x={0} y={horizonY} width={w} height={h - horizonY} fill={TOWN_PALETTE.ground} />
      {buildings.map(({ id, bounds: b }) => (
        <rect key={id} x={b.x - 6} y={b.y + b.h - 4} width={b.w + 12} height={10} rx={5} fill={TOWN_PALETTE.road} {...LINE} />
      ))}
    </g>
  );
}
