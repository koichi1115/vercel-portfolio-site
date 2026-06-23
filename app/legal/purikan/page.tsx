import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '法的情報 | ぷりかん！',
  description: 'ぷりかん！（iOSアプリ）の法的情報',
};

export default function PurikanLegalPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <Container>
        <article className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
          <Heading size="h1" className="mb-8">
            ぷりかん！ 法的情報
          </Heading>
          <ul className="space-y-4">
            <li>
              <Link href="/legal/purikan/privacy" className="text-blue-600 dark:text-blue-400 hover:underline text-lg">
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link href="/legal/purikan/terms" className="text-blue-600 dark:text-blue-400 hover:underline text-lg">
                利用規約
              </Link>
            </li>
          </ul>
        </article>
      </Container>
    </div>
  );
}
