import { describe, expect, it } from 'vitest';
import {
  centroid,
  diamondCell,
  lotPlate,
  quadrantOf,
} from '@/lib/town/geometry';

const TILE = { w: 60, h: 30 };

function parsePoints(points: string): { x: number; y: number }[] {
  return points
    .trim()
    .split(/\s+/)
    .map((pair) => {
      const [x, y] = pair.split(',').map(Number);
      return { x, y };
    });
}

describe('diamondCell', () => {
  it('菱形2枚の points を返し、すべて tile の範囲内', () => {
    const cells = diamondCell(TILE);
    expect(cells).toHaveLength(2);
    for (const points of cells) {
      for (const p of parsePoints(points)) {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThanOrEqual(TILE.w);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThanOrEqual(TILE.h);
      }
      expect(parsePoints(points)).toHaveLength(4);
    }
  });
});

describe('lotPlate', () => {
  it('台座の頂点が bounds の内側（または辺上）', () => {
    const bounds = { x: 20, y: 40, w: 160, h: 180 };
    const pts = parsePoints(lotPlate(bounds));
    expect(pts.length).toBeGreaterThanOrEqual(4);
    for (const p of pts) {
      expect(p.x).toBeGreaterThanOrEqual(bounds.x - 1);
      expect(p.x).toBeLessThanOrEqual(bounds.x + bounds.w + 1);
      expect(p.y).toBeGreaterThanOrEqual(bounds.y - 1);
      expect(p.y).toBeLessThanOrEqual(bounds.y + bounds.h + 1);
    }
  });
});

describe('centroid / quadrantOf', () => {
  it('矩形の重心は中央', () => {
    expect(centroid({ x: 0, y: 0, w: 10, h: 20 })).toEqual({ x: 5, y: 10 });
  });

  it('四象限を返す', () => {
    const c = { x: 0, y: 0 };
    expect(quadrantOf({ x: -1, y: -1 }, c)).toBe('nw');
    expect(quadrantOf({ x: 1, y: -1 }, c)).toBe('ne');
    expect(quadrantOf({ x: -1, y: 1 }, c)).toBe('sw');
    expect(quadrantOf({ x: 1, y: 1 }, c)).toBe('se');
  });
});
