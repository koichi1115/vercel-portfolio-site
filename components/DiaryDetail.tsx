import type { Diary } from '@/lib/content';
import { FloorCard } from '@/components/floor/FloorCard';
import styles from '@/components/floor/floor.module.css';

interface DiaryDetailProps {
  diary: Diary;
}

export function DiaryDetail({ diary }: DiaryDetailProps) {
  return (
    <article className={styles.stack}>
      <div className={styles.meta}>
        <time className={styles.date} dateTime={diary.date}>
          {new Date(diary.date).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </time>
        {diary.tags?.map((tag) => <span key={tag} className={styles.chip}>#{tag}</span>)}
      </div>
      <FloorCard className={`prose ${styles.prose}`}>
        <div dangerouslySetInnerHTML={{ __html: diary.content }} />
      </FloorCard>
      <FloorCard href="/diaries">← 日記一覧に戻る</FloorCard>
    </article>
  );
}
