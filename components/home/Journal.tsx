"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fadeUp } from "./motion";
import type { HomeDiary, HomeReview } from "./types";

const REVIEW_LABELS: Record<string, string> = {
  music: "Music",
  movie: "Movie",
  manga: "Comic",
  book: "Book",
};

function formatDate(value: string) {
  try {
    return format(new Date(value), "yyyy.MM.dd");
  } catch {
    return value;
  }
}

export function Journal({
  diaries,
  reviews,
}: {
  diaries: HomeDiary[];
  reviews: HomeReview[];
}) {
  const visibleReviews = reviews.filter((review) => review.title !== "工事中");

  return (
    <section className="relative py-28">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div {...fadeUp} className="mb-16">
          <p className="overline-chip mb-4">Writing & Culture — 02</p>
          <h2 className="font-syne text-5xl font-extrabold tracking-tight sm:text-7xl">
            日記
          </h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-abyss-400 dark:text-bone-400">
                Latest Diaries
              </h3>
              <Link
                href="/diaries"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-volt-700 dark:text-volt hover:underline underline-offset-4"
              >
                All →
              </Link>
            </div>
            <div className="space-y-4">
              {diaries.map((diary) => (
                <Link
                  key={diary.slug}
                  href={`/diaries/${diary.slug}`}
                  className="panel panel-hover group block p-6"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-mono text-[11px] tracking-widest text-abyss-400 dark:text-bone-400">
                      {formatDate(diary.date)}
                    </span>
                    {diary.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider text-volt-700 dark:text-volt"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="font-syne text-lg font-bold transition-colors group-hover:text-volt-600 dark:group-hover:text-volt">
                    {diary.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-abyss-500 dark:text-bone-400">
                    {diary.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>

          {visibleReviews.length > 0 && (
            <motion.div {...fadeUp}>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-abyss-400 dark:text-bone-400">
                  Recent Obsessions
                </h3>
                <Link
                  href="/reviews"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-volt-700 dark:text-volt hover:underline underline-offset-4"
                >
                  All →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {visibleReviews.map((review) => (
                  <Link
                    key={review.slug}
                    href={`/reviews/${review.slug}`}
                    className="panel panel-hover group overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {review.thumbnail ? (
                        <Image
                          src={review.thumbnail}
                          alt={review.title}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-abyss-700/10 dark:bg-bone/5">
                          <span className="font-syne text-3xl font-extrabold text-aurora">
                            {review.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="absolute left-3 top-3 rounded-full bg-abyss/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-bone backdrop-blur-sm">
                        {REVIEW_LABELS[review.category] ?? review.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="line-clamp-1 font-syne text-sm font-bold transition-colors group-hover:text-volt-600 dark:group-hover:text-volt">
                        {review.title}
                      </h4>
                      <p className="mt-1 font-mono text-[11px] tracking-widest text-volt-700 dark:text-volt">
                        {"★".repeat(Math.round(review.rating))}
                        <span className="text-abyss-300 dark:text-bone-400/40">
                          {"★".repeat(Math.max(0, 5 - Math.round(review.rating)))}
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
