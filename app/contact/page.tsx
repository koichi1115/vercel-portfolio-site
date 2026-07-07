"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full rounded-xl border hairline bg-white/60 dark:bg-abyss-800/60 px-4 py-3 text-abyss dark:text-bone placeholder:text-abyss-400/60 dark:placeholder:text-bone-400/40 backdrop-blur-sm transition-colors focus:outline-none focus:border-volt-600 dark:focus:border-volt';

const labelClass =
  'block font-mono text-[11px] uppercase tracking-[0.2em] text-abyss-400 dark:text-bone-400 mb-2';

export default function ContactPage() {
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

  return (
    <main className="min-h-screen bg-bone dark:bg-abyss font-zen text-abyss dark:text-bone selection:bg-volt selection:text-volt-ink">
      <div className="grain-overlay" />

      <PageHero
        overline="Contact"
        title="Get in"
        titleAccent="touch."
        description="お仕事のご依頼、ご相談などお気軽にお問い合わせください。通常2〜3営業日以内にご返信いたします。"
      />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            {formStatus === 'success' ? (
              <div className="panel p-10 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-volt shadow-glow-volt">
                  <svg className="h-8 w-8 text-volt-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-3 font-syne text-2xl font-bold">送信完了</h3>
                <p className="leading-loose text-abyss-500 dark:text-bone-300">
                  お問い合わせありがとうございます。<br />
                  内容を確認の上、ご連絡いたします。
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-volt-700 dark:text-volt hover:underline underline-offset-4"
                >
                  新しいお問い合わせ →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      お名前 <span className="text-volt-600 dark:text-volt">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="山田 太郎"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      メールアドレス <span className="text-volt-600 dark:text-volt">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className={labelClass}>
                    会社名・組織名
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="株式会社〇〇"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass}>
                    お問い合わせ種別 <span className="text-volt-600 dark:text-volt">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer appearance-none`}
                  >
                    <option value="">選択してください</option>
                    <option value="consulting">AI導入コンサルティング</option>
                    <option value="development">開発のご依頼</option>
                    <option value="collaboration">コラボレーション</option>
                    <option value="interview">取材・登壇依頼</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    お問い合わせ内容 <span className="text-volt-600 dark:text-volt">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="ご依頼内容、ご質問などをご記入ください"
                  />
                </div>

                {formStatus === 'error' && (
                  <div className="rounded-xl border border-red-400/60 bg-red-500/10 p-4 font-mono text-sm text-red-500 dark:text-red-400">
                    送信に失敗しました。時間をおいて再度お試しください。
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn-volt px-9 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      送信中...
                    </>
                  ) : (
                    <>
                      送信する
                      <span aria-hidden>→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 lg:col-span-4"
          >
            <div className="panel p-7">
              <h3 className="mb-5 font-syne text-lg font-bold">直接のご連絡</h3>
              <div className="space-y-4">
                <a
                  href="mailto:ko1115.product.jp@gmail.com"
                  className="flex items-center gap-3 text-abyss-500 dark:text-bone-300 transition-colors hover:text-volt-600 dark:hover:text-volt"
                >
                  <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="break-all font-mono text-sm">ko1115.product.jp@gmail.com</span>
                </a>
                <a
                  href="https://github.com/koichi1115"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-abyss-500 dark:text-bone-300 transition-colors hover:text-volt-600 dark:hover:text-volt"
                >
                  <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="font-mono text-sm">@koichi1115</span>
                </a>
              </div>
            </div>

            <div className="panel relative overflow-hidden p-7">
              <div className="aurora-glow pointer-events-none absolute inset-0" />
              <div className="relative">
                <div className="mb-3 flex items-center gap-3">
                  <svg className="h-5 w-5 text-volt-600 dark:text-volt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-syne text-lg font-bold">返信について</h3>
                </div>
                <p className="text-sm leading-loose text-abyss-500 dark:text-bone-300">
                  通常2〜3営業日以内にご返信いたします。
                  お急ぎの場合はメールにてご連絡ください。
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
