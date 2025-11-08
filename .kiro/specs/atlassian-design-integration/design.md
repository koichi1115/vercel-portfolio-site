# Design Document - Atlassian Design System Integration

## Architecture Overview

このデザインドキュメントでは、Atlassian Design Systemの原則を既存のNext.js + Tailwind CSSアーキテクチャに統合する方法を定義します。

### Design Philosophy

1. **Atomic Design**: 小さな再利用可能なコンポーネントから大きなコンポーネントを構築
2. **Design Tokens First**: すべてのデザイン決定をトークンで管理
3. **Accessibility by Default**: すべてのコンポーネントでWCAG 2.1 AA準拠
4. **Performance Conscious**: 最小限のCSS、効率的なTailwind設定
5. **Dark Mode Native**: ライトモードとダークモードの両方を最初からサポート

---

## Design Token System

### Color Tokens

Atlassian Design Systemのカラーパレットを以下のように定義します：

#### Primary Colors (Blue)
```
B50:  #DEEBFF  (lightest)
B100: #B3D4FF
B200: #4C9AFF
B300: #2684FF
B400: #0065FF  (main)
B500: #0052CC  (dark)
B600: #0747A6  (darker)
B700: #0B3D91  (darkest)
```

#### Neutral Colors
```
N0:   #FFFFFF  (white)
N10:  #FAFBFC  (lightest gray)
N20:  #F4F5F7
N30:  #EBECF0
N40:  #DFE1E6
N50:  #C1C7D0
N100: #B3BAC5
N200: #A5ADBA
N300: #8993A4  (medium gray)
N400: #7A869A
N500: #6B778C
N600: #5E6C84
N700: #505F79
N800: #42526E
N900: #253858  (dark)
N1000: #091E42 (darkest)
DN900: #0D1117 (dark mode background)
DN800: #161B22 (dark mode surface)
```

#### Semantic Colors
```
Success (Green):
G50:  #E3FCEF
G400: #00875A  (main)
G500: #006644

Warning (Yellow):
Y50:  #FFFAE6
Y400: #FF991F  (main)
Y500: #FF8B00

Error (Red):
R50:  #FFEBE6
R400: #DE350B  (main)
R500: #BF2600

Info (Teal):
T50:  #E6FCFF
T400: #00B8D9  (main)
T500: #00A3BF
```

### Spacing Tokens (8px Grid)

```
0:    0
0.5:  0.125rem  (2px)
1:    0.25rem   (4px)
2:    0.5rem    (8px)
3:    0.75rem   (12px)
4:    1rem      (16px)
5:    1.25rem   (20px)
6:    1.5rem    (24px)
8:    2rem      (32px)
10:   2.5rem    (40px)
12:   3rem      (48px)
16:   4rem      (64px)
20:   5rem      (80px)
24:   6rem      (96px)
```

### Typography Tokens

#### Font Families
```
sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif
mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Courier New', monospace
```

#### Font Sizes
```
xs:   0.6875rem  (11px)
sm:   0.75rem    (12px)
base: 0.875rem   (14px)
lg:   1rem       (16px)
xl:   1.25rem    (20px)
2xl:  1.5rem     (24px)
3xl:  1.8125rem  (29px)
4xl:  2.1875rem  (35px)
5xl:  2.625rem   (42px)
```

#### Font Weights
```
normal:    400
medium:    500
semibold:  600
bold:      700
```

#### Line Heights
```
tight:   1.2
normal:  1.4
relaxed: 1.6
loose:   1.8
```

### Shadow Tokens (Elevation)

```
sm:      0 1px 1px rgba(0, 0, 0, 0.1)                         (raised)
md:      0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)  (overlay)
lg:      0 8px 16px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)  (dialog)
xl:      0 12px 24px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1) (modal)
```

### Border Radius Tokens

```
none: 0
sm:   0.125rem  (2px)
md:   0.1875rem (3px)
lg:   0.375rem  (6px)
xl:   0.5rem    (8px)
full: 9999px
```

---

## Component Architecture

### Component Structure

```
components/
├── ui/                      # 基本UIコンポーネント（Atlassian風）
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Typography.tsx
│   ├── Container.tsx
│   └── Avatar.tsx
├── layout/                  # レイアウトコンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
└── features/                # 機能別コンポーネント
    ├── HeroSection.tsx
    ├── ProjectCard.tsx
    ├── ReviewCard.tsx
    ├── DiaryCard.tsx
    ├── CareerTimeline.tsx
    └── SkillsSection.tsx
```

---

## Core Component Designs

### 1. Button Component

#### Variants
- **Primary**: Blue background, white text, for primary actions
- **Secondary**: Gray background, dark text, for secondary actions
- **Subtle**: Transparent background, hover effect, for tertiary actions
- **Link**: Text only, underline on hover
- **Danger**: Red background, for destructive actions

#### Sizes
- **Small**: h-8 (32px), px-3 (12px), text-sm
- **Medium**: h-10 (40px), px-4 (16px), text-base (default)
- **Large**: h-12 (48px), px-5 (20px), text-lg

#### States
- Default: normal appearance
- Hover: slight background darkening
- Active: background darkening + scale
- Focus: 2px blue ring with offset
- Disabled: opacity 50%, cursor not-allowed
- Loading: spinner + disabled state

#### Implementation Structure
```tsx
<Button
  variant="primary" | "secondary" | "subtle" | "link" | "danger"
  size="small" | "medium" | "large"
  disabled={boolean}
  loading={boolean}
  fullWidth={boolean}
  icon={ReactNode}
  iconPosition="left" | "right"
>
  Button Text
</Button>
```

### 2. Card Component

#### Structure
- **Header** (optional): Title, subtitle, actions
- **Body**: Main content area
- **Footer** (optional): Actions, metadata

#### Elevation
- **Flat**: border only, no shadow
- **Raised**: subtle shadow (shadow-sm)
- **Elevated**: medium shadow (shadow-md)

#### Variants
- **Default**: standard card
- **Clickable**: hover effect, cursor pointer
- **Outlined**: border emphasis

#### Implementation Structure
```tsx
<Card
  elevation="flat" | "raised" | "elevated"
  clickable={boolean}
  padding="compact" | "default" | "comfortable"
>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardSubtitle>Subtitle</CardSubtitle>
    <CardActions>Actions</CardActions>
  </CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>
```

### 3. Badge Component

#### Variants
- **Default**: Neutral gray
- **Primary**: Blue
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red
- **Info**: Teal

#### Sizes
- **Small**: h-5 (20px), text-xs, px-2
- **Medium**: h-6 (24px), text-sm, px-2 (default)

#### Implementation Structure
```tsx
<Badge
  variant="default" | "primary" | "success" | "warning" | "error" | "info"
  size="small" | "medium"
  dot={boolean}
>
  Badge Text
</Badge>
```

### 4. Typography Component

#### Heading Components
```tsx
<Heading size="h1" | "h2" | "h3" | "h4" | "h5" | "h6">
  Heading Text
</Heading>
```

#### Text Components
```tsx
<Text
  size="xs" | "sm" | "base" | "lg" | "xl"
  weight="normal" | "medium" | "semibold" | "bold"
  color="primary" | "secondary" | "disabled" | "success" | "warning" | "error"
>
  Text Content
</Text>
```

### 5. Container Component

#### Variants
- **Fluid**: Full width
- **Fixed**: Max-width with responsive padding

#### Implementation Structure
```tsx
<Container
  variant="fluid" | "fixed"
  padding={boolean}
>
  Content
</Container>
```

---

## Page-Specific Designs

### Home Page Redesign

#### HeroSection
- **Layout**: Centered content, max-width container
- **Typography**:
  - Title: Heading h1, gradient text effect
  - Subtitle: Text lg, secondary color
- **CTA Buttons**: Primary + Secondary buttons
- **Spacing**: py-24 (96px) on desktop, py-12 (48px) on mobile

#### RecentProjects/Reviews/Diaries Sections
- **Layout**: Grid layout, 3 columns desktop, 1 column mobile
- **Cards**: Elevated cards with hover effect
- **Section Header**: Heading h2, centered or left-aligned
- **Spacing**: py-16 (64px) between sections

### Profile Page Redesign

#### Career Timeline
- **Layout**: Vertical timeline with cards
- **Card Structure**: Year badge + Company card
- **Timeline Line**: Visual connector between cards
- **Spacing**: Gap of 24px between timeline items

#### Skills Section
- **Layout**: Grid layout with skill categories
- **Skill Display**: Badges with skill names
- **Categories**: Collapsible sections or tabs

### Projects Page Redesign

#### Projects Grid
- **Layout**: 3-column grid (desktop), 1-column (mobile)
- **Filter Bar**: Badge-based category filter
- **Project Cards**:
  - Thumbnail image
  - Title + description
  - Tech stack badges
  - Links (Demo, GitHub)

### Reviews Page Redesign

#### Reviews Layout
- **Category Tabs**: Music, Movies, Manga, Books
- **Grid Layout**: 2-3 columns
- **Review Cards**:
  - Cover image
  - Rating (stars/numbers)
  - Title + metadata
  - Excerpt
  - Badge for category

### Diaries Page Redesign

#### Diaries Timeline
- **Layout**: Timeline or card-based
- **Date Badge**: Prominent date display
- **Diary Cards**:
  - Title
  - Excerpt
  - Read more link
  - Tags/categories

---

## Responsive Design Strategy

### Breakpoints
```
sm:  640px   (mobile landscape, small tablets)
md:  768px   (tablets)
lg:  1024px  (small desktops)
xl:  1280px  (desktops)
2xl: 1536px  (large desktops)
```

### Mobile-First Approach
1. Design for mobile first (320px-640px)
2. Add tablet styles (640px-1024px)
3. Enhance for desktop (1024px+)

### Key Responsive Patterns
- **Navigation**: Hamburger menu → Horizontal nav
- **Grid Columns**: 1 → 2 → 3/4 columns
- **Typography**: Smaller sizes → Larger sizes
- **Spacing**: Compact → Comfortable
- **Images**: Stacked → Side-by-side

---

## Dark Mode Strategy

### Color Mapping

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | N0 (#FFFFFF) | DN900 (#0D1117) |
| Surface | N10 (#FAFBFC) | DN800 (#161B22) |
| Border | N40 (#DFE1E6) | N800 (#42526E) |
| Text Primary | N900 (#253858) | N0 (#FFFFFF) |
| Text Secondary | N300 (#8993A4) | N100 (#B3BAC5) |
| Text Disabled | N100 (#B3BAC5) | N400 (#7A869A) |
| Primary Blue | B400 (#0065FF) | B300 (#2684FF) |

### Implementation
- Use Tailwind's `dark:` modifier
- CSS variables for theme switching
- next-themes for state management

---

## Animation & Transitions

### Transition Durations
```
fast:   75ms   (instant feedback)
base:   150ms  (default)
slow:   300ms  (smooth transitions)
slower: 500ms  (dramatic effects)
```

### Common Transitions
- **Button hover**: background-color, transform (150ms)
- **Card hover**: shadow, transform (150ms)
- **Modal**: opacity, scale (300ms)
- **Drawer**: translateX (300ms)
- **Fade**: opacity (150ms)

### Easing Functions
```
ease-in:     cubic-bezier(0.4, 0, 1, 1)
ease-out:    cubic-bezier(0, 0, 0.2, 1)  (default)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

---

## Accessibility Guidelines

### Color Contrast
- Text on background: minimum 4.5:1
- Large text (18px+): minimum 3:1
- UI components: minimum 3:1

### Focus Indicators
- All interactive elements must have visible focus state
- Focus ring: 2px solid blue, 2px offset
- Skip links for keyboard navigation

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Use `<nav>`, `<main>`, `<article>`, `<section>`
- Button vs link: button for actions, link for navigation

### ARIA Attributes
- `aria-label` for icon-only buttons
- `aria-describedby` for form errors
- `aria-expanded` for collapsible sections
- `aria-live` for dynamic content

### Keyboard Navigation
- Tab order matches visual order
- Enter/Space for buttons
- Escape to close modals/drawers
- Arrow keys for menus

---

## Performance Optimization

### Tailwind Optimization
- Use JIT mode (enabled by default in Tailwind 3)
- Purge unused CSS
- Minimize custom CSS

### Image Optimization
- Use Next.js Image component
- WebP format with fallback
- Lazy loading for below-fold images
- Responsive images with srcset

### Code Splitting
- Dynamic imports for large components
- Route-based splitting (automatic with Next.js)
- Lazy load heavy third-party libraries

### CSS Strategy
- Utility-first approach with Tailwind
- Minimal custom CSS
- CSS variables for theme tokens
- Avoid inline styles where possible

---

## Implementation Priority

### Phase 1: Foundation (Priority: High)
1. Design tokens setup (Tailwind config, CSS variables)
2. Color system implementation (light + dark mode)
3. Typography system
4. Spacing system

### Phase 2: Core Components (Priority: High)
1. Button component
2. Card component
3. Badge component
4. Container component
5. Typography components

### Phase 3: Layout Components (Priority: Medium)
1. Header redesign
2. Footer redesign
3. Navigation improvements

### Phase 4: Page Updates (Priority: Medium)
1. Home page (HeroSection, Recent sections)
2. Profile page (Timeline, Skills)
3. Projects page (Grid, Cards)

### Phase 5: Final Polish (Priority: Low)
1. Reviews page
2. Diaries page
3. Animation refinements
4. Performance optimization
5. Accessibility audit

---

## Testing Strategy

### Visual Testing
- Test in Chrome, Firefox, Safari
- Test on mobile devices (iOS, Android)
- Test dark mode thoroughly
- Test at different zoom levels

### Accessibility Testing
- Lighthouse accessibility score (target: 90+)
- Keyboard navigation testing
- Screen reader testing (NVDA, VoiceOver)
- Color contrast validation

### Performance Testing
- Lighthouse performance score (target: 90+)
- Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Bundle size monitoring

### Responsive Testing
- Test all breakpoints (320px - 1920px+)
- Portrait and landscape orientations
- Common device sizes

---

## Maintenance Guidelines

### Adding New Components
1. Follow atomic design principles
2. Use design tokens consistently
3. Include dark mode support
4. Document props and usage
5. Add accessibility features

### Updating Tokens
1. Update in one place (tailwind.config.ts)
2. Test across all components
3. Verify dark mode compatibility
4. Document breaking changes

### Code Organization
1. Keep components small and focused
2. Use TypeScript for type safety
3. Follow consistent naming conventions
4. Document complex logic
5. Write reusable utilities

---

## Success Criteria

### Design Consistency
- ✓ All pages use design tokens
- ✓ Typography hierarchy is consistent
- ✓ Spacing follows 8px grid
- ✓ Colors match Atlassian palette

### Component Quality
- ✓ All components are reusable
- ✓ Props are well-typed (TypeScript)
- ✓ Dark mode support in all components
- ✓ Accessibility features included

### Performance
- ✓ Lighthouse score 90+ (Performance)
- ✓ LCP < 2.5s
- ✓ FID < 100ms
- ✓ CLS < 0.1

### Accessibility
- ✓ Lighthouse score 90+ (Accessibility)
- ✓ WCAG 2.1 AA compliant
- ✓ Keyboard navigation works
- ✓ Screen reader compatible

### Developer Experience
- ✓ Components are easy to use
- ✓ Documentation is clear
- ✓ TypeScript support is complete
- ✓ Code is maintainable
