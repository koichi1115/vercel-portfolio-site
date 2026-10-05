/**
 * 街データ（data/town/*.json）の型と手書き検証。
 * 描画やリンク一覧はこの型だけに依存し、JSON の中身は parseTownConfig を通してから使う。
 */

export type Rect = { x: number; y: number; w: number; h: number };

export const BUILDING_KINDS = ['arcade', 'home-park', 'cinema', 'livehouse'] as const;
export type BuildingKind = (typeof BUILDING_KINDS)[number];

export const BUILDING_COLORS = ['arcade', 'homePark', 'cinema', 'livehouse'] as const;
export type BuildingColor = (typeof BUILDING_COLORS)[number];

/** 区画を押したときの進み方。JSON の settings.clickMode で差し替える */
export const CLICK_MODES = ['develop-then-enter', 'direct'] as const;
export type ClickMode = (typeof CLICK_MODES)[number];

/** 区画の発展段階は2つだけ */
export type Stage = 'undeveloped' | 'developed';

export const LOOK_KEYS = [
  'arcade',
  'arcade-small',
  'home-park',
  'home-park-small',
  'cinema',
  'cinema-small',
  'livehouse',
  'livehouse-small',
] as const;
export type LookKey = (typeof LOOK_KEYS)[number];

export type TownSettings = {
  clickMode: ClickMode;
  enterLabel: string;
  hint: string;
};

export type Building = {
  id: string;
  kind: BuildingKind;
  label: string;
  detail: string;
  href: string;
  color: BuildingColor;
  look: Record<Stage, LookKey>;
  bounds: Rect;
};

export type TownLink = { label: string; href: string };

export type TownConfig = {
  id: string;
  terrainNote: string;
  viewBox: { w: number; h: number };
  tile: { w: number; h: number };
  station: { roof: Rect; railY: number };
  settings: TownSettings;
  buildings: Building[];
  extraLinks: TownLink[];
};

export class TownConfigError extends Error {
  constructor(message: string) {
    super(`街データが不正です: ${message}`);
    this.name = 'TownConfigError';
  }
}

type Obj = Record<string, unknown>;

function asObject(value: unknown, where: string): Obj {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TownConfigError(`${where} はオブジェクトである必要があります`);
  }
  return value as Obj;
}

function asText(value: unknown, where: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TownConfigError(`${where} は空でない文字列である必要があります`);
  }
  return value;
}

function asNumber(value: unknown, where: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TownConfigError(`${where} は数値である必要があります`);
  }
  return value;
}

function asPositive(value: unknown, where: string): number {
  const n = asNumber(value, where);
  if (n <= 0) throw new TownConfigError(`${where} は 0 より大きい必要があります`);
  return n;
}

function asArray(value: unknown, where: string): unknown[] {
  if (!Array.isArray(value)) throw new TownConfigError(`${where} は配列である必要があります`);
  return value;
}

function asOneOf<T extends string>(value: unknown, allowed: readonly T[], where: string): T {
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    throw new TownConfigError(`${where} は ${allowed.join(' / ')} のいずれかである必要があります`);
  }
  return value as T;
}

function asInternalHref(value: unknown, where: string): string {
  const href = asText(value, where);
  if (!href.startsWith('/') || href.startsWith('//')) {
    throw new TownConfigError(`${where} はサイト内パス（/ 始まり）である必要があります`);
  }
  return href;
}

/** 1行・短文。改行と長すぎを拒む（詳細カード用） */
function asShortText(value: unknown, where: string, max = 40): string {
  const text = asText(value, where);
  if (text.includes('\n') || text.includes('\r')) {
    throw new TownConfigError(`${where} に改行は使えません`);
  }
  if (text.length > max) {
    throw new TownConfigError(`${where} は ${max} 文字以内である必要があります`);
  }
  return text;
}

function parseRect(value: unknown, where: string): Rect {
  const o = asObject(value, where);
  return {
    x: asNumber(o.x, `${where}.x`),
    y: asNumber(o.y, `${where}.y`),
    w: asPositive(o.w, `${where}.w`),
    h: asPositive(o.h, `${where}.h`),
  };
}

function parseLink(value: unknown, where: string): TownLink {
  const o = asObject(value, where);
  return { label: asText(o.label, `${where}.label`), href: asInternalHref(o.href, `${where}.href`) };
}

function parseLook(value: unknown, where: string): Record<Stage, LookKey> {
  const o = asObject(value, where);
  return {
    undeveloped: asOneOf(o.undeveloped, LOOK_KEYS, `${where}.undeveloped`),
    developed: asOneOf(o.developed, LOOK_KEYS, `${where}.developed`),
  };
}

function parseBuilding(value: unknown, where: string): Building {
  const o = asObject(value, where);
  return {
    id: asText(o.id, `${where}.id`),
    kind: asOneOf(o.kind, BUILDING_KINDS, `${where}.kind`),
    label: asText(o.label, `${where}.label`),
    detail: asShortText(o.detail, `${where}.detail`),
    href: asInternalHref(o.href, `${where}.href`),
    color: asOneOf(o.color, BUILDING_COLORS, `${where}.color`),
    look: parseLook(o.look, `${where}.look`),
    bounds: parseRect(o.bounds, `${where}.bounds`),
  };
}

function assertUniqueIds(buildings: Building[]): void {
  const seen = new Set<string>();
  for (const b of buildings) {
    if (seen.has(b.id)) throw new TownConfigError(`建物 id "${b.id}" が重複しています`);
    seen.add(b.id);
  }
}

function parseStation(value: unknown): TownConfig['station'] {
  const o = asObject(value, 'station');
  return { roof: parseRect(o.roof, 'station.roof'), railY: asNumber(o.railY, 'station.railY') };
}

function parseSettings(value: unknown): TownSettings {
  const o = asObject(value, 'settings');
  return {
    clickMode: asOneOf(o.clickMode, CLICK_MODES, 'settings.clickMode'),
    enterLabel: asText(o.enterLabel, 'settings.enterLabel'),
    hint: asText(o.hint, 'settings.hint'),
  };
}

function parseTile(value: unknown): { w: number; h: number } {
  const o = asObject(value, 'tile');
  return { w: asPositive(o.w, 'tile.w'), h: asPositive(o.h, 'tile.h') };
}

export function parseTownConfig(input: unknown): TownConfig {
  const o = asObject(input, 'ルート');
  const view = asObject(o.viewBox, 'viewBox');
  const buildings = asArray(o.buildings, 'buildings').map((b, i) =>
    parseBuilding(b, `buildings[${i}]`),
  );
  assertUniqueIds(buildings);
  return {
    id: asText(o.id, 'id'),
    terrainNote: asText(o.terrainNote, 'terrainNote'),
    viewBox: { w: asPositive(view.w, 'viewBox.w'), h: asPositive(view.h, 'viewBox.h') },
    tile: parseTile(o.tile),
    station: parseStation(o.station),
    settings: parseSettings(o.settings),
    buildings,
    extraLinks: asArray(o.extraLinks, 'extraLinks').map((l, i) => parseLink(l, `extraLinks[${i}]`)),
  };
}
