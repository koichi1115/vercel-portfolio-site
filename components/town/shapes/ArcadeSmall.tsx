import { IsoBox, Tuft, paleOf, type ShapeProps } from './common';

/** 未発展のゲーセン: 淡い小さな箱＋草 */
export function ArcadeSmall({ bounds, color }: ShapeProps) {
  const { x, y, w, h } = bounds;
  const bx = x + w * 0.25;
  const by = y + h * 0.45;
  return (
    <g data-kind="arcade">
      <IsoBox x={bx} y={by} w={w * 0.45} h={h * 0.28} depth={8} fill={paleOf(color)} />
      <Tuft x={x + 18} y={y + h - 20} />
      <Tuft x={x + w - 22} y={y + h - 18} />
      <Tuft x={x + w * 0.5} y={y + h - 14} />
    </g>
  );
}
