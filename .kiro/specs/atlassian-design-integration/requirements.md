# Requirements Document - Atlassian Design System Integration

## Project Description

既存のVercelポートフォリオサイトのフロントエンドデザインを、Atlassian Design Systemの原則に基づいて再構成する。

### プロジェクト概要
- 一貫性のあるデザインシステムの導入
- コンポーネントの再利用性向上
- アクセシビリティの改善
- モダンで洗練されたUI/UXの実現

### 現在の技術スタック
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- next-themes（ダークモード対応）

### Atlassian Design Systemの主要原則
1. **Design Tokens**: 一貫したデザイン変数
2. **8px Grid System**: すべてのスペーシングは8の倍数
3. **Color System**: Primary (Blue), Secondary (Purple, Teal), Neutral, Semantic
4. **Typography Scale**: 明確なタイポグラフィ階層
5. **Elevation System**: 一貫したシャドウとレイヤリング
6. **Component Patterns**: 再利用可能なコンポーネント
7. **Accessibility**: WCAG 2.1 AA準拠
8. **Motion & Animation**: 滑らかなトランジション

---

## Requirements

### Requirement 1: Design Tokens System
**Objective:** デザイントークンを定義し、Tailwind CSS設定に統合する

#### Acceptance Criteria
1. WHEN Tailwind設定を更新した THEN システム SHALL Atlassian Design Systemのカラーパレットを含む
   - Primary: Blue (`#0052CC`, `#0065FF`, `#0747A6`)
   - Secondary: Purple, Teal, Green
   - Neutral: N0-N900 (グレースケール)
   - Semantic: Success (Green), Warning (Yellow), Error (Red), Info (Blue)

2. WHEN デザイントークンを定義した THEN システム SHALL 8px gridベースのスペーシングスケールを提供する
   - Spacing: 0, 0.25rem(2px), 0.5rem(4px), 1rem(8px), 1.5rem(12px), 2rem(16px), 2.5rem(20px), 3rem(24px), 4rem(32px), 6rem(48px), 8rem(64px)

3. IF タイポグラフィトークンが定義されている THEN システム SHALL 以下のフォントサイズスケールを提供する
   - Font sizes: 11px, 12px, 14px, 16px, 20px, 24px, 29px, 35px, 42px
   - Font weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
   - Line heights: 1.2, 1.4, 1.6

4. WHEN シャドウトークンを定義した THEN システム SHALL 4段階のエレベーションを提供する
   - Elevation: raised (low), overlay (medium), dialog (high), modal (highest)

### Requirement 2: Color System Implementation
**Objective:** Atlassian風のカラーシステムを実装し、ダークモード対応する

#### Acceptance Criteria
1. WHEN ライトモードが有効な THEN システム SHALL Atlassian Design Systemのライトカラーを使用する
   - Background: N0 (#FFFFFF)
   - Surface: N10 (#FAFBFC)
   - Text primary: N900 (#172B4D)
   - Text secondary: N300 (#5E6C84)

2. WHEN ダークモードが有効な THEN システム SHALL Atlassian風のダークカラーを使用する
   - Background: N900 (#0D1117)
   - Surface: N800 (#161B22)
   - Text primary: N0 (#FFFFFF)
   - Text secondary: N100 (#C9D1D9)

3. IF カラートークンが使用されている THEN システム SHALL セマンティックカラーをサポートする
   - Success: G400 (#00875A)
   - Warning: Y400 (#FF991F)
   - Error: R400 (#DE350B)
   - Info: B400 (#0052CC)

### Requirement 3: Typography System
**Objective:** 統一されたタイポグラフィシステムを実装する

#### Acceptance Criteria
1. WHEN タイポグラフィコンポーネントを作成した THEN システム SHALL 以下の見出しスタイルを提供する
   - H1: 35px, Bold, 1.2 line-height
   - H2: 29px, Semibold, 1.2 line-height
   - H3: 24px, Semibold, 1.4 line-height
   - H4: 20px, Semibold, 1.4 line-height
   - H5: 16px, Semibold, 1.4 line-height
   - H6: 14px, Semibold, 1.4 line-height

2. WHEN ボディテキストを表示する THEN システム SHALL 以下のテキストスタイルを提供する
   - Body: 14px, Regular, 1.6 line-height
   - Body large: 16px, Regular, 1.6 line-height
   - Small: 12px, Regular, 1.4 line-height
   - Caption: 11px, Regular, 1.4 line-height

3. IF テキストコンポーネントが使用されている THEN システム SHALL カラーバリアント（primary, secondary, disabled）をサポートする

### Requirement 4: Component Library - Buttons
**Objective:** Atlassian風のボタンコンポーネントを実装する

#### Acceptance Criteria
1. WHEN Buttonコンポーネントを作成した THEN システム SHALL 以下のバリアントを提供する
   - Primary: Blue background, white text
   - Secondary: Gray background, dark text
   - Subtle: Transparent background, hover effect
   - Link: Text button with underline on hover
   - Danger: Red background for destructive actions

2. WHEN ボタンが表示される THEN システム SHALL 以下のサイズバリアントを提供する
   - Small: height 32px, padding 0 12px, font-size 14px
   - Medium: height 40px, padding 0 16px, font-size 14px (default)
   - Large: height 48px, padding 0 20px, font-size 16px

3. IF ボタンがインタラクティブである THEN システム SHALL 以下の状態をサポートする
   - Default, Hover, Active, Focus, Disabled, Loading
   - Focus state: 2px blue outline with offset

4. WHEN ボタンがクリックされた THEN システム SHALL 150ms duration のスムーズなトランジションを提供する

### Requirement 5: Component Library - Cards
**Objective:** 統一されたCardコンポーネントを実装する

#### Acceptance Criteria
1. WHEN Cardコンポーネントを作成した THEN システム SHALL 以下の要素をサポートする
   - Header (optional): タイトル、サブタイトル、アクション
   - Body: メインコンテンツ
   - Footer (optional): アクション、メタデータ

2. WHEN カードが表示される THEN システム SHALL エレベーションをサポートする
   - Default: border only (no shadow)
   - Raised: subtle shadow (0 1px 1px rgba(0,0,0,0.1))
   - Elevated: medium shadow (0 4px 8px rgba(0,0,0,0.12))

3. IF カードがクリック可能である THEN システム SHALL ホバー状態で視覚的フィードバックを提供する
   - Hover: 軽いシャドウの増加、カーソル変更

4. WHEN カードが表示される THEN システム SHALL 8px gridに基づくパディングを使用する
   - Compact: padding 12px
   - Default: padding 16px
   - Comfortable: padding 24px

### Requirement 6: Component Library - Navigation
**Objective:** Atlassian風のナビゲーションコンポーネントを実装する

#### Acceptance Criteria
1. WHEN Headerナビゲーションを更新した THEN システム SHALL 以下の要素を含む
   - Logo/Brand area
   - Primary navigation links
   - Secondary actions (theme toggle, search, user menu)
   - Mobile responsive menu

2. WHEN ナビゲーションリンクがアクティブな THEN システム SHALL 視覚的インジケーターを表示する
   - Active state: border-bottom 2px blue
   - Hover state: background color change

3. IF モバイルビューである THEN システム SHALL ハンバーガーメニューを表示し、クリックでサイドドロワーを開く

4. WHEN ナビゲーションが表示される THEN システム SHALL sticky positionで上部に固定される
   - Backdrop blur effect for modern look
   - Border bottom for visual separation

### Requirement 7: Component Library - Badges
**Objective:** ステータス表示用のBadgeコンポーネントを実装する

#### Acceptance Criteria
1. WHEN Badgeコンポーネントを作成した THEN システム SHALL 以下のバリアントを提供する
   - Default: neutral gray
   - Primary: blue
   - Success: green
   - Warning: yellow
   - Error: red
   - Info: teal

2. WHEN バッジが表示される THEN システム SHALL 以下のサイズをサポートする
   - Small: height 20px, font-size 11px
   - Medium: height 24px, font-size 12px (default)

3. IF バッジが表示されている THEN システム SHALL 角丸とパディングを適用する
   - Border radius: 3px
   - Padding: 0 8px

### Requirement 8: Layout System
**Objective:** 8px gridベースのレイアウトシステムを実装する

#### Acceptance Criteria
1. WHEN レイアウトを構築する THEN システム SHALL Container コンポーネントを提供する
   - Max-width: 1280px
   - Padding: 16px (mobile), 24px (tablet), 32px (desktop)
   - Centered with mx-auto

2. WHEN セクション間のスペーシングを定義する THEN システム SHALL 8の倍数を使用する
   - Section spacing: 48px (mobile), 64px (tablet), 96px (desktop)

3. IF グリッドレイアウトが使用されている THEN システム SHALL レスポンシブグリッドをサポートする
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 3-4 columns
   - Gap: 16px (mobile), 24px (desktop)

### Requirement 9: Accessibility Enhancements
**Objective:** WCAG 2.1 AA準拠のアクセシビリティを実装する

#### Acceptance Criteria
1. WHEN カラーを使用する THEN システム SHALL 4.5:1以上のコントラスト比を保証する
   - Text: 4.5:1 minimum
   - Large text (18px+): 3:1 minimum

2. WHEN インタラクティブ要素が表示される THEN システム SHALL フォーカスインジケーターを提供する
   - Focus ring: 2px solid, blue color, 2px offset
   - Keyboard navigation support

3. IF フォームが存在する THEN システム SHALL 適切なラベルとARIA属性を含む
   - Label association
   - Error messages with aria-describedby
   - Required field indication

4. WHEN コンポーネントが使用される THEN システム SHALL セマンティックHTMLを使用する
   - Proper heading hierarchy
   - nav, main, article, section elements
   - Button vs link distinction

### Requirement 10: Existing Pages Update
**Objective:** 既存ページをAtlassian Design Systemに基づいて更新する

#### Acceptance Criteria
1. WHEN Home pageを更新した THEN システム SHALL 新しいデザインシステムを使用する
   - HeroSection: 更新されたタイポグラフィとスペーシング
   - RecentProjects: Cardコンポーネントを使用
   - RecentReviews: Cardコンポーネントを使用
   - RecentDiaries: Cardコンポーネントを使用

2. WHEN Profile pageを更新した THEN システム SHALL 新しいコンポーネントを使用する
   - Career timeline: カードベースのレイアウト
   - Skills section: Badgeコンポーネントでスキル表示

3. WHEN Projects pageを更新した THEN システム SHALL グリッドレイアウトとカードを使用する
   - Project cards: 統一されたCardコンポーネント
   - Filter/Sort UI: 新しいButtonスタイル

4. WHEN Reviews pageを更新した THEN システム SHALL カテゴリ別表示を改善する
   - Category badges
   - Rating display
   - Card-based layout

5. WHEN Diaries pageを更新した THEN システム SHALL タイムラインベースのレイアウトを使用する
   - Date badges
   - Card-based entries

---

## Technical Constraints

1. 既存の技術スタック（Next.js 15, React 19, TypeScript, Tailwind CSS）を維持
2. next-themesによるダークモード対応を継続
3. パフォーマンスを維持（LCP 2.5秒以内）
4. レスポンシブデザインの維持
5. SEO最適化の維持

## Out of Scope

1. 新機能の追加（デザイン再構成のみ）
2. バックエンドの変更
3. MDXコンテンツフォーマットの変更
4. サードパーティライブラリの大規模導入（Atlassian Design System自体のインストールは行わない）

## Success Metrics

1. デザイン一貫性: 全ページで統一されたデザインシステム適用
2. コンポーネント再利用率: 80%以上
3. アクセシビリティスコア: Lighthouse 90点以上
4. パフォーマンス維持: LCP 2.5秒以内
5. コードメンテナンス性: コンポーネント数削減、ファイルサイズ最適化
