'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const PAIN_POINTS = [
  {
    icon: '📄',
    label: 'プリントの山',
    text: '毎日大量に届くプリントから、予定や提出物を拾い出すのが大変。',
  },
  {
    icon: '⏰',
    label: '提出物の期限',
    text: '「同意書、いつまでだっけ?」うっかり提出期限を過ぎてしまう。',
  },
  {
    icon: '🎒',
    label: '持ち物の見落とし',
    text: '「明日、水着いるの!?」前日の夜に気づいて慌てる。',
  },
];

const FEATURES = [
  {
    icon: '🤖',
    title: 'AIが自動で解析',
    desc: 'PDFや写真を取り込むだけで、高精度AIがイベント・TODO・持ち物を自動抽出。運動会、遠足、同意書提出、水着…見落としをゼロに。',
  },
  {
    icon: '📷',
    title: 'カメラ・ファイルから取込',
    desc: '紙のプリントはその場で撮影、PDFはファイルから選択。どちらもワンタップで取り込めます。',
  },
  {
    icon: '💬',
    title: 'LINEに通知',
    desc: '解析結果をLINEで自動通知。忙しい共働き家庭でも、パートナーと情報をかんたんに共有できます。',
  },
  {
    icon: '🔔',
    title: '事前リマインダー',
    desc: '期限のあるTODO・持ち物を、指定した日数前にLINEでお知らせ。提出忘れをしっかり防ぎます。',
  },
];

export default function PurikanLandingPage() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden border-b-2 border-ink dark:border-paper bg-gradient-to-br from-paper via-paper to-ink-50 dark:from-ink dark:via-ink dark:to-ink-900">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 bg-accent text-paper text-xs font-display font-bold px-4 py-1.5 border-2 border-ink shadow-brutal-sm mb-6">
                <span className="w-2 h-2 bg-paper rounded-full animate-pulse" />
                iOSアプリ ・ App Store 審査提出中
              </div>

              <h1 className="font-display text-6xl md:text-7xl font-bold text-ink dark:text-paper leading-none mb-4">
                ぷりかん！
              </h1>

              <p className="font-display text-2xl md:text-3xl text-ink dark:text-paper leading-snug mb-6">
                <span className="bg-accent/15 px-2">学校・保育園のプリントを、</span>
                <br />
                AIでかんたん管理。
              </p>

              <p className="text-base md:text-lg text-ink-600 dark:text-ink-400 leading-relaxed mb-8 max-w-lg">
                ぷりかん！は、学校・保育園・習い事から届くプリント（PDF・写真）を
                AIで自動解析し、イベント・TODO・持ち物を自動で抽出・整理する
                iOS向けアプリです。LINE通知と事前リマインダーで、大事な予定と
                提出物を逃しません。
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 bg-accent text-paper border-2 border-ink shadow-brutal hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all font-display font-bold h-14 px-7 text-base"
                >
                  機能を見る ↓
                </a>
                <Link
                  href="/legal/purikan/privacy"
                  className="inline-flex items-center gap-2 bg-transparent text-ink dark:text-paper border-2 border-ink dark:border-paper font-display font-bold h-14 px-7 text-base hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-all"
                >
                  プライバシーポリシー →
                </Link>
              </div>
            </motion.div>

            {/* Mascot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl scale-110" />
                <Image
                  src="/images/otayori-ai/icon.png"
                  alt="ぷりかん！ マスコット"
                  width={480}
                  height={480}
                  className="relative drop-shadow-2xl border-2 border-ink dark:border-paper shadow-brutal-lg rounded-3xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── Pain Points ───────── */}
      <section className="border-b-2 border-ink dark:border-paper bg-ink-50 dark:bg-ink-900">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="font-display text-sm font-bold text-accent uppercase tracking-widest mb-3">
              こんなこと、ありませんか?
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink dark:text-paper leading-tight">
              プリント管理の、
              <br />
              小さなストレス。
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {PAIN_POINTS.map((p, i) => (
              <motion.div
                key={p.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-paper dark:bg-ink border-2 border-ink dark:border-paper shadow-brutal p-7 flex flex-col gap-3"
              >
                <div className="text-5xl">{p.icon}</div>
                <div className="font-display text-sm font-bold text-accent">{p.label}</div>
                <p className="text-ink dark:text-paper text-base leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Features ───────── */}
      <section id="features" className="border-b-2 border-ink dark:border-paper">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="font-display text-sm font-bold text-accent uppercase tracking-widest mb-3">
              Features
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink dark:text-paper leading-tight">
              取り込むだけで、
              <br />
              あとはおまかせ。
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-paper dark:bg-ink border-2 border-ink dark:border-paper shadow-brutal p-7 flex flex-col gap-3"
              >
                <div className="text-4xl">{f.icon}</div>
                <h3 className="font-display text-2xl font-bold text-ink dark:text-paper leading-tight">
                  {f.title}
                </h3>
                <p className="text-ink-600 dark:text-ink-400 text-base leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Privacy ───────── */}
      <section className="border-b-2 border-ink dark:border-paper bg-ink-50 dark:bg-ink-900">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-[200px_1fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Image
                src="/images/otayori-ai/icon.png"
                alt="ぷりかん！"
                width={180}
                height={180}
                className="drop-shadow-xl border-2 border-ink dark:border-paper rounded-2xl"
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="inline-block bg-accent text-paper text-xs font-display font-bold px-3 py-1 border-2 border-ink mb-4">
                Privacy First
              </div>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-ink dark:text-paper leading-tight mb-4">
                データは、
                <br />
                あなたの端末に。
              </h2>
              <p className="text-ink-600 dark:text-ink-400 text-base leading-relaxed mb-6">
                アカウント登録もログインも不要。解析結果は端末内に保存され、
                広告や行動分析のためのデータ利用は行いません。AI解析時のみ、
                プリントの内容を暗号化して解析サービスに送信します。
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/legal/purikan/privacy"
                  className="inline-flex items-center gap-2 text-accent font-display font-bold text-sm border-b-2 border-accent hover:opacity-70 transition-opacity"
                >
                  プライバシーポリシー →
                </Link>
                <Link
                  href="/legal/purikan/terms"
                  className="inline-flex items-center gap-2 text-accent font-display font-bold text-sm border-b-2 border-accent hover:opacity-70 transition-opacity"
                >
                  利用規約 →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="bg-gradient-to-br from-ink-100 via-paper to-ink-50 dark:from-ink-900 dark:via-ink dark:to-ink-800">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="font-display text-4xl md:text-6xl font-bold text-ink dark:text-paper mb-6 leading-tight"
          >
            プリント管理を、
            <br />
            かんたんに。
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-ink-500 dark:text-ink-400 text-lg mb-10"
          >
            ぷりかん！ ・ iOSアプリ ・ App Store 審査提出中
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="flex flex-wrap justify-center gap-6 text-sm text-ink-500 dark:text-ink-400 pt-8 border-t border-ink-200 dark:border-ink-700"
          >
            <Link href="/legal/purikan/privacy" className="hover:text-accent underline">
              プライバシーポリシー
            </Link>
            <Link href="/legal/purikan/terms" className="hover:text-accent underline">
              利用規約
            </Link>
            <a href="mailto:ko1115.product.jp@gmail.com" className="hover:text-accent underline">
              お問い合わせ
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
