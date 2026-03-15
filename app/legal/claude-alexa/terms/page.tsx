import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '利用規約 | クロード Alexaスキル',
  description: 'クロード Alexaスキルの利用規約',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <Container>
        <article className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
          <Heading size="h1" className="mb-8">
            利用規約
          </Heading>

          <Text color="secondary" className="mb-8">
            クロード Alexaスキル（以下「本スキル」）
          </Text>

          <Text color="secondary" className="mb-4">
            最終更新日: 2025年1月
          </Text>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              1. サービスの概要
            </Heading>
            <Text>
              本スキルは、Amazon Alexaを通じてAnthropic社の生成AI「Claude」と
              日本語で音声会話ができるサービスです。無料プランと有料のプレミアムプランを提供しています。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              2. 利用条件
            </Heading>
            <Text className="mb-4">
              本スキルを利用することで、以下の条件に同意したものとみなします。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Amazon Alexaの利用規約に同意していること</li>
              <li>13歳以上であること</li>
              <li>本利用規約のすべての条項を理解し同意すること</li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4 text-red-600 dark:text-red-400">
              3. AI応答に関する重要な注意事項
            </Heading>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <Text className="font-semibold text-yellow-800 dark:text-yellow-200">
                本スキルは生成AIを利用したサービスです。AIの回答には誤りや不正確な情報が
                含まれる可能性があります。重要な判断や行動を行う前に、必ずご自身で情報の
                正確性を確認してください。
              </Text>
            </div>
            <Text>
              AIの応答を鵜呑みにせず、特に医療、法律、金融などの専門的な事項については、
              必ず専門家にご相談ください。本スキルの応答に基づく判断や行動によって
              生じた損害について、開発者は一切の責任を負いません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4 text-red-600 dark:text-red-400">
              4. 個人情報の入力禁止
            </Heading>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <Text className="font-semibold text-red-800 dark:text-red-200">
                本スキルに個人情報を入力しないでください。
              </Text>
            </div>
            <Text className="mb-4">
              以下の情報は絶対に入力しないでください：
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>氏名、住所、電話番号、メールアドレス</li>
              <li>クレジットカード番号、銀行口座情報</li>
              <li>マイナンバー、パスポート番号</li>
              <li>パスワード、暗証番号</li>
              <li>健康情報、医療記録</li>
              <li>その他、個人を特定できる情報</li>
            </ul>
            <Text className="mt-4">
              入力された情報はAIサービス提供のため外部に送信されます。
              個人情報の入力により生じた損害について、開発者は一切の責任を負いません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4 text-red-600 dark:text-red-400">
              5. サービスの中断・停止と返金
            </Heading>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-4">
              <Text className="font-semibold text-orange-800 dark:text-orange-200">
                以下の理由により、予告なくサービスが利用できなくなる場合があります。
                その場合でも、サブスクリプション料金の返金は行いません。
              </Text>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>システムメンテナンスの実施</li>
              <li>APIトークン利用量の上限到達</li>
              <li>外部サービス（Claude API、AWS等）の障害や仕様変更</li>
              <li>技術的な問題やセキュリティ上の理由</li>
              <li>その他やむを得ない事情</li>
            </ul>
            <Text className="mt-4">
              サービスの継続的な提供を保証するものではありません。
              プレミアムプランをご購入の場合も、上記理由による利用不可に対する
              返金・補償は行いませんので、あらかじめご了承ください。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              6. 禁止事項
            </Heading>
            <Text className="mb-4">
              以下の行為を禁止します。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>違法行為、犯罪行為に関連する利用</li>
              <li>他者を誹謗中傷する内容の生成</li>
              <li>著作権、商標権等の知的財産権を侵害する行為</li>
              <li>わいせつ、暴力的、差別的なコンテンツの生成</li>
              <li>スパム、悪意のあるコードの生成</li>
              <li>サービスの運営を妨害する行為</li>
              <li>その他、公序良俗に反する行為</li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              7. 料金プラン
            </Heading>
            <Text className="mb-4">
              本スキルは以下のプランを提供します。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>無料プラン：</strong>1日10回まで利用可能
              </li>
              <li>
                <strong>プレミアムプラン：</strong>月額制で無制限に利用可能
              </li>
            </ul>
            <Text className="mt-4">
              プレミアムプランの購入・解約はAlexaアプリまたは音声コマンドから行えます。
              解約後も購入期間終了までサービスを利用できます。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              8. 免責事項
            </Heading>
            <Text className="mb-4">
              開発者は以下について一切の責任を負いません。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>AIの応答内容の正確性、完全性、有用性</li>
              <li>サービスの中断、遅延、停止による損害</li>
              <li>ユーザーが入力した情報の漏洩</li>
              <li>本スキルの利用または利用不能により生じた損害</li>
              <li>第三者サービス（Claude API、AWS、Alexa）に起因する問題</li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              9. 知的財産権
            </Heading>
            <Text>
              本スキルに関する知的財産権は開発者に帰属します。
              「Claude」はAnthropic社の商標です。
              「Alexa」はAmazon.com, Inc.の商標です。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              10. 利用規約の変更
            </Heading>
            <Text>
              本利用規約は予告なく変更される場合があります。
              変更後も本スキルを継続して利用した場合、変更後の利用規約に
              同意したものとみなします。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              11. 準拠法・管轄
            </Heading>
            <Text>
              本利用規約は日本法に準拠し、本スキルに関する紛争については
              東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              12. お問い合わせ
            </Heading>
            <Text>
              本利用規約に関するご質問がございましたら、開発者までお問い合わせください。
            </Text>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/legal/claude-alexa/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              プライバシーポリシーはこちら
            </Link>
          </div>
        </article>
      </Container>
    </div>
  );
}
