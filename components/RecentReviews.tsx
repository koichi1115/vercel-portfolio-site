import Link from 'next/link';
import { getAllReviews } from '@/lib/content';
import { ThumbnailImage } from './ThumbnailImage';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Container } from '@/components/ui/Container';

const categoryLabels: Record<string, string> = {
  music: '音楽',
  movie: '映画',
  manga: '漫画',
  book: '書籍',
};

const categoryVariants: Record<string, 'primary' | 'success' | 'error' | 'warning'> = {
  music: 'primary',
  movie: 'error',
  manga: 'success',
  book: 'warning',
};

export async function RecentReviews() {
  const allReviews = await getAllReviews();
  const recentReviews = allReviews.slice(0, 6);

  if (recentReviews.length === 0) {
    return null;
  }

  return (
    <section className="section-spacing bg-neutral-0/30 dark:bg-dark-neutral-900/30 backdrop-blur-sm">
      <Container>
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <Heading size="h2" className="mb-2">
              最新レビュー
            </Heading>
            <Text color="secondary">
              最近読んだ本、観た映画などのレビューです
            </Text>
          </div>
          <Link href="/reviews" className="hidden sm:block">
            <Button variant="link">
              すべて見る →
            </Button>
          </Link>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recentReviews.map((review) => (
            <Link key={review.slug} href={`/reviews/${review.slug}`}>
              <Card
                elevation="raised"
                clickable
                padding="default"
                className="h-full overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className="-mx-4 -mt-4 mb-4">
                  <ThumbnailImage
                    src={review.thumbnail}
                    alt={review.title}
                    fallbackText={review.title}
                    aspectRatio="portrait"
                  />
                </div>

                <CardBody className="space-y-3">
                  {/* Category Badge */}
                  <Badge
                    variant={categoryVariants[review.category] || 'default'}
                    size="small"
                  >
                    {categoryLabels[review.category] || review.category}
                  </Badge>

                  {/* Title */}
                  <Heading
                    size="h5"
                    className="group-hover:text-primary-500 dark:group-hover:text-primary-300 transition-colors line-clamp-2"
                  >
                    {review.title}
                  </Heading>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-warning-400 fill-current'
                            : 'text-neutral-50 dark:text-neutral-700'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <Text size="sm" color="secondary" className="ml-2">
                      {review.rating}/5
                    </Text>
                  </div>

                  {/* Excerpt */}
                  <Text size="sm" color="secondary" className="line-clamp-2">
                    {review.excerpt}
                  </Text>

                  {/* Author & Year */}
                  {(review.author || review.releaseYear) && (
                    <Text size="xs" color="disabled">
                      {review.author && <span>{review.author}</span>}
                      {review.author && review.releaseYear && <span> • </span>}
                      {review.releaseYear && <span>{review.releaseYear}</span>}
                    </Text>
                  )}
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile "View All" Button */}
        <div className="sm:hidden text-center">
          <Link href="/reviews">
            <Button variant="primary" fullWidth>
              すべてのレビューを見る
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
