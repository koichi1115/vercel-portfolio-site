"use client";

import { useState } from 'react';
import { Floor } from '@/components/floor/Floor';
import { FloorCard } from '@/components/floor/FloorCard';
import styles from '@/components/floor/floor.module.css';
import { Footer } from '@/components/Footer';
import { signFont } from '@/components/town/font';
import { loadTownConfig, resolveFloor } from '@/lib/town/floors';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

type FormDataState = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};

type ChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
) => void;

function IdentityFields({ data, onChange }: { data: FormDataState; onChange: ChangeHandler }) {
  return (
    <>
      <div>
        <label htmlFor="name" className={styles.label}>お名前 *</label>
        <input type="text" id="name" name="name" required value={data.name}
          onChange={onChange} className={styles.input} placeholder="山田 太郎" />
      </div>
      <div>
        <label htmlFor="email" className={styles.label}>メールアドレス *</label>
        <input type="email" id="email" name="email" required value={data.email}
          onChange={onChange} className={styles.input} placeholder="email@example.com" />
      </div>
    </>
  );
}

function CompanyField({ data, onChange }: { data: FormDataState; onChange: ChangeHandler }) {
  return (
    <div>
      <label htmlFor="company" className={styles.label}>会社名・組織名</label>
      <input type="text" id="company" name="company" value={data.company}
        onChange={onChange} className={styles.input} placeholder="株式会社〇〇" />
    </div>
  );
}

function SubjectField({ data, onChange }: { data: FormDataState; onChange: ChangeHandler }) {
  return (
    <div>
      <label htmlFor="subject" className={styles.label}>お問い合わせ種別 *</label>
      <select id="subject" name="subject" required value={data.subject}
        onChange={onChange} className={styles.input}>
        <option value="">選択してください</option>
        <option value="consulting">AI導入コンサルティング</option>
        <option value="development">開発のご依頼</option>
        <option value="collaboration">コラボレーション</option>
        <option value="interview">取材・登壇依頼</option>
        <option value="other">その他</option>
      </select>
    </div>
  );
}

function MessageField({ data, onChange }: { data: FormDataState; onChange: ChangeHandler }) {
  return (
    <div>
      <label htmlFor="message" className={styles.label}>お問い合わせ内容 *</label>
      <textarea id="message" name="message" required rows={6} value={data.message}
        onChange={onChange} className={styles.input}
        placeholder="ご依頼内容、ご質問などをご記入ください" />
    </div>
  );
}

function SuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <FloorCard className={styles.center}>
      <h2 className={styles.h2}>送信完了</h2>
      <p>お問い合わせありがとうございます。<br />内容を確認の上、ご連絡いたします。</p>
      <button onClick={onReset} className={`${styles.btnGhost} ${styles.tap}`}>
        新しいお問い合わせ
      </button>
    </FloorCard>
  );
}

type ContactFormProps = {
  status: FormStatus;
  data: FormDataState;
  onChange: ChangeHandler;
  onSubmit: (event: React.FormEvent) => Promise<void>;
};

function ContactForm({ status, data, onChange, onSubmit }: ContactFormProps) {
  return (
    <FloorCard>
      <form onSubmit={onSubmit} className={styles.formGrid}>
        <IdentityFields data={data} onChange={onChange} />
        <CompanyField data={data} onChange={onChange} />
        <SubjectField data={data} onChange={onChange} />
        <MessageField data={data} onChange={onChange} />
        {status === 'error' && (
          <div role="alert" className={styles.danger}>
            送信に失敗しました。時間をおいて再度お試しください。
          </div>
        )}
        <button type="submit" disabled={status === 'submitting'} className={`${styles.btn} ${styles.tap}`}>
          {status === 'submitting' ? '送信中...' : '送信する'}
        </button>
      </form>
    </FloorCard>
  );
}

function ContactSidebar() {
  return (
    <div className={styles.stack}>
      <FloorCard>
        <h2 className={styles.h2}>直接のご連絡</h2>
        <p><a href="mailto:ko1115.product.jp@gmail.com">ko1115.product.jp@gmail.com</a></p>
        <p><a href="https://github.com/ko1115productjp-hub" target="_blank" rel="noopener noreferrer">GitHub</a></p>
      </FloorCard>
      <FloorCard>
        <h2 className={styles.h2}>返信について</h2>
        <p>通常2〜3営業日以内にご返信いたします。お急ぎの場合はメールにてご連絡ください。</p>
      </FloorCard>
    </div>
  );
}

function useContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };
  return { formStatus, formData, setFormStatus, handleChange, handleSubmit };
}

export default function ContactPage() {
  const { formStatus, formData, setFormStatus, handleChange, handleSubmit } = useContactForm();
  const floor = resolveFloor(loadTownConfig(), '/contact');
  if (!floor) return null;

  return (
    <>
      <Floor
        floor={floor}
        title={floor.label}
        lead="お仕事のご依頼、ご相談などお気軽にお問い合わせください。通常2〜3営業日以内にご返信いたします。"
        headingFontClassName={signFont.className}
      >
        <div className={styles.stack}>
          {formStatus === 'success' ? (
            <SuccessCard onReset={() => setFormStatus('idle')} />
          ) : (
            <ContactForm status={formStatus} data={formData}
              onChange={handleChange} onSubmit={handleSubmit} />
          )}
          <ContactSidebar />
        </div>
      </Floor>
      <Footer />
    </>
  );
}
