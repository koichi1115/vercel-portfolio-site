import { describe, expect, it } from 'vitest';
import {
  EMPTY_DEVELOPMENT,
  deserialize,
  develop,
  merge,
  nextAction,
  serialize,
  stageOf,
} from '@/lib/town/development';

const KNOWN_IDS = ['arcade', 'home-park', 'cinema', 'livehouse'];

describe('stageOf', () => {
  it('developed に無い id は未発展', () => {
    expect(stageOf(EMPTY_DEVELOPMENT, 'arcade')).toBe('undeveloped');
  });

  it('知らない id でも例外にせず未発展を返す', () => {
    expect(stageOf({ developed: ['arcade'] }, 'no-such-lot')).toBe('undeveloped');
  });

  it('developed に入っている id は発展済み', () => {
    expect(stageOf({ developed: ['arcade'] }, 'arcade')).toBe('developed');
  });
});

describe('develop', () => {
  it('元の状態を書き換えず新しいオブジェクトを返す', () => {
    const before = EMPTY_DEVELOPMENT;
    const after = develop(before, 'arcade');
    expect(after).not.toBe(before);
    expect(before.developed).toEqual([]);
    expect(after.developed).toEqual(['arcade']);
  });

  it('同じ id を2回発展させても増えない（冪等）', () => {
    const once = develop(EMPTY_DEVELOPMENT, 'cinema');
    expect(develop(once, 'cinema')).toEqual(once);
  });

  it('発展させた順に並ぶ', () => {
    const state = ['cinema', 'arcade', 'livehouse'].reduce(develop, EMPTY_DEVELOPMENT);
    expect(state.developed).toEqual(['cinema', 'arcade', 'livehouse']);
  });
});

describe('merge', () => {
  it('両方の id を重複なく、左の順を先に保って結合する', () => {
    const a = { developed: ['cinema', 'arcade'] };
    const b = { developed: ['arcade', 'livehouse'] };
    expect(merge(a, b).developed).toEqual(['cinema', 'arcade', 'livehouse']);
  });

  it('空との結合は元の並びのまま', () => {
    const a = { developed: ['home-park'] };
    expect(merge(a, EMPTY_DEVELOPMENT)).toEqual(a);
    expect(merge(EMPTY_DEVELOPMENT, a)).toEqual(a);
  });
});

describe('serialize と deserialize', () => {
  it('往復しても同じ状態になる', () => {
    const state = { developed: ['arcade', 'cinema'] };
    expect(deserialize(serialize(state), KNOWN_IDS)).toEqual(state);
  });

  it('空の状態も往復する', () => {
    expect(deserialize(serialize(EMPTY_DEVELOPMENT), KNOWN_IDS)).toEqual(EMPTY_DEVELOPMENT);
  });

  it('保存が無い（null）なら空の状態', () => {
    expect(deserialize(null, KNOWN_IDS)).toEqual(EMPTY_DEVELOPMENT);
  });

  it('壊れた JSON は捨てて空の状態', () => {
    expect(deserialize('{壊れている', KNOWN_IDS)).toEqual(EMPTY_DEVELOPMENT);
  });

  it('配列以外の JSON は捨てて空の状態', () => {
    expect(deserialize('{"developed":["arcade"]}', KNOWN_IDS)).toEqual(EMPTY_DEVELOPMENT);
    expect(deserialize('"arcade"', KNOWN_IDS)).toEqual(EMPTY_DEVELOPMENT);
    expect(deserialize('42', KNOWN_IDS)).toEqual(EMPTY_DEVELOPMENT);
  });

  it('知らない id と文字列以外の要素を捨てる', () => {
    const raw = JSON.stringify(['arcade', 'no-such-lot', 7, null, { id: 'cinema' }]);
    expect(deserialize(raw, KNOWN_IDS)).toEqual({ developed: ['arcade'] });
  });

  it('重複した id を1つにまとめる', () => {
    expect(deserialize(JSON.stringify(['cinema', 'cinema']), KNOWN_IDS)).toEqual({
      developed: ['cinema'],
    });
  });

  it('既知 id が空なら何も復元しない', () => {
    expect(deserialize(JSON.stringify(['arcade']), [])).toEqual(EMPTY_DEVELOPMENT);
  });
});

describe('nextAction', () => {
  it('develop-then-enter は未発展なら発展、発展後は入る', () => {
    expect(nextAction('develop-then-enter', 'undeveloped')).toBe('develop');
    expect(nextAction('develop-then-enter', 'developed')).toBe('enter');
  });

  it('direct は発展状態にかかわらず常に入る', () => {
    expect(nextAction('direct', 'undeveloped')).toBe('enter');
    expect(nextAction('direct', 'developed')).toBe('enter');
  });
});
