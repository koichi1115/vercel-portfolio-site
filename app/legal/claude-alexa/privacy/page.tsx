import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | クロード Alexaスキル',
  description: 'クロード Alexaスキルのプライバシーポリシー',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <Container>
        <article className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
          <Heading size="h1" className="mb-8">
            プライバシーポリシー
          </Heading>

          <Text color="secondary" className="mb-8">
            クロード Alexaスキル（以下「本スキル」）
          </Text>

          <Text color="secondary" className="mb-4">
            最終更新日: 2025年1月
          </Text>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              1. 収集する情報
            </Heading>
            <Text className="mb-4">
              本スキルは、サービス提供に必要な最小限の情報のみを収集・利用します。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Alexaから提供されるユーザーID（匿名識別子）</li>
              <li>スキル利用中の会話履歴（セッション中のみ保持）</li>
              <li>1日あたりの利用回数（無料プラン制限管理用）</li>
              <li>サブスクリプション購入状態</li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              2. 情報の利用目的
            </Heading>
            <Text className="mb-4">
              収集した情報は以下の目的でのみ使用します。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>AIアシスタントサービスの提供</li>
              <li>会話の文脈を維持した応答の生成</li>
              <li>無料プランの利用制限管理</li>
              <li>サブスクリプション状態の確認</li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              3. 情報の保存と削除
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>会話履歴はセッション終了時に自動削除されます</li>
              <li>利用回数カウントは日次でリセットされます</li>
              <li>永続的な個人情報の保存は行いません</li>
              <li>ユーザーは「履歴をクリア」コマンドで即座に会話履歴を削除できます</li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              4. 第三者への提供
            </Heading>
            <Text className="mb-4">
              ユーザーの会話内容は、AIによる応答生成のためにAnthropic社のClaude APIに送信されます。
              Anthropic社のプライバシーポリシーについては、
              <a
                href="https://www.anthropic.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Anthropic社のプライバシーポリシー
              </a>
              をご確認ください。
            </Text>
            <Text>
              上記以外の第三者への情報提供は、法令に基づく場合を除き行いません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              5. セキュリティ
            </Heading>
            <Text>
              本スキルは、AWS Lambda およびAmazon Alexaプラットフォーム上で動作し、
              通信はすべて暗号化されています。適切なセキュリティ対策を講じていますが、
              インターネット上での完全なセキュリティを保証するものではありません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              6. お子様のプライバシー
            </Heading>
            <Text>
              本スキルは13歳未満のお子様を対象としたサービスではありません。
              13歳未満のお子様から意図的に個人情報を収集することはありません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              7. プライバシーポリシーの変更
            </Heading>
            <Text>
              本プライバシーポリシーは予告なく変更される場合があります。
              重要な変更がある場合は、本ページにて通知いたします。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              8. お問い合わせ
            </Heading>
            <Text>
              プライバシーに関するご質問やご懸念がございましたら、開発者までお問い合わせください。
            </Text>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/legal/claude-alexa/terms"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              利用規約はこちら
            </Link>
          </div>
        </article>
      </Container>
    </div>
  );
}
