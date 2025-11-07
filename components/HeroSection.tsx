import Link from 'next/link';
import Image from 'next/image';
import { getProfileData } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';

export async function HeroSection() {
  const profile = await getProfileData();

  if (!profile) {
    return null;
  }

  return (
    <section className="section-spacing bg-neutral-10/40 dark:bg-dark-neutral-800/40 backdrop-blur-sm">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            {profile.avatar ? (
              <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-neutral-0 dark:ring-dark-neutral-900">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-neutral-0 text-4xl font-bold shadow-lg ring-4 ring-neutral-0 dark:ring-dark-neutral-900">
                {profile.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Name and Title */}
          <Heading size="h1" className="mb-4 bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-300 dark:to-primary-100 bg-clip-text text-transparent">
            {profile.name}
          </Heading>
          <Text size="xl" color="secondary" className="mb-6">
            {profile.title}
          </Text>

          {/* Bio */}
          <Text size="lg" color="secondary" className="mb-8 max-w-2xl mx-auto">
            {profile.bio}
          </Text>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profile">
              <Button variant="primary" size="large">
                プロフィール詳細
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="secondary" size="large">
                プロジェクトを見る
              </Button>
            </Link>
          </div>

          {/* Skills Preview */}
          {profile.skills.length > 0 && (
            <div className="mt-12">
              <Text size="sm" weight="semibold" color="secondary" className="uppercase tracking-wider mb-4">
                スキル
              </Text>
              <div className="flex flex-wrap gap-2 justify-center">
                {profile.skills[0].skills.slice(0, 6).map((skill) => (
                  <Badge key={skill} variant="primary" size="medium">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
