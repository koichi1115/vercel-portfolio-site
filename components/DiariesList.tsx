"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Diary } from '@/lib/content';

interface DiariesListProps {
  diaries: Diary[];
}

export function DiariesList({ diaries }: DiariesListProps) {
  if (diaries.length === 0) {
    return (
      <div className="px-5 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-sm tracking-widest text-abyss-400 dark:text-bone-400">
            日記がまだ投稿されていません。
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="relative space-y-5 before:absolute before:bottom-4 before:left-[7px] before:top-4 before:hidden before:w-px before:bg-gradient-to-b before:from-volt/60 before:via-ion/30 before:to-transparent sm:before:block">
          {diaries.map((diary, index) => (
            <motion.div
              key={diary.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: Math.min(index, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative sm:pl-10"
            >
              {/* timeline node */}
              <span className="absolute left-0 top-8 hidden h-[15px] w-[15px] rounded-full border-2 border-volt bg-bone dark:bg-abyss sm:block" />

              <Link
                href={`/diaries/${diary.slug}`}
                className="panel panel-hover group block p-7"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <time
                    dateTime={diary.date}
                    className="font-mono text-[11px] tracking-[0.2em] text-abyss-400 dark:text-bone-400"
                  >
                    {new Date(diary.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {diary.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wider text-volt-700 dark:text-volt"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <h2 className="font-syne text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-volt-600 dark:group-hover:text-volt sm:text-2xl">
                  {diary.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-abyss-500 dark:text-bone-400">
                  {diary.excerpt}
                </p>

                <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-volt-700 dark:text-volt">
                  Read entry
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
