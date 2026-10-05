import { IsoBox, Tuft, paleOf, type ShapeProps } from './common';

/** 未発展のライブハウス: 細い小さな箱＋草 */
export function LivehouseSmall({ bounds, color }: ShapeProps) {
  const { x, y, w, h } = bounds;
  return (
    <g data-kind="livehouse">
      <IsoBox x={x + w * 0.35} y={y + h * 0.42} w={w * 0.28} h={h * 0.32} depth={6} fill={paleOf(color)} />
      <Tuft x={x + 12} y={y + h - 18} />
      <Tuft x={x + w - 14} y={y + h - 16} />
    </g>
  );
}
