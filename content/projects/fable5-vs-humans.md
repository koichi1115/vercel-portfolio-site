---
title: "Fable5 vs 人類"
description: "最新AI Claude Fable 5 と日本語で対戦するチューリングテスト・ゲーム。2分間のチャットで相手が「AIか人間か」を見抜く、期間限定キャンペーン企画。Next.js + Claude/OpenAI API + Stripe + Supabase で実装。"
thumbnail: "/images/fable5/lp.png"
technologies:
  - "Next.js 15"
  - "React 19"
  - "TypeScript"
  - "Tailwind CSS v4"
  - "Claude API"
  - "OpenAI API"
  - "Supabase"
  - "Stripe"
  - "jose (JWT)"
  - "Vercel"
category: "Web Application"
date: "2026-06-10"
demoUrl: "https://fable5-vs-humans.vercel.app/"
demoLabel: "サイトを見る"
githubUrl: "https://github.com/koichi1115/fable5-vs-humans"
---

# Fable5 vs 人類

**あなたは最新AIを見抜けるか？** 2026年6月、Anthropic が公開したばかりの **Claude Fable 5** と日本語で対戦する、期間限定のチューリングテスト・ゲームです。

## コンセプト

- 2分間のテキストチャットで、相手AIが「人間っぽく」振る舞う
- プレイヤーは最後に「これはAIか、人間か」を判定
- 対戦モデルを選択可能：**Claude Fable 5 / GPT-5.5**（強いモデルほど単価が高い）
- 「Human or Not」系の心理ゲームを、最新モデルのニュース性に乗せて日本語向けに再構築

## コア機能

### 1. リアルタイムチャット対戦
2分間の制限時間で、相手と自由にテキストチャット。相手は人間に紛れて振る舞うAI、あるいは実プレイヤー。

### 2. AIの「人間らしさ」演出
実プレイヤーの言い回しを few-shot で注入し、AIの応答を人間の口調に寄せる「人間リアクション学習」を実装。

### 3. 人間混合マッチング
ロビー・待機キューで人間同士のマッチも成立させ、AI戦と人間戦を織り交ぜる。待機しきい値をチューニングして成立率を最適化。

### 4. 判定 & 正体開示
チャット終了後にプレイヤーが「AI / 人間」を判定。結果画面で相手の正体を開示し、正解／不正解を表示。

### 5. 課金フロー
モデル別の単価で Stripe Checkout 決済。ゲームトークンを JWT (jose) で発行・検証し、不正プレイを防止。

### 6. キャンペーン演出
リリース直後のニュース性を活かしたカウントダウン LP、統計表示、OG 画像の動的生成。IG/TikTok 向けの縦型(9:16)プロモ動画ページも用意。

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フロント | Next.js 15 (App Router) + React 19 + TypeScript |
| スタイル | Tailwind CSS v4 |
| AI | Anthropic Claude API / OpenAI API |
| 認証・データ | Supabase（認証・対戦データ） |
| 課金 | Stripe Checkout + Webhook |
| トークン | jose（ゲームトークンの JWT 署名・検証） |
| ホスティング | Vercel |

## キャンペーン

- **期間**：2026年6月10日（リリース日）〜 6月22日
- **訴求**：Claude Fable 5 リリース直後のニュース性を活用
- 期間終了後は v1 へ移行（X認証・ランキング機能などを追加予定）

## 法的留意

- 別名・自前実装のため Human or Not (AI21 Labs) の IP には抵触しない設計
- 特商法表記・利用規約・プライバシーポリシーを整備
