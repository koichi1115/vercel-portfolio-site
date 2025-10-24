import Link from 'next/link';
import type { Review } from '@/lib/content';

interface ReviewDetailProps {
  review: Review;
}

const categoryLabels: Record<string, string> = {
  music: '音楽',
  movie: '映画',
  manga: '漫画',
  book: '書籍',
};

const categoryColors: Record<string, string> = {
  music: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  movie: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  manga: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  book: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
};

export function ReviewDetail({ review }: ReviewDetailProps) {
  return (
    <article>
      {/* Hero Section */}
      <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/reviews" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Reviews
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 dark:text-white font-medium">{review.title}</li>
            </ol>
          </nav>

          {/* Thumbnail Placeholder */}
          <div className="aspect-[3/4] max-w-md mx-auto bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center mb-8 shadow-xl">
            <div className="text-white text-6xl font-bold opacity-50">
              {review.title.charAt(0)}
            </div>
          </div>

          {/* Title and Meta */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                  categoryColors[review.category] || categoryColors.book
                }`}
              >
                {categoryLabels[review.category] || review.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {review.title}
            </h1>

            {/* Author & Year */}
            {(review.author || review.releaseYear) && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {review.author && <span>{review.author}</span>}
                {review.author && review.releaseYear && <span> • </span>}
                {review.releaseYear && <span>{review.releaseYear}</span>}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {review.rating}/5
              </span>
            </div>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 dark:text-gray-400 italic max-w-2xl mx-auto">
              &ldquo;{review.excerpt}&rdquo;
            </p>

            {/* Published Date */}
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
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
      <div className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-900 dark:prose-code:text-white prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800"
            dangerouslySetInnerHTML={{ __html: review.content }}
          />
        </div>
      </div>

      {/* Back Link */}
      <div className="py-8 px-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            レビュー一覧に戻る
          </Link>
        </div>
      </div>
    </article>
  );
}
