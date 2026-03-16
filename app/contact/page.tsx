"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

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
    <main className="min-h-screen bg-paper dark:bg-ink pt-24 pb-16">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="inline-block font-mono text-sm uppercase tracking-widest text-accent border-l-4 border-accent pl-4 mb-6">
            Contact
          </span>
          <Heading size="h1" className="mb-4">
            お問い合わせ<span className="text-accent">.</span>
          </Heading>
          <Text color="secondary" className="max-w-2xl">
            お仕事のご依頼、ご相談などお気軽にお問い合わせください。
            通常2〜3営業日以内にご返信いたします。
          </Text>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-8"
          >
            {formStatus === 'success' ? (
              <div className="bg-accent/10 border-2 border-accent p-8 text-center">
                <div className="w-16 h-16 bg-accent mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-paper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <Heading size="h3" className="mb-2">送信完了</Heading>
                <Text color="secondary">
                  お問い合わせありがとうございます。<br />
                  内容を確認の上、ご連絡いたします。
                </Text>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 px-6 py-2 font-mono text-sm uppercase tracking-wider text-accent hover:underline"
                >
                  新しいお問い合わせ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-2">
                      お名前 <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-paper dark:bg-ink border-2 border-ink dark:border-paper text-ink dark:text-paper font-sans focus:outline-none focus:border-accent transition-colors"
                      placeholder="山田 太郎"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-2">
                      メールアドレス <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-paper dark:bg-ink border-2 border-ink dark:border-paper text-ink dark:text-paper font-sans focus:outline-none focus:border-accent transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-2">
                    会社名・組織名
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-paper dark:bg-ink border-2 border-ink dark:border-paper text-ink dark:text-paper font-sans focus:outline-none focus:border-accent transition-colors"
                    placeholder="株式会社〇〇"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-2">
                    お問い合わせ種別 <span className="text-accent">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-paper dark:bg-ink border-2 border-ink dark:border-paper text-ink dark:text-paper font-sans focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">選択してください</option>
                    <option value="consulting">AI導入コンサルティング</option>
                    <option value="development">開発のご依頼</option>
                    <option value="collaboration">コラボレーション</option>
                    <option value="interview">取材・登壇依頼</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-2">
                    お問い合わせ内容 <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-paper dark:bg-ink border-2 border-ink dark:border-paper text-ink dark:text-paper font-sans focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="ご依頼内容、ご質問などをご記入ください"
                  />
                </div>

                {/* Error Message */}
                {formStatus === 'error' && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 text-red-600 dark:text-red-400 font-mono text-sm">
                    送信に失敗しました。時間をおいて再度お試しください。
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-ink dark:bg-paper text-paper dark:text-ink font-display font-semibold text-base border-2 border-ink dark:border-paper transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 shadow-brutal dark:shadow-[4px_4px_0_0_#FEFEFE] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>送信中...</span>
                    </>
                  ) : (
                    <>
                      <span>送信する</span>
                      <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
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
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Direct Contact */}
            <div className="bg-ink-50 dark:bg-ink-900 border-2 border-ink dark:border-paper p-6">
              <Heading size="h5" className="mb-4">直接のご連絡</Heading>
              <div className="space-y-4">
                <a
                  href="mailto:ko1115.product.jp@gmail.com"
                  className="flex items-center gap-3 text-ink-600 dark:text-ink-300 hover:text-accent transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-mono text-sm break-all">ko1115.product.jp@gmail.com</span>
                </a>
                <a
                  href="https://github.com/koichi1115"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-ink-600 dark:text-ink-300 hover:text-accent transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="font-mono text-sm">@koichi1115</span>
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-accent/10 border-2 border-accent p-6">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <Heading size="h5">返信について</Heading>
              </div>
              <Text size="sm" color="secondary">
                通常2〜3営業日以内にご返信いたします。
                お急ぎの場合はメールにてご連絡ください。
              </Text>
            </div>
          </motion.aside>
        </div>
      </Container>
    </main>
  );
}
