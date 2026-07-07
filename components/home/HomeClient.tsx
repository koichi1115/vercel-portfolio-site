"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { StatsSection } from "@/components/StatsSection";
import { Footer } from "@/components/Footer";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

export interface HomeProject {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  category: string;
  date: string;
}

export interface HomeDiary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
}

export interface HomeReview {
  slug: string;
  title: string;
  category: string;
  rating: number;
  thumbnail: string;
}

interface HomeClientProps {
  projects: HomeProject[];
  diaries: HomeDiary[];
  reviews: HomeReview[];
}

const MARQUEE_ITEMS = [
  "Python",
  "C#",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "AWS",
  "DX Strategy",
  "AI Consulting",
  "Claude Code",
  "Supabase",
];

const REVIEW_LABELS: Record<string, string> = {
  music: "Music",
  movie: "Movie",
  manga: "Comic",
  book: "Book",
};

const easeExpo = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: easeExpo },
};

function formatDate(value: string) {
  try {
    return format(new Date(value), "yyyy.MM.dd");
  } catch {
    return value;
  }
}

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-mask overflow-hidden border-y hairline py-4">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-syne text-sm font-semibold uppercase tracking-[0.2em] text-abyss-500 dark:text-bone-400"
          >
            {item}
            <span className="text-volt-600 dark:text-volt">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function HomeClient({ projects, diaries, reviews }: HomeClientProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const mode = mounted && resolvedTheme === "light" ? "light" : "dark";

  return (
    <div className="min-h-screen bg-bone dark:bg-abyss font-zen text-abyss dark:text-bone selection:bg-volt selection:text-volt-ink">
      <div className="grain-overlay" />

      <main className="relative">
        {/* ============================== HERO ============================== */}
        <section className="relative -mt-20 flex min-h-[100svh] flex-col overflow-hidden bg-bone dark:bg-abyss">
          <div className="aurora-glow absolute inset-0" />
          {mounted && <HeroCanvas mode={mode} />}

          {/* gradient scrim so type stays readable over the canvas */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bone dark:to-abyss" />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-32 pb-20 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeExpo }}
              className="mb-8 flex items-center gap-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full border hairline px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-volt animate-pulse-dot" />
                Available for work
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-abyss-400 dark:text-bone-400 sm:inline">
                Tokyo, Japan
              </span>
            </motion.div>

            <h1 className="font-syne font-extrabold leading-[0.92] tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: easeExpo }}
                className="block text-[clamp(3rem,13.5vw,11rem)]"
              >
                KOICHI
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.22, ease: easeExpo }}
                className="block text-[clamp(2rem,6vw,4.5rem)]"
              >
                <span className="text-outline">DX Strategist</span>{" "}
                <span className="text-aurora">&amp; Engineer</span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.38, ease: easeExpo }}
              className="mt-8 max-w-xl text-base leading-loose text-abyss-500 dark:text-bone-300 sm:text-lg"
            >
              技術とビジネスの両面から、
              <span className="font-semibold text-abyss dark:text-bone">
                本質的な価値創造
              </span>
              に取り組んでいます。AI導入支援からプロダクト開発まで。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: easeExpo }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link href="/projects" className="btn-volt px-8 py-4 text-sm">
                View Projects
                <span aria-hidden>→</span>
              </Link>
              <Link href="/profile" className="btn-ghost px-8 py-4 text-sm">
                About Me
              </Link>
            </motion.div>
          </div>

          {/* marquee pinned to hero bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="relative z-10"
          >
            <Marquee />
          </motion.div>
        </section>

        {/* ========================== SELECTED WORKS ========================== */}
        <section className="relative py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <motion.div {...fadeUp} className="mb-16 flex items-end justify-between">
              <div>
                <p className="overline-chip mb-4">Selected Works — 01</p>
                <h2 className="font-syne text-5xl font-extrabold tracking-tight sm:text-7xl">
                  Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="group hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-abyss-500 dark:text-bone-400 transition-colors hover:text-volt-600 dark:hover:text-volt sm:flex"
              >
                View all
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>

            <div className="border-t hairline">
              {projects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: easeExpo }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group grid grid-cols-1 gap-6 border-b hairline py-10 transition-colors md:grid-cols-12 md:items-center"
                  >
                    <div className="flex items-baseline gap-6 md:col-span-2 md:flex-col md:gap-3">
                      <span className="font-syne text-sm font-bold text-abyss-400 dark:text-bone-400">
                        /{String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-volt-700 dark:text-volt">
                        {project.category}
                      </span>
                    </div>

                    <div className="md:col-span-6">
                      <h3 className="font-syne text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-volt-600 dark:group-hover:text-volt sm:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-relaxed text-abyss-500 dark:text-bone-400">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border hairline px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-abyss-500 dark:text-bone-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-4">
                      <div className="panel panel-hover relative aspect-video overflow-hidden rounded-xl">
                        {project.thumbnail ? (
                          <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            sizes="(min-width: 768px) 33vw, 100vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="font-syne text-6xl font-extrabold text-aurora">
                              {project.title.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 sm:hidden">
              <Link href="/projects" className="btn-ghost w-full px-6 py-3 text-sm">
                View all projects →
              </Link>
            </div>
          </div>
        </section>

        {/* ============================== STATS ============================== */}
        <StatsSection />

        {/* ============================ WRITING ============================ */}
        <section className="relative py-28">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <motion.div {...fadeUp} className="mb-16">
              <p className="overline-chip mb-4">Writing & Culture — 02</p>
              <h2 className="font-syne text-5xl font-extrabold tracking-tight sm:text-7xl">
                Journal
              </h2>
            </motion.div>

            <div className="grid gap-16 lg:grid-cols-2">
              {/* Diaries */}
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

              {/* Reviews */}
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
                  {reviews.map((review) => (
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
            </div>
          </div>
        </section>

        {/* =============================== CTA =============================== */}
        <section className="relative overflow-hidden py-32">
          <div className="aurora-glow absolute inset-0" />
          <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
            <motion.div {...fadeUp}>
              <p className="overline-chip mb-6 justify-center">Contact — 03</p>
              <h2 className="font-syne text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tight">
                Let&apos;s work
                <br />
                <span className="text-aurora">together.</span>
              </h2>
              <p className="mx-auto mt-8 max-w-xl text-base leading-loose text-abyss-500 dark:text-bone-300">
                新しいプロジェクトや協業のご相談はお気軽にどうぞ。
                AI導入支援・プロダクト開発・技術顧問など幅広く承ります。
              </p>
              <div className="mt-10">
                <Link href="/contact" className="btn-volt px-10 py-5 text-base">
                  Get in touch
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
