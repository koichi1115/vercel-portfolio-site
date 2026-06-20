---
title: "おたよりAI"
description: "学校・保育園のプリントをAIで自動解析し、イベント・TODO・持ち物を抽出してGoogleカレンダー登録・LINE通知まで一気通貫で行うiOSアプリ。"
thumbnail: "/images/otayori-ai/icon.png"
technologies:
  - "React Native"
  - "Expo"
  - "TypeScript"
  - "Claude API"
  - "Gemini API"
  - "OpenAI API"
  - "Google Drive API"
  - "Google Calendar API"
  - "Google Tasks API"
  - "LINE Messaging API"
  - "SQLite"
category: "iOS Application"
date: "2026-06-20"
demoUrl: "https://github.com/koichi1115/otayori-ai"
---

# おたよりAI

**プリントの山を、AIが整理する。** 学校・保育園から届くプリントをAIで自動解析し、予定管理を劇的にラクにするiOSアプリです。

## 解決する課題

- 大量のプリントから予定を拾い出すのが面倒
- 提出物の期限をうっかり忘れてしまう
- 持ち物リストを見落として子供に申し訳ない思いをした
- プリントのファイル名を手動で整理するのが大変

## コア機能

### 1. AI自動解析
PDFや写真を取り込むだけで、高精度AIが内容を分析。イベント（運動会、遠足）、TODO（同意書提出、申込み）、持ち物（水着、弁当）を自動で抽出・分類します。

### 2. マルチAIモデル対応
Claude・Gemini・OpenAIの3つのAIモデルから選択可能。用途やコストに合わせて最適なモデルを選べます。

### 3. Googleカレンダー / タスク連携
抽出したイベントをワンタップでGoogleカレンダーに登録。TODO・持ち物はGoogleタスクへ。元のプリントへのリンクも付くので、いつでも元資料を確認できます。

### 4. Google Drive同期
指定フォルダにプリントを入れるだけで自動処理。ファイル名もAIが「2026-06_○○保育園_6月園だより.pdf」のように自動リネーム。

### 5. LINE通知
解析結果をLINEで自動通知。パートナーとの情報共有もスムーズに。

### 6. 複数の子供・施設に対応
子供の名前やクラス、施設を登録しておくと、AIが「誰の」「どこの」プリントかを正確に判別します。

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| アプリ | React Native (Expo SDK 56) + TypeScript |
| ローカルDB | SQLite (expo-sqlite, WAL mode) |
| AI解析 | Claude Haiku 4.5 / Gemini 2.5 Flash / GPT-4o mini |
| 認証 | Google OAuth 2.0 (expo-auth-session) |
| 外部連携 | Google Drive / Calendar / Tasks API |
| 通知 | LINE Messaging API |

## アーキテクチャ

```
PDF/画像の取り込み → AI解析（構造化JSON） → アプリ内DB保存
  → Googleカレンダー予定 / Googleタスク / LINE通知 へミラー登録
```

アプリ内DBを正のデータソースとし、外部サービスへはミラー登録する設計。これにより、おたよりAI経由の登録だけを確実にフィルタ・管理できます。

## ターゲットユーザー

- **共働きの保護者**: プリントを読む時間がない
- **子供が複数いる家庭**: プリントの量が多く、仕分けが大変
- **デジタル整理派**: 紙のプリントをすべてデジタル化したい

## 背景

元々Google Apps Script（GAS）で自作運用していたPDF解析→カレンダー登録の仕組みを、iOSネイティブアプリとして再構築。ファイル名の自動リネーム、カテゴリ自動分類、マルチモデル対応など、GAS版の課題をすべて解消しています。
