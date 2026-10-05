/**
 * 家＋公園: 三角屋根の家と、木とブランコ。
 */
import { TOWN_PALETTE } from '@/lib/town/palette';
import { LINE, fillOf, type ShapeProps } from './common';

function House({ x, y, w, h, fill }: { x: number; y: number; w: number; h: number; fill: string }) {
  const roof = `M${x - 6} ${y + 30} L${x + w / 2} ${y} L${x + w + 6} ${y + 30} Z`;
  return (
    <g>
      <rect x={x} y={y + 30} width={w} height={h - 30} fill={fill} {...LINE} />
      <path d={roof} fill={TOWN_PALETTE.window} {...LINE} />
      <rect x={x + 8} y={y + 42} width={18} height={16} fill={TOWN_PALETTE.window} {...LINE} />
      <rect x={x + w - 24} y={y + h - 30} width={16} height={30} fill={TOWN_PALETTE.window} {...LINE} />
    </g>
  );
}

function Tree({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 3} y={y} width={6} height={22} fill={TOWN_PALETTE.road} {...LINE} />
      <circle cx={x} cy={y - 6} r={14} fill={TOWN_PALETTE.buildings.arcade} {...LINE} />
    </g>
  );
}

function Swing({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y + 34} L${x + 8} ${y} L${x + 32} ${y} L${x + 40} ${y + 34}`} fill="none" {...LINE} />
      <line x1={x + 15} y1={y} x2={x + 15} y2={y + 22} {...LINE} />
      <line x1={x + 25} y1={y} x2={x + 25} y2={y + 22} {...LINE} />
      <rect x={x + 12} y={y + 22} width={16} height={4} fill={TOWN_PALETTE.window} {...LINE} />
    </g>
  );
}

export function HomePark({ bounds, color }: ShapeProps) {
  const { x, y, w, h } = bounds;
  return (
    <g data-kind="home-park">
      <House x={x + 8} y={y + 24} w={w * 0.55} h={h - 70} fill={fillOf(color)} />
      <Tree x={x + w - 22} y={y + 62} />
      <Swing x={x + w * 0.4} y={y + h - 42} />
    </g>
  );
}
