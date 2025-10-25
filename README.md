# Portfolio Site

Next.js 15とTypeScriptで構築された個人ポートフォリオサイトです。キャリア情報、開発プロジェクト、レビューコンテンツを掲載しています。

## 特徴

- ⚡ **Next.js 15** - App Routerとサーバーコンポーネントを使用
- 🎨 **Tailwind CSS** - レスポンシブデザインとダークモード対応
- 📝 **Markdown/MDX** - コンテンツ管理をMarkdownファイルで実現
- 🎯 **TypeScript** - 型安全な開発環境
- 🚀 **Static Site Generation (SSG)** - 高速なページ表示
- 🔍 **SEO最適化** - robots.txtとsitemap.xmlを自動生成
- ♿ **アクセシビリティ** - セマンティックHTMLとARIAラベル

## コンテンツの種類

1. **Profile** - プロフィール、キャリア履歴、スキル
2. **Projects** - 開発プロジェクトのポートフォリオ
3. **Reviews** - 音楽、映画、漫画、書籍のレビュー

## 技術スタック

- **Framework**: Next.js 15.5.6
- **UI**: React 19, Tailwind CSS 3.4
- **Language**: TypeScript 5
- **Markdown Processing**: gray-matter, remark, rehype
- **Theme**: next-themes
- **Code Quality**: ESLint

## セットアップ

### 前提条件

- Node.js 18.17以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone <repository-url>
cd vercel-portfolio-site

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーは [http://localhost:3000](http://localhost:3000) で起動します。

### 環境変数

`.env.example`をコピーして`.env.local`を作成してください：

```bash
cp .env.example .env.local
```

必要に応じて以下の環境変数を設定：

- `NEXT_PUBLIC_SITE_URL` - サイトのベースURL（本番環境用）

## スクリプト

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm run start

# リント実行
npm run lint
```

## プロジェクト構造

```
vercel-portfolio-site/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx             # ホームページ
│   ├── profile/             # プロフィールページ
│   ├── projects/            # プロジェクト一覧・詳細
│   ├── reviews/             # レビュー一覧・詳細
│   ├── error.tsx            # エラーページ
│   ├── not-found.tsx        # 404ページ
│   ├── robots.ts            # robots.txt
│   └── sitemap.ts           # sitemap.xml
├── components/              # Reactコンポーネント
│   ├── Header.tsx           # ヘッダーナビゲーション
│   ├── Footer.tsx           # フッター
│   ├── ThemeProvider.tsx    # テーマプロバイダー
│   ├── ThemeToggle.tsx      # ダークモード切り替え
│   └── ...                  # その他のコンポーネント
├── content/                 # Markdownコンテンツ
│   ├── profile.md           # プロフィール情報
│   ├── projects/            # プロジェクトのMarkdown
│   └── reviews/             # レビューのMarkdown
│       ├── music/
│       ├── movies/
│       ├── manga/
│       └── books/
├── lib/                     # ユーティリティ関数
│   └── content.ts           # コンテンツ読み込み関数
└── public/                  # 静的ファイル
```

## コンテンツの追加方法

### プロフィールの更新

`content/profile.md` を編集してください。

### プロジェクトの追加

`content/projects/` に新しいMarkdownファイルを作成：

```markdown
---
title: "プロジェクト名"
description: "プロジェクトの説明"
thumbnail: "/images/project-thumbnail.png"
technologies: ["React", "Next.js", "TypeScript"]
category: "Web Development"
date: "2024-01-01"
demoUrl: "https://demo.example.com"
githubUrl: "https://github.com/username/repo"
---

プロジェクトの詳細な説明をここに記述...
```

### レビューの追加

`content/reviews/[category]/` に新しいMarkdownファイルを作成：

```markdown
---
title: "タイトル"
category: "music" # または "movie", "manga", "book"
rating: 5
thumbnail: "/images/review-thumbnail.png"
excerpt: "簡単な感想"
publishedAt: "2024-01-01"
author: "著者名"
releaseYear: 2024
---

レビューの詳細な内容をここに記述...
```

## デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com)にアカウントを作成
2. GitHubリポジトリを接続
3. プロジェクトをインポート
4. 環境変数を設定（必要な場合）
5. デプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### その他のプラットフォーム

このプロジェクトは静的サイト生成（SSG）を使用しているため、以下のプラットフォームでもデプロイ可能です：

- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS Amplify

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 作成者

Generated with [Claude Code](https://claude.com/claude-code)
