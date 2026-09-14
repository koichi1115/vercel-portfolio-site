import { NextResponse } from 'next/server';
import {
  DEFAULT_FROM_ADDRESS,
  renderHtml,
  renderSubject,
  renderText,
  type ContactSubmission,
} from '@/lib/contact/email';
import { checkRateLimit, clientKeyFromRequest } from '@/lib/contact/rate-limit';

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  company: 100,
  subject: 50,
  message: 5000,
} as const;

// Deliberately strict: rejects anything that could smuggle a mail header or a
// second address into reply_to.
const EMAIL_PATTERN = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;

interface MailConfig {
  apiKey: string;
  toEmail: string;
  fromAddress: string;
}

function readMailConfig(): { config: MailConfig } | { missing: string[] } {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_EMAIL?.trim();

  if (!apiKey || !toEmail) {
    const missing: string[] = [];
    if (!apiKey) missing.push('RESEND_API_KEY');
    if (!toEmail) missing.push('CONTACT_EMAIL');
    return { missing };
  }

  return {
    config: {
      apiKey,
      toEmail,
      fromAddress: process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM_ADDRESS,
    },
  };
}

function parseSubmission(body: unknown): ContactSubmission | null {
  if (typeof body !== 'object' || body === null) return null;
  const raw = body as Record<string, unknown>;

  const field = (key: keyof typeof MAX_LENGTHS): string | null => {
    const value = raw[key];
    if (value === undefined || value === null) return '';
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    return trimmed.length > MAX_LENGTHS[key] ? null : trimmed;
  };

  const name = field('name');
  const email = field('email');
  const company = field('company');
  const subject = field('subject');
  const message = field('message');

  if (name === null || email === null || company === null || subject === null || message === null) {
    return null;
  }
  if (!name || !email || !subject || !message) return null;
  if (!EMAIL_PATTERN.test(email)) return null;

  return { name, email, company: company || undefined, subject, message };
}

export async function POST(request: Request) {
  // Rate limit first: it must also cover malformed and unauthenticated traffic.
  const limit = checkRateLimit(clientKeyFromRequest(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { error: '送信回数の上限に達しました。しばらく時間をおいて再度お試しください' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } }
    );
  }

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'リクエストの形式が不正です' }, { status: 400 });
    }

    const submission = parseSubmission(body);
    if (!submission) {
      return NextResponse.json({ error: '必須項目を正しく入力してください' }, { status: 400 });
    }

    const mail = readMailConfig();
    if ('missing' in mail) {
      // Never report success when we cannot actually deliver the message.
      console.error('Contact form is not configured. Missing env:', mail.missing.join(', '));
      return NextResponse.json(
        { error: 'お問い合わせ機能が利用できません。時間をおいて再度お試しください' },
        { status: 503 }
      );
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mail.config.apiKey}`,
      },
      body: JSON.stringify({
        from: mail.config.fromAddress,
        to: [mail.config.toEmail],
        reply_to: submission.email,
        subject: renderSubject(submission),
        html: renderHtml(submission),
        text: renderText(submission),
      }),
    });

    if (!response.ok) {
      const errorData = await response.text().catch(() => '');
      console.error('Resend API error:', response.status, errorData);
      return NextResponse.json({ error: 'メール送信に失敗しました' }, { status: 502 });
    }

    return NextResponse.json({ success: true, remaining: limit.remaining });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
