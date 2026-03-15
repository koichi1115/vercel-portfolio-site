"use client";

import { motion } from 'framer-motion';
import type { SkillCategory } from '@/lib/content';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-paper dark:bg-ink">
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
            Expertise
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper">
            Skills<span className="text-accent">.</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-ink-50 dark:bg-ink-900 border-2 border-ink dark:border-paper p-8 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-brutal dark:shadow-[4px_4px_0_0_#FEFEFE] hover:shadow-brutal-lg dark:hover:shadow-[6px_6px_0_0_#FEFEFE]"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent flex items-center justify-center text-paper font-display font-bold text-xl">
                  {category.category.charAt(0)}
                </div>
                <h3 className="font-display text-xl font-bold text-ink dark:text-paper">
                  {category.category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-2 font-mono text-xs uppercase tracking-wider border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 bg-paper dark:bg-ink-800 hover:border-accent hover:text-accent transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
