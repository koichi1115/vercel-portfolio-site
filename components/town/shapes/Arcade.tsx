import { TOWN_PALETTE } from '@/lib/town/palette';
import { IsoBox, LINE, SignLight, fillOf, type ShapeProps } from './common';

function Screen({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const dots = [[1, 0], [5, 0], [2, 1], [3, 1], [4, 1], [1, 2], [5, 2]];
  const dot = 5;
  const ox = x + w / 2 - 3 * dot;
  const oy = y + h / 2 - 1.5 * dot;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={TOWN_PALETTE.window} {...LINE} />
      {dots.map(([cx, cy]) => (
        <rect key={`${cx}-${cy}`} x={ox + cx * dot} y={oy + cy * dot} width={dot} height={dot} fill={TOWN_PALETTE.outline} />
      ))}
    </g>
  );
}

/** 発展後のゲーセン: 横長本体＋ひさし＋画面窓＋小さな別棟 */
export function Arcade({ bounds, color }: ShapeProps) {
  const { x, y, w, h } = bounds;
  const fill = fillOf(color);
  return (
    <g data-kind="arcade">
      <IsoBox x={x + 10} y={y + 50} w={w * 0.62} h={h * 0.42} depth={10} fill={fill} />
      <rect x={x + 8} y={y + 62} width={w * 0.66} height={12} fill={TOWN_PALETTE.buildings.cinema} {...LINE} />
      <Screen x={x + 22} y={y + 82} w={w * 0.4} h={h * 0.2} />
      <IsoBox x={x + w * 0.7} y={y + 78} w={w * 0.18} h={h * 0.28} depth={6} fill={fill} />
      <SignLight cx={x + w * 0.78} cy={y + 70} />
    </g>
  );
}
