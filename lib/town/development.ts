/**
 * 区画の発展状態（純粋関数のみ）。
 * 保存先も React も知らないので、ここだけでテストできる。
 */
import type { ClickMode, Stage } from './schema';

export type DevelopmentState = { developed: readonly string[] };

export const EMPTY_DEVELOPMENT: DevelopmentState = { developed: [] };

/** 発展済みの一覧に id があれば 'developed'。知らない id は 'undeveloped' */
export function stageOf(state: DevelopmentState, id: string): Stage {
  return state.developed.includes(id) ? 'developed' : 'undeveloped';
}

/** id を発展済みにした新しい状態。2回呼んでも増えない（冪等） */
export function develop(state: DevelopmentState, id: string): DevelopmentState {
  if (state.developed.includes(id)) return { developed: [...state.developed] };
  return { developed: [...state.developed, id] };
}

/** 左の並びを先に保ったまま重複なく結合する */
export function merge(a: DevelopmentState, b: DevelopmentState): DevelopmentState {
  const developed = [...a.developed];
  for (const id of b.developed) {
    if (!developed.includes(id)) developed.push(id);
  }
  return { developed };
}

/** 保存用の文字列（発展済み id の JSON 配列） */
export function serialize(state: DevelopmentState): string {
  return JSON.stringify(state.developed);
}

function parseIds(raw: string): unknown[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

/** 保存文字列から復元する。壊れた値・知らない id・重複は捨てる */
export function deserialize(raw: string | null, knownIds: readonly string[]): DevelopmentState {
  if (raw === null) return EMPTY_DEVELOPMENT;
  const developed: string[] = [];
  for (const id of parseIds(raw)) {
    if (typeof id !== 'string') continue;
    if (!knownIds.includes(id) || developed.includes(id)) continue;
    developed.push(id);
  }
  return { developed };
}

/** 押されたときに次にすること。direct は常に遷移、既定は未発展なら発展から */
export function nextAction(mode: ClickMode, stage: Stage): 'develop' | 'enter' {
  if (mode === 'direct') return 'enter';
  return stage === 'undeveloped' ? 'develop' : 'enter';
}
