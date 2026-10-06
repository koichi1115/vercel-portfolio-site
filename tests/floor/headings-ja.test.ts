import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Floor } from '@/components/floor/Floor';
import { ProjectsList } from '@/components/ProjectsList';
import { ProjectDetail } from '@/components/ProjectDetail';
import { ProfileDetail } from '@/components/ProfileDetail';
import { CareerTimeline } from '@/components/CareerTimeline';
import { SkillsSection } from '@/components/SkillsSection';
import { DiariesList } from '@/components/DiariesList';
import { DiaryDetail } from '@/components/DiaryDetail';
import { ReviewsList } from '@/components/ReviewsList';
import { ReviewDetail } from '@/components/ReviewDetail';
import { loadTownConfig, resolveFloor } from '@/lib/town/floors';

const project = {
  slug: 'sample', title: '作品名', description: '説明', thumbnail: '', technologies: ['TypeScript'],
  category: 'アプリ', date: '2026-01-01', content: '<h2>概要</h2><p>本文</p>',
};
const diary = { slug: 'sample', title: '日記名', date: '2026-01-01', excerpt: '要約', tags: ['記録'], content: '<h2>本文</h2>' };
const review = {
  slug: 'sample', title: 'レビュー名', category: 'book' as const, rating: 4, thumbnail: '',
  excerpt: '感想', publishedAt: '2026-01-01', content: '<h2>感想</h2>',
};
const profile = {
  name: '表示名', title: '肩書', bio: '紹介', careers: [], skills: [], content: '<h2>自己紹介</h2>',
};

function render(elements: ReactElement[]): string {
  return elements.map((element) => renderToStaticMarkup(element)).join('');
}

describe('日本語見出し', () => {
  it('固定データのh1からh3に英字だけの見出しが無い', () => {
    const floor = resolveFloor(loadTownConfig(), '/projects');
    const html = render([
      createElement(Floor, { floor, title: '作品', children: createElement('p', null, '本文') }),
      createElement(ProjectsList, { projects: [project] }),
      createElement(ProjectDetail, { project }),
      createElement(ProfileDetail, { profile }),
      createElement(CareerTimeline, { careers: [{ company: '会社', position: '役割', period: '現在', description: '説明', achievements: ['成果'] }] }),
      createElement(SkillsSection, { skills: [{ category: '開発', skills: ['TypeScript'] }] }),
      createElement(DiariesList, { diaries: [diary] }),
      createElement(DiaryDetail, { diary }),
      createElement(ReviewsList, { reviews: [review] }),
      createElement(ReviewDetail, { review }),
    ]);
    const headings = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g)]
      .map((match) => match[1].replace(/<[^>]+>/g, '').trim())
      .filter((text) => text !== 'GitHub');
    expect(headings.filter((text) => /^[\x00-\x7F]+$/.test(text))).toEqual([]);
  });

  it('旧英語見出しと一覧導線を描かない', () => {
    const sources = render([
      createElement(ProjectsList, { projects: [project] }),
      createElement(DiariesList, { diaries: [diary] }),
      createElement(ReviewsList, { reviews: [review] }),
      createElement(ProfileDetail, { profile }),
      createElement(CareerTimeline, { careers: [] }),
      createElement(SkillsSection, { skills: [] }),
    ]);
    for (const text of ['About Me', 'Career', 'Skills', 'Projects', 'Diaries', 'Reviews', 'Contact', 'View project', 'Read entry']) {
      expect(sources).not.toContain(text);
    }
  });
});
