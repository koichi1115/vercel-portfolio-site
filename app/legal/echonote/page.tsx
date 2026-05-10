import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '法的情報 | EchoNote',
  description: 'EchoNote のプライバシーポリシーと利用規約',
};

export default function LegalIndexPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Heading size="h1" className="mb-4 text-center">
            EchoNote
          </Heading>
          <Text color="secondary" className="mb-12 text-center">
            法的情報・利用に関する重要事項
          </Text>

          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/legal/echonote/privacy" className="block">
              <div className="h-full p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <div className="text-3xl mb-4">🔒</div>
                <Heading size="h3" className="mb-2">
                  プライバシーポリシー
                </Heading>
                <Text color="secondary" size="sm">
                  取得する情報、保存場所、第三者APIへの送信について
                </Text>
              </div>
            </Link>

            <Link href="/legal/echonote/terms" className="block">
              <div className="h-full p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <div className="text-3xl mb-4">📋</div>
                <Heading size="h3" className="mb-2">
                  利用規約
                </Heading>
                <Text color="secondary" size="sm">
                  利用条件、録音時の遵守事項、禁止事項、免責事項について
                </Text>
              </div>
            </Link>
          </div>

          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <Heading size="h4" className="mb-4">
              EchoNote について
            </Heading>
            <Text color="secondary" size="sm" className="mb-4">
              EchoNote は、録音した音声を AI が文字起こし・補正し、
              根拠付きの構造化ノートを自動生成する iOS アプリです。
              Apple Watch から録音を開始することもできます。
            </Text>
            <Text color="secondary" size="sm">
              アプリ紹介ページ：
              <Link
                href="/echonote"
                className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
              >
                /echonote
              </Link>
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
}
