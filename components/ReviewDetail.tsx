import Link from 'next/link';
import type { Review } from '@/lib/content';
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

const PROSE_CLASS =
  'prose prose-lg max-w-none dark:prose-invert prose-headings:font-syne prose-headings:tracking-tight prose-p:leading-loose prose-p:text-abyss-500 dark:prose-p:text-bone-300 prose-a:text-volt-600 dark:prose-a:text-volt prose-a:no-underline hover:prose-a:underline prose-strong:text-abyss dark:prose-strong:text-bone prose-code:text-abyss dark:prose-code:text-bone prose-pre:bg-abyss-800 prose-pre:text-bone [&_pre_code]:!text-bone prose-li:text-abyss-500 dark:prose-li:text-bone-300 prose-blockquote:border-volt';

export function ReviewDetail({ review }: ReviewDetailProps) {
  return (
    <article>
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b hairline px-5 py-16 sm:px-8">
        <div className="aurora-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-10">
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-abyss-400 dark:text-bone-400">
              <li>
                <Link href="/" className="transition-colors hover:text-volt-600 dark:hover:text-volt">
                  Home
                </Link>
              </li>
              <li className="text-volt-600 dark:text-volt">/</li>
              <li>
                <Link href="/reviews" className="transition-colors hover:text-volt-600 dark:hover:text-volt">
                  Reviews
                </Link>
              </li>
              <li className="text-volt-600 dark:text-volt">/</li>
              <li className="line-clamp-1 text-abyss dark:text-bone">{review.title}</li>
            </ol>
          </nav>

          {/* Thumbnail */}
          <div className="relative mx-auto mb-10 max-w-md">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-volt/40 via-transparent to-ion/40 blur-lg" />
            <div className="relative overflow-hidden rounded-2xl border hairline">
              <ThumbnailImage
                src={review.thumbnail}
                alt={review.title}
                fallbackText={review.title}
                aspectRatio="portrait"
              />
            </div>
          </div>

          {/* Title and Meta */}
          <div className="mb-8 text-center">
            <div className="mb-5 flex items-center justify-center">
              <span className="rounded-full bg-volt px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-volt-ink">
                {categoryLabels[review.category] || review.category}
              </span>
            </div>

            <h1 className="mb-4 font-syne text-4xl font-extrabold tracking-tight text-abyss dark:text-bone md:text-5xl">
              {review.title}
            </h1>

            {(review.author || review.releaseYear) && (
              <p className="mb-4 font-mono text-sm tracking-widest text-abyss-400 dark:text-bone-400">
                {review.author && <span>{review.author}</span>}
                {review.author && review.releaseYear && <span> • </span>}
                {review.releaseYear && <span>{review.releaseYear}</span>}
              </p>
            )}

            {/* Rating */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="font-mono text-2xl tracking-[0.2em] text-volt-600 dark:text-volt">
                {'★'.repeat(Math.round(review.rating))}
                <span className="text-abyss-300 dark:text-bone-400/30">
                  {'★'.repeat(Math.max(0, 5 - Math.round(review.rating)))}
                </span>
              </span>
              <span className="font-syne text-2xl font-bold text-abyss dark:text-bone">
                {review.rating}/5
              </span>
            </div>

            <p className="mx-auto max-w-2xl text-lg italic leading-loose text-abyss-500 dark:text-bone-300">
              &ldquo;{review.excerpt}&rdquo;
            </p>

            <p className="mt-5 font-mono text-xs tracking-widest text-abyss-400 dark:text-bone-400">
              レビュー日: {new Date(review.publishedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className={PROSE_CLASS} dangerouslySetInnerHTML={{ __html: review.content }} />
        </div>
      </div>

      {/* Back Link */}
      <div className="border-t hairline px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-volt-700 dark:text-volt hover:underline underline-offset-4"
          >
            ← レビュー一覧に戻る
          </Link>
        </div>
      </div>
    </article>
  );
}
