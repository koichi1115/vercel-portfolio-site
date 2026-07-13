import { getReviewBySlug, getAllReviews } from '@/lib/content';
import { ReviewDetail } from '@/components/ReviewDetail';
import { Footer } from '@/components/Footer';
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

  if (!review) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bone dark:bg-abyss font-zen text-abyss dark:text-bone selection:bg-volt selection:text-volt-ink">
      <div className="grain-overlay" />
      <ReviewDetail review={review} />
      <Footer />
    </div>
  );
}
