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
    icon: '🤯',
    label: '保護者会',
    text: '帰宅した瞬間「で、何だったの?」と聞かれて、うまく説明できない。',
  },
  {
    icon: '📝',
    label: '会議・授業',
    text: 'メモを取りながら聞くと内容を聞き逃す。後で読み返しても文脈がわからない。',
  },
  {
    icon: '⏰',
    label: '宿題・TODO',
    text: '「来週までにアレ準備して」を忘れて、家族や同僚に迷惑をかける。',
  },
];

const FEATURES = [
  {
    title: 'AIが構造化したノート',
    desc: 'ただの文字起こしではなく、見出し付きで読みやすいノートに自動変換。全ての記述に「この発話が根拠」というエビデンス付き。',
    image: '/images/echonote/screen-note.png',
    accent: '高精度日本語AI',
  },
  {
    title: 'ワンタップ録音',
    desc: '会議・講演・授業・懇談会、どんな場面でも一瞬で開始。バックグラウンドでも途切れず、長時間収録に対応。',
    image: '/images/echonote/screen-record.png',
    accent: 'iOS最適化',
  },
  {
    title: '会議のTODOを自動抽出',
    desc: 'AIが「やるべきこと」を自動でリストアップ。期限・担当者まで検出。家族や同僚との分担も明確に。',
    image: '/images/echonote/screen-todo.png',
    accent: 'AIアクション解析',
  },
  {
    title: '要レビューだけハイライト',
    desc: '信頼度の低い箇所だけAIがピックアップ。全文を読み返さなくても、確認すべき場所だけ効率的にチェック。',
    image: '/images/echonote/screen-review.png',
    accent: 'ハイブリッド精度',
  },
];

const USE_CASES = [
  {
    persona: '子育て中の保護者',
    emoji: '👨‍👩‍👧',
    headline: '保護者会の情報非対称をゼロに',
    body: '出席できなかったパートナーにノートを共有。「お母さんが出て、お父さんは何があったかわからない」がなくなる。',
  },
  {
    persona: '学生・研究者',
    emoji: '🎓',
    headline: '専門用語に強い文字起こし',
    body: '配布資料をスキャンすると、固有名詞や専門用語をAIが学習。回を重ねるごとに精度が向上。',
  },
  {
    persona: 'ビジネスパーソン',
    emoji: '💼',
    headline: '議事録作成、もう不要',
    body: '会議終了と同時に、構造化された議事録とTODOが完成。すぐに関係者へ共有できる。',
  },
];

// Reusable eyebrow that pairs a section index with a label. Gives the page
// a sense of forward motion without changing existing section structure.
function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <p className="font-display text-sm font-bold text-accent uppercase tracking-widest mb-3 inline-flex items-center gap-3">
      <span className="text-ink-400 dark:text-ink-500 tabular-nums">{index}</span>
      <span className="w-6 h-px bg-accent/40" />
      <span>{label}</span>
    </p>
  );
}

const PRICING_ROWS: Array<{ label: string; free: string; premium: string; highlight?: boolean }> = [
  { label: '文字起こし', free: '◯', premium: '◯' },
  { label: 'AI ノート生成', free: '◯', premium: '◯' },
  { label: 'TODO の自動抽出', free: '◯', premium: '◯' },
  { label: '要レビュー箇所のハイライト', free: '◯', premium: '◯' },
  { label: 'Apple Watch 連携', free: '◯', premium: '◯' },
  { label: '月あたりの録音時間', free: '1 時間', premium: '5 時間' },
  { label: '月あたりの OCR スキャン', free: '5 回', premium: '無制限' },
  { label: '話者分離（誰が話したか自動ラベル）', free: '—', premium: '◯', highlight: true },
];

export default function EchoNoteLandingPage() {
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
                App Store 公開中 ・ Apple Watch 対応
              </div>

              <Image
                src="/images/echonote/5_logo.png"
                alt="EchoNote"
                width={420}
                height={140}
                className="mb-6 max-w-[320px] md:max-w-[420px] dark:invert dark:brightness-200"
                priority
              />

              <p className="font-display text-2xl md:text-3xl text-ink dark:text-paper leading-snug mb-6">
                <span className="bg-accent/15 px-2">録音するだけで、</span>
                <br />
                根拠付きノートが完成。
              </p>

              <p className="text-base md:text-lg text-ink-600 dark:text-ink-400 leading-relaxed mb-8 max-w-lg">
                保護者会・会議・授業の音声を、AIが文字起こし・整理・TODO抽出。
                家族にもパートナーにも、ワンタップで共有できます。
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://apps.apple.com/jp/app/echonote-%E3%82%A8%E3%82%B3%E3%83%BC%E3%83%8E%E3%83%BC%E3%83%88/id6764349230"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-paper border-2 border-ink shadow-brutal hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all font-display font-bold h-14 px-7 text-base"
                >
                  📱 App Store で入手 →
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 bg-transparent text-ink dark:text-paper border-2 border-ink dark:border-paper font-display font-bold h-14 px-7 text-base hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-all"
                >
                  機能を見る ↓
                </a>
              </div>

              <p className="text-xs text-ink-500 dark:text-ink-500 mt-6">
                ✨ App Store で公開中 ・ 無料でダウンロードできます
              </p>
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
                  src="/images/echonote/1_otter_large.png"
                  alt="EchoNote マスコット"
                  width={520}
                  height={520}
                  className="relative drop-shadow-2xl"
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
            <SectionEyebrow index="01" label="こんなこと、ありませんか?" />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink dark:text-paper leading-tight">
              聞いていたはずなのに、
              <br />
              覚えていない瞬間。
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

      {/* ───────── How it Works ───────── */}
      <section className="border-b-2 border-ink dark:border-paper">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <SectionEyebrow index="02" label="How it works" />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink dark:text-paper leading-tight">
              3ステップで、
              <br />
              ノートが完成。
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: '録音する', desc: 'ワンタップで開始。Apple Watch からも可能。', icon: '🎙️' },
              { step: '02', title: 'AIが整理', desc: '自動で文字起こし → 補正 → 構造化ノート生成。', icon: '✨' },
              { step: '03', title: '共有する', desc: 'TODOまで自動抽出。家族や同僚にワンタップで共有。', icon: '🤝' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="relative bg-paper dark:bg-ink border-2 border-ink dark:border-paper shadow-brutal p-7 text-center"
              >
                <div className="absolute -top-4 left-7 bg-accent text-paper font-display font-bold text-xs px-3 py-1 border-2 border-ink">
                  STEP {s.step}
                </div>
                <div className="text-6xl mb-4 mt-2">{s.icon}</div>
                <h3 className="font-display text-2xl font-bold text-ink dark:text-paper mb-2">{s.title}</h3>
                <p className="text-ink-500 dark:text-ink-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Features (with screenshots) ───────── */}
      <section id="features" className="border-b-2 border-ink dark:border-paper bg-ink-50 dark:bg-ink-900">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <SectionEyebrow index="03" label="Features" />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink dark:text-paper leading-tight">
              ただの録音アプリでは、
              <br />
              ありません。
            </h2>
          </motion.div>

          <div className="space-y-16">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                custom={0}
                className={`grid md:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div>
                  <div className="inline-block bg-accent/10 text-accent text-xs font-display font-bold px-3 py-1 border border-accent/30 mb-4">
                    {f.accent}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-ink dark:text-paper leading-tight mb-4">
                    {f.title}
                  </h3>
                  <p className="text-ink-600 dark:text-ink-400 text-lg leading-relaxed">{f.desc}</p>
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/15 blur-2xl scale-105" />
                    <Image
                      src={f.image}
                      alt={f.title}
                      width={300}
                      height={650}
                      className="relative border-2 border-ink dark:border-paper shadow-brutal-lg max-h-[600px] w-auto"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Apple Watch ───────── */}
      <section className="border-b-2 border-ink dark:border-paper bg-ink dark:bg-paper">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="inline-block bg-paper text-ink dark:bg-ink dark:text-paper text-xs font-display font-bold px-3 py-1 border-2 border-paper dark:border-ink mb-6">
                ⌚ Apple Watch 対応
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-paper dark:text-ink leading-tight mb-6">
                iPhoneを取り出せない、
                <br />
                その瞬間に。
              </h2>
              <p className="text-paper-300 dark:text-ink-600 text-lg leading-relaxed mb-8">
                両手がふさがっている時、立ち話の途中、子どもを抱っこ中。
                Apple Watch なら、手元から1タップで録音開始。
                iPhoneと自動で同期されます。
              </p>
              <ul className="space-y-3 text-paper dark:text-ink">
                {[
                  'ワンタップで録音開始/停止',
                  'ブックマーク（あとで振り返る目印）',
                  'iPhoneへの自動転送（OSが配信を保証）',
                  '転送された録音は自動でAI処理',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-accent text-xl leading-none mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/30 blur-3xl scale-110" />
                <Image
                  src="/images/echonote/screen-watch.png"
                  alt="Apple Watch 録音画面"
                  width={400}
                  height={490}
                  className="relative border-2 border-paper dark:border-ink shadow-brutal-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── Use Cases ───────── */}
      <section id="use-cases" className="border-b-2 border-ink dark:border-paper">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <SectionEyebrow index="05" label="Use Cases" />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink dark:text-paper leading-tight">
              こんな人に、使われています。
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {USE_CASES.map((u, i) => (
              <motion.div
                key={u.persona}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-paper dark:bg-ink border-2 border-ink dark:border-paper shadow-brutal p-7"
              >
                <div className="text-5xl mb-4">{u.emoji}</div>
                <div className="font-display text-sm font-bold text-accent mb-2">{u.persona}</div>
                <h3 className="font-display text-xl font-bold text-ink dark:text-paper mb-3 leading-tight">
                  {u.headline}
                </h3>
                <p className="text-ink-600 dark:text-ink-400 leading-relaxed text-sm">{u.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Pricing ───────── */}
      <section id="pricing" className="relative overflow-hidden border-b-2 border-ink dark:border-paper">
        {/* Subtle floating decorations — gives the Pricing section a touch
            more weight than the regular sections without overpowering. */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-16 left-[8%] w-16 h-16 border-2 border-accent/30 hidden md:block"
            animate={{ rotate: [0, 90, 0], y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-[10%] w-3 h-3 bg-accent/60 rounded-full hidden md:block"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 right-[5%] w-10 h-1 bg-ink/30 dark:bg-paper/30 hidden lg:block"
            animate={{ scaleX: [1, 1.6, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <SectionEyebrow index="06" label="Pricing" />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink dark:text-paper leading-tight mb-4">
              無料で始めて、
              <br />
              必要になったら Premium に。
            </h2>
            <p className="text-ink-600 dark:text-ink-400 text-base md:text-lg">
              アカウント登録不要。いつでも解約できます。
            </p>
          </motion.div>

          {/* Plan cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-10 items-stretch">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-paper dark:bg-ink border-2 border-ink dark:border-paper shadow-brutal p-7 transition-shadow hover:shadow-brutal-lg flex flex-col"
            >
              <div className="font-display text-sm font-bold text-ink-600 dark:text-ink-400 mb-2">
                無料プラン
              </div>
              <div className="font-display text-4xl md:text-5xl font-bold text-ink dark:text-paper mb-4">
                ¥0
                <span className="text-lg font-normal text-ink-500 dark:text-ink-500"> / 月</span>
              </div>
              <p className="text-ink-600 dark:text-ink-400 text-sm leading-relaxed flex-1">
                録音 1 時間 / 月、OCR 5 回 / 月の上限で、コア機能をすべて利用できます。
                まずは試してみたい方はこちらから。
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-accent text-paper border-2 border-ink shadow-brutal-lg p-7 relative flex flex-col"
            >
              <div className="absolute -top-3 right-6 bg-ink text-paper text-xs font-display font-bold px-3 py-1 border-2 border-ink flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                おすすめ
              </div>
              <div className="font-display text-sm font-bold text-paper/80 mb-2">
                Premium プラン
              </div>
              <div className="flex items-baseline gap-3 mb-1">
                <div className="font-display text-4xl md:text-5xl font-bold">
                  ¥600
                  <span className="text-lg font-normal opacity-80"> / 月</span>
                </div>
              </div>
              <div className="font-display text-sm text-paper/90 mb-4">
                または ¥4,800 / 年（¥400 / 月相当、約 33% お得）
              </div>
              <p className="text-paper/90 text-sm leading-relaxed flex-1">
                録音 5 時間 / 月、OCR 実質無制限、そして話者分離機能。会議・授業・
                インタビュー等を本格的に使う方向け。
              </p>
            </motion.div>
          </div>

          {/* Comparison table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="border-2 border-ink dark:border-paper shadow-brutal overflow-hidden bg-paper dark:bg-ink"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="bg-ink-50 dark:bg-ink-900 border-b-2 border-ink dark:border-paper">
                  <th className="font-display font-bold text-ink dark:text-paper px-5 py-4 text-sm md:text-base">
                    機能
                  </th>
                  <th className="font-display font-bold text-ink dark:text-paper px-5 py-4 text-sm md:text-base text-center w-24 md:w-32">
                    無料
                  </th>
                  <th className="font-display font-bold text-ink dark:text-paper px-5 py-4 text-sm md:text-base text-center w-28 md:w-36 bg-accent/10">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICING_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-ink/15 dark:border-paper/15 last:border-b-0 ${
                      row.highlight ? 'bg-accent/5' : ''
                    }`}
                  >
                    <td className="text-ink dark:text-paper px-5 py-3 text-sm md:text-base">
                      {row.label}
                      {row.highlight && (
                        <span className="ml-2 inline-block bg-accent text-paper text-[10px] font-display font-bold px-2 py-0.5 align-middle">
                          NEW
                        </span>
                      )}
                    </td>
                    <td className="text-ink-600 dark:text-ink-400 px-5 py-3 text-sm md:text-base text-center font-display">
                      {row.free}
                    </td>
                    <td className="text-ink dark:text-paper px-5 py-3 text-sm md:text-base text-center font-display font-bold bg-accent/5">
                      {row.premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={3}
            className="text-center mt-10"
          >
            <a
              href="https://apps.apple.com/jp/app/echonote-%E3%82%A8%E3%82%B3%E3%83%BC%E3%83%8E%E3%83%BC%E3%83%88/id6764349230"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-paper border-2 border-ink shadow-brutal hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all font-display font-bold h-14 px-7 text-base"
            >
              📱 App Store で入手 →
            </a>
            <p className="text-xs text-ink-500 dark:text-ink-500 mt-4">
              Premium へのアップグレードはアプリ内から行えます。
              <br className="hidden md:block" />
              サブスクリプションは Apple ID 経由で管理され、いつでも解約可能です。
            </p>
          </motion.div>
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
                src="/images/echonote/3_otter_writing.png"
                alt="プライバシー"
                width={200}
                height={200}
                className="drop-shadow-xl"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="inline-block bg-accent text-paper text-xs font-display font-bold px-3 py-1 border-2 border-ink mb-4">
                Privacy First
              </div>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-ink dark:text-paper leading-tight mb-4">
                録音もノートも、
                <br />
                すべてあなたの端末に。
              </h2>
              <p className="text-ink-600 dark:text-ink-400 text-base leading-relaxed mb-6">
                アカウント登録不要。広告も解析ツールもありません。
                AI処理時のみ音声データを暗号化して送信し、処理後は保存しません。
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/legal/echonote/privacy"
                  className="inline-flex items-center gap-2 text-accent font-display font-bold text-sm border-b-2 border-accent hover:opacity-70 transition-opacity"
                >
                  プライバシーポリシー →
                </Link>
                <Link
                  href="/legal/echonote/terms"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl scale-110" />
              <div className="relative bg-paper dark:bg-ink-800 rounded-full p-4 border-2 border-ink dark:border-paper shadow-brutal">
                <Image
                  src="/images/echonote/2_otter_tablet.png"
                  alt="EchoNote"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="font-display text-4xl md:text-6xl font-bold text-ink dark:text-paper mb-6 leading-tight"
          >
            声を、文字に。
            <br />
            思いを、ノートに。
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-ink-500 dark:text-ink-400 text-lg mb-10"
          >
            App Store で公開中 ・ 無料でダウンロードできます
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <a
              href="https://apps.apple.com/jp/app/echonote-%E3%82%A8%E3%82%B3%E3%83%BC%E3%83%8E%E3%83%BC%E3%83%88/id6764349230"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-paper border-2 border-ink dark:border-paper font-display font-bold h-14 px-8 text-lg shadow-brutal hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all"
            >
              📱 App Store で入手 →
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-transparent text-ink dark:text-paper border-2 border-ink dark:border-paper font-display font-bold h-14 px-8 text-lg hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-all"
            >
              ← ポートフォリオに戻る
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={3}
            className="flex flex-wrap justify-center gap-6 text-sm text-ink-500 dark:text-ink-400 pt-8 border-t border-ink-200 dark:border-ink-700"
          >
            <Link href="/legal/echonote/privacy" className="hover:text-accent underline">
              プライバシーポリシー
            </Link>
            <Link href="/legal/echonote/terms" className="hover:text-accent underline">
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
