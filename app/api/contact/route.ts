import { NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

const subjectLabels: Record<string, string> = {
  consulting: 'AI導入コンサルティング',
  development: '開発のご依頼',
  collaboration: 'コラボレーション',
  interview: '取材・登壇依頼',
  other: 'その他',
};

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: '必須項目を入力してください' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || 'ko1115.product.jp@gmail.com';

    if (!resendApiKey) {
      // Development mode: log to console
      console.log('=== Contact Form Submission ===');
      console.log('Name:', data.name);
      console.log('Email:', data.email);
      console.log('Company:', data.company || 'N/A');
      console.log('Subject:', subjectLabels[data.subject] || data.subject);
      console.log('Message:', data.message);
      console.log('==============================');

      return NextResponse.json({ success: true, mode: 'development' });
    }

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [toEmail],
        reply_to: data.email,
        subject: `[お問い合わせ] ${subjectLabels[data.subject] || data.subject} - ${data.name}様`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1a1a; border-bottom: 2px solid #FF4500; padding-bottom: 10px;">
              新しいお問い合わせ
            </h2>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">お名前</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">メール</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">
                  <a href="mailto:${data.email}">${data.email}</a>
                </td>
              </tr>
              ${data.company ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">会社名</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.company}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">種別</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${subjectLabels[data.subject] || data.subject}</td>
              </tr>
            </table>

            <div style="background: #f9f9f9; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">お問い合わせ内容</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
            </div>

            <p style="color: #666; font-size: 12px;">
              このメールはポートフォリオサイトのお問い合わせフォームから送信されました。
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      return NextResponse.json(
        { error: 'メール送信に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
