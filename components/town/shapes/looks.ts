/**
 * look キー → 絵。建物の割当は JSON の look で差し替える。
 */
import type { ComponentType } from 'react';
import type { LookKey } from '@/lib/town/schema';
import type { ShapeProps } from './common';
import { Arcade } from './Arcade';
import { ArcadeSmall } from './ArcadeSmall';
import { Cinema } from './Cinema';
import { CinemaSmall } from './CinemaSmall';
import { HomePark } from './HomePark';
import { HomeParkSmall } from './HomeParkSmall';
import { Livehouse } from './Livehouse';
import { LivehouseSmall } from './LivehouseSmall';

export const LOOKS: Record<LookKey, ComponentType<ShapeProps>> = {
  arcade: Arcade,
  'arcade-small': ArcadeSmall,
  'home-park': HomePark,
  'home-park-small': HomeParkSmall,
  cinema: Cinema,
  'cinema-small': CinemaSmall,
  livehouse: Livehouse,
  'livehouse-small': LivehouseSmall,
};
