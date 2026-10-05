import { IsoBox, Tuft, paleOf, type ShapeProps } from './common';

/** 未発展の映画館: 縦長の小さな箱＋草 */
export function CinemaSmall({ bounds, color }: ShapeProps) {
  const { x, y, w, h } = bounds;
  return (
    <g data-kind="cinema">
      <IsoBox x={x + w * 0.32} y={y + h * 0.4} w={w * 0.3} h={h * 0.35} depth={7} fill={paleOf(color)} />
      <Tuft x={x + 14} y={y + h - 16} />
      <Tuft x={x + w - 16} y={y + h - 18} />
      <Tuft x={x + w * 0.55} y={y + h - 12} />
    </g>
  );
}
