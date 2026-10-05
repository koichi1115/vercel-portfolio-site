import type { CSSProperties } from 'react';
import townData from '@/data/town/urawa.json';
import { TOWN_PALETTE } from './palette';
import { parseTownConfig, type BuildingColor, type TownConfig } from './schema';

export type FloorInfo =
  | {
      kind: 'district';
      id: string;
      label: string;
      href: string;
      color: BuildingColor;
    }
  | {
      kind: 'extra';
      label: string;
      href: string;
    };

function firstSegment(pathname: string): string {
  return pathname.split('/').filter(Boolean)[0] ?? '';
}

export function resolveFloor(config: TownConfig, pathname: string): FloorInfo | null {
  const segment = firstSegment(pathname);
  const building = config.buildings.find((item) => firstSegment(item.href) === segment);
  if (building && segment) {
    const { id, label, href, color } = building;
    return { kind: 'district', id, label, href, color };
  }
  const extra = config.extraLinks.find((item) => firstSegment(item.href) === segment);
  return extra && segment ? { kind: 'extra', ...extra } : null;
}

type FloorColors = Record<keyof typeof TOWN_PALETTE.floor, string>;

function themeVars(prefix: '' | '-dark', colors: FloorColors) {
  return {
    [`--floor-ground${prefix}`]: colors.ground,
    [`--floor-card${prefix}`]: colors.card,
    [`--floor-border${prefix}`]: colors.border,
    [`--floor-text${prefix}`]: colors.text,
    [`--floor-muted${prefix}`]: colors.muted,
    [`--floor-line${prefix}`]: colors.line,
    [`--floor-danger${prefix}`]: colors.danger,
  };
}

export function floorVars(info: FloorInfo | null): CSSProperties {
  const district =
    info?.kind === 'district' ? TOWN_PALETTE.district[info.color] : TOWN_PALETTE.floor.muted;
  return {
    ...themeVars('', TOWN_PALETTE.floor),
    ...themeVars('-dark', TOWN_PALETTE.floorDark),
    '--floor-district': district,
  } as CSSProperties;
}

export function loadTownConfig(): TownConfig {
  return parseTownConfig(townData);
}
