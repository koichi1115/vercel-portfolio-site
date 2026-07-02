import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Serve the ぷりかん！ landing page (/purikan) at the root of the purikan.app
// domain, while keeping the portfolio root untouched on every other host.
// Scoped to the root path only via the matcher below, so all other routes
// (including /legal/purikan/*) are served normally on both domains.
export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase();
  if (host === 'purikan.app' || host === 'www.purikan.app') {
    const url = request.nextUrl.clone();
    url.pathname = '/purikan';
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
