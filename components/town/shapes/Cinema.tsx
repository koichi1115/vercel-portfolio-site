/**
 * 映画館: 縦長の箱、三角屋根、張り出した看板（電球つき）。
 */
import { TOWN_PALETTE } from '@/lib/town/palette';
import { LINE, SignLight, fillOf, type ShapeProps } from './common';

function Marquee({ x, y, w }: { x: number; y: number; w: number }) {
  const bulbs = Array.from({ length: 6 }, (_, i) => x + 12 + (i * (w - 24)) / 5);
  return (
    <g>
      <rect x={x} y={y} width={w} height={30} rx={4} fill={TOWN_PALETTE.window} {...LINE} />
      {bulbs.map((bx) => (
        <circle key={bx} cx={bx} cy={y + 15} r={3} fill={TOWN_PALETTE.buildings.cinema} {...LINE} />
      ))}
    </g>
  );
}

function FilmPoster({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={26} height={36} fill={TOWN_PALETTE.window} {...LINE} />
      <path d={`M${x + 9} ${y + 11} L${x + 19} ${y + 18} L${x + 9} ${y + 25} Z`} fill={TOWN_PALETTE.outline} />
    </g>
  );
}

export function Cinema({ bounds, color }: ShapeProps) {
  const { x, y, w, h } = bounds;
  const bodyX = x + 14;
  const bodyW = w - 28;
  const roof = `M${bodyX - 4} ${y + 52} L${x + w / 2} ${y + 22} L${bodyX + bodyW + 4} ${y + 52} Z`;
  return (
    <g data-kind="cinema">
      <rect x={bodyX} y={y + 52} width={bodyW} height={h - 56} fill={fillOf(color)} {...LINE} />
      <path d={roof} fill={fillOf(color)} {...LINE} />
      <Marquee x={x + 2} y={y + 64} w={w - 4} />
      <FilmPoster x={bodyX + 8} y={y + 106} />
      <rect x={bodyX + bodyW - 34} y={y + h - 46} width={26} height={42} fill={TOWN_PALETTE.window} {...LINE} />
      <SignLight cx={x + w / 2} cy={y + 40} />
    </g>
  );
}
