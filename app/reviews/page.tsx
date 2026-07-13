import { getAllReviews } from '@/lib/content';
import { ReviewsList } from '@/components/ReviewsList';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reviews | Koichi — DX Strategist & Engineer',
  description: 'Reviews of music, movies, manga, and books',
};

export default async function ReviewsPage() {
  const reviews = await getAllReviews();

  return (
    <div className="min-h-screen bg-bone dark:bg-abyss font-zen text-abyss dark:text-bone selection:bg-volt selection:text-volt-ink">
      <div className="grain-overlay" />

      <PageHero
        overline="Culture Log"
        title="Reviews"
        description="音楽、映画、漫画、書籍のレビューコレクション。"
      />

      <ReviewsList reviews={reviews} />
      <Footer />
    </div>
  );
}
