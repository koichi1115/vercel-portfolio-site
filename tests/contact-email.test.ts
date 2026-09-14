import { describe, expect, it } from 'vitest';
import {
  escapeHtml,
  renderHtml,
  renderSubject,
  renderText,
  sanitizeHeaderValue,
} from '@/lib/contact/email';

describe('escapeHtml', () => {
  it('escapes every HTML-significant character', () => {
    expect(escapeHtml(`<script>alert("x") & 'y'</script>`)).toBe(
      '&lt;script&gt;alert(&quot;x&quot;) &amp; &#39;y&#39;&lt;/script&gt;'
    );
  });

  it('escapes ampersands before entities are introduced', () => {
    expect(escapeHtml('&lt;')).toBe('&amp;lt;');
  });
});

describe('renderHtml', () => {
  const hostile = {
    name: '<img src=x onerror=alert(1)>',
    email: 'a"onmouseover="alert(1)@example.com',
    company: '</td><script>fetch("//evil")</script>',
    subject: '<b>other</b>',
    message: '<script>document.cookie</script>',
  };

  it('does not emit any user-controlled markup', () => {
    const html = renderHtml(hostile);
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).not.toContain('</td><');
    // The payloads survive only as inert text, never as tags or attributes.
    expect(html).not.toMatch(/<[^>]*onerror/);
    // The quote in the address is entity-encoded, so it cannot close the
    // href attribute and start a new one.
    expect(html).not.toContain('"onmouseover="');
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(html).toContain('&lt;script&gt;document.cookie&lt;/script&gt;');
  });

  it('escapes the mailto attribute value', () => {
    const html = renderHtml(hostile);
    expect(html).toContain('mailto:a&quot;onmouseover=&quot;alert(1)@example.com');
  });

  it('omits the company row when no company is given', () => {
    const html = renderHtml({ ...hostile, company: undefined });
    expect(html).not.toContain('会社名');
  });

  it('maps known subject keys to their Japanese label', () => {
    expect(renderHtml({ ...hostile, subject: 'consulting' })).toContain('AI導入コンサルティング');
  });
});

describe('renderSubject', () => {
  it('strips CR/LF so headers cannot be injected', () => {
    const subject = renderSubject({
      name: 'Taro\r\nBcc: attacker@example.com',
      email: 'taro@example.com',
      subject: 'other',
      message: 'hi',
    });
    expect(subject).not.toMatch(/[\r\n]/);
    expect(subject).toBe('[お問い合わせ] その他 - Taro Bcc: attacker@example.com様');
  });
});

describe('sanitizeHeaderValue', () => {
  it('collapses newlines and trims', () => {
    expect(sanitizeHeaderValue(' a\n\rb ')).toBe('a b');
  });
});

describe('renderText', () => {
  it('carries the raw content as a plain-text alternative', () => {
    const text = renderText({
      name: 'Taro',
      email: 'taro@example.com',
      subject: 'consulting',
      message: 'hello',
    });
    expect(text).toContain('お名前: Taro');
    expect(text).toContain('種別: AI導入コンサルティング');
    expect(text).toContain('会社名: N/A');
    expect(text).toContain('hello');
  });
});
