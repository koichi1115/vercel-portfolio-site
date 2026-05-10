import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '利用規約 | EchoNote',
  description: 'EchoNote（iOSアプリ）の利用規約',
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
            EchoNote（iOSアプリおよび Apple Watch コンパニオンアプリ。以下「本アプリ」）
          </Text>

          <Text color="secondary" className="mb-4">
            最終更新日: 2026年5月6日
          </Text>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              1. サービスの概要
            </Heading>
            <Text>
              本アプリは、ユーザーが録音した音声に対し、AI（人工知能）による文字起こし、
              テキスト補正、ノート生成、用語抽出、TODO抽出、要約生成等を行う iOS 用アプリケーションです。
              Apple Watch から録音を開始することもできます。
              本規約は、本アプリの利用条件を定めるものです。
              本アプリをダウンロードまたは使用された時点で、本規約に同意したものとみなします。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              2. 利用環境
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>iOS 17 以降を搭載した iPhone（推奨）</li>
              <li>watchOS 10 以降を搭載した Apple Watch（コンパニオン機能を利用する場合）</li>
              <li>AI処理を行うためのインターネット接続</li>
              <li>マイク・カメラへのアクセス許可</li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              3. 録音時の遵守事項
            </Heading>
            <Text className="mb-4">
              ユーザーは本アプリで録音を行う際、以下を遵守するものとします。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>適用される国・地域の盗聴・盗撮・著作権・肖像権等の関連法令を遵守すること</li>
              <li>会議・授業・講演等で録音を行う前に、必要に応じて参加者・主催者の同意を得ること</li>
              <li>録音した第三者の発言・著作物等を、本人や権利者の許諾なく公開・配布しないこと</li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              4. 禁止事項
            </Heading>
            <Text className="mb-4">
              ユーザーは以下の行為を行ってはなりません。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>違法な目的（盗聴、犯罪行為の準備等）で本アプリを使用すること</li>
              <li>第三者の権利（著作権、プライバシー権、肖像権等）を侵害する行為</li>
              <li>本アプリのリバースエンジニアリング、改変、不正アクセス</li>
              <li>本アプリのバックエンド API に対する自動化された大量アクセス、スクレイピング等</li>
              <li>本アプリのコードや認証情報を抽出して第三者の用途に転用する行為</li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              5. AI 処理結果の取り扱い
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                文字起こしや AI 補正、ノート生成の結果は、AI モデルの性質上、
                誤りや不正確な内容を含む可能性があります。
              </li>
              <li>
                医療・法務・財務等の重要な意思決定には、本アプリの出力を単独で根拠とせず、
                必ず元の音声や原典資料を確認のうえ、専門家の助言を得てください。
              </li>
              <li>
                AI 出力に関連して生じた損害について、開発者は責任を負いません。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              6. データの保存と消失
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                本アプリのデータは原則として端末内（iPhone および Apple Watch）にのみ保存されます。
              </li>
              <li>
                本アプリをアンインストールするとすべてのデータが失われます。
                再インストール後の復元はできません（iCloud バックアップから iOS 全体を
                復元する場合を除く）。
              </li>
              <li>
                本アプリ開発者は、ユーザーデータの消失・破損について責任を負いません。
                重要なデータはユーザー自身でエクスポートし、別の場所に保管してください。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              7. 料金
            </Heading>
            <Text>
              本アプリは現在、無料で提供されています。
              将来的に有料機能やサブスクリプションを追加する場合には、
              事前にアプリ内およびストア説明にて告知します。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              8. サービスの中断・終了
            </Heading>
            <Text>
              開発者は、メンテナンス、技術的問題、第三者APIの仕様変更、その他の事情により、
              事前の通知なく本アプリの一部または全部のサービスを中断または終了することがあります。
              これにより生じた損害について、開発者は責任を負いません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              9. 免責事項
            </Heading>
            <Text>
              本アプリは「現状のまま」提供され、明示・黙示を問わずいかなる保証も行いません。
              本アプリの利用に起因または関連して生じたあらゆる損害（データ消失、機会損失、
              逸失利益、精神的損害、第三者との紛争を含む）について、
              開発者は一切の責任を負わないものとします。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              10. 規約の変更
            </Heading>
            <Text>
              本規約は予告なく変更される場合があります。
              重要な変更がある場合は、本ページにて通知いたします。
              変更後も本アプリを継続利用された場合、変更後の規約に同意したものとみなします。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              11. 準拠法・裁判管轄
            </Heading>
            <Text>
              本規約の解釈および本アプリの利用に関する紛争は、日本法に準拠し、
              開発者の住所地を管轄する地方裁判所を専属的合意管轄裁判所とします。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              12. お問い合わせ
            </Heading>
            <Text>本規約に関するご質問は、下記までお問い合わせください。</Text>
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
              href="/legal/echonote/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              プライバシーポリシーはこちら
            </Link>
            <Link
              href="/echonote"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              EchoNote 紹介ページに戻る
            </Link>
          </div>
        </article>
      </Container>
    </div>
  );
}
