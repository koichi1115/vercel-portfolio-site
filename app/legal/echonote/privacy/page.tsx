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
            最終更新日: 2026年6月2日
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
              2. 収集するデータと収集方法
            </Heading>
            <Text className="mb-4">
              本アプリは、以下のデータを以下の方法により収集します。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>録音音声</strong>：アプリ内のマイクを通じて、
                ユーザーが録音操作を行った場合に収集します。
              </li>
              <li>
                <strong>文字起こしテキスト</strong>：録音音声を後述の第三者AIサービスで
                処理した結果として生成・収集します。
              </li>
              <li>
                <strong>スキャン画像および OCR テキスト</strong>：アプリ内のカメラにより
                ユーザーが撮影した文書画像、および当該画像から抽出されたテキストを収集します。
              </li>
              <li>
                <strong>用語（ターム）</strong>：ユーザーがアプリ内で入力・編集した用語、
                および文字起こしテキスト等から自動抽出された用語を収集します。
              </li>
              <li>
                <strong>ノート</strong>：ユーザーがアプリ内で入力・編集したノート、
                および文字起こし結果から自動生成されたノート・要約・タイトル・ToDo
                リスト等を収集します。
              </li>
              <li>
                <strong>アプリ内識別子（deviceId）</strong>：本アプリは初回起動時に
                <code>dev-</code> から始まる擬似ランダム文字列を生成し、端末内に
                永続化します。この識別子は、本アプリのバックエンド（後述の Cloudflare
                Workers）における利用量の集計、サブスクリプション状態の管理、および
                RevenueCat へのユーザー識別に使用されます。Apple 提供の IDFA / IDFV
                等の OS レベルのデバイス識別子は取得しません。
              </li>
              <li>
                <strong>サブスクリプション状態と利用量</strong>：プラン区分（無料/
                プレミアム）、月次の録音時間、OCR スキャン回数を、上記 deviceId に
                紐付けてバックエンドで集計します。
              </li>
            </ul>
            <Text className="mt-4">
              氏名・メールアドレス・電話番号・住所等の個人を識別する情報、
              位置情報は取得しません。アカウント登録は不要です。
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
                <strong>本アプリ開発者のバックエンド（Cloudflare Workers）</strong>：
                録音音声・文字起こしテキスト・ノート等の本体データは保存しません。
                ただし、利用量の集計と不正利用の防止を目的として、deviceId に紐付く
                以下の状態情報のみ Cloudflare KV に保存されます。
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>サブスクリプション区分（無料/プレミアム）と有効期限</li>
                  <li>当月の録音時間（秒）と OCR スキャン回数</li>
                  <li>日次の API リクエスト数（不正利用検知のため、毎日リセット）</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              4. データの利用目的
            </Heading>
            <Text className="mb-4">
              本アプリは、収集したデータを以下の目的のためにのみ利用します。
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>録音音声の利用</strong>：以下の処理のために利用します。
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>音声をテキストに変換する（文字起こし）</li>
                  <li>話者分離（プレミアムプランのみ。発話者ごとにラベル付けする処理）</li>
                </ul>
              </li>
              <li>
                <strong>文字起こしテキスト・OCRテキスト・ノート等の利用</strong>：
                以下の処理のために利用します。
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>テキストの補正（誤認識の修正・整形）</li>
                  <li>要約の生成</li>
                  <li>ノートの生成</li>
                  <li>タイトルの生成</li>
                  <li>用語の抽出</li>
                  <li>ToDo（タスク）の抽出</li>
                </ul>
              </li>
              <li>
                <strong>deviceId・利用量の利用</strong>：プラン区分の判定、月次の利用上限
                管理、不正利用の検知のために利用します。
              </li>
            </ul>
            <Text className="mt-4">
              これらの目的以外のためにデータを利用することはありません。
              また、広告配信や行動分析のための利用も行いません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              5. 第三者への提供（送信先）
            </Heading>
            <Text className="mb-4">
              前項の目的を達成するために、本アプリは収集したデータ（録音音声、
              文字起こしテキスト、スキャン画像、OCR テキスト、用語、ノート等）を、
              以下の第三者サービスに送信します。送信されたデータは、処理結果の取得の
              ためにのみ利用され、本アプリ開発者のサーバーには永続的に保存されません。
            </Text>
            <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong>xAI Inc.（Grok API）</strong>
                <br />
                所在地: 米国カリフォルニア州 パロアルト
                （1450 Page Mill Road, Palo Alto, CA 94304, USA）
                <br />
                利用目的: 録音音声の文字起こし、およびテキストの補正・要約・
                ノート生成・タイトル生成・用語抽出・ToDo 抽出
                <br />
                <a
                  href="https://x.ai/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  xAI Privacy Policy
                </a>
              </li>
              <li>
                <strong>Anthropic, PBC（Claude API）</strong>
                <br />
                所在地: 米国カリフォルニア州 サンフランシスコ
                （548 Market Street, PMB 90375, San Francisco, CA 94104, USA）
                <br />
                利用目的: テキストの補正・要約・ノート生成・タイトル生成・
                用語抽出・ToDo 抽出、および画像の OCR
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
                <strong>Groq, Inc.（Whisper Large V3 Turbo API）</strong>
                <br />
                所在地: 米国カリフォルニア州 マウンテンビュー
                （400 Castro Street, Mountain View, CA 94041, USA）
                <br />
                利用目的: 録音音声の文字起こし（おおむね 20 秒を超える録音は、
                xAI Grok ではなく Groq に送信されます）
                <br />
                <a
                  href="https://groq.com/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Groq Privacy Policy
                </a>
              </li>
              <li>
                <strong>OpenAI, L.L.C.（Whisper API）</strong>
                <br />
                所在地: 米国カリフォルニア州 サンフランシスコ
                （3180 18th Street, San Francisco, CA 94110, USA）
                <br />
                利用目的: 録音音声の文字起こし（Groq への送信が失敗した場合の
                フォールバックとして利用）
                <br />
                <a
                  href="https://openai.com/policies/row-privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  OpenAI Privacy Policy
                </a>
              </li>
              <li>
                <strong>Replicate, Inc.（speaker diarization モデル）</strong>
                <br />
                所在地: 米国カリフォルニア州 サンフランシスコ
                （2261 Market Street #4707, San Francisco, CA 94114, USA）
                <br />
                利用目的: 録音音声の話者分離処理（プレミアムプランのみ）。本機能の
                技術的制約により、録音音声を Replicate のファイルストレージに一時
                アップロードしたうえで処理に渡します。アップロードされた音声は
                Replicate により <strong>24 時間以内に自動削除</strong>されます。
                <br />
                <a
                  href="https://replicate.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Replicate Privacy Policy
                </a>
              </li>
              <li>
                <strong>RevenueCat, Inc.（サブスクリプション管理）</strong>
                <br />
                所在地: 米国カリフォルニア州 サンフランシスコ
                （1 Letterman Drive, Building C, Suite 3-300, San Francisco, CA 94129, USA）
                <br />
                利用目的: プレミアムプランの購入・解約状態の同期、サブスクリプション
                ライフサイクルイベントの受信。本サービスには deviceId と Apple ID の
                取引情報（個人を特定しない範囲）が送信されます。
                <br />
                <a
                  href="https://www.revenuecat.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  RevenueCat Privacy Policy
                </a>
              </li>
            </ul>
            <Text className="mt-4">
              当社は、各社との利用契約により、お客様のデータが各社のセキュリティおよび
              プライバシー保護基準に従って取り扱われることを確認しています。また、各社との
              契約により、お客様のデータをAIモデルの学習目的では使用しません。
            </Text>
            <Text className="mt-4">
              上記以外の第三者へのデータ提供は、法令に基づく場合を除き行いません。
              広告配信ネットワークや解析サービス（Google Analytics 等）は使用していません。
            </Text>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              6. データの保持期間と削除
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>端末内のローカルデータ</strong>：録音音声、文字起こしテキスト、
                スキャン画像、OCR テキスト、用語、ノート等のすべてのユーザーデータは、
                ユーザーが削除する、または本アプリをアンインストールするまで、
                お使いの端末（iPhone および Apple Watch）の内部にのみ保存されます。
                本アプリ開発者がこれらのデータを保持することはありません。
              </li>
              <li>
                <strong>第三者送信先における保持</strong>：第三者AIサービス（xAI Inc.、
                Anthropic, PBC、Groq, Inc.、OpenAI L.L.C.、Replicate Inc.、RevenueCat Inc.）に
                送信されたデータの処理後の保持・削除については、各社の API 利用規約
                およびプライバシーポリシーに従って取り扱われます。特に Replicate に
                アップロードされた録音音声は、Replicate のファイルストレージにおいて
                24 時間以内に自動削除される運用となっています。
              </li>
              <li>
                <strong>バックエンドにおける保持期間（Cloudflare Workers KV）</strong>：
                サブスクリプション区分は、解約・期限切れ時に「無料」に戻されます。
                月次の利用量カウンタは、最後の更新から 65 日後に自動削除されます。
                日次の API リクエスト数は 24 時間で自動削除されます。
                これらの状態情報の削除をご希望の場合は、お問い合わせ先までご連絡ください。
              </li>
              <li>
                <strong>削除方法</strong>：個別のセッション（録音・ノート等）は、
                アプリ内の一覧画面から削除できます。すべてのデータを一括で削除する
                場合は、iOS の標準操作により本アプリを端末からアンインストールして
                ください。アプリと共にすべてのローカルデータが削除されます。
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Heading size="h2" className="mb-4">
              7. 必要な権限と利用目的
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
              8. セキュリティ
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
              9. お子様のプライバシー
            </Heading>
            <Text>
              本アプリは13歳未満のお子様を対象としたサービスではありません。
              13歳未満のお子様から意図的に個人情報を収集することはありません。
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
