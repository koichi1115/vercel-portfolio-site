---
title: "クロード Alexaスキル"
description: "Amazon AlexaからAnthropic Claudeと日本語で音声会話ができるカスタムスキル"
thumbnail: "/images/projects/claude-alexa-icon.png"
technologies:
  - "Alexa Skills Kit"
  - "AWS Lambda"
  - "Claude API"
  - "Node.js"
  - "DynamoDB"
category: "Voice Application"
date: "2026-03-16"
---

# クロード Alexaスキル

Amazon Alexaデバイス（Echo等）からAnthropic社の生成AI「Claude」と日本語で自然な音声会話ができるカスタムスキルです。

## 主な機能

- **音声会話**: 「アレクサ、クロードを開いて」で起動し、自由に質問や会話が可能
- **会話履歴**: セッション中の文脈を記憶し、自然な対話を実現
- **Web検索**: Brave Search APIを利用したリアルタイム情報取得
- **サブスクリプション**: 無料プラン（1日10回）とプレミアムプラン（無制限）

## 技術スタック

- **フロントエンド**: Alexa Skills Kit / Voice User Interface
- **バックエンド**: AWS Lambda (Node.js)
- **AI**: Anthropic Claude API
- **データベース**: Amazon DynamoDB（会話履歴・利用状況管理）
- **検索**: Brave Search API
- **課金**: Alexa In-Skill Purchasing (ISP)

## 法的情報

- [プライバシーポリシー](/legal/claude-alexa/privacy)
- [利用規約](/legal/claude-alexa/terms)

## 利用方法

1. Alexaアプリで「クロード」を検索してスキルを有効化
2. 「アレクサ、クロードを開いて」で起動
3. 自由に質問や会話をお楽しみください

## 注意事項

- 生成AIの回答には誤りが含まれる可能性があります
- 個人情報は入力しないでください
- 重要な判断は必ずご自身で確認してください
