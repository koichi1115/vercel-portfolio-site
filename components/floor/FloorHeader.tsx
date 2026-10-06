import Link from 'next/link';
import type { FloorInfo } from '@/lib/town/floors';
import styles from './floor.module.css';

type FloorHeaderProps = {
  floor: FloorInfo | null;
  title: string;
  lead?: string;
  headingFontClassName?: string;
};

export function FloorHeader({
  floor,
  title,
  lead,
  headingFontClassName = '',
}: FloorHeaderProps) {
  const isDetail = Boolean(floor && title !== floor.label);
  return (
    <header className={styles.header}>
      <div className={styles.headerBand}>
        {isDetail && floor ? (
          <Link href={floor.href} className={styles.districtLink}>
            {floor.label}
          </Link>
        ) : (
          <h1 className={`${styles.h1} ${headingFontClassName}`}>{title}</h1>
        )}
      </div>
      {isDetail && <h1 className={`${styles.h1} ${styles.detailTitle} ${headingFontClassName}`}>{title}</h1>}
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
