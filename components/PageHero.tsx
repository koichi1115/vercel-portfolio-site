"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  overline: string;
  title: string;
  /** last word rendered with the aurora gradient */
  titleAccent?: string;
  description?: string;
}

const easeExpo = [0.16, 1, 0.3, 1] as const;

export function PageHero({ overline, title, titleAccent, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b hairline">
      <div className="aurora-glow pointer-events-none absolute inset-0" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeExpo }}
          className="overline-chip mb-6"
        >
          {overline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: easeExpo }}
          className="font-syne text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-tight text-abyss dark:text-bone"
        >
          {title}
          {titleAccent && (
            <>
              {" "}
              <span className="text-aurora">{titleAccent}</span>
            </>
          )}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: easeExpo }}
            className="mt-6 max-w-xl text-base leading-loose text-abyss-500 dark:text-bone-300 sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
