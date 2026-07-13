"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { Review } from '@/lib/content';
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
    return (
      <div className="px-5 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-mono text-sm tracking-widest text-abyss-400 dark:text-bone-400">
            レビューがまだ登録されていません。
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Category filter */}
        <div className="mb-12 flex flex-wrap gap-2">
          {FILTERS.map((key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`relative rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 ${
                  active
                    ? 'text-volt-ink'
                    : 'border hairline text-abyss-500 dark:text-bone-400 hover:text-abyss dark:hover:text-bone'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="review-filter-pill"
                    className="absolute inset-0 rounded-full bg-volt"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {key === 'all' ? 'All' : categoryLabels[key]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reviews Grid */}
        <motion.div layout className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((review) => (
              <motion.div
                key={review.slug}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/reviews/${review.slug}`}
                  className="panel panel-hover group block h-full overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <ThumbnailImage
                      src={review.thumbnail}
                      alt={review.title}
                      fallbackText={review.title}
                      aspectRatio="portrait"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-abyss/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-bone backdrop-blur-sm">
                      {categoryLabels[review.category] || review.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="mb-2 line-clamp-2 font-syne text-base font-bold tracking-tight transition-colors duration-300 group-hover:text-volt-600 dark:group-hover:text-volt">
                      {review.title}
                    </h3>

                    <p className="mb-3 font-mono text-xs tracking-[0.15em] text-volt-700 dark:text-volt">
                      {'★'.repeat(Math.round(review.rating))}
                      <span className="text-abyss-300 dark:text-bone-400/30">
                        {'★'.repeat(Math.max(0, 5 - Math.round(review.rating)))}
                      </span>
                      <span className="ml-2 text-abyss-400 dark:text-bone-400">
                        {review.rating}/5
                      </span>
                    </p>

                    <p className="line-clamp-2 text-xs leading-relaxed text-abyss-500 dark:text-bone-400">
                      {review.excerpt}
                    </p>

                    {(review.author || review.releaseYear) && (
                      <p className="mt-3 font-mono text-[10px] tracking-widest text-abyss-400 dark:text-bone-400">
                        {review.author}
                        {review.author && review.releaseYear && ' • '}
                        {review.releaseYear}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
