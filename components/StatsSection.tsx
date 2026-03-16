"use client";

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
}

const stats: Stat[] = [
  {
    value: 5,
    suffix: "+",
    label: "年の開発経験",
    description: "フルスタック開発",
  },
  {
    value: 30,
    suffix: "+",
    label: "プロジェクト完了",
    description: "個人・企業案件含む",
  },
  {
    value: 10,
    suffix: "+",
    label: "AI導入支援",
    description: "企業のAI活用を推進",
  },
  {
    value: 100,
    suffix: "%",
    label: "Vibe Coding",
    description: "Claude Code愛用",
  },
];

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(eased * value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 bg-ink dark:bg-paper relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            currentColor 50px,
            currentColor 51px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            currentColor 50px,
            currentColor 51px
          )`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-mono text-sm uppercase tracking-widest text-accent border-l-4 border-accent pl-4 mb-6">
            Achievements
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-paper dark:text-ink">
            数字で見る実績<span className="text-accent">.</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-paper dark:bg-ink border-2 border-paper dark:border-ink p-6 lg:p-8 text-center transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0_0_#FF4500]">
                {/* Number */}
                <div className="font-display text-5xl lg:text-6xl font-bold text-ink dark:text-paper mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="font-display text-lg font-semibold text-ink dark:text-paper mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                {stat.description && (
                  <div className="font-mono text-xs text-ink-500 dark:text-ink-400 uppercase tracking-wider">
                    {stat.description}
                  </div>
                )}

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-t-accent border-l-[20px] border-l-transparent" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="font-mono text-sm text-paper/70 dark:text-ink/70 uppercase tracking-wider">
            常に新しい技術に挑戦中
          </p>
        </motion.div>
      </div>
    </section>
  );
}
