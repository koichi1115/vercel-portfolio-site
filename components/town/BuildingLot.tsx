'use client';

/**
 * 区画の当たり。未発展は button（発展）、発展後／direct は Link（入る）。
 */
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Building, TownSettings } from '@/lib/town/schema';
import type { Stage } from '@/lib/town/schema';
import { nextAction } from '@/lib/town/development';
import { toPercentBox } from '@/lib/town/geometry';
import type { ViewBox } from '@/lib/town/geometry';
import styles from './town.module.css';

type Props = {
  building: Building;
  stage: Stage;
  settings: TownSettings;
  viewBox: ViewBox;
  fresh: boolean;
  fontClass: string;
  onDevelop: (id: string) => void;
};

export function BuildingLot({ building, stage, settings, viewBox, fresh, fontClass, onDevelop }: Props) {
  const style = toPercentBox(building.bounds, viewBox) as CSSProperties;
  const action = nextAction(settings.clickMode, stage);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (fresh && action === 'enter') linkRef.current?.focus();
  }, [fresh, action]);

  if (action === 'develop') {
    return (
      <button
        type="button"
        aria-expanded="false"
        data-building={building.id}
        data-stage="undeveloped"
        className={styles.lot}
        style={style}
        onClick={() => onDevelop(building.id)}
      >
        <span className={`${styles.pill} ${fontClass}`}>{building.label}</span>
      </button>
    );
  }

  const showDetail = settings.clickMode !== 'direct';
  return (
    <Link
      ref={linkRef}
      href={building.href}
      data-building={building.id}
      data-stage={stage}
      className={styles.lot}
      style={style}
    >
      <span className={`${styles.pill} ${fontClass}`}>{building.label}</span>
      {showDetail ? <span className={styles.detail}>{building.detail}</span> : null}
      {showDetail ? <span className={styles.enter}>{settings.enterLabel}</span> : null}
    </Link>
  );
}
