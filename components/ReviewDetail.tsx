import type { Review } from '@/lib/content';
import { FloorCard } from '@/components/floor/FloorCard';
import styles from '@/components/floor/floor.module.css';
import { ThumbnailImage } from './ThumbnailImage';

interface ReviewDetailProps {
  review: Review;
}

const categoryLabels: Record<string, string> = {
  music: '音楽',
  movie: '映画',
  manga: '漫画',
  book: '書籍',
};

export function ReviewDetail({ review }: ReviewDetailProps) {
  return (
    <article className={styles.stack}>
      <div className={styles.imageFrame}>
        <ThumbnailImage src={review.thumbnail} alt={review.title}
          fallbackText={review.title} aspectRatio="portrait" />
      </div>
      <FloorCard>
        <div className={styles.chips}>
          <span className={styles.chip}>{categoryLabels[review.category] || review.category}</span>
          <span className={styles.chip}>{review.rating}/5</span>
        </div>
        {(review.author || review.releaseYear) && (
          <p>{review.author}{review.author && review.releaseYear && ' • '}{review.releaseYear}</p>
        )}
        <time className={styles.date} dateTime={review.publishedAt}>
          レビュー日: {new Date(review.publishedAt).toLocaleDateString('ja-JP')}
        </time>
      </FloorCard>
      <FloorCard className={`prose ${styles.prose}`}>
        <div dangerouslySetInnerHTML={{ __html: review.content }} />
      </FloorCard>
      <FloorCard href="/reviews">← レビュー一覧に戻る</FloorCard>
    </article>
  );
}
