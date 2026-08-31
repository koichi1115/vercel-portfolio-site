"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "./motion";

export function Cta() {
  return (
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
  );
}
