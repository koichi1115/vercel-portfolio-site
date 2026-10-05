import type { SkillCategory } from '@/lib/content';
import { FloorCard } from '@/components/floor/FloorCard';
import { FloorSection } from '@/components/floor/FloorSection';
import styles from '@/components/floor/floor.module.css';

interface SkillsSectionProps {
  skills: SkillCategory[];
  headingFontClassName?: string;
}

export function SkillsSection({ skills, headingFontClassName = '' }: SkillsSectionProps) {
  if (skills.length === 0) return null;
  return (
    <FloorSection title="スキル" headingFontClassName={headingFontClassName}>
      <div className={styles.stack}>
        {skills.map((category) => (
          <FloorCard key={category.category}>
            <p className={styles.cardTitle}>{category.category}</p>
            <div className={styles.chips}>
              {category.skills.map((skill) => <span key={skill} className={styles.chip}>{skill}</span>)}
            </div>
          </FloorCard>
        ))}
      </div>
    </FloorSection>
  );
}
