import { TOWN_PALETTE } from '@/lib/town/palette';
import { IsoBox, LINE, Tuft, paleOf, type ShapeProps } from './common';

/** 未発展の家＋公園: 小さな家のシルエット＋草 */
export function HomeParkSmall({ bounds, color }: ShapeProps) {
  const { x, y, w, h } = bounds;
  const bx = x + w * 0.28;
  const by = y + h * 0.48;
  const roof = `${bx - 4},${by} ${bx + w * 0.22},${by - 16} ${bx + w * 0.44 + 4},${by}`;
  return (
    <g data-kind="home-park">
      <IsoBox x={bx} y={by} w={w * 0.44} h={h * 0.22} depth={6} fill={paleOf(color)} />
      <polygon points={roof} fill={TOWN_PALETTE.window} {...LINE} />
      <Tuft x={x + 16} y={y + h - 18} />
      <Tuft x={x + w - 18} y={y + h - 16} />
    </g>
  );
}
