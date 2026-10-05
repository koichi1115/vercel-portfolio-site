import type { ReactNode } from 'react';
import type { FloorInfo } from '@/lib/town/floors';
import { floorVars } from '@/lib/town/floors';
import { BackToTown } from './BackToTown';
import { FloorHeader } from './FloorHeader';
import styles from './floor.module.css';

type FloorProps = {
  floor: FloorInfo | null;
  title: string;
  lead?: string;
  headingFontClassName?: string;
  children: ReactNode;
};

export function Floor({ floor, title, lead, headingFontClassName, children }: FloorProps) {
  const district = floor?.kind === 'district' ? floor.id : 'none';
  return (
    <div className={styles.floor} data-district={district} style={floorVars(floor)}>
      <div className={styles.grid} data-floor-grid aria-hidden="true" />
      <div className={styles.inner}>
        <BackToTown />
        <FloorHeader
          floor={floor}
          title={title}
          lead={lead}
          headingFontClassName={headingFontClassName}
        />
        {children}
      </div>
    </div>
  );
}
