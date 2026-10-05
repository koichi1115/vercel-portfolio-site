import { describe, expect, it } from 'vitest';
import urawa from '@/data/town/urawa.json';
import { parseTownConfig } from '@/lib/town/schema';
import { listAppRoutes } from './helpers/app-routes';

const town = parseTownConfig(urawa);
const routes = listAppRoutes();

describe('街のリンク先がすべて実在する', () => {
  it('app/ からルート一覧を作れる（api と動的セグメントは除外）', () => {
    expect(routes).toContain('/');
    expect(routes).toContain('/contact');
    expect(routes.some((r) => r.startsWith('/api'))).toBe(false);
    expect(routes.some((r) => r.includes('['))).toBe(false);
  });

  it.each(town.buildings.map((b) => [b.label, b.href]))('建物「%s」→ %s', (_label, href) => {
    expect(routes).toContain(href);
  });

  it.each(town.extraLinks.map((l) => [l.label, l.href]))('そのほか「%s」→ %s', (_label, href) => {
    expect(routes).toContain(href);
  });
});
