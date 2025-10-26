---
title: "Next.js 15でポートフォリオサイトを構築した学び"
date: "2025-01-15"
excerpt: "Next.js 15のApp Routerを使って、初めて本格的なポートフォリオサイトを構築しました。学んだことと躓いたポイントをまとめます。"
tags: ["Next.js", "React", "Web開発", "学習記録"]
---

## はじめに

これまでバックエンドやインフラ周りの業務が中心だったため、モダンなフロントエンド開発の経験が少なかった。今回、自分のポートフォリオサイトを作るにあたり、Next.js 15を選んだ理由と学びを記録しておく。

## なぜNext.js 15を選んだか

- **SSG（静的サイト生成）対応**: ポートフォリオサイトは更新頻度が低いため、ビルド時に全ページを生成できるSSGが最適
- **TypeScript完全対応**: 型安全な開発環境が整っている
- **Vercelとの親和性**: デプロイが簡単（GitHubにプッシュするだけで自動デプロイ）
- **最新のReact機能**: Server Componentsなど最新の機能を試せる

## 学んだこと

### 1. App Routerの設計思想

従来のPages Routerと異なり、App Routerでは：
- ファイルシステムベースのルーティング
- `page.tsx`がページコンポーネント
- `layout.tsx`で共通レイアウトを定義
- Server ComponentsとClient Componentsの使い分け

最初は戸惑ったが、慣れると非常に直感的だった。

### 2. Markdownコンテンツの管理

当初Contentlayerを使おうとしたが、Next.js 15との互換性問題で断念。

結果的に以下の構成で自作した：
- `gray-matter`: Frontmatterの解析
- `remark`: Markdownの処理
- `remark-html`: HTML変換

これにより、ブログ記事やプロジェクト紹介を全てMarkdownで管理できるようになった。

### 3. Tailwind CSSの効率性

CSSフレームワークはBootstrapしか使ったことがなかったが、Tailwind CSSは驚くほど効率的だった。

特に：
- ユーティリティファーストで開発が速い
- ダークモード対応が簡単（`dark:`プレフィックス）
- レスポンシブデザインも直感的（`md:`、`lg:`など）

## 躓いたポイント

### Contentlayerの互換性問題

Next.js 15との非互換により、自前でMarkdown処理を実装する必要があった。ただ、これがかえって仕組みの理解につながった。

### Typographyプラグインの導入忘れ

Markdownで記述した本文が正しくスタイリングされず、原因究明に時間がかかった。`@tailwindcss/typography`プラグインの追加で解決。

### 画像パスの管理

`public/`ディレクトリの画像を参照する際、パスは`/images/...`のように`public`を含めないことに最初気づかなかった。

## 今後の展望

- パフォーマンス最適化（Lighthouse 100点を目指す）
- アニメーションの追加（Framer Motionの導入検討）
- 検索機能の実装
- コメント機能の追加（Giscusなど）

## まとめ

Next.js 15での開発は学びが多く、非常に楽しい経験だった。特にServer ComponentsとStatic Site Generationの組み合わせは、パフォーマンスとDXの両立を実現できる素晴らしい技術だと感じた。

今後も継続的にアップデートしていきたい。
