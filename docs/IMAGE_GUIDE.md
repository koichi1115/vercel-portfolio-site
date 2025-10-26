# 画像の使い方ガイド

このドキュメントでは、ポートフォリオサイトで画像を使用する方法を説明します。

## 📁 画像の配置場所

すべての画像は `public/images/` ディレクトリに配置します。

```
public/images/
├── profile/
│   └── avatar.jpg           # プロフィールアイコン
├── projects/
│   ├── project-name-1.jpg   # プロジェクトサムネイル
│   └── project-name-2.jpg
└── reviews/
    ├── music/
    ├── movies/
    ├── manga/
    └── books/
```

## 🖼️ 画像の推奨サイズ

### プロフィールアイコン
- **サイズ**: 512x512px（正方形）
- **フォーマット**: JPG, PNG, WebP
- **ファイルサイズ**: 100KB以下推奨

### プロジェクトサムネイル
- **サイズ**: 1200x630px（16:9比率）
- **フォーマット**: JPG, PNG, WebP
- **ファイルサイズ**: 500KB以下推奨

### レビューサムネイル
- **サイズ**: 600x900px（2:3比率、縦長）
- **フォーマット**: JPG, PNG, WebP
- **ファイルサイズ**: 300KB以下推奨

## 📝 使用方法

### 1. プロフィール画像

**ステップ1**: 画像を配置
```bash
# 画像ファイルを配置
public/images/profile/avatar.jpg
```

**ステップ2**: `content/profile.md` を編集
```markdown
---
name: "koichi"
title: "DX企画職"
bio: "..."
avatar: "/images/profile/avatar.jpg"  # この行を追加・有効化
careers:
  ...
---
```

### 2. プロジェクト画像

**ステップ1**: 画像を配置
```bash
# 例: ECサイトプロジェクトの画像
public/images/projects/ecommerce-platform.jpg
```

**ステップ2**: `content/projects/ecommerce-platform.md` を編集
```markdown
---
title: "ECサイトプラットフォーム"
description: "..."
thumbnail: "/images/projects/ecommerce-platform.jpg"  # 画像パスを指定
technologies: [...]
...
---
```

### 3. レビュー画像

**ステップ1**: 画像を配置
```bash
# 例: 音楽レビューの画像
public/images/reviews/music/bohemian-rhapsody.jpg
```

**ステップ2**: `content/reviews/music/bohemian-rhapsody.md` を編集
```markdown
---
title: "Bohemian Rhapsody"
category: "music"
thumbnail: "/images/reviews/music/bohemian-rhapsody.jpg"  # 画像パスを指定
rating: 5
...
---
```

## 🎨 画像がない場合の動作

画像を指定しない、または画像ファイルが存在しない場合は、**自動的にグラデーションのプレースホルダー**が表示されます。

- プロフィール: 青紫のグラデーション + 名前の頭文字
- プロジェクト: 青紫のグラデーション + プロジェクト名の頭文字
- レビュー: グレーのグラデーション + タイトルの頭文字

これにより、画像がなくてもサイトの見た目が崩れることはありません。

## 🚀 画像の最適化

Next.jsの`Image`コンポーネントが自動的に以下を行います：

1. **フォーマット最適化**: WebP/AVIFへの自動変換（ブラウザ対応に応じて）
2. **サイズ最適化**: デバイスに応じた適切なサイズで配信
3. **遅延読み込み**: 画面に表示される直前に読み込み（パフォーマンス向上）
4. **優先度制御**: 重要な画像（プロフィールなど）は優先的に読み込み

## 📋 チェックリスト

画像を追加する際は、以下を確認してください：

- [ ] 画像ファイルを `public/images/` 配下の適切なディレクトリに配置
- [ ] ファイル名は英数字とハイフンのみ（スペースや日本語は避ける）
- [ ] 画像サイズが推奨サイズに合っている
- [ ] ファイルサイズが適切（圧縮済み）
- [ ] Markdownファイルで画像パスを `/images/...` で指定
- [ ] ローカル開発サーバーで表示を確認: `npm run dev`
- [ ] ビルドが成功することを確認: `npm run build`

## 🔧 トラブルシューティング

### 画像が表示されない

1. **パスを確認**
   - `/images/` で始まっているか確認
   - `public/` は不要（自動的に解決される）
   - ファイル名の大文字小文字が一致しているか

2. **ファイルの存在を確認**
   ```bash
   ls public/images/profile/avatar.jpg
   ```

3. **開発サーバーを再起動**
   ```bash
   # Ctrl+C で停止後
   npm run dev
   ```

### 画像が粗く表示される

- 元の画像サイズが小さすぎる可能性があります
- 推奨サイズ以上の画像を使用してください

### ビルドが遅い

- 画像ファイルサイズが大きすぎる可能性があります
- 画像圧縮ツールで最適化してください
  - オンライン: https://tinypng.com/
  - CLI: `npx @squoosh/cli`

## 💡 ヒント

### 良い画像の選び方

- **プロフィール**: 明るく、顔がはっきり見える写真
- **プロジェクト**: プロジェクトの特徴が分かるスクリーンショット
- **レビュー**: 公式のカバーアートやポスター画像

### 画像の入手先

- **無料写真**: Unsplash, Pexels, Pixabay
- **アイコン**: Flaticon, Iconfinder
- **プロジェクト**: 自分で作成したスクリーンショット

### 著作権に注意

- 他人の著作物を無断で使用しないこと
- レビューのカバーアート: 引用の範囲内で使用（非営利目的）
- 不明な場合はプレースホルダーのままにする

## 📚 参考リンク

- [Next.js Image最適化](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [画像圧縮ツール - TinyPNG](https://tinypng.com/)
- [無料写真 - Unsplash](https://unsplash.com/)
