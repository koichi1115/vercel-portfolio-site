"use client";

import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
  description?: string;
}

const stats: Stat[] = [
  {
    value: "5+",
    label: "年の開発経験",
    description: "Full-stack development",
  },
  {
    value: "30+",
    label: "プロジェクト完了",
    description: "Personal & enterprise",
  },
  {
    value: "10+",
    label: "AI導入支援",
    description: "AI adoption consulting",
  },
  {
    value: "100%",
    label: "Vibe Coding",
    description: "Powered by Claude Code",
  },
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y hairline bg-bone-50 dark:bg-abyss-900 py-24 font-zen">
      <div className="aurora-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="overline-chip mb-4">Achievements</p>
          <h2 className="font-syne text-4xl font-extrabold tracking-tight text-abyss dark:text-bone sm:text-6xl">
            数字で見る実績
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group border-t hairline px-1 py-8 lg:border-l lg:border-t-0 lg:px-8 lg:first:border-l-0 lg:first:pl-1"
            >
              <div className="font-syne text-6xl font-extrabold tracking-tight text-aurora lg:text-7xl tabular-nums">
                {stat.value}
              </div>
              <div className="mt-4 font-syne text-lg font-bold text-abyss dark:text-bone">
                {stat.label}
              </div>
              {stat.description && (
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-abyss-400 dark:text-bone-400">
                  {stat.description}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 font-mono text-[11px] uppercase tracking-[0.3em] text-abyss-400 dark:text-bone-400"
        >
          ✦ 常に新しい技術に挑戦中
        </motion.p>
      </div>
    </section>
  );
}
