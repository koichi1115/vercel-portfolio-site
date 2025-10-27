# 背景画像ディレクトリ

このディレクトリは、サイト全体の背景画像を配置するためのものです。

## 推奨される画像

### メイン背景画像 (main-bg.jpg)

**推奨サイズ**: 2560x1440px または 1920x1080px
**ファイル形式**: JPG (最適化済み)
**ファイルサイズ**: 300KB以下推奨

**おすすめの画像の種類**:
1. **抽象的なグラデーション・パターン**
   - 色彩豊かだが派手すぎない
   - テキストの可読性を損なわない

2. **自然の風景**
   - 山、海、空など
   - ソフトフォーカス、または淡い色合い
   - コントラストが強すぎないもの

3. **幾何学的パターン**
   - ミニマルで洗練されたデザイン
   - 落ち着いた色調

4. **テクスチャ**
   - 紙、布、石など
   - ニュートラルカラー

## 無料で高品質な画像を入手できるサイト

- **Unsplash**: https://unsplash.com/
  - キーワード例: "abstract gradient", "minimal texture", "soft landscape"
- **Pexels**: https://www.pexels.com/
- **Pixabay**: https://pixabay.com/

## 画像の最適化

画像をダウンロードしたら、以下で最適化することをおすすめします：

1. **TinyPNG** (https://tinypng.com/)
2. **Squoosh** (https://squoosh.app/)

## 配置方法

1. 画像をダウンロード
2. `main-bg.jpg` という名前にリネーム
3. このディレクトリに配置: `public/images/backgrounds/main-bg.jpg`
4. サイトを再読み込み

## カスタマイズ

`app/layout.tsx` で以下のオプションを調整できます：

```tsx
<BackgroundImage
  src="/images/backgrounds/main-bg.jpg"
  overlay="gradient"  // 'light' | 'dark' | 'gradient'
  blur={true}         // true | false
/>
```

- **overlay**: オーバーレイの種類
  - `gradient`: グラデーションオーバーレイ（推奨）
  - `light`: 明るい半透明オーバーレイ
  - `dark`: 暗い半透明オーバーレイ

- **blur**: ぼかし効果
  - `true`: ぼかしあり（推奨、コンテンツが際立つ）
  - `false`: ぼかしなし
