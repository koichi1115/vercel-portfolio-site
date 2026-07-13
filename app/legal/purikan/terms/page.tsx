import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '利用規約 | ぷりかん！',
  description: 'ぷりかん！（iOSアプリ）の利用規約',
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
            ぷりかん！（iOSアプリ。以下「本アプリ」）
          </Text>

          <Text color="secondary" className="mb-4">
            最終更新日: 2026年7月2日
          </Text>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              1. サービスの概要
            </Heading>
            <Text>
              本アプリは、保育園・学校・習い事等から配布されるプリント（PDF・画像ファイル）を
              AI（人工知能）で解析し、イベント・TODO・持ち物等の情報を自動抽出するiOS用
              アプリケーションです。抽出した情報は、LINEへの通知・事前リマインダー機能で
              活用できます。
              本規約は、本アプリの利用条件を定めるものです。
              本アプリをダウンロードまたは使用された時点で、本規約に同意したものとみなします。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              2. 利用環境
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>iOS 17 以降を搭載した iPhone</li>
              <li>AI解析およびLINE通知を行うためのインターネット接続</li>
              <li>LINE通知を利用する場合はLINEアカウント</li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              3. AI解析に関する注意事項
            </Heading>
            <Text className="mb-4">
              本アプリのAI解析機能は、プリントの内容を自動的に読み取り、
              イベント・TODO・持ち物等を抽出しますが、以下の点にご注意ください。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                AIによる解析は100%の精度を保証するものではありません。
                日付、時間、場所、持ち物等の情報が誤って抽出される場合があります。
              </li>
              <li>
                重要な予定や提出物については、必ず元のプリントで内容をご確認ください。
              </li>
              <li>
                AI解析の結果に基づく行動によって生じた損害について、
                開発者は一切の責任を負いません。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              4. LINE通知について
            </Heading>
            <Text>
              本アプリはLINE公式アカウントを通じた通知機能を提供します。
              プリントの解析結果およびTODO・持ち物のリマインダーをLINEメッセージとして
              受け取ることができます。LINE連携は任意であり、設定画面からいつでも解除できます。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              5. プリントの取扱いについて
            </Heading>
            <Text>
              本アプリで取り込むプリントには、お子様やご家庭に関する個人情報が含まれる
              場合があります。AI解析のためにプリントの内容が第三者のAIサービス
              （Anthropic社のClaude API）に送信されます。送信されたデータの取扱いに
              ついては、プライバシーポリシーをご確認ください。
              本アプリの利用にあたっては、プリントに含まれる情報の取扱いについて
              ユーザー自身がご判断ください。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              6. 禁止事項
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>本アプリの逆コンパイル、リバースエンジニアリング、改変</li>
              <li>本アプリを利用した第三者の権利侵害行為</li>
              <li>本アプリのサーバーに過度な負荷をかける行為</li>
              <li>その他、法令または公序良俗に反する行為</li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              7. 免責事項
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                本アプリは「現状有姿」で提供されます。開発者は、本アプリの動作の
                正確性、完全性、信頼性、継続性について一切保証しません。
              </li>
              <li>
                AI解析結果の誤り、LINEサービスとの連携不具合、
                通知の遅延・未達等に起因する損害について、開発者は責任を負いません。
              </li>
              <li>
                本アプリの利用または利用不能により生じたいかなる損害についても、
                開発者の責任は法令で許容される最大限度まで免除されます。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              8. サービスの変更・終了
            </Heading>
            <Text>
              開発者は、事前の通知なく、本アプリの機能の追加・変更・削除、
              またはサービスの全部もしくは一部の提供を終了することができます。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              9. 利用規約の変更
            </Heading>
            <Text>
              本利用規約は予告なく変更される場合があります。
              変更後の規約は本ページに掲載した時点で効力を生じます。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              10. 準拠法と管轄
            </Heading>
            <Text>
              本規約は日本法に準拠し、本規約に関する一切の紛争については、
              東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              11. お問い合わせ
            </Heading>
            <Text>
              本規約に関するご質問がございましたら、下記までお問い合わせください。
            </Text>
            <Text className="mt-2">
              開発者連絡先:{' '}
              <a
                href="mailto:ko1115.product.jp@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                ko1115.product.jp@gmail.com
              </a>
            </Text>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-6">
            <Link
              href="/legal/purikan/privacy"
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
