import { describe, expect, it } from 'vitest';
import urawa from '@/data/town/urawa.json';
import { parseTownConfig } from '@/lib/town/schema';
import {
  centroid,
  minRenderedPx,
  quadrantOf,
  readingOrder,
  rectsIntersect,
  toPercentBox,
} from '@/lib/town/geometry';

const town = parseTownConfig(urawa);
const SMALLEST_WIDTH_PX = 288; // 320px 端末で左右16pxずつ余白を取った幅
const MIN_TAP_PX = 48;

describe('geometry の基本動作', () => {
  it('rectsIntersect は辺が接するだけなら交差としない', () => {
    const a = { x: 0, y: 0, w: 10, h: 10 };
    expect(rectsIntersect(a, { x: 5, y: 5, w: 10, h: 10 })).toBe(true);
    expect(rectsIntersect(a, { x: 10, y: 0, w: 10, h: 10 })).toBe(false);
  });

  it('toPercentBox は viewBox に対する % を返す', () => {
    const box = toPercentBox({ x: 36, y: 56, w: 180, h: 280 }, { w: 360, h: 560 });
    expect(box).toEqual({ left: '10%', top: '10%', width: '50%', height: '50%' });
  });

  it('minRenderedPx は短い辺を描画倍率で換算する', () => {
    expect(minRenderedPx({ x: 0, y: 0, w: 90, h: 170 }, { w: 360, h: 560 }, 288)).toBeCloseTo(72);
  });
});

describe('urawa.json の当たり判定', () => {
  it.each(town.buildings.map((b) => [b.label, b]))(
    `「%s」は幅 ${SMALLEST_WIDTH_PX}px でも ${MIN_TAP_PX}px 以上`,
    (_label, b) => {
      const px = minRenderedPx(b.bounds, town.viewBox, SMALLEST_WIDTH_PX);
      console.log(`${b.id}: 最小辺 ${px.toFixed(1)}px`);
      expect(px).toBeGreaterThanOrEqual(MIN_TAP_PX);
    },
  );

  it('建物同士の当たり判定が重ならない', () => {
    const list = town.buildings;
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        expect(rectsIntersect(list[i].bounds, list[j].bounds), `${list[i].id} と ${list[j].id}`).toBe(false);
      }
    }
  });

  it('読み順（上段左→右、下段左→右）が配列順と同じ', () => {
    expect(readingOrder(town.buildings)).toEqual(town.buildings.map((b) => b.id));
  });

  it('すべての建物が viewBox の内側にある', () => {
    for (const { bounds: r, id } of town.buildings) {
      expect(r.x >= 0 && r.y >= 0, id).toBe(true);
      expect(r.x + r.w <= town.viewBox.w && r.y + r.h <= town.viewBox.h, id).toBe(true);
    }
  });
});

describe('p2 構図（中央駅と四周区画）', () => {
  it('駅の屋根がどの区画とも交差しない', () => {
    for (const b of town.buildings) {
      expect(rectsIntersect(town.station.roof, b.bounds), b.id).toBe(false);
    }
  });

  it('4区画の重心が駅中心の四象限に1つずつ', () => {
    const center = centroid(town.station.roof);
    const quads = town.buildings.map((b) => quadrantOf(centroid(b.bounds), center));
    expect(new Set(quads).size).toBe(4);
    expect(quads.sort()).toEqual(['ne', 'nw', 'se', 'sw']);
  });
});
