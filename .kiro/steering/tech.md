# 受け継ぐAI - Technology Stack

## アーキテクチャ概要

受け継ぐAIは、**サーバーレスアーキテクチャ**を採用したクラウドネイティブなLINE Botアプリケーションです。GCP（Google Cloud Platform）を基盤とし、RAG（Retrieval-Augmented Generation）技術を活用した知識ベースシステムを統合しています。

### 高レベルアーキテクチャ

```
[LINEユーザー]
     ↓ ↑
[LINE Messaging API]
     ↓ ↑
[Cloud Functions: Webhook Handler]
     ↓ ↑
┌────────────────────────────────────┐
│ [会話エンジン] ←→ [Gemini API]      │
│ [タスク生成] ←→ [RAG知識ベース]     │
│ [タスク管理] ←→ [Cloud SQL]        │
└────────────────────────────────────┘
     ↓
[Cloud Storage] ←→ [ベクトルDB]
     ↑
[Cloud Scheduler] → [Webスクレイパー]
```

### アーキテクチャの特徴
- **サーバーレス**: 自動スケーリング、低運用コスト
- **イベント駆動**: LINE Webhookをトリガーに処理を実行
- **RAGベース**: 最新の法令・自治体情報を動的に取得
- **マネージドサービス活用**: インフラ管理の最小化

---

## フロントエンド

### LINE Messaging API
- **役割**: ユーザーインターフェース
- **バージョン**: LINE Bot SDK 3.x
- **主要機能**:
  - メッセージ送受信
  - Webhook署名検証
  - リッチメニュー（タスク一覧等へのショートカット）
  - Flex Message（タスク表示用のリッチなUI）
  - クイックリプライ（選択式回答）
  - プッシュ通知（リマインダー）

### LINE公式アカウント構成
- アカウント名: 受け継ぐAI
- プラン: フリープラン（月200通まで無料） → 必要に応じてライトプランへ移行
- Webhook URL: `https://<region>-<project-id>.cloudfunctions.net/webhook-handler`

---

## バックエンド

### 言語とランタイム
- **言語**: Python 3.12+
- **理由**:
  - AI/ML系ライブラリの充実
  - chrome-dev-mcp対応
  - GCP Cloud Functionsの公式サポート
  - 開発効率の高さ

### フレームワーク
- **Cloud Functions Framework**: `functions-framework` 3.x
  - HTTP関数の実装
  - ローカル開発環境の提供

### 主要依存ライブラリ
```python
# LINE Messaging API
line-bot-sdk==3.*

# データベース（PostgreSQL）
psycopg2-binary==2.9.*
sqlalchemy==2.0.*
pg8000==1.*
cloud-sql-python-connector==1.*

# Google Cloud Services
google-cloud-secret-manager==2.*
google-cloud-tasks==2.*

# AI - Google Gemini API
google-genai>=0.2.0

# Web Scraping
requests==2.*
beautifulsoup4==4.*

# ユーティリティ
python-dotenv==1.*
```

### コアモジュール

#### 1. `main.py` - Webhook Handler
- **役割**: LINE Webhookイベントの受信とルーティング
- **主要関数**:
  - `webhook(request)`: Cloud Functions エントリーポイント
  - `handle_message(event)`: メッセージイベント処理
  - `handle_follow(event)`: 友達追加イベント処理
- **処理フロー**:
  1. LINE署名検証
  2. イベントタイプ判定
  3. 適切なハンドラーへディスパッチ
  4. レスポンス返却（3秒以内）

#### 2. `task_generator.py` - タスク生成エンジン
- **役割**: ユーザー固有のタスクリスト生成
- **技術**: RAG + Gemini API
- **処理ステップ**:
  1. ヒアリング情報の構造化
  2. ベクトルDBで関連知識を検索
  3. Gemini APIでタスク生成
  4. 優先順位・期限の付与
  5. Cloud SQLへ保存

#### 3. `task_generator_worker.py` - バックグラウンドワーカー
- **役割**: 重い処理を非同期実行
- **技術**: Cloud Tasks
- **用途**: タスク生成の長時間処理（10秒超）を別関数で実行

#### 4. `knowledge_base.py` - RAG統合
- **役割**: ベクトルDBとの連携
- **技術**: Pinecone / ChromaDB
- **機能**:
  - Embedding生成（OpenAI / Gemini Embedding API）
  - 類似度検索
  - メタデータフィルタリング

#### 5. `flex_messages.py` - LINE UI テンプレート
- **役割**: Flex Message の生成
- **用途**: タスク一覧、タスク詳細、リマインダー等のリッチなUI

#### 6. `prompt_templates.py` - AI プロンプト管理
- **役割**: Gemini API用のプロンプトテンプレート
- **含まれるプロンプト**:
  - 初回ヒアリング用
  - タスク生成用
  - 質問回答用

#### 7. `tips_miner.py` - 情報マイニング
- **役割**: Web情報の収集と構造化
- **技術**: chrome-dev-mcp

#### 8. `create_richmenu.py` - リッチメニュー作成
- **役割**: LINE リッチメニューの作成・更新
- **実行**: デプロイ時またはメニュー変更時に手動実行

---

## データベース

### Cloud SQL (PostgreSQL 15+)
- **インスタンスタイプ**: db-f1-micro（スモールスタート）→ スケールアップ可能
- **接続方式**: Cloud SQL Python Connector（IAM認証）
- **主要テーブル**:

#### `users` - ユーザー情報
```sql
CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,  -- LINE User ID
    display_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `user_profiles` - ヒアリング情報
```sql
CREATE TABLE user_profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(user_id),
    relation VARCHAR(50),           -- 続柄
    family_location VARCHAR(100),   -- 家族の居住地
    user_location VARCHAR(100),     -- 自分の居住地
    death_date DATE,                -- 死亡日
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `tasks` - タスク情報
```sql
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(user_id),
    title VARCHAR(255),
    description TEXT,
    priority INTEGER,               -- 優先順位
    deadline DATE,                  -- 期限
    status VARCHAR(20) DEFAULT 'pending',  -- pending, in_progress, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);
```

#### `subscriptions` - サブスクリプション情報
```sql
CREATE TABLE subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(user_id),
    plan VARCHAR(50),               -- beta, standard
    status VARCHAR(20),             -- active, inactive, canceled
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### ORM
- **SQLAlchemy 2.0**: データベース操作の抽象化
- **接続プーリング**: `pg8000` による効率的な接続管理

---

## インフラ（GCP）

### 選定理由
- Gemini APIとの統合が容易（Vertex AI）
- Cloud Functionsの大きな無料枠（200万リクエスト/月）
- コストパフォーマンスに優れる
- Secret Manager、Cloud Logging等の充実した統合サービス

### GCPサービス構成

| サービス | 用途 | 備考 |
|---------|------|------|
| **Cloud Functions** | Webhook Handler、バックエンド処理 | Python 3.12, Gen2 |
| **Cloud SQL** | PostgreSQL 15+ | ユーザー・タスク情報管理 |
| **Cloud Storage** | ドキュメント保管 | RAG知識ベース |
| **Cloud Scheduler** | 定期情報収集 | 週次/月次実行 |
| **Cloud Tasks** | 非同期タスク実行 | 重い処理のキューイング |
| **Secret Manager** | API キー管理 | LINE, Gemini, DB接続情報 |
| **Cloud Logging** | ログ管理 | エラー追跡、監視 |
| **Cloud Monitoring** | メトリクス・アラート | 稼働監視 |
| **Vertex AI** | Gemini API | 会話エンジン、タスク生成 |

### リージョン
- **Primary**: `asia-northeast1`（東京）
- **理由**: 低レイテンシ、日本語対応

---

## AI / ML

### Gemini API（Google Gen AI SDK）
- **モデル**: `gemini-1.5-flash`
  - 高速、低コスト
  - 無料枠が大きい（1日あたり15リクエスト/分）
  - 長いコンテキストウィンドウ（100万トークン）
- **SDK**: `google-genai` >= 0.2.0（新しいGoogle Gen AI SDK）
- **用途**:
  - 会話エンジン（チャット応答）
  - タスク生成（RAG統合）
  - ヒアリング質問の動的生成

### Embedding API
- **選択肢1**: OpenAI `text-embedding-3-small`
  - 高品質、低コスト
- **選択肢2**: Google `text-embedding-004`
  - Gemini APIとの統合が容易

### ベクトルDB
- **選択肢1**: Pinecone（推奨）
  - 無料枠: 1インデックス、5GB
  - マネージド、低管理負担
  - 高速検索
- **選択肢2**: ChromaDB
  - オープンソース
  - 自前ホスティング（Cloud Run等）
  - 完全な制御が可能

---

## RAG（Retrieval-Augmented Generation）

### データソース
1. **e-gov**: 法令データ（API経由）
2. **自治体Webサイト**: 補助金、手続き情報（スクレイピング）
3. **金融機関Webサイト**: 手続き情報（スクレイピング）
4. **保険会社Webサイト**: 手続き情報（スクレイピング）
5. **Web情報**: Tips、豆知識（スクレイピング）

### 情報収集フロー
```
[Cloud Scheduler]
     ↓
[Cloud Functions: Scraper]
     ↓
[chrome-dev-mcp] → [Webサイト]
     ↓
[Cloud Storage: 生データ保存]
     ↓
[Embedding処理]
     ↓
[ベクトルDB: インデックス更新]
```

### chrome-dev-mcp
- **役割**: APIのないWebサイトからの情報収集
- **機能**:
  - HTML解析
  - PDF抽出・OCR
  - JavaScript実行（動的ページ対応）
  - 構造化データへの変換

---

## 開発環境

### ローカル環境セットアップ
```bash
# Python仮想環境作成
cd uketsuguAI/02_src
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 依存関係インストール
cd webhook-handler
pip install -r requirements.txt

# 環境変数設定
cp .env.yaml.example .env.yaml
# .env.yamlを編集（API Key等）

# ローカルサーバー起動
functions-framework --target=webhook --debug
```

### 必須環境変数（`.env.yaml`）

```yaml
# LINE
LINE_CHANNEL_ACCESS_TOKEN: "YOUR_LINE_CHANNEL_ACCESS_TOKEN"
LINE_CHANNEL_SECRET: "YOUR_LINE_CHANNEL_SECRET"

# Database
DB_NAME: "uketsuguai"
DB_USER: "YOUR_DB_USER"
DB_PASSWORD: "YOUR_DB_PASSWORD"
DB_HOST: "/cloudsql/PROJECT_ID:REGION:INSTANCE_NAME"  # GCP
# ローカル開発時: DB_HOST: "localhost"

# AI
GEMINI_API_KEY: "YOUR_GEMINI_API_KEY"

# Vector DB
PINECONE_API_KEY: "YOUR_PINECONE_API_KEY"
PINECONE_ENVIRONMENT: "YOUR_PINECONE_ENVIRONMENT"
PINECONE_INDEX_NAME: "uketsuguai-knowledge"

# GCP
GCP_PROJECT_ID: "YOUR_PROJECT_ID"
GCP_REGION: "asia-northeast1"
```

### 開発ツール
- **バージョン管理**: Git / GitHub
- **CI/CD**: GitHub Actions（検討中）
- **コードフォーマット**: `black`, `isort`
- **リンター**: `flake8`, `pylint`
- **型チェック**: `mypy`（検討中）

---

## 一般的なコマンド

### デプロイ
```bash
# Webhook Handlerのデプロイ
cd uketsuguAI/02_src/webhook-handler
./deploy.sh

# またはgcloudコマンド直接実行
gcloud functions deploy webhook-handler \
  --gen2 \
  --runtime=python312 \
  --region=asia-northeast1 \
  --source=. \
  --entry-point=webhook \
  --trigger-http \
  --allow-unauthenticated \
  --service-account=webhook-handler@PROJECT_ID.iam.gserviceaccount.com \
  --memory=512MB \
  --timeout=60s

# Task Generator Workerのデプロイ
gcloud functions deploy task-generator-worker \
  --gen2 \
  --runtime=python312 \
  --region=asia-northeast1 \
  --source=. \
  --entry-point=generate_tasks_worker \
  --trigger-http \
  --service-account=webhook-handler@PROJECT_ID.iam.gserviceaccount.com \
  --memory=512MB \
  --timeout=540s
```

### データベース管理
```bash
# Cloud SQLへの接続
gcloud sql connect INSTANCE_NAME --user=postgres

# ローカルからCloud SQL Proxyを使用
cloud_sql_proxy -instances=PROJECT_ID:REGION:INSTANCE_NAME=tcp:5432
```

### LINEリッチメニュー作成
```bash
cd uketsuguAI/02_src/webhook-handler
python create_richmenu.py
```

### ログ確認
```bash
# Cloud Functionsのログ
gcloud functions logs read webhook-handler --limit=50

# リアルタイムログ
gcloud functions logs read webhook-handler --limit=10 --follow
```

---

## ポート構成

### ローカル開発
- **Cloud Functions エミュレータ**: `http://localhost:8080`
- **PostgreSQL**: `localhost:5432`

### 本番環境
- **Webhook URL**: `https://asia-northeast1-PROJECT_ID.cloudfunctions.net/webhook-handler`
- **Cloud SQL**: Cloud SQL Proxy経由（ポートなし、Unixソケット）

---

## セキュリティ

### 認証・認可
- **LINE署名検証**: すべてのWebhookリクエストで署名を検証
- **IAM認証**: Cloud SQLへの接続はIAM認証を使用
- **Secret Manager**: API Key等の機密情報は環境変数に含めず、Secret Managerで管理

### 通信の暗号化
- **HTTPS**: すべての通信をTLS 1.2+で暗号化
- **Cloud SQL接続**: Cloud SQL Proxyによる暗号化された接続

### データ保護
- **データベース暗号化**: Cloud SQLの自動暗号化
- **バックアップ**: 自動バックアップ有効化（日次）
- **アクセス制御**: IAMロールによる厳格なアクセス制御

---

## パフォーマンス最適化

### Cloud Functions
- **Cold Start対策**: 最小デプロイメント（軽量な依存関係）
- **メモリ割り当て**: 512MB（必要に応じて調整）
- **タイムアウト**: 60秒（Webhook）、540秒（Worker）

### データベース
- **接続プーリング**: SQLAlchemy + pg8000
- **インデックス**: 頻繁にクエリされるカラムにインデックス作成
- **クエリ最適化**: N+1問題の回避

### キャッシング
- **検討中**: Redis（Cloud Memorystore）によるキャッシング

---

## 監視とロギング

### Cloud Logging
- **エラーログ**: `ERROR` レベル以上のログを記録
- **アクセスログ**: すべてのWebhookリクエストを記録
- **構造化ログ**: JSON形式でログ出力

### Cloud Monitoring
- **メトリクス**:
  - Cloud Functions実行回数
  - エラー率
  - レスポンスタイム
  - Cloud SQL接続数
- **アラート**:
  - エラー率が5%を超えた場合
  - レスポンスタイムが3秒を超えた場合
  - Cloud SQL接続数が上限に近づいた場合

---

## コスト管理

### 想定月額コスト（10ユーザー）
| サービス | 想定コスト |
|---------|-----------|
| Cloud Functions | 無料枠内（200万リクエスト） |
| Cloud SQL | ~$10（db-f1-micro） |
| Cloud Storage | 無料枠内（5GB以下） |
| Gemini API | 無料枠内（1日15リクエスト/分） |
| Pinecone | 無料枠内（5GB） |
| LINE | 無料枠内（200通） |
| **合計** | **$10〜20/月** |

### コスト最適化策
- 無料枠を最大限活用
- Cloud Functionsのウォームアップ頻度調整
- 不要なログの削減
- データベースの自動スケーリング設定

---

## まとめ

受け継ぐAIの技術スタックは、**サーバーレス・マネージドサービス中心**の構成により、低コスト・高可用性・スケーラブルなシステムを実現しています。GCPとGemini APIの組み合わせにより、AI機能の統合が容易で、開発効率も高い設計となっています。
