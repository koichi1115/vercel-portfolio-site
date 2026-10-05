import { TOWN_PALETTE } from '@/lib/town/palette';
import { IsoBox, LINE, SignLight, fillOf, type ShapeProps } from './common';

/** 発展後の映画館: 縦長＋三角屋根＋張り出し看板＋別棟 */
export function Cinema({ bounds, color }: ShapeProps) {
  const { x, y, w, h } = bounds;
  const fill = fillOf(color);
  const bx = x + 24;
  const by = y + 55;
  const bw = w - 48;
  const roof = `${bx - 4},${by} ${x + w / 2},${by - 24} ${bx + bw + 4},${by}`;
  return (
    <g data-kind="cinema">
      <IsoBox x={bx} y={by} w={bw} h={h * 0.48} depth={9} fill={fill} />
      <polygon points={roof} fill={fill} {...LINE} />
      <rect x={x + 8} y={by + 14} width={w - 16} height={26} rx={3} fill={TOWN_PALETTE.window} {...LINE} />
      <rect x={bx + 8} y={by + 52} width={22} height={30} fill={TOWN_PALETTE.window} {...LINE} />
      <IsoBox x={x + w - 40} y={y + h - 58} w={24} h={28} depth={5} fill={fill} />
      <SignLight cx={x + w / 2} cy={by - 10} />
    </g>
  );
}
