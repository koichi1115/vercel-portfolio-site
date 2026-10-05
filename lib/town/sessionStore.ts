/**
 * 発展状態の保存アダプタ。sessionStorage を触るのはこのファイルだけ。
 * プライベートモードや容量超過で例外が出る環境ではメモリ退避に切り替え、
 * 「保存できないだけで壊れない」状態にする。
 */
import {
  EMPTY_DEVELOPMENT,
  deserialize,
  serialize,
  type DevelopmentState,
} from './development';

export type KeyValueStore = {
  get(key: string): string | null;
  set(key: string, value: string): void;
};

/** sessionStorage の代わりになるメモリ上の保存先（タブを離れると消える） */
export function memoryStore(): KeyValueStore {
  const map = new Map<string, string>();
  return {
    get: (key) => map.get(key) ?? null,
    set: (key, value) => void map.set(key, value),
  };
}

type MinimalStorage = Pick<Storage, 'getItem' | 'setItem'>;

/** getItem / setItem が throw しても例外を外に出さず、以降はメモリ退避で動く */
export function safeStore(storage: MinimalStorage | null | undefined): KeyValueStore {
  const fallback = memoryStore();
  let usable = storage != null;
  return {
    get(key) {
      if (usable) {
        try {
          return storage!.getItem(key);
        } catch {
          usable = false;
        }
      }
      return fallback.get(key);
    },
    set(key, value) {
      fallback.set(key, value);
      if (!usable) return;
      try {
        storage!.setItem(key, value);
      } catch {
        usable = false;
      }
    },
  };
}

/** ブラウザの sessionStorage。取得そのものが throw する環境ではメモリ退避 */
export function browserSessionStore(): KeyValueStore {
  try {
    const storage = (globalThis as { sessionStorage?: MinimalStorage }).sessionStorage;
    return safeStore(storage ?? null);
  } catch {
    return memoryStore();
  }
}

export const DEVELOPMENT_KEY = 'town:development:v1';

/** 保存から発展状態を読む。壊れた値や知らない id は development 側で捨てられる */
export function loadDevelopment(
  store: KeyValueStore,
  knownIds: readonly string[],
): DevelopmentState {
  const raw = store.get(DEVELOPMENT_KEY);
  return raw === null ? EMPTY_DEVELOPMENT : deserialize(raw, knownIds);
}

export function saveDevelopment(store: KeyValueStore, state: DevelopmentState): void {
  store.set(DEVELOPMENT_KEY, serialize(state));
}
