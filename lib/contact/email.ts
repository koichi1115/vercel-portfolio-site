/**
 * Contact form email rendering.
 *
 * Every user-supplied value is escaped before it reaches the HTML body, and
 * header-bound values (subject) additionally have CR/LF stripped so a crafted
 * name cannot inject extra headers.
 */

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export const subjectLabels: Record<string, string> = {
  consulting: 'AI導入コンサルティング',
  development: '開発のご依頼',
  collaboration: 'コラボレーション',
  interview: '取材・登壇依頼',
  other: 'その他',
};

/**
 * Resend's shared sandbox sender. Used only when CONTACT_FROM_EMAIL is unset so
 * that existing deployments keep working; set CONTACT_FROM_EMAIL to send from a
 * verified domain.
 */
export const DEFAULT_FROM_ADDRESS = 'Portfolio Contact <onboarding@resend.dev>';

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Collapse CR/LF so a value cannot break out of a mail header. */
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

export function subjectLabel(subject: string): string {
  return subjectLabels[subject] || subject;
}

export function renderSubject(submission: ContactSubmission): string {
  const label = sanitizeHeaderValue(subjectLabel(submission.subject));
  const name = sanitizeHeaderValue(submission.name);
  return `[お問い合わせ] ${label} - ${name}様`;
}

export function renderHtml(submission: ContactSubmission): string {
  const name = escapeHtml(submission.name);
  const email = escapeHtml(submission.email);
  const company = submission.company ? escapeHtml(submission.company) : '';
  const label = escapeHtml(subjectLabel(submission.subject));
  const message = escapeHtml(submission.message);

  return `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1a1a; border-bottom: 2px solid #FF4500; padding-bottom: 10px;">
              新しいお問い合わせ
            </h2>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">お名前</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">メール</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">
                  <a href="mailto:${email}">${email}</a>
                </td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">会社名</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${company}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">種別</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${label}</td>
              </tr>
            </table>

            <div style="background: #f9f9f9; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">お問い合わせ内容</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>

            <p style="color: #666; font-size: 12px;">
              このメールはポートフォリオサイトのお問い合わせフォームから送信されました。
            </p>
          </div>
        `;
}

/** Plain-text alternative, so clients that refuse HTML still show the content. */
export function renderText(submission: ContactSubmission): string {
  return [
    '新しいお問い合わせ',
    '',
    `お名前: ${submission.name}`,
    `メール: ${submission.email}`,
    `会社名: ${submission.company || 'N/A'}`,
    `種別: ${subjectLabel(submission.subject)}`,
    '',
    'お問い合わせ内容:',
    submission.message,
  ].join('\n');
}
