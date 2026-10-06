import { getAllReviews } from '@/lib/content';
import { ReviewsList } from '@/components/ReviewsList';
import { Floor } from '@/components/floor/Floor';
import { Footer } from '@/components/Footer';
import { signFont } from '@/components/town/font';
import { loadTownConfig, resolveFloor } from '@/lib/town/floors';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reviews | Sai — DX Strategist & Engineer',
  description: 'Reviews of music, movies, manga, and books',
};

export default async function ReviewsPage() {
  const reviews = await getAllReviews();
  const floor = resolveFloor(loadTownConfig(), '/reviews');
  if (!floor) return null;

  return (
    <>
      <Floor
        floor={floor}
        title={floor.label}
        lead="音楽、映画、漫画、書籍のレビューコレクション。"
        headingFontClassName={signFont.className}
      >
        <ReviewsList reviews={reviews} />
      </Floor>
      <Footer />
    </>
  );
}
