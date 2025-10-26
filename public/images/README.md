# 画像ファイルの配置ガイド

このディレクトリに画像ファイルを配置してください。

## ディレクトリ構造

```
public/images/
├── profile/           # プロフィール画像
│   └── avatar.jpg     # プロフィールアイコン (推奨サイズ: 512x512px)
├── projects/          # プロジェクトのサムネイル
│   ├── project-1.jpg  # プロジェクト1のサムネイル (推奨サイズ: 1200x630px)
│   ├── project-2.jpg
│   └── project-3.jpg
└── reviews/           # レビューのサムネイル
    ├── music/         # 音楽レビュー
    │   ├── album-1.jpg (推奨サイズ: 600x600px)
    │   └── album-2.jpg
    ├── movies/        # 映画レビュー
    │   ├── movie-1.jpg (推奨サイズ: 400x600px)
    │   └── movie-2.jpg
    ├── manga/         # 漫画レビュー
    │   ├── manga-1.jpg (推奨サイズ: 400x600px)
    │   └── manga-2.jpg
    └── books/         # 書籍レビュー
        ├── book-1.jpg (推奨サイズ: 400x600px)
        └── book-2.jpg
```

## 画像の推奨フォーマット

- **フォーマット**: JPG, PNG, WebP, AVIF
- **プロフィールアイコン**: 正方形 (512x512px 推奨)
- **プロジェクトサムネイル**: 16:9 (1200x630px 推奨)
- **レビューサムネイル**: 2:3 または 1:1 (600x900px または 600x600px 推奨)

## 画像の最適化

Next.jsは自動的に画像を最適化しますが、以下を推奨：
- ファイルサイズ: 500KB以下
- 品質: 80-90%
- 必要に応じて事前に圧縮（https://tinypng.com/ など）

## 使用方法

画像ファイルを配置したら、Markdownファイルで以下のように参照：

### プロフィール画像の例

`content/profile.md`:
```markdown
---
name: "山田太郎"
title: "ソフトウェアエンジニア"
avatar: "/images/profile/avatar.jpg"
...
---
```

### プロジェクト画像の例

`content/projects/my-project.md`:
```markdown
---
title: "ECサイトプラットフォーム"
thumbnail: "/images/projects/ecommerce-platform.jpg"
...
---
```

### レビュー画像の例

`content/reviews/music/bohemian-rhapsody.md`:
```markdown
---
title: "Bohemian Rhapsody"
thumbnail: "/images/reviews/music/bohemian-rhapsody.jpg"
...
---
```

## 注意事項

- パスは必ず `/images/` から始める（`public/`は不要）
- ファイル名はスラッグと同じにすると管理しやすい
- 画像が存在しない場合は、プレースホルダー（グラデーション）が表示される
