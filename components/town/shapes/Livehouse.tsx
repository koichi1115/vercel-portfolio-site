import { TOWN_PALETTE } from '@/lib/town/palette';
import { IsoBox, LINE, SignLight, fillOf, type ShapeProps } from './common';

function Speaker({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={11} fill={TOWN_PALETTE.window} {...LINE} />
      <circle cx={cx} cy={cy} r={5} fill={TOWN_PALETTE.outline} {...LINE} />
    </g>
  );
}

/** 発展後のライブハウス: 細い箱＋縦看板＋スピーカー＋別棟 */
export function Livehouse({ bounds, color }: ShapeProps) {
  const { x, y, w, h } = bounds;
  const fill = fillOf(color);
  const bx = x + 28;
  const by = y + 48;
  const bw = w - 40;
  return (
    <g data-kind="livehouse">
      <IsoBox x={bx} y={by} w={bw} h={h * 0.5} depth={8} fill={fill} />
      <rect x={x + 8} y={by + 8} width={16} height={70} rx={2} fill={TOWN_PALETTE.window} {...LINE} />
      <Speaker cx={bx + bw / 2} cy={by + 28} />
      <Speaker cx={bx + bw / 2} cy={by + 58} />
      <IsoBox x={x + 10} y={y + h - 50} w={28} h={22} depth={5} fill={fill} />
      <SignLight cx={x + 16} cy={by + 2} />
    </g>
  );
}
