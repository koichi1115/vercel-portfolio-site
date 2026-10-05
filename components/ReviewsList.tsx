"use client";

import { useMemo, useState } from 'react';
import type { Review } from '@/lib/content';
import { FloorCard } from '@/components/floor/FloorCard';
import styles from '@/components/floor/floor.module.css';
import { ThumbnailImage } from './ThumbnailImage';

interface ReviewsListProps {
  reviews: Review[];
}

const categoryLabels: Record<string, string> = {
  music: '音楽',
  movie: '映画',
  manga: '漫画',
  book: '書籍',
};

const FILTERS = ['all', 'music', 'movie', 'manga', 'book'] as const;

export function ReviewsList({ reviews }: ReviewsListProps) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? reviews : reviews.filter((r) => r.category === filter)),
    [reviews, filter]
  );

  if (reviews.length === 0) {
    return <p className={styles.muted}>レビューがまだ登録されていません。</p>;
  }

  return (
    <section className={styles.stack}>
      <div className={styles.chips}>
        {FILTERS.map((key) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`${styles.filterButton} ${styles.tap} ${filter === key ? styles.filterActive : ''}`}>
            {key === 'all' ? 'すべて' : categoryLabels[key]}
          </button>
        ))}
      </div>
      <div className={styles.stack}>
        {filtered.map((review) => (
          <FloorCard key={review.slug} href={`/reviews/${review.slug}`}>
            <div className={styles.imageFrame}>
              <ThumbnailImage src={review.thumbnail} alt={review.title}
                fallbackText={review.title} aspectRatio="portrait" />
            </div>
            <div className={`${styles.chips} ${styles.spaced}`}>
              <span className={styles.chip}>{categoryLabels[review.category] || review.category}</span>
              <span className={styles.chip}>{review.rating}/5</span>
            </div>
            <p className={`${styles.cardTitle} ${styles.spaced}`}>{review.title}</p>
            <p className={styles.cardText}>{review.excerpt}</p>
          </FloorCard>
        ))}
      </div>
    </section>
  );
}
