import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '法的情報 | クロード Alexaスキル',
  description: 'クロード Alexaスキルのプライバシーポリシーと利用規約',
};

export default function LegalIndexPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Heading size="h1" className="mb-4 text-center">
            クロード Alexaスキル
          </Heading>
          <Text color="secondary" className="mb-12 text-center">
            法的情報・利用に関する重要事項
          </Text>

          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/legal/claude-alexa/privacy" className="block">
              <div className="h-full p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <div className="text-3xl mb-4">🔒</div>
                <Heading size="h3" className="mb-2">
                  プライバシーポリシー
                </Heading>
                <Text color="secondary" size="sm">
                  収集する情報、利用目的、第三者提供について
                </Text>
              </div>
            </Link>

            <Link href="/legal/claude-alexa/terms" className="block">
              <div className="h-full p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <div className="text-3xl mb-4">📋</div>
                <Heading size="h3" className="mb-2">
                  利用規約
                </Heading>
                <Text color="secondary" size="sm">
                  サービスの利用条件、禁止事項、免責事項について
                </Text>
              </div>
            </Link>
          </div>

          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <Heading size="h4" className="mb-4">
              スキルについて
            </Heading>
            <Text color="secondary" size="sm" className="mb-4">
              「クロード」は、Amazon AlexaデバイスからAnthropic社の生成AI「Claude」と
              日本語で音声会話ができるカスタムスキルです。
            </Text>
            <Text color="secondary" size="sm">
              「アレクサ、クロードを開いて」で起動し、自由に質問や会話をお楽しみいただけます。
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
}
