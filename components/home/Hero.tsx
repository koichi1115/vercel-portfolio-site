"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Marquee } from "./Marquee";
import { easeExpo } from "./motion";
import type { HomeProject } from "./types";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

interface HeroProps {
  featured?: HomeProject;
}

export function Hero({ featured }: HeroProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const mode = mounted && resolvedTheme === "light" ? "light" : "dark";

  const title = featured?.title ?? "作品";
  const description =
    featured?.description ??
    "技術とビジネスの両面から、本質的な価値創造に取り組んでいます。";
  const projectHref = featured ? `/projects/${featured.slug}` : "/projects";

  return (
    <section className="relative -mt-20 flex min-h-[100svh] flex-col overflow-hidden bg-bone dark:bg-abyss">
      <div className="nebula-glow absolute inset-0" />
      {mounted && <HeroCanvas mode={mode} />}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bone dark:to-abyss" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-32 pb-20 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeExpo }}
              className="mb-8 flex flex-wrap items-center gap-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full border hairline px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-volt animate-pulse-dot" />
                Featured Work
              </span>
              {featured?.category && (
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-abyss-400 dark:text-bone-400 sm:inline">
                  {featured.category}
                </span>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: easeExpo }}
              className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-abyss-500 dark:text-bone-300"
            >
              Sai<span className="text-volt-600 dark:text-volt"> ✦ </span>DX
              Strategist &amp; Engineer
            </motion.p>

            <h1 className="font-syne font-extrabold leading-[1.02] tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.16, ease: easeExpo }}
                className="block text-[clamp(2.5rem,7.5vw,6rem)]"
              >
                {title}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: easeExpo }}
              className="mt-8 max-w-xl text-base leading-loose text-abyss-500 dark:text-bone-300 sm:text-lg"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: easeExpo }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link href={projectHref} className="btn-volt px-8 py-4 text-sm">
                作品を見る
                <span aria-hidden>→</span>
              </Link>
              {featured?.demoUrl && (
                <Link
                  href={featured.demoUrl}
                  className="btn-ghost px-8 py-4 text-sm"
                  target={featured.demoUrl.startsWith("http") ? "_blank" : undefined}
                  rel={featured.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {featured.demoLabel ?? "Demo"}
                </Link>
              )}
            </motion.div>
          </div>

          {featured?.thumbnail && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: easeExpo }}
              className="lg:col-span-5"
            >
              <Link href={projectHref} className="panel panel-hover group relative block overflow-hidden rounded-xl">
                <div className="relative aspect-square sm:aspect-video lg:aspect-square">
                  <Image
                    src={featured.thumbnail}
                    alt={title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative z-10"
      >
        <Marquee />
      </motion.div>
    </section>
  );
}
