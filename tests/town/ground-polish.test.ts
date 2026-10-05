import { describe, expect, it } from 'vitest';
import { diamondCell, tileGrassKey } from '@/lib/town/geometry';
import { readRepoFile } from './helpers/read-file';

describe('地面まわりの表記・命名（振る舞いは変えない）', () => {
  it('Ground.tsx のコメントに壊れた「パターン参照 参照」が残っていない', () => {
    const src = readRepoFile('components/town/shapes/Ground.tsx');
    expect(src).not.toContain('パターン参照 参照');
    expect(src).toMatch(/菱形を並べて敷く/);
  });

  it('diamondCell は菱形1枚だけを返し、未使用の第2形を持たない', () => {
    const points = diamondCell({ w: 60, h: 30 });
    expect(typeof points).toBe('string');
    const pairs = points.trim().split(/\s+/);
    expect(pairs).toHaveLength(4);
    // 4頂点が菱形（中点上がり）であること
    expect(pairs[0]).toBe('30,0');
    expect(pairs[1]).toBe('60,15');
    expect(pairs[2]).toBe('30,30');
    expect(pairs[3]).toBe('0,15');
  });

  it('市松の偶奇は名前どおり（偶数列行の和 → grassA）', () => {
    expect(tileGrassKey(0, 0)).toBe('grassA');
    expect(tileGrassKey(1, 0)).toBe('grassB');
    expect(tileGrassKey(0, 1)).toBe('grassB');
    expect(tileGrassKey(1, 1)).toBe('grassA');
  });

  it('Ground は odd という誤った変数名を使わない', () => {
    const src = readRepoFile('components/town/shapes/Ground.tsx');
    expect(src).not.toMatch(/\bodd\b/);
    expect(src).toMatch(/tileGrassKey/);
  });
});
