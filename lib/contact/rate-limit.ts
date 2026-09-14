/**
 * Best-effort in-memory rate limiter for the contact endpoint.
 *
 * Tradeoffs (deliberate, to keep this dependency-free on Vercel serverless):
 * - State lives in the module scope of a single serverless instance, so the
 *   effective limit is MAX_REQUESTS per window *per warm instance*. It raises
 *   the cost of casual abuse; it is not a guarantee. A durable store
 *   (Upstash/Vercel KV) would be required for a strict global limit.
 * - Cold starts reset the window.
 * - Requests without a usable client IP share one bucket, so an unidentifiable
 *   flood is throttled rather than waved through (fail closed).
 */

export const WINDOW_MS = 10 * 60 * 1000;
export const MAX_REQUESTS = 5;

const MAX_TRACKED_KEYS = 10_000;

const hits = new Map<string, number[]>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Derives the rate-limit bucket from proxy headers. Only the left-most entry of
 * x-forwarded-for is used (the client as seen by Vercel's edge).
 */
export function clientKeyFromRequest(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const candidate = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip');
  const ip = candidate?.trim();
  return ip ? `ip:${ip}` : 'ip:unknown';
}

function pruneExpired(now: number): void {
  for (const [key, timestamps] of hits) {
    const live = timestamps.filter((t) => now - t < WINDOW_MS);
    if (live.length === 0) {
      hits.delete(key);
    } else {
      hits.set(key, live);
    }
  }
}

/** Records a hit for `key` and reports whether it is within the window budget. */
export function checkRateLimit(key: string, now: number = Date.now()): RateLimitResult {
  if (hits.size > MAX_TRACKED_KEYS) {
    pruneExpired(now);
  }

  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    const oldest = recent[0];
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000)),
    };
  }

  recent.push(now);
  hits.set(key, recent);
  return {
    allowed: true,
    remaining: MAX_REQUESTS - recent.length,
    retryAfterSeconds: 0,
  };
}

/** Test helper: clears all tracked buckets. */
export function resetRateLimit(): void {
  hits.clear();
}
