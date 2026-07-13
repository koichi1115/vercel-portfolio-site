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
            最終更新日: 2026年7月13日
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
                <strong>プリントファイル（PDF・画像）</strong>：ユーザーがアプリ内で選択、
                またはカメラで撮影したファイルを、AI解析のために使用します。
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
                <strong>LINE ルームID</strong>：LINE公式アカウントを友だち追加した際に
                取得できる識別子。ユーザーが任意で入力し、通知送信のために使用します。
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
                <strong>開発者サーバー（Vercel + Upstash Redis）</strong>：
                LINEリマインダー通知のために、以下の情報のみサーバーに保存されます。
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>LINE ルームID</li>
                  <li>TODO・持ち物のタイトル、期限日、対象者名</li>
                  <li>元資料の件名</li>
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
                使用します。
              </li>
              <li>
                <strong>ファイルアクセス</strong>：端末内のPDF・画像ファイルを選択して
                読み込むために使用します。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              8. Googleユーザーデータの取り扱い
            </Heading>
            <Text className="mb-4">
              本アプリがGoogle APIを通じて取得するユーザーデータについて、以下のとおり
              取り扱います。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>アクセスするデータ</strong>：Google Drive上のアプリ専用ファイル
                （drive.file スコープ）、Googleカレンダーのイベント情報、Google Tasksの
                タスク情報。アクセスは本アプリの機能提供に必要な最小限のスコープに限定されます。
              </li>
              <li>
                <strong>データの使用目的</strong>：スキャンしたプリントのGoogle Driveへの保存、
                抽出された予定のGoogleカレンダーへの登録、抽出されたTODO・持ち物のGoogle Tasksへの
                登録のみに使用します。
              </li>
              <li>
                <strong>第三者への提供</strong>：Google APIを通じて取得したユーザーデータを
                第三者に販売、転送、または提供することはありません。
              </li>
              <li>
                <strong>データの保護</strong>：Googleとの通信はすべてHTTPS（TLS）で暗号化されます。
                OAuthアクセストークンは端末内に安全に保存され、Google APIへのアクセスにのみ使用されます。
              </li>
              <li>
                <strong>データの保持と削除</strong>：Google上のデータはユーザーのGoogleアカウント内に
                保存されます。本アプリはユーザーの指示なくGoogleアカウント上のデータを削除しません。
                ユーザーはいつでもGoogleの各サービスからデータを削除できます。
              </li>
            </ul>
            <Text className="mt-4 font-semibold">
              Google API Limited Use Policy への準拠
            </Text>
            <Text className="mt-2">
              本アプリによるGoogle Workspace APIから受信した情報の使用および他のアプリへの転送は、
              使用制限の要件を含む{' '}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Google API Services User Data Policy
              </a>
              {' '}に準拠します。具体的に、本アプリは以下を遵守します：
            </Text>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Googleユーザーデータは、ユーザー向けの機能の提供・改善以外の目的で使用しません。
              </li>
              <li>
                Googleユーザーデータを広告配信、ターゲティング、または融資判断に使用しません。
              </li>
              <li>
                Googleユーザーデータをデータブローカーや広告主を含む第三者に販売・転送しません。
              </li>
              <li>
                Googleユーザーデータを、特定ユーザー向けのパーソナライズされたモデルを超えて、
                AI/MLモデルの開発・改善・訓練に使用しません。
              </li>
              <li>
                Googleユーザーデータを、AI/MLモデルの訓練に使用する第三者サービスに転送しません。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              9. セキュリティ
            </Heading>
            <Text>
              本アプリと外部サービスとの通信は、すべてHTTPS（TLS）により暗号化されています。
              ローカルに保存されたデータはiOSのアプリサンドボックスにより他のアプリから
              隔離されています。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              10. お子様のプライバシー
            </Heading>
            <Text>
              本アプリは保護者向けのサービスであり、13歳未満のお子様が直接利用することを
              想定していません。本アプリが取り扱う子供の情報（名前・クラス名等）は、
              保護者が任意で入力するものであり、端末内にのみ保存されます。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              11. プライバシーポリシーの変更
            </Heading>
            <Text>
              本プライバシーポリシーは予告なく変更される場合があります。
              重要な変更がある場合は、本ページにて通知いたします。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              12. お問い合わせ
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
