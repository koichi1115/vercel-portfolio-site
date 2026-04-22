'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const FEATURES = [
  {
    icon: '🎙️',
    title: 'ワンタップ録音',
    desc: '会議・講演・懇談会をワンタップで録音開始。バックグラウンドでも途切れず、最大60分以上の長時間収録に対応。',
  },
  {
    icon: '📄',
    title: '資料スキャン & 用語抽出',
    desc: '配布資料をカメラでスキャン。AIが専門用語を自動抽出し、文字起こしの精度を大幅に向上させます。',
  },
  {
    icon: '🤖',
    title: 'AI補正 & ノート生成',
    desc: '音声認識の誤りをAIが自動補正。根拠付きの構造化ノートを生成し、全ての記述に元発話のエビデンスを付与。',
  },
  {
    icon: '✅',
    title: 'レビューキュー',
    desc: '信頼度の低い箇所をAIが自動検出。効率的に要確認ポイントだけを見直せるので、全文を読み返す必要なし。',
  },
  {
    icon: '📋',
    title: 'TODO自動抽出',
    desc: 'ノートからアクションアイテムを自動抽出。期限・担当者も検出し、やるべきことを見逃しません。',
  },
  {
    icon: '📑',
    title: 'まとめ資料生成',
    desc: 'ノートを「LP形式」「参考書形式」などのテンプレートで高品質なPDFドキュメントに自動変換。',
  },
];

const USE_CASES = [
  {
    persona: '👨‍👩‍👧 子育て中の保護者',
    situation: '学校の懇談会・説明会',
    before: 'メモを取りながら聞くと内容を聞き逃す。後から「あれ何だっけ？」が頻発',
    after: '録音ボタンを押すだけ。配布資料をスキャンすれば、期限付きやることリストまで自動生成',
  },
  {
    persona: '👔 ビジネスパーソン',
    situation: '講演会・セミナー・研修',
    before: 'ノートを取るのに必死で、肝心の話に集中できない。後で読み返しても文脈がわからない',
    after: '根拠付きノートが自動生成。「この記述の元発話は？」もワンタップで確認・再生',
  },
  {
    persona: '🎓 学生・研究者',
    situation: '授業・ゼミ・学会発表',
    before: '専門用語の聞き間違いが多い。録音はあるが文字起こしが面倒',
    after: '用語メモリが回を重ねるごとに学習。同じ授業の2回目からは補正精度が格段にアップ',
  },
];

const FLOW_STEPS = [
  { step: '01', title: '録音', desc: 'ワンタップで開始', icon: '🎙️' },
  { step: '02', title: 'スキャン', desc: '資料があればカメラで撮影', icon: '📷' },
  { step: '03', title: 'AI処理', desc: '文字起こし→補正→ノート生成', icon: '⚡' },
  { step: '04', title: '完成', desc: 'エビデンス付きノート + TODO', icon: '✨' },
];

export default function KoeNoteLandingPage() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-ink dark:border-paper">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <div className="inline-block bg-accent text-paper text-sm font-display font-bold px-4 py-1 border-2 border-ink shadow-brutal mb-6">
                iOS App
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-ink dark:text-paper leading-[0.95] tracking-tight mb-6">
                Koe
                <span className="text-accent">Note</span>
              </h1>
              <p className="font-display text-xl md:text-2xl text-ink dark:text-paper mb-2">
                コエノート
              </p>
              <p className="text-lg text-ink-600 dark:text-ink-400 leading-relaxed mb-8 max-w-lg">
                録音するだけで、根拠付きの高精度ノートが完成。
                <br />
                懇談会の要点整理も、講演の学びの振り返りも、
                <br />
                <strong className="text-ink dark:text-paper">声がノートに変わる。</strong>
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 bg-ink dark:bg-paper text-paper dark:text-ink border-2 border-ink dark:border-paper font-display font-semibold h-14 px-8 text-lg shadow-brutal dark:shadow-[4px_4px_0_0_#FEFEFE] hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all"
                >
                  機能を見る ↓
                </a>
                <a
                  href="#use-cases"
                  className="inline-flex items-center gap-2 bg-transparent text-ink dark:text-paper border-2 border-ink dark:border-paper font-display font-semibold h-14 px-8 text-lg hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-all"
                >
                  活用シーン
                </a>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="relative"
            >
              <div className="bg-ink-100 dark:bg-ink-800 border-2 border-ink dark:border-paper shadow-brutal p-8 aspect-[3/4] flex flex-col items-center justify-center gap-6">
                <div className="text-8xl">🎙️</div>
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-ink dark:text-paper">声 → ノート</p>
                  <p className="text-ink-500 dark:text-ink-400 mt-2">AIが根拠付きで構造化</p>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  {['録音', 'スキャン', 'AI補正', 'ノート生成', 'TODO'].map((tag) => (
                    <span
                      key={tag}
                      className="bg-accent/10 text-accent border border-accent/30 text-xs font-bold px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="border-b-2 border-ink dark:border-paper bg-ink-50 dark:bg-ink-900">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="font-display text-3xl md:text-4xl font-bold text-ink dark:text-paper mb-12 text-center"
          >
            4ステップで完成
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FLOW_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-paper dark:bg-ink border-2 border-ink dark:border-paper shadow-brutal p-6 text-center"
              >
                <div className="text-4xl mb-3">{s.icon}</div>
                <div className="font-display text-accent text-sm font-bold mb-1">STEP {s.step}</div>
                <div className="font-display text-lg font-bold text-ink dark:text-paper">{s.title}</div>
                <p className="text-ink-500 dark:text-ink-400 text-sm mt-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b-2 border-ink dark:border-paper">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="font-display text-3xl md:text-4xl font-bold text-ink dark:text-paper mb-4 text-center"
          >
            主な機能
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-ink-500 dark:text-ink-400 text-center mb-12 max-w-2xl mx-auto"
          >
            ただの文字起こしアプリではありません。根拠追跡・用語学習・レビューキューを統合した、声から知識を生む新しいノートアプリです。
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-paper dark:bg-ink border-2 border-ink dark:border-paper shadow-brutal p-6 hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-display text-lg font-bold text-ink dark:text-paper mb-2">{f.title}</h3>
                <p className="text-ink-600 dark:text-ink-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="border-b-2 border-ink dark:border-paper bg-ink-50 dark:bg-ink-900">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="font-display text-3xl md:text-4xl font-bold text-ink dark:text-paper mb-12 text-center"
          >
            こんな場面で
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-4">
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.persona}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-paper dark:bg-ink border-2 border-ink dark:border-paper shadow-brutal p-6"
              >
                <div className="text-2xl mb-2">{uc.persona}</div>
                <h3 className="font-display font-bold text-ink dark:text-paper mb-1">{uc.situation}</h3>
                <div className="mt-4 space-y-3">
                  <div className="bg-ink-100 dark:bg-ink-800 border-l-4 border-ink-300 dark:border-ink-600 p-3">
                    <p className="text-xs font-bold text-ink-400 dark:text-ink-500 mb-1">BEFORE</p>
                    <p className="text-sm text-ink-600 dark:text-ink-400">{uc.before}</p>
                  </div>
                  <div className="bg-accent/5 border-l-4 border-accent p-3">
                    <p className="text-xs font-bold text-accent mb-1">AFTER</p>
                    <p className="text-sm text-ink dark:text-paper">{uc.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="border-b-2 border-ink dark:border-paper">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="font-display text-3xl md:text-4xl font-bold text-ink dark:text-paper mb-8 text-center"
          >
            テクノロジー
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: '音声認識', items: ['xAI Grok STT', 'Whisper (フォールバック)'] },
              { label: 'AI処理', items: ['Claude Haiku (補正・抽出)', 'Claude Sonnet (まとめ資料)'] },
              { label: 'アプリ', items: ['React Native / Expo', 'Cloudflare Workers'] },
            ].map((col) => (
              <div key={col.label} className="bg-paper dark:bg-ink border-2 border-ink dark:border-paper p-6">
                <h3 className="font-display font-bold text-accent text-sm mb-3">{col.label}</h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-ink dark:text-paper text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent inline-block" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-b-2 border-ink dark:border-paper bg-ink-50 dark:bg-ink-900">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="font-display text-3xl md:text-4xl font-bold text-ink dark:text-paper mb-4"
          >
            料金
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-ink-500 dark:text-ink-400 mb-8"
          >
            1セッション約60〜130円のAPI実費のみ。サブスクリプションプランは準備中です。
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="inline-block bg-paper dark:bg-ink border-2 border-ink dark:border-paper shadow-brutal p-8"
          >
            <div className="font-display text-5xl font-bold text-accent mb-2">~¥130</div>
            <div className="text-ink-500 dark:text-ink-400 text-sm">/ 1時間セッション（フル機能利用時）</div>
            <div className="text-ink-400 dark:text-ink-500 text-xs mt-2">録音 + AI補正 + ノート生成 + まとめ資料</div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink dark:bg-paper">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="font-display text-3xl md:text-5xl font-bold text-paper dark:text-ink mb-6"
          >
            声が、ノートに変わる。
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-ink-400 dark:text-ink-600 text-lg mb-8"
          >
            App Store 公開準備中 — Coming Soon
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-accent text-paper border-2 border-accent font-display font-semibold h-14 px-8 text-lg shadow-[4px_4px_0_0_#E63939] hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#E63939] transition-all"
            >
              ← ポートフォリオに戻る
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
