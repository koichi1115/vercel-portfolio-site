"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { StatsSection } from "@/components/StatsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink selection:bg-accent selection:text-paper">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 border-2 border-ink-100 dark:border-ink-900" />
        <div className="absolute bottom-40 left-10 w-64 h-64 border-2 border-accent/20" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent"
          animate={{ y: [0, -20, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-8 h-2 bg-ink dark:bg-paper"
          animate={{ scaleX: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <main className="relative">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left column - Text content */}
              <div className="lg:col-span-7 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="inline-block font-mono text-sm uppercase tracking-widest text-accent border-l-4 border-accent pl-4">
                    Portfolio
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-ink dark:text-paper leading-none"
                >
                  Koichi<span className="text-accent">.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-2xl md:text-3xl text-ink-500 dark:text-ink-400"
                >
                  DX Strategist & Engineer
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg text-ink-600 dark:text-ink-300 max-w-xl leading-relaxed"
                >
                  技術とビジネスの両面から、
                  <span className="text-ink dark:text-paper font-medium">本質的な価値創造</span>
                  に取り組んでいます。
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-ink dark:bg-paper text-paper dark:text-ink font-display font-semibold text-base border-2 border-ink dark:border-paper transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 shadow-brutal dark:shadow-[4px_4px_0_0_#FEFEFE]"
                  >
                    <span>View Projects</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/profile"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-ink dark:text-paper font-display font-semibold text-base border-2 border-ink dark:border-paper transition-all duration-300 hover:bg-accent hover:border-accent hover:text-paper"
                  >
                    <span>About Me</span>
                  </Link>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="pt-8 border-t-2 border-ink-200 dark:border-ink-800"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-4 block">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "C#", "Next.js", "PostgreSQL", "AWS", "DX Strategy"].map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                        className="px-3 py-1 font-mono text-xs border border-ink-300 dark:border-ink-600 text-ink-700 dark:text-ink-300 hover:border-accent hover:text-accent transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right column - Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex justify-center lg:justify-end"
              >
                <div className="relative">
                  <div className="absolute -inset-4 border-2 border-ink dark:border-paper translate-x-4 translate-y-4" />
                  <div className="absolute -inset-4 border-2 border-accent -translate-x-2 -translate-y-2" />

                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden border-4 border-ink dark:border-paper bg-ink-100 dark:bg-ink-900">
                    <Image
                      src="/images/profile/avatar.jpg"
                      alt="Koichi"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      priority
                    />
                  </div>

                  <div className="absolute -bottom-6 -right-6 px-4 py-2 bg-accent text-paper font-mono text-xs uppercase tracking-wider">
                    Available
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-24 bg-ink-50 dark:bg-ink-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Latest Diary Card */}
              <Link
                href="/diaries"
                className="group lg:col-span-2 p-8 bg-paper dark:bg-ink-900 border-2 border-ink dark:border-paper transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-brutal dark:shadow-[4px_4px_0_0_#FEFEFE] hover:shadow-brutal-lg dark:hover:shadow-[6px_6px_0_0_#FEFEFE]"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">Latest Diary</span>
                  <span className="font-mono text-xs text-ink-400">2025.11.01</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-ink dark:text-paper mb-4 group-hover:text-accent transition-colors">
                  エンジニア応援プログラム for バイブコーダー
                </h3>
                <p className="text-ink-600 dark:text-ink-300 line-clamp-2">
                  GMO flatt security株式会社のバイブコーダー向けプログラムに参加した学びや体験記...
                </p>
                <div className="mt-6 flex items-center gap-2 text-accent font-display font-semibold">
                  <span>Read more</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>

              {/* Quick Stats Card */}
              <div className="p-8 bg-accent text-paper border-2 border-accent">
                <span className="font-mono text-xs uppercase tracking-widest opacity-80">Experience</span>
                <div className="mt-6 space-y-4">
                  <div>
                    <span className="font-display text-5xl font-bold">5+</span>
                    <p className="text-sm opacity-80 mt-1">Years in Tech</p>
                  </div>
                  <div className="h-px bg-paper/30" />
                  <div>
                    <span className="font-display text-5xl font-bold">10+</span>
                    <p className="text-sm opacity-80 mt-1">Projects</p>
                  </div>
                </div>
              </div>

              {/* Recent Obsessions */}
              <div className="lg:col-span-3 p-8 bg-paper dark:bg-ink-900 border-2 border-ink dark:border-paper">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-display text-xl font-bold text-ink dark:text-paper">
                    Recent Obsessions
                  </h3>
                  <Link
                    href="/reviews"
                    className="font-mono text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400 hover:text-accent transition-colors"
                  >
                    See all →
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { t: "パルテノペ", c: "Movie" },
                    { t: "サピエンス全史", c: "Book" },
                    { t: "Bohemian Rhapsody", c: "Music" },
                    { t: "SPY×FAMILY", c: "Comic" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="aspect-video bg-ink-100 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 flex flex-col justify-center items-center text-center p-4 hover:border-accent hover:bg-accent/5 transition-all cursor-pointer"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-2">
                        {item.c}
                      </span>
                      <span className="font-display font-semibold text-ink dark:text-paper">
                        {item.t}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* CTA Section */}
        <section className="py-24 bg-paper dark:bg-ink">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper mb-6">
                Let&apos;s work together<span className="text-accent">.</span>
              </h2>
              <p className="text-lg text-ink-600 dark:text-ink-300 mb-8 max-w-2xl mx-auto">
                新しいプロジェクトや協業のご相談はお気軽にどうぞ。
              </p>
              <Link
                href="/profile"
                className="inline-flex items-center gap-3 px-10 py-5 bg-ink dark:bg-paper text-paper dark:text-ink font-display font-semibold text-lg border-2 border-ink dark:border-paper transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 shadow-brutal dark:shadow-[4px_4px_0_0_#FEFEFE]"
              >
                <span>Get in touch</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
