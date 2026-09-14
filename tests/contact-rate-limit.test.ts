import { beforeEach, describe, expect, it } from 'vitest';
import {
  checkRateLimit,
  clientKeyFromRequest,
  MAX_REQUESTS,
  resetRateLimit,
  WINDOW_MS,
} from '@/lib/contact/rate-limit';

beforeEach(() => {
  resetRateLimit();
});

describe('checkRateLimit', () => {
  it('allows exactly MAX_REQUESTS per window, then blocks', () => {
    const now = 1_000_000;
    for (let i = 0; i < MAX_REQUESTS; i += 1) {
      expect(checkRateLimit('ip:1.2.3.4', now + i).allowed).toBe(true);
    }
    const blocked = checkRateLimit('ip:1.2.3.4', now + MAX_REQUESTS);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('keeps buckets independent per key', () => {
    const now = 1_000_000;
    for (let i = 0; i < MAX_REQUESTS; i += 1) {
      checkRateLimit('ip:1.2.3.4', now + i);
    }
    expect(checkRateLimit('ip:5.6.7.8', now).allowed).toBe(true);
  });

  it('allows again once the window has passed', () => {
    const now = 1_000_000;
    for (let i = 0; i < MAX_REQUESTS; i += 1) {
      checkRateLimit('ip:1.2.3.4', now + i);
    }
    expect(checkRateLimit('ip:1.2.3.4', now + MAX_REQUESTS).allowed).toBe(false);
    expect(checkRateLimit('ip:1.2.3.4', now + WINDOW_MS + 1).allowed).toBe(true);
  });
});

describe('clientKeyFromRequest', () => {
  const req = (headers: Record<string, string>) =>
    new Request('https://example.com/api/contact', { method: 'POST', headers });

  it('uses the left-most x-forwarded-for entry', () => {
    expect(clientKeyFromRequest(req({ 'x-forwarded-for': '1.2.3.4, 10.0.0.1' }))).toBe('ip:1.2.3.4');
  });

  it('falls back to x-real-ip', () => {
    expect(clientKeyFromRequest(req({ 'x-real-ip': '9.9.9.9' }))).toBe('ip:9.9.9.9');
  });

  it('buckets unidentifiable clients together instead of exempting them', () => {
    expect(clientKeyFromRequest(req({}))).toBe('ip:unknown');
    expect(clientKeyFromRequest(req({ 'x-forwarded-for': '   ' }))).toBe('ip:unknown');
  });
});
