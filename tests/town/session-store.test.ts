import { describe, expect, it } from 'vitest';
import { EMPTY_DEVELOPMENT, develop } from '@/lib/town/development';
import {
  DEVELOPMENT_KEY,
  browserSessionStore,
  loadDevelopment,
  memoryStore,
  safeStore,
  saveDevelopment,
} from '@/lib/town/sessionStore';

const KNOWN_IDS = ['arcade', 'home-park', 'cinema', 'livehouse'];

/** Map を裏に持つ偽 Storage（getItem / setItem だけ） */
function fakeStorage(backing = new Map<string, string>()) {
  return {
    backing,
    getItem: (key: string) => backing.get(key) ?? null,
    setItem: (key: string, value: string) => void backing.set(key, value),
  };
}

/** getItem / setItem が必ず throw する偽 Storage（プライベートモード想定） */
function throwingStorage() {
  return {
    getItem: (): string | null => {
      throw new Error('storage は使えません');
    },
    setItem: (): void => {
      throw new Error('storage は使えません');
    },
  };
}

describe('memoryStore', () => {
  it('入れた値が取り出せて、無いキーは null', () => {
    const store = memoryStore();
    store.set('k', 'v');
    expect(store.get('k')).toBe('v');
    expect(store.get('other')).toBeNull();
  });
});

describe('safeStore', () => {
  it('使える Storage では Storage 側に書いて読み出す', () => {
    const storage = fakeStorage();
    const store = safeStore(storage);
    store.set('k', 'v');
    expect(storage.backing.get('k')).toBe('v');
    expect(store.get('k')).toBe('v');
  });

  it('throw する Storage でも例外を出さずメモリ退避で往復する', () => {
    const store = safeStore(throwingStorage());
    expect(() => store.set('k', 'v')).not.toThrow();
    expect(store.get('k')).toBe('v');
  });

  it('Storage が null / undefined でもメモリ退避で動く', () => {
    for (const storage of [null, undefined]) {
      const store = safeStore(storage);
      store.set('k', 'v');
      expect(store.get('k')).toBe('v');
      expect(store.get('none')).toBeNull();
    }
  });
});

describe('browserSessionStore', () => {
  it('sessionStorage が無い node でもメモリ相当として動く', () => {
    expect('sessionStorage' in globalThis).toBe(false);
    const store = browserSessionStore();
    store.set('k', 'v');
    expect(store.get('k')).toBe('v');
    expect(store.get('none')).toBeNull();
  });
});

describe('loadDevelopment と saveDevelopment', () => {
  it('保存して読み直すと同じ状態になる', () => {
    const store = safeStore(fakeStorage());
    const state = develop(develop(EMPTY_DEVELOPMENT, 'arcade'), 'cinema');
    saveDevelopment(store, state);
    expect(loadDevelopment(store, KNOWN_IDS)).toEqual(state);
  });

  it('保存が無ければ空の状態', () => {
    expect(loadDevelopment(memoryStore(), KNOWN_IDS)).toEqual(EMPTY_DEVELOPMENT);
  });

  it('決まったキー1つだけを使う', () => {
    const storage = fakeStorage();
    saveDevelopment(safeStore(storage), develop(EMPTY_DEVELOPMENT, 'arcade'));
    expect([...storage.backing.keys()]).toEqual([DEVELOPMENT_KEY]);
  });

  it('壊れた保存値は捨てて空の状態（例外を出さない）', () => {
    const storage = fakeStorage(new Map([[DEVELOPMENT_KEY, '{壊れている']]));
    expect(loadDevelopment(safeStore(storage), KNOWN_IDS)).toEqual(EMPTY_DEVELOPMENT);
  });

  it('throw する Storage でも例外なしで保存と復元ができる', () => {
    const store = safeStore(throwingStorage());
    expect(loadDevelopment(store, KNOWN_IDS)).toEqual(EMPTY_DEVELOPMENT);
    const state = develop(EMPTY_DEVELOPMENT, 'livehouse');
    expect(() => saveDevelopment(store, state)).not.toThrow();
    expect(loadDevelopment(store, KNOWN_IDS)).toEqual(state);
  });
});
