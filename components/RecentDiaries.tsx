import Link from 'next/link';
import { getAllDiaries } from '@/lib/content';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Container } from '@/components/ui/Container';

export async function RecentDiaries() {
  const allDiaries = await getAllDiaries();
  const recentDiaries = allDiaries.slice(0, 3);

  if (recentDiaries.length === 0) {
    return null;
  }

  return (
    <section className="section-spacing bg-neutral-10/30 dark:bg-dark-neutral-800/30 backdrop-blur-sm">
      <Container>
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <Heading size="h2" className="mb-2">
              最新の日記
            </Heading>
            <Text color="secondary">
              日々の学びや考えたことを記録しています
            </Text>
          </div>
          <Link href="/diaries" className="hidden sm:block">
            <Button variant="link">
              すべて見る →
            </Button>
          </Link>
        </div>

        {/* Diaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {recentDiaries.map((diary) => (
            <Link key={diary.slug} href={`/diaries/${diary.slug}`}>
              <Card
                elevation="raised"
                clickable
                padding="comfortable"
                className="h-full group"
              >
                {/* Date */}
                <div className="flex items-center gap-2 mb-3 text-neutral-300 dark:text-neutral-100">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <Text as="time" size="sm" color="secondary">
                    {new Date(diary.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </div>

                {/* Title */}
                <Heading
                  size="h4"
                  className="mb-3 group-hover:text-primary-500 dark:group-hover:text-primary-300 transition-colors line-clamp-2"
                >
                  {diary.title}
                </Heading>

                {/* Excerpt */}
                <Text size="sm" color="secondary" className="line-clamp-3 mb-4">
                  {diary.excerpt}
                </Text>

                {/* Tags */}
                {diary.tags && diary.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {diary.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="info" size="small" dot>
                        {tag}
                      </Badge>
                    ))}
                    {diary.tags.length > 3 && (
                      <Text size="xs" color="disabled" className="self-center">
                        +{diary.tags.length - 3}
                      </Text>
                    )}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile "View All" Button */}
        <div className="sm:hidden text-center">
          <Link href="/diaries">
            <Button variant="primary" fullWidth>
              すべての日記を見る
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
