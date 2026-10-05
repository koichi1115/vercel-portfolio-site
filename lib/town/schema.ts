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

export type Building = {
  id: string;
  kind: BuildingKind;
  label: string;
  href: string;
  color: BuildingColor;
  bounds: Rect;
};

export type TownLink = { label: string; href: string };

export type TownConfig = {
  id: string;
  terrainNote: string;
  viewBox: { w: number; h: number };
  station: { roof: Rect; railY: number };
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

function parseBuilding(value: unknown, where: string): Building {
  const o = asObject(value, where);
  return {
    id: asText(o.id, `${where}.id`),
    kind: asOneOf(o.kind, BUILDING_KINDS, `${where}.kind`),
    label: asText(o.label, `${where}.label`),
    href: asInternalHref(o.href, `${where}.href`),
    color: asOneOf(o.color, BUILDING_COLORS, `${where}.color`),
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
    station: parseStation(o.station),
    buildings,
    extraLinks: asArray(o.extraLinks, 'extraLinks').map((l, i) => parseLink(l, `extraLinks[${i}]`)),
  };
}
