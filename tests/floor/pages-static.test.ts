import { describe, expect, it } from 'vitest';
import { readRepoFile } from '../town/helpers/read-file';

const pages = [
  'app/projects/page.tsx',
  'app/projects/[slug]/page.tsx',
  'app/diaries/page.tsx',
  'app/diaries/[slug]/page.tsx',
  'app/profile/page.tsx',
  'app/contact/page.tsx',
  'app/reviews/page.tsx',
  'app/reviews/[slug]/page.tsx',
];

const components = [
  'components/ProjectsList.tsx',
  'components/ProjectDetail.tsx',
  'components/ProfileDetail.tsx',
  'components/CareerTimeline.tsx',
  'components/SkillsSection.tsx',
  'components/DiariesList.tsx',
  'components/DiaryDetail.tsx',
  'components/ReviewsList.tsx',
  'components/ReviewDetail.tsx',
  'components/ThumbnailImage.tsx',
];

const forbidden =
  /PageHero|grain-overlay|aurora-glow|grid-lines|nebula-glow|bg-bone|dark:bg-abyss|font-syne|text-aurora|\bpanel\b|btn-volt|btn-ghost|bg-white|bg-paper|framer-motion|animate-|red-\d|text-error|bg-error|signLight|#[\da-f]{3,6}\b/i;

describe('対象ページの静的制約', () => {
  it.each(pages)('%s は共通フロアと下部ナビを使う', (file) => {
    const source = readRepoFile(file);
    expect(source).toMatch(/components\/floor\/Floor/);
    expect(source).toMatch(/lib\/town\/floors/);
    expect(source).toContain('Footer');
  });

  it.each([...pages, ...components])('%s に旧デザイン表現が無い', (file) => {
    expect(readRepoFile(file)).not.toMatch(forbidden);
  });

  it('危険表示は問い合わせのalertだけで使う', () => {
    const sources = [...pages, ...components].map((file) => ({
      file,
      source: readRepoFile(file),
    }));
    const dangerFiles = sources.filter(({ source }) => source.includes('styles.danger'));
    expect(dangerFiles.map(({ file }) => file)).toEqual(['app/contact/page.tsx']);
    expect(dangerFiles[0].source).toMatch(/role="alert"\s+className=\{styles\.danger\}/);
    expect(dangerFiles[0].source.match(/styles\.danger/g) ?? []).toHaveLength(1);
  });
});
