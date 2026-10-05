import type { Career } from '@/lib/content';
import { FloorCard } from '@/components/floor/FloorCard';
import { FloorSection } from '@/components/floor/FloorSection';
import styles from '@/components/floor/floor.module.css';

interface CareerTimelineProps {
  careers: Career[];
  headingFontClassName?: string;
}

export function CareerTimeline({ careers, headingFontClassName = '' }: CareerTimelineProps) {
  if (careers.length === 0) return null;
  return (
    <FloorSection title="経歴" headingFontClassName={headingFontClassName}>
      <div className={styles.stack}>
        {careers.map((career) => (
          <FloorCard key={`${career.company}-${career.period}`}>
            <div className={styles.chips}>
              <span className={styles.chip}>{career.period}</span>
              {career.current && <span className={styles.chip}>現職</span>}
            </div>
            <p className={`${styles.cardTitle} ${styles.spaced}`}>{career.company}</p>
            <p className={styles.cardText}>{career.position}</p>
            <p>{career.description}</p>
            {career.achievements.length > 0 && (
              <>
                <h3 className={`${styles.h3} ${styles.spaced}`}>主な成果</h3>
                <ul className={styles.list}>
                  {career.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
                </ul>
              </>
            )}
          </FloorCard>
        ))}
      </div>
    </FloorSection>
  );
}
