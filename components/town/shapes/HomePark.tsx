import { TOWN_PALETTE } from '@/lib/town/palette';
import { IsoBox, LINE, fillOf, type ShapeProps } from './common';

function Tree({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 3} y={y} width={6} height={18} fill={TOWN_PALETTE.road} {...LINE} />
      <circle cx={x} cy={y - 4} r={12} fill={TOWN_PALETTE.buildings.arcade} {...LINE} />
    </g>
  );
}

function Swing({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y + 28} L${x + 6} ${y} L${x + 28} ${y} L${x + 34} ${y + 28}`} fill="none" {...LINE} />
      <line x1={x + 12} y1={y} x2={x + 12} y2={y + 18} {...LINE} />
      <line x1={x + 22} y1={y} x2={x + 22} y2={y + 18} {...LINE} />
      <rect x={x + 10} y={y + 18} width={14} height={3} fill={TOWN_PALETTE.window} {...LINE} />
    </g>
  );
}

/** 発展後の家＋公園: 三角屋根の家＋木＋ブランコ＋小さな物置 */
export function HomePark({ bounds, color }: ShapeProps) {
  const { x, y, w, h } = bounds;
  const fill = fillOf(color);
  const hx = x + 12;
  const hy = y + 55;
  const hw = w * 0.48;
  const roof = `${hx - 4},${hy} ${hx + hw / 2},${hy - 22} ${hx + hw + 4},${hy}`;
  return (
    <g data-kind="home-park">
      <IsoBox x={hx} y={hy} w={hw} h={h * 0.32} depth={8} fill={fill} />
      <polygon points={roof} fill={TOWN_PALETTE.window} {...LINE} />
      <rect x={hx + 8} y={hy + 14} width={14} height={12} fill={TOWN_PALETTE.window} {...LINE} />
      <Tree x={x + w - 28} y={y + 88} />
      <Swing x={x + w * 0.42} y={y + h - 48} />
      <IsoBox x={x + w * 0.68} y={y + h - 52} w={22} h={18} depth={5} fill={TOWN_PALETTE.road} />
    </g>
  );
}
