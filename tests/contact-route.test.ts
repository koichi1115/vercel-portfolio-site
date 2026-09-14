import { readFileSync } from 'node:fs';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/contact/route';
import { MAX_REQUESTS, resetRateLimit } from '@/lib/contact/rate-limit';

const validBody = {
  name: 'Taro',
  email: 'taro@example.com',
  company: 'Example Inc.',
  subject: 'consulting',
  message: 'hello',
};

function post(body: unknown, ip = '1.2.3.4'): Request {
  return new Request('https://example.com/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  });
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  resetRateLimit();
  vi.spyOn(console, 'error').mockImplementation(() => {});
  fetchMock = vi.fn(async () => new Response('{"id":"1"}', { status: 200 }));
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('missing configuration (issue 1)', () => {
  it('fails with 503 and no success flag when RESEND_API_KEY is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('CONTACT_EMAIL', 'owner@example.com');

    const res = await POST(post(validBody));
    const json = await res.json();

    expect(res.status).toBe(503);
    expect(json.success).toBeUndefined();
    expect(json.error).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('fails with 503 when CONTACT_EMAIL is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('CONTACT_EMAIL', '');

    const res = await POST(post(validBody));
    const json = await res.json();

    expect(res.status).toBe(503);
    expect(json.success).toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('HTML escaping (issue 2)', () => {
  it('never sends unescaped user input in the email body', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('CONTACT_EMAIL', 'owner@example.com');

    const res = await POST(
      post({
        ...validBody,
        name: '<img src=x onerror=alert(1)>',
        company: '</td><script>alert(2)</script>',
        message: '<script>alert(3)</script>',
      })
    );
    expect(res.status).toBe(200);

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload.html).not.toContain('<script>');
    expect(payload.html).not.toContain('<img');
    expect(payload.html).toContain('&lt;script&gt;alert(3)&lt;/script&gt;');
    expect(payload.text).toContain('<script>alert(3)</script>');
  });
});

describe('rate limiting (issue 3)', () => {
  it('returns 429 with Retry-After once the budget is spent, and stops sending', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('CONTACT_EMAIL', 'owner@example.com');

    for (let i = 0; i < MAX_REQUESTS; i += 1) {
      const ok = await POST(post(validBody, '203.0.113.7'));
      expect(ok.status).toBe(200);
    }

    const blocked = await POST(post(validBody, '203.0.113.7'));
    const json = await blocked.json();

    expect(blocked.status).toBe(429);
    expect(json.success).toBeUndefined();
    expect(Number(blocked.headers.get('Retry-After'))).toBeGreaterThan(0);
    expect(fetchMock).toHaveBeenCalledTimes(MAX_REQUESTS);
  });

  it('counts invalid requests too, so garbage traffic cannot bypass the limit', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('CONTACT_EMAIL', 'owner@example.com');

    for (let i = 0; i < MAX_REQUESTS; i += 1) {
      const bad = await POST(post({ name: '' }, '203.0.113.9'));
      expect(bad.status).toBe(400);
    }

    expect((await POST(post(validBody, '203.0.113.9'))).status).toBe(429);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('recipient configuration (issue 4)', () => {
  it('sends only to CONTACT_EMAIL', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('CONTACT_EMAIL', 'owner@example.com');

    await POST(post(validBody));

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload.to).toEqual(['owner@example.com']);
    expect(payload.reply_to).toBe('taro@example.com');
  });

  it('contains no email address literal in the route source', () => {
    const source = readFileSync(
      path.resolve(__dirname, '../app/api/contact/route.ts'),
      'utf8'
    );
    expect(source).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
  });
});

describe('input validation', () => {
  beforeEach(() => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('CONTACT_EMAIL', 'owner@example.com');
  });

  it('rejects malformed JSON', async () => {
    const res = await POST(
      new Request('https://example.com/api/contact', {
        method: 'POST',
        headers: { 'x-forwarded-for': '198.51.100.1' },
        body: 'not-json',
      })
    );
    expect(res.status).toBe(400);
  });

  it('rejects an address that could smuggle a mail header', async () => {
    const res = await POST(post({ ...validBody, email: 'a@b.com>\nBcc: x@y.com' }));
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects oversized fields', async () => {
    const res = await POST(post({ ...validBody, message: 'a'.repeat(5001) }));
    expect(res.status).toBe(400);
  });

  it('rejects non-string fields', async () => {
    const res = await POST(post({ ...validBody, name: { toString: 'evil' } }));
    expect(res.status).toBe(400);
  });
});

describe('upstream failure', () => {
  it('does not report success when Resend rejects the request', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('CONTACT_EMAIL', 'owner@example.com');
    fetchMock.mockResolvedValueOnce(new Response('nope', { status: 422 }));

    const res = await POST(post(validBody));
    const json = await res.json();

    expect(res.status).toBe(502);
    expect(json.success).toBeUndefined();
  });
});
