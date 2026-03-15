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
    <section className="py-24 bg-ink-50 dark:bg-ink-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="inline-block font-mono text-sm uppercase tracking-widest text-accent border-l-4 border-accent pl-4 mb-6">
            Experience
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper">
            Career<span className="text-accent">.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-ink-200 dark:bg-ink-800" />

          {/* Career Items */}
          <div className="space-y-12">
            {careers.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-12 md:pl-24"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-8 w-4 h-4 bg-accent border-4 border-paper dark:border-ink-950 transform -translate-x-1/2 z-10" />

                {/* Content Card */}
                <div className="bg-paper dark:bg-ink-900 border-2 border-ink dark:border-paper p-8 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-brutal dark:shadow-[4px_4px_0_0_#FEFEFE] hover:shadow-brutal-lg dark:hover:shadow-[6px_6px_0_0_#FEFEFE]">
                  {/* Period and Status */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 font-mono text-xs uppercase tracking-widest bg-ink dark:bg-paper text-paper dark:text-ink">
                      {career.period}
                    </span>
                    {career.current && (
                      <span className="px-3 py-1 font-mono text-xs uppercase tracking-widest bg-accent text-paper">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Company */}
                  <h3 className="font-display text-2xl font-bold text-ink dark:text-paper mb-2">
                    {career.company}
                  </h3>

                  {/* Position */}
                  <p className="font-display text-lg text-accent font-semibold mb-4">
                    {career.position}
                  </p>

                  {/* Description */}
                  <p className="text-ink-600 dark:text-ink-300 leading-relaxed mb-6">
                    {career.description}
                  </p>

                  {/* Achievements */}
                  {career.achievements && career.achievements.length > 0 && (
                    <div className="pt-6 border-t-2 border-ink-100 dark:border-ink-800">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-4">
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {career.achievements.map((achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="flex items-start gap-3 text-ink-600 dark:text-ink-300"
                          >
                            <span className="flex-shrink-0 w-2 h-2 mt-2 bg-accent" />
                            <span>{achievement}</span>
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
