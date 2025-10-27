import Link from 'next/link';
import { getAllReviews } from '@/lib/content';
import { ThumbnailImage } from './ThumbnailImage';

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

export async function RecentReviews() {
  const allReviews = await getAllReviews();
  const recentReviews = allReviews.slice(0, 6);

  if (recentReviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              最新レビュー
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              最近読んだ本、観た映画などのレビューです
            </p>
          </div>
          <Link
            href="/reviews"
            className="hidden sm:block text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            すべて見る →
          </Link>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recentReviews.map((review) => (
            <Link
              key={review.slug}
              href={`/reviews/${review.slug}`}
              className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <ThumbnailImage
                src={review.thumbnail}
                alt={review.title}
                fallbackText={review.title}
                aspectRatio="portrait"
              />

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
                    categoryColors[review.category] || categoryColors.book
                  }`}
                >
                  {categoryLabels[review.category] || review.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {review.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {review.rating}/5
                  </span>
                </div>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {review.excerpt}
                </p>

                {/* Author & Year */}
                {(review.author || review.releaseYear) && (
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                    {review.author && <span>{review.author}</span>}
                    {review.author && review.releaseYear && <span> • </span>}
                    {review.releaseYear && <span>{review.releaseYear}</span>}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "View All" Button */}
        <div className="sm:hidden text-center">
          <Link
            href="/reviews"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            すべてのレビューを見る
          </Link>
        </div>
      </div>
    </section>
  );
}
