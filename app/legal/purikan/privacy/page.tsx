import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | ぷりかん！',
  description: 'ぷりかん！（iOSアプリ）のプライバシーポリシー',
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
            ぷりかん！（iOSアプリ。以下「本アプリ」）
          </Text>

          <Text color="secondary" className="mb-4">
            最終更新日: 2026年6月23日
          </Text>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              1. はじめに
            </Heading>
            <Text className="mb-4">
              本アプリは、保育園・学校等から配布されるプリント（PDF・画像）をAIで解析し、
              イベント・TODO・持ち物を自動抽出するiOS用アプリケーションです。
              ユーザーのプライバシーを最大限尊重して設計されており、
              解析結果等のデータは原則としてお使いの端末内部にのみ保存されます。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              2. 収集するデータと収集方法
            </Heading>
            <Text className="mb-4">
              本アプリは、以下のデータを収集します。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>プリントファイル（PDF・画像）</strong>：ユーザーがアプリ内で選択した
                ファイルを、AI解析およびGoogle Driveへのアップロードのために使用します。
              </li>
              <li>
                <strong>解析結果</strong>：AIが抽出したイベント、TODO、持ち物、要約等の
                テキストデータ。端末内のデータベースに保存されます。
              </li>
              <li>
                <strong>子供・施設情報</strong>：ユーザーが任意で入力した子供の名前・
                クラス名・施設名等。AI解析の精度向上のために使用されます。
              </li>
              <li>
                <strong>Googleアカウント情報</strong>：OAuth認証により取得するアクセストークン。
                Google Drive、Googleカレンダー、Google Tasksへのアクセスに使用します。
                パスワードは取得しません。
              </li>
              <li>
                <strong>LINE ユーザーID</strong>：LINE公式アカウントとの連携により取得する
                LINEユーザー識別子。通知送信のために使用します。
              </li>
              <li>
                <strong>リマインダー情報</strong>：TODO・持ち物の期限と通知日程。
                LINE通知のために開発者のサーバーに送信・保存されます。
              </li>
            </ul>
            <Text className="mt-4">
              氏名・メールアドレス・電話番号・住所等の個人を直接識別する情報は収集しません。
              アカウント登録は不要です。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              3. 情報の保存場所
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>端末内のローカルデータ</strong>：プリントファイル、解析結果、
                子供・施設情報、設定情報等は、端末内のSQLiteデータベースにのみ保存されます。
              </li>
              <li>
                <strong>Google Drive</strong>：ユーザーがGoogle連携を有効にしている場合、
                スキャンしたプリントファイルがユーザーのGoogle Driveに保存されます。
              </li>
              <li>
                <strong>Googleカレンダー・Google Tasks</strong>：ユーザーの操作により、
                抽出されたイベント・TODO・持ち物がユーザーのGoogleアカウントに登録されます。
              </li>
              <li>
                <strong>開発者サーバー（Vercel + Upstash Redis）</strong>：
                LINEリマインダー通知のために、以下の情報のみサーバーに保存されます。
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>LINE ユーザーID</li>
                  <li>TODO・持ち物のタイトル、期限日、対象者名</li>
                  <li>元資料の件名およびGoogle DriveファイルID</li>
                  <li>通知予定日</li>
                </ul>
                これらのデータは期限日の翌日に自動削除されます。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              4. データの利用目的
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>プリントファイルの解析</strong>：AIサービスに送信し、
                イベント・TODO・持ち物・要約等を自動抽出するために利用します。
              </li>
              <li>
                <strong>Google連携</strong>：抽出した情報をユーザーのカレンダー・タスク・
                Driveに登録するために利用します。
              </li>
              <li>
                <strong>LINE通知</strong>：解析結果の通知およびリマインダー通知を
                ユーザーに送信するために利用します。
              </li>
              <li>
                <strong>子供・施設情報</strong>：AIが対象者を正しく識別するための
                コンテキスト情報として利用します。
              </li>
            </ul>
            <Text className="mt-4">
              これらの目的以外のためにデータを利用することはありません。
              広告配信や行動分析のための利用も行いません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              5. 第三者への提供（送信先）
            </Heading>
            <Text className="mb-4">
              本アプリは、以下の第三者サービスにデータを送信します。
            </Text>
            <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Anthropic, PBC（Claude API）</strong>
                <br />
                所在地: 米国カリフォルニア州サンフランシスコ
                <br />
                利用目的: プリントファイル（PDF・画像）の解析、イベント・TODO・持ち物の抽出、
                要約生成
                <br />
                送信データ: プリントファイルの内容、子供・施設のコンテキスト情報
                <br />
                <a
                  href="https://www.anthropic.com/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Anthropic Privacy Policy
                </a>
              </li>
              <li>
                <strong>Google LLC（Drive API, Calendar API, Tasks API）</strong>
                <br />
                所在地: 米国カリフォルニア州マウンテンビュー
                <br />
                利用目的: ファイルの保存、カレンダーイベントの登録、タスクの登録
                <br />
                送信データ: プリントファイル、抽出されたイベント・TODO・持ち物の情報
                <br />
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <strong>LINEヤフー株式会社（LINE Messaging API）</strong>
                <br />
                所在地: 日本国東京都千代田区
                <br />
                利用目的: 解析結果の通知、リマインダー通知の送信
                <br />
                送信データ: 解析結果のテキスト、リマインダー内容
                <br />
                <a
                  href="https://line.me/ja/terms/policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  LINE Privacy Policy
                </a>
              </li>
            </ul>
            <Text className="mt-4">
              上記以外の第三者へのデータ提供は、法令に基づく場合を除き行いません。
              広告配信ネットワークや解析サービスは使用していません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              6. データの保持期間と削除
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>端末内のローカルデータ</strong>：ユーザーが削除する、
                または本アプリをアンインストールするまで端末内に保存されます。
              </li>
              <li>
                <strong>サーバー上のリマインダーデータ</strong>：期限日の翌日に
                自動削除されます。
              </li>
              <li>
                <strong>Google上のデータ</strong>：ユーザーのGoogleアカウント内に
                保存され、ユーザー自身がGoogleの各サービスから削除できます。
              </li>
              <li>
                <strong>削除方法</strong>：アプリ内の各画面から個別のデータを削除できます。
                すべてのローカルデータを削除する場合は、本アプリをアンインストールしてください。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              7. 必要な権限と利用目的
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>カメラアクセス</strong>：プリントを撮影してスキャンするために
                使用します（将来実装予定）。
              </li>
              <li>
                <strong>ファイルアクセス</strong>：端末内のPDF・画像ファイルを選択して
                読み込むために使用します。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              8. セキュリティ
            </Heading>
            <Text>
              本アプリと外部サービスとの通信は、すべてHTTPS（TLS）により暗号化されています。
              ローカルに保存されたデータはiOSのアプリサンドボックスにより他のアプリから
              隔離されています。Google連携にはOAuth 2.0（PKCE）を使用し、
              パスワードを本アプリが直接取り扱うことはありません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              9. お子様のプライバシー
            </Heading>
            <Text>
              本アプリは保護者向けのサービスであり、13歳未満のお子様が直接利用することを
              想定していません。本アプリが取り扱う子供の情報（名前・クラス名等）は、
              保護者が任意で入力するものであり、端末内にのみ保存されます。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              10. プライバシーポリシーの変更
            </Heading>
            <Text>
              本プライバシーポリシーは予告なく変更される場合があります。
              重要な変更がある場合は、本ページにて通知いたします。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              11. お問い合わせ
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
              href="/legal/purikan/terms"
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
