/**
 * ライブハウス: 細長い箱、縦看板、丸いスピーカー2つ。
 */
import { TOWN_PALETTE } from '@/lib/town/palette';
import { LINE, SignLight, fillOf, type ShapeProps } from './common';

function Speaker({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={13} fill={TOWN_PALETTE.window} {...LINE} />
      <circle cx={cx} cy={cy} r={6} fill={TOWN_PALETTE.outline} {...LINE} />
    </g>
  );
}

function VerticalSign({ x, y, h }: { x: number; y: number; h: number }) {
  const bars = Array.from({ length: 4 }, (_, i) => y + 14 + i * ((h - 28) / 3));
  return (
    <g>
      <rect x={x} y={y} width={18} height={h} rx={3} fill={TOWN_PALETTE.window} {...LINE} />
      {bars.map((by) => (
        <rect key={by} x={x + 5} y={by - 3} width={8} height={6} fill={TOWN_PALETTE.outline} />
      ))}
    </g>
  );
}

export function Livehouse({ bounds, color }: ShapeProps) {
  const { x, y, w, h } = bounds;
  const bodyX = x + 22;
  const bodyW = w - 26;
  return (
    <g data-kind="livehouse">
      <rect x={bodyX} y={y + 26} width={bodyW} height={h - 30} fill={fillOf(color)} {...LINE} />
      <VerticalSign x={x + 4} y={y + 36} h={80} />
      <Speaker cx={bodyX + bodyW / 2} cy={y + 62} />
      <Speaker cx={bodyX + bodyW / 2} cy={y + 96} />
      <rect x={bodyX + bodyW / 2 - 12} y={y + h - 44} width={24} height={40} fill={TOWN_PALETTE.window} {...LINE} />
      <SignLight cx={x + 13} cy={y + 30} />
    </g>
  );
}
