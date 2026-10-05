import type { ReactNode } from 'react';
import styles from './floor.module.css';

type FloorSectionProps = {
  title: string;
  headingFontClassName?: string;
  children: ReactNode;
};

export function FloorSection({ title, headingFontClassName = '', children }: FloorSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionBand}>
        <h2 className={`${styles.h2} ${headingFontClassName}`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}
