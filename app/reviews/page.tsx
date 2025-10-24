import { getAllReviews } from '@/lib/content';
import { ReviewsList } from '@/components/ReviewsList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reviews | Portfolio',
  description: 'Reviews of music, movies, manga, and books',
};

export default async function ReviewsPage() {
  const reviews = await getAllReviews();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              レビュー
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              音楽、映画、漫画、書籍のレビューコレクション
            </p>
          </div>
        </div>
      </div>

      <ReviewsList reviews={reviews} />
    </div>
  );
}
