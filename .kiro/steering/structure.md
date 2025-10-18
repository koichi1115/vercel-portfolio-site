# 受け継ぐAI - Project Structure

## ルートディレクトリ構成

```
uketsuguAI/
├── 01_docs/              # プロジェクトドキュメント
├── 02_src/               # ソースコード
├── 03_config/            # 設定ファイル
├── 04_tests/             # テストコード
├── 05_data/              # データファイル
├── 06_evidence/          # エビデンス・ログ
├── docs/                 # その他ドキュメント
├── .git/                 # Gitリポジトリ
├── .gitignore            # Git除外設定
├── LICENSE               # ライセンス
├── PROJECT_RULES.md      # プロジェクトルール
└── README.md             # プロジェクト概要
```

### ディレクトリ命名規則

プロジェクトは**番号プレフィックス方式**を採用し、開発フェーズごとにディレクトリを整理しています：

| ディレクトリ | 役割 | 内容 |
|-------------|------|------|
| `01_docs/` | ドキュメント | 要件定義、設計書、API設計等 |
| `02_src/` | ソースコード | アプリケーション本体 |
| `03_config/` | 設定 | 環境設定、デプロイ設定等 |
| `04_tests/` | テスト | 単体テスト、統合テスト |
| `05_data/` | データ | サンプルデータ、初期データ等 |
| `06_evidence/` | エビデンス | 実行ログ、検証結果等 |

### 設計思想
- **段階的な整理**: 開発プロセスに沿った明確な分離
- **可読性優先**: 番号により視覚的に構造を把握しやすい
- **スケーラビリティ**: 新しいフェーズの追加が容易

---

## 01_docs/ - ドキュメント

プロジェクトの包括的なドキュメントを管理します。

```
01_docs/
├── 01_要件定義書.md
├── 02_システムアーキテクチャ設計書.md
├── 03_データベース設計書.md
├── 04_インフラ構成図.md
├── 05_LINE会話フロー設計書.md
├── 06_API設計書.md
└── 07_セットアップ手順書.md
```

### ドキュメント命名規則
- **番号プレフィックス**: 作成順または重要度順
- **日本語ファイル名**: 内容の明確性を優先
- **Markdown形式**: バージョン管理が容易、可読性が高い

### ドキュメントの役割
| ドキュメント | 内容 |
|-------------|------|
| `01_要件定義書.md` | 機能要件、非機能要件、ビジネスモデル |
| `02_システムアーキテクチャ設計書.md` | システム構成、技術スタック、データフロー |
| `03_データベース設計書.md` | テーブル定義、ER図、インデックス設計 |
| `04_インフラ構成図.md` | GCPサービス構成、ネットワーク図 |
| `05_LINE会話フロー設計書.md` | 会話シナリオ、状態遷移図 |
| `06_API設計書.md` | エンドポイント定義、リクエスト/レスポンス例 |
| `07_セットアップ手順書.md` | 環境構築、デプロイ手順 |

---

## 02_src/ - ソースコード

アプリケーションのソースコードを管理します。

```
02_src/
├── db/                       # データベース関連
│   ├── migrations/           # マイグレーションスクリプト
│   └── init.sql              # 初期DDL
├── venv/                     # Python仮想環境（.gitignore対象）
└── webhook-handler/          # Cloud Functions アプリケーション本体
    ├── main.py               # Webhook Handler エントリーポイント
    ├── task_generator.py     # タスク生成ロジック
    ├── task_generator_worker.py  # バックグラウンドワーカー
    ├── flex_messages.py      # LINE Flex Message テンプレート
    ├── knowledge_base.py     # RAG統合（ベクトルDB連携）
    ├── prompt_templates.py   # AI プロンプト管理
    ├── tips_miner.py         # Web情報マイニング
    ├── create_richmenu.py    # LINEリッチメニュー作成
    ├── requirements.txt      # Python依存関係
    ├── .env.yaml             # 環境変数（.gitignore対象）
    ├── deploy.sh             # デプロイスクリプト
    ├── deploy_all.sh         # 全関数デプロイスクリプト
    ├── richmenu.png          # リッチメニュー画像
    └── README.md             # 開発者向けドキュメント
```

### コアモジュール詳細

#### `main.py` - Webhook Handler
**役割**: Cloud Functionsのエントリーポイント。LINE Webhookイベントを受信し、適切な処理にルーティング。

**主要関数**:
```python
def webhook(request):
    """Cloud Functions エントリーポイント"""
    # 1. LINE署名検証
    # 2. イベントパース
    # 3. イベントタイプによる分岐
    # 4. レスポンス返却

def handle_message(event):
    """メッセージイベント処理"""
    # ユーザーメッセージへの応答

def handle_follow(event):
    """友達追加イベント処理"""
    # 初回ヒアリング開始

def handle_postback(event):
    """ポストバックイベント処理"""
    # リッチメニュー、クイックリプライのアクション
```

**設計原則**:
- 3秒以内のレスポンス必須（LINE Webhook要件）
- 重い処理はCloud Tasksでキューイング
- エラーハンドリングの徹底

#### `task_generator.py` - タスク生成エンジン
**役割**: ユーザーのヒアリング情報を基にタスクリストを生成。

**主要関数**:
```python
def generate_tasks(user_profile):
    """タスク生成のメイン処理"""
    # 1. ベクトルDBから関連情報取得
    # 2. プロンプト構築
    # 3. Gemini APIでタスク生成
    # 4. タスクの構造化・優先順位付け
    # 5. データベース保存
    return tasks

def search_knowledge_base(query):
    """RAG: ベクトルDBから関連情報を検索"""
    # Pinecone/ChromaDBとの連携

def parse_ai_response(response):
    """AI応答をタスクオブジェクトに変換"""
    # JSON/構造化データへの変換
```

**設計原則**:
- RAGによる最新情報の統合
- 優先順位・期限の自動計算
- エラー時のフォールバック処理

#### `task_generator_worker.py` - バックグラウンドワーカー
**役割**: 重い処理（タスク生成）を非同期実行。

**デプロイ**: 別のCloud Functionとしてデプロイ
**トリガー**: Cloud TasksからのHTTPリクエスト
**タイムアウト**: 540秒（9分）

#### `flex_messages.py` - LINE UIテンプレート
**役割**: LINE Flex Messageの生成。

**主要関数**:
```python
def create_task_list_message(tasks):
    """タスク一覧のFlex Message"""

def create_task_detail_message(task):
    """タスク詳細のFlex Message"""

def create_reminder_message(task):
    """リマインダーのFlex Message"""
```

**設計原則**:
- 再利用可能なテンプレート
- 視覚的に見やすいデザイン
- LINE UI制約への準拠

#### `knowledge_base.py` - RAG統合
**役割**: ベクトルDBとの連携、Embedding生成。

**主要関数**:
```python
def embed_text(text):
    """テキストをベクトル化"""

def search_similar(query, top_k=5):
    """類似度検索"""

def add_document(text, metadata):
    """ドキュメントをベクトルDBに追加"""
```

#### `prompt_templates.py` - プロンプト管理
**役割**: Gemini API用のプロンプトテンプレート管理。

**構造**:
```python
PROMPTS = {
    "initial_hearing": """...""",
    "task_generation": """...""",
    "question_answer": """...""",
}
```

**設計原則**:
- プロンプトとコードの分離
- バージョン管理の容易性
- A/Bテストの実施が可能

#### `tips_miner.py` - 情報マイニング
**役割**: Webから補助金・Tips情報を収集。

**技術**: chrome-dev-mcp
**実行**: Cloud Schedulerによる定期実行

#### `create_richmenu.py` - リッチメニュー作成
**役割**: LINEリッチメニューの作成・更新。

**実行タイミング**: 手動実行（メニュー変更時）

---

## コード組織化パターン

### 1. モジュール分割の原則
- **単一責任の原則**: 各モジュールは1つの責務のみ
- **疎結合**: モジュール間の依存関係を最小化
- **高凝集**: 関連する機能を同じモジュールに集約

### 2. 関数設計
```python
def function_name(param1: str, param2: int) -> dict:
    """
    関数の説明（目的、動作）

    Args:
        param1: パラメータ1の説明
        param2: パラメータ2の説明

    Returns:
        戻り値の説明

    Raises:
        ValueError: エラーの説明
    """
    # 実装
    pass
```

**原則**:
- 型ヒントの使用
- Docstring（Google Style）の記載
- 1関数1処理（単一責任）
- 引数は5個以内を推奨

### 3. クラス設計
```python
class TaskGenerator:
    """タスク生成エンジン"""

    def __init__(self, config: dict):
        """初期化"""
        self.config = config

    def generate(self, user_profile: dict) -> list:
        """タスク生成"""
        pass

    def _search_knowledge(self, query: str) -> list:
        """プライベートメソッド（内部使用のみ）"""
        pass
```

**原則**:
- クラスは明確な責務を持つ
- パブリック/プライベートの明確な区別
- 継承よりコンポジションを優先

### 4. エラーハンドリング
```python
try:
    result = risky_operation()
except SpecificError as e:
    logger.error(f"Error occurred: {e}")
    # エラー処理
    raise
except Exception as e:
    logger.critical(f"Unexpected error: {e}")
    # 汎用エラー処理
    raise
finally:
    # クリーンアップ処理
    pass
```

**原則**:
- 具体的な例外をキャッチ
- ログ記録の徹底
- エラーの再スロー（適切な場合）

---

## ファイル命名規則

### Pythonファイル
- **スネークケース**: `task_generator.py`, `flex_messages.py`
- **モジュール名は小文字**: `main.py`, `utils.py`
- **動詞＋名詞**: `create_richmenu.py`, `deploy.sh`

### スクリプトファイル
- **拡張子**: `.sh`（Bash）, `.py`（Python）
- **実行可能**: `chmod +x deploy.sh`

### 設定ファイル
- **YAML形式**: `.env.yaml`
- **ドットプレフィックス**: 秘匿情報（`.gitignore`対象）

### ドキュメント
- **Markdown**: `.md`
- **日本語OK**: `要件定義書.md`（可読性優先）

---

## Import組織化

### Import順序（PEP 8準拠）
```python
# 1. 標準ライブラリ
import os
import json
from datetime import datetime

# 2. サードパーティライブラリ
from flask import Flask, request
from linebot import LineBotApi, WebhookHandler
from google.cloud import secretmanager
import sqlalchemy

# 3. ローカルモジュール
from task_generator import TaskGenerator
from knowledge_base import KnowledgeBase
from prompt_templates import PROMPTS
```

### Import規約
- **絶対インポート**: `from task_generator import ...`（推奨）
- **相対インポート**: 避ける（小規模プロジェクトのため不要）
- **ワイルドカードインポート**: 禁止（`from module import *`）

---

## 環境設定管理

### `.env.yaml` - 環境変数
```yaml
# Cloud Functionsでは.env.yamlで環境変数を管理
LINE_CHANNEL_ACCESS_TOKEN: "YOUR_TOKEN"
LINE_CHANNEL_SECRET: "YOUR_SECRET"
DB_NAME: "uketsuguai"
DB_USER: "YOUR_USER"
GEMINI_API_KEY: "YOUR_KEY"
```

### Secret Manager（本番環境）
機密情報は環境変数ではなく、GCP Secret Managerで管理：

```python
from google.cloud import secretmanager

def get_secret(secret_id):
    """Secret Managerからシークレット取得"""
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{PROJECT_ID}/secrets/{secret_id}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")
```

**使用例**:
```python
LINE_TOKEN = get_secret("LINE_CHANNEL_ACCESS_TOKEN")
```

---

## データベース構成

### マイグレーション
```
02_src/db/
├── migrations/
│   ├── 001_create_users.sql
│   ├── 002_create_tasks.sql
│   └── 003_add_subscriptions.sql
└── init.sql  # 全テーブルの初期化スクリプト
```

**命名規則**:
- **番号プレフィックス**: `001_`, `002_`, ...
- **動詞＋名詞**: `create_`, `add_`, `alter_`
- **テーブル名**: 複数形（`users`, `tasks`）

---

## キーアーキテクチャ原則

### 1. サーバーレスファースト
- **Cloud Functions**: イベント駆動のスケーラブルな実行環境
- **マネージドサービス**: インフラ管理の最小化
- **ステートレス**: 各リクエストは独立して処理

### 2. RAGベースの知識管理
- **ベクトルDB**: 最新情報の動的取得
- **Embedding**: テキストの意味的検索
- **定期更新**: スケジューラによる情報鮮度の維持

### 3. セキュリティ重視
- **最小権限の原則**: IAMロールの厳格な管理
- **Secret Manager**: API Key等の安全な管理
- **入力バリデーション**: 個人情報の誤入力防止

### 4. テスタビリティ
- **疎結合**: 各モジュールの独立性
- **依存性注入**: テストしやすい設計
- **モックの活用**: 外部APIへの依存を最小化

### 5. ログとモニタリング
- **構造化ログ**: JSON形式でのログ出力
- **エラートラッキング**: Cloud Loggingとの統合
- **メトリクス収集**: Cloud Monitoringでの監視

### 6. スケーラビリティ
- **水平スケーリング**: Cloud Functionsの自動スケール
- **データベース最適化**: インデックス、クエリ最適化
- **キャッシング**: 将来的にRedis導入検討

---

## テスト構成（今後の実装）

```
04_tests/
├── unit/                 # 単体テスト
│   ├── test_task_generator.py
│   ├── test_knowledge_base.py
│   └── test_flex_messages.py
├── integration/          # 統合テスト
│   ├── test_webhook_handler.py
│   └── test_database.py
└── fixtures/             # テストデータ
    ├── sample_user_profile.json
    └── sample_tasks.json
```

### テストフレームワーク
- **pytest**: Pythonのテストフレームワーク
- **pytest-mock**: モックライブラリ
- **coverage**: カバレッジ計測

---

## デプロイ構成

### デプロイスクリプト
```bash
# deploy.sh - Webhook Handlerのデプロイ
#!/bin/bash
gcloud functions deploy webhook-handler \
  --gen2 \
  --runtime=python312 \
  --region=asia-northeast1 \
  --source=. \
  --entry-point=webhook \
  --trigger-http \
  --allow-unauthenticated

# deploy_all.sh - 全関数の一括デプロイ
#!/bin/bash
./deploy.sh
gcloud functions deploy task-generator-worker ...
```

### CI/CD（今後の実装）
```
.github/workflows/
├── deploy.yml            # 本番デプロイ
├── test.yml              # テスト実行
└── lint.yml              # コード品質チェック
```

---

## バージョン管理

### `.gitignore`
```
# Python
venv/
__pycache__/
*.pyc
*.pyo

# 環境変数
.env
.env.yaml

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

### ブランチ戦略（GitHub Flow）
- `main`: 本番環境
- `develop`: 開発環境
- `feature/*`: 機能開発ブランチ

---

## まとめ

受け継ぐAIのプロジェクト構造は、以下の原則に基づいています：

1. **明確な分離**: 番号プレフィックスによる段階的な整理
2. **モジュラー設計**: 各モジュールの単一責任
3. **サーバーレスファースト**: Cloud Functionsを中心とした構成
4. **セキュリティ重視**: Secret Manager、IAM、入力バリデーション
5. **保守性**: ドキュメント、テスト、ログの充実

この構造により、スケーラブルで保守しやすいシステムを実現しています。
