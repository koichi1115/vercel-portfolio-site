/**
 * middleware.ts の特性化。トップ置換で壊さないための固定テスト。
 * middleware.ts 自体は変更しない。
 */
import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { config, middleware } from '@/middleware';

function requestFor(host: string, path = '/') {
  return new NextRequest(new URL(path, 'https://example.test'), {
    headers: { host },
  });
}

describe('middleware（トップ置換で壊さない特性化）', () => {
  it('matcher はルートだけ', () => {
    expect(config.matcher).toBe('/');
  });

  it('purikan.app の "/" は /purikan に rewrite', () => {
    const res = middleware(requestFor('purikan.app'));
    expect(res.headers.get('x-middleware-rewrite')).toContain('/purikan');
  });

  it('www.purikan.app でも同じく rewrite', () => {
    const res = middleware(requestFor('www.purikan.app'));
    expect(res.headers.get('x-middleware-rewrite')).toContain('/purikan');
  });

  it('他ホストでは rewrite しない', () => {
    const res = middleware(requestFor('localhost:3000'));
    expect(res.headers.get('x-middleware-rewrite')).toBeNull();
  });
});
