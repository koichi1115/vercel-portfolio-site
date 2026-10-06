import type { Diary } from '@/lib/content';
import { FloorCard } from '@/components/floor/FloorCard';
import styles from '@/components/floor/floor.module.css';

interface DiariesListProps {
  diaries: Diary[];
  headingFontClassName?: string;
}

export function DiariesList({ diaries, headingFontClassName = '' }: DiariesListProps) {
  if (diaries.length === 0) {
    return <p className={styles.muted}>日記がまだ投稿されていません。</p>;
  }

  return (
    <div className={styles.stack}>
      {diaries.map((diary) => (
        <FloorCard key={diary.slug} href={`/diaries/${diary.slug}`}>
          <div className={styles.meta}>
            <time className={styles.date} dateTime={diary.date}>
              {new Date(diary.date).toLocaleDateString('ja-JP')}
            </time>
            {diary.tags?.map((tag) => <span key={tag} className={styles.chip}>#{tag}</span>)}
          </div>
          <h2 className={`${styles.h2} ${styles.spaced} ${headingFontClassName}`}>{diary.title}</h2>
          <p className={styles.cardText}>{diary.excerpt}</p>
        </FloorCard>
      ))}
    </div>
  );
}
