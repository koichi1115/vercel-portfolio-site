/**
 * ゲーセン: 横長の箱、しま模様のひさし、大きな画面窓（中にドット絵）。
 */
import { TOWN_PALETTE } from '@/lib/town/palette';
import { LINE, SignLight, fillOf, type ShapeProps } from './common';

const DOTS = [
  [1, 0], [5, 0], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
  [0, 3], [1, 3], [3, 3], [5, 3], [6, 3], [0, 4], [6, 4], [1, 5], [5, 5],
];

function Awning({ x, y, w, fill }: { x: number; y: number; w: number; fill: string }) {
  const n = 7;
  const step = w / n;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <path
          key={i}
          d={`M${x + i * step} ${y} h${step} v14 a${step / 2} 6 0 0 1 ${-step} 0 Z`}
          fill={i % 2 === 0 ? TOWN_PALETTE.window : fill}
          {...LINE}
        />
      ))}
    </g>
  );
}

function Screen({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const dot = 6;
  const ox = x + w / 2 - 3.5 * dot;
  const oy = y + h / 2 - 3 * dot;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={TOWN_PALETTE.window} {...LINE} />
      {DOTS.map(([cx, cy]) => (
        <rect key={`${cx}-${cy}`} x={ox + cx * dot} y={oy + cy * dot} width={dot} height={dot} fill={TOWN_PALETTE.outline} />
      ))}
    </g>
  );
}

export function Arcade({ bounds, color }: ShapeProps) {
  const { x, y, w, h } = bounds;
  const top = y + 28;
  return (
    <g data-kind="arcade">
      <rect x={x + 4} y={top} width={w - 8} height={h - 32} rx={6} fill={fillOf(color)} {...LINE} />
      <Awning x={x} y={top + 14} w={w} fill={TOWN_PALETTE.buildings.cinema} />
      <Screen x={x + 20} y={top + 40} w={w - 70} h={h - 92} />
      <rect x={x + w - 42} y={top + 58} width={26} height={h - 90} rx={3} fill={TOWN_PALETTE.window} {...LINE} />
      <SignLight cx={x + w - 16} cy={top + 6} />
    </g>
  );
}
