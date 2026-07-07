"use client";

import { motion } from 'framer-motion';
import type { Career } from '@/lib/content';

interface CareerTimelineProps {
  careers: Career[];
}

export function CareerTimeline({ careers }: CareerTimelineProps) {
  if (careers.length === 0) {
    return null;
  }

  return (
    <section className="border-b hairline bg-bone-50 py-24 dark:bg-abyss-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="overline-chip mb-4">Experience</p>
          <h2 className="font-syne text-5xl font-extrabold tracking-tight text-abyss dark:text-bone sm:text-6xl">
            Career
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-volt/60 via-ion/30 to-transparent md:left-8" />

          <div className="space-y-10">
            {careers.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-10 md:pl-24"
              >
                {/* Timeline node */}
                <span className="absolute left-0 top-9 h-[15px] w-[15px] rounded-full border-2 border-volt bg-bone dark:bg-abyss md:left-[25px]" />

                <div className="panel panel-hover p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border hairline px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-abyss-500 dark:text-bone-300">
                      {career.period}
                    </span>
                    {career.current && (
                      <span className="rounded-full bg-volt px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-volt-ink">
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="mb-1 font-syne text-2xl font-bold tracking-tight text-abyss dark:text-bone">
                    {career.company}
                  </h3>

                  <p className="mb-4 font-syne text-lg font-semibold text-volt-600 dark:text-volt">
                    {career.position}
                  </p>

                  <p className="leading-loose text-abyss-500 dark:text-bone-300">
                    {career.description}
                  </p>

                  {career.achievements && career.achievements.length > 0 && (
                    <div className="mt-6 border-t hairline pt-6">
                      <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-abyss-400 dark:text-bone-400">
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {career.achievements.map((achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="flex items-start gap-3 text-abyss-500 dark:text-bone-300"
                          >
                            <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-volt" />
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
