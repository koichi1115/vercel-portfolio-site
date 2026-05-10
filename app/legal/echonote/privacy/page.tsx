import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | EchoNote',
  description: 'EchoNote（iOSアプリ）のプライバシーポリシー',
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
            EchoNote（iOSアプリおよび Apple Watch コンパニオンアプリ。以下「本アプリ」）
          </Text>

          <Text color="secondary" className="mb-4">
            最終更新日: 2026年5月6日
          </Text>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              1. はじめに
            </Heading>
            <Text className="mb-4">
              本アプリは、ユーザーのプライバシーを最大限尊重して設計されています。
              録音した音声、生成されたノート、用語メモリ等のすべてのユーザーデータは、
              原則としてお使いの端末（iPhone および Apple Watch）の内部にのみ保存され、
              開発者のサーバーに保存されることはありません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              2. 取得する情報
            </Heading>
            <Text className="mb-4">本アプリは以下の情報を取得します。</Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>ユーザーが録音した音声データ</li>
              <li>ユーザーがカメラで撮影した文書画像</li>
              <li>音声から自動生成された文字起こしテキスト・ノート・要約・TODOリスト</li>
              <li>ユーザーが作成・編集した用語メモリ、ブックマーク、セッションタイトル等</li>
            </ul>
            <Text className="mt-4">
              氏名・メールアドレス・電話番号・住所等の個人を識別する情報、
              位置情報、デバイス識別子は取得しません。アカウント登録は不要です。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              3. 情報の保存場所
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>音声・テキストデータ</strong>：iPhone および Apple Watch
                の本体ストレージ（アプリのサンドボックス内）にのみ保存されます。
              </li>
              <li>
                <strong>iCloud バックアップ</strong>：iOS の標準機能により、
                ユーザーが iCloud バックアップを有効にしている場合、
                音声およびノートデータは iCloud にバックアップ対象として含まれることがあります。
                バックアップの有効/無効は iOS の設定で制御できます。
              </li>
              <li>
                <strong>本アプリ開発者のサーバー</strong>：データの永続的な保存は行いません
                （詳細は「4. 第三者への提供」を参照）。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              4. 第三者への提供
            </Heading>
            <Text className="mb-4">
              本アプリは、AI処理（音声の文字起こし・テキスト補正・ノート生成等）のために、
              ユーザーの音声データやテキストデータを以下の第三者サービスに送信します。
              送信されたデータは処理結果の取得のためにのみ利用され、
              本アプリ開発者のサーバーには保存されません。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>xAI（Grok STT）</strong>：音声の文字起こしに使用します。
                <a
                  href="https://x.ai/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                >
                  xAI のプライバシーポリシー
                </a>
              </li>
              <li>
                <strong>OpenAI（Whisper API）</strong>：xAI が利用できない場合の
                フォールバック先として、音声の文字起こしに使用します。
                <a
                  href="https://openai.com/policies/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                >
                  OpenAI のプライバシーポリシー
                </a>
              </li>
              <li>
                <strong>Anthropic（Claude API）</strong>：テキスト補正・ノート生成・
                用語抽出・OCR・タイトル生成等に使用します。
                <a
                  href="https://www.anthropic.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                >
                  Anthropic のプライバシーポリシー
                </a>
              </li>
              <li>
                <strong>Cloudflare（Workers）</strong>：上記各APIの呼び出しを中継するために
                通信を経由します。リクエストおよびレスポンスの永続的なログは取得しません。
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                >
                  Cloudflare のプライバシーポリシー
                </a>
              </li>
            </ul>
            <Text className="mt-4">
              上記以外の第三者へのデータ提供は、法令に基づく場合を除き行いません。
              広告配信ネットワークや解析サービス（Google Analytics 等）は使用していません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              5. 必要な権限と利用目的
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>マイクアクセス</strong>：講演・会議・授業等を録音し、
                文字起こしおよびノート生成を行うために使用します。
              </li>
              <li>
                <strong>カメラアクセス</strong>：配布資料・板書等の文書を撮影し、
                文字認識（OCR）と用語抽出を行うために使用します。
              </li>
              <li>
                <strong>Apple Watch 連携</strong>：Apple Watch で録音した音声を
                iPhone に転送するために、WatchConnectivity フレームワークを使用します。
                データは Apple のシステムが提供する暗号化チャネルで転送されます。
              </li>
              <li>
                <strong>バックグラウンド音声</strong>：画面ロック中も録音を継続するために、
                iOS のバックグラウンド音声モードを使用します。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              6. データの削除
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                個別のセッション（録音・ノート）は、アプリ内のセッション一覧から削除できます。
              </li>
              <li>
                すべてのデータを削除するには、iOS の標準操作により本アプリを
                端末からアンインストールしてください。アプリと共にすべてのローカルデータが
                削除されます。
              </li>
              <li>
                第三者APIに送信した処理リクエストの取り扱いについては、
                各APIプロバイダのプライバシーポリシーをご確認ください。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              7. セキュリティ
            </Heading>
            <Text>
              本アプリと第三者APIとの通信は、すべて HTTPS（TLS）により暗号化されています。
              また、ローカルに保存されたデータは iOS のアプリサンドボックスにより
              他のアプリから隔離されています。ただし、インターネット上での完全な
              セキュリティを保証するものではありません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              8. お子様のプライバシー
            </Heading>
            <Text>
              本アプリは13歳未満のお子様を対象としたサービスではありません。
              13歳未満のお子様から意図的に個人情報を収集することはありません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              9. プライバシーポリシーの変更
            </Heading>
            <Text>
              本プライバシーポリシーは予告なく変更される場合があります。
              重要な変更がある場合は、本ページにて通知いたします。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              10. お問い合わせ
            </Heading>
            <Text>
              プライバシーに関するご質問やご懸念がございましたら、
              下記までお問い合わせください。
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
              href="/legal/echonote/terms"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              利用規約はこちら
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
