import { getReviewBySlug, getAllReviews } from '@/lib/content';
import { ReviewDetail } from '@/components/ReviewDetail';
import { Floor } from '@/components/floor/Floor';
import { Footer } from '@/components/Footer';
import { signFont } from '@/components/town/font';
import { loadTownConfig, resolveFloor } from '@/lib/town/floors';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface ReviewPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const reviews = await getAllReviews();
  return reviews.map((review) => ({
    slug: review.slug,
  }));
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);

  if (!review) {
    return {
      title: 'Review Not Found | Portfolio',
    };
  }

  return {
    title: `${review.title} | Reviews | Portfolio`,
    description: review.excerpt,
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  const floor = resolveFloor(loadTownConfig(), '/reviews');

  if (!review || !floor) {
    notFound();
  }

  return (
    <>
      <Floor
        floor={floor}
        title={review.title}
        lead={review.excerpt}
        headingFontClassName={signFont.className}
      >
        <ReviewDetail review={review} />
      </Floor>
      <Footer />
    </>
  );
}
