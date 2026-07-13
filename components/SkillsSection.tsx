"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import type { SkillCategory } from '@/lib/content';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

// Skill proficiency levels (can be customized per skill)
const skillLevels: Record<string, number> = {
  // Languages
  'TypeScript': 90,
  'JavaScript': 95,
  'Python': 80,
  'Go': 65,
  'Rust': 50,
  'SQL': 85,
  // Frontend
  'React': 95,
  'Next.js': 90,
  'Vue.js': 75,
  'Tailwind CSS': 95,
  'Framer Motion': 85,
  // Backend
  'Node.js': 90,
  'Express': 85,
  'FastAPI': 75,
  'GraphQL': 80,
  'REST API': 95,
  // AI/ML
  'Claude API': 95,
  'OpenAI API': 90,
  'LangChain': 80,
  'Prompt Engineering': 95,
  'RAG': 85,
  // Infrastructure
  'AWS': 80,
  'GCP': 70,
  'Docker': 85,
  'Vercel': 95,
  'Cloudflare': 85,
  // Default
  'default': 75,
};

function SkillBar({ skill, index }: { skill: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const level = skillLevels[skill] || skillLevels['default'];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-xs uppercase tracking-wider text-abyss-500 dark:text-bone-300 group-hover:text-volt-600 dark:group-hover:text-volt transition-colors">
          {skill}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.05 + 0.3 }}
          className="font-mono text-xs text-abyss-400 dark:text-bone-400"
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-abyss-500/10 dark:bg-bone/10">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 0.8, delay: index * 0.05 + 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-volt to-ion"
        />
      </div>
    </motion.div>
  );
}

function SkillRadar({ skills }: { skills: string[] }) {
  const topSkills = skills.slice(0, 6);
  const centerX = 100;
  const centerY = 100;
  const radius = 80;

  const points = topSkills.map((skill, i) => {
    const angle = (i * 2 * Math.PI) / topSkills.length - Math.PI / 2;
    const level = (skillLevels[skill] || skillLevels['default']) / 100;
    return {
      x: centerX + Math.cos(angle) * radius * level,
      y: centerY + Math.sin(angle) * radius * level,
      labelX: centerX + Math.cos(angle) * (radius + 20),
      labelY: centerY + Math.sin(angle) * (radius + 20),
      skill,
      level,
    };
  });

  const pathData = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ') + ' Z';

  return (
    <div className="relative w-full aspect-square max-w-xs mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background circles */}
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <circle
            key={scale}
            cx={centerX}
            cy={centerY}
            r={radius * scale}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-abyss-500/20 dark:text-bone/15"
          />
        ))}

        {/* Axis lines */}
        {topSkills.map((_, i) => {
          const angle = (i * 2 * Math.PI) / topSkills.length - Math.PI / 2;
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={centerX + Math.cos(angle) * radius}
              y2={centerY + Math.sin(angle) * radius}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-abyss-500/20 dark:text-bone/15"
            />
          );
        })}

        {/* Skill polygon */}
        <motion.path
          d={pathData}
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="2"
          className="text-volt-600 dark:text-volt"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            className="fill-volt-600 dark:fill-volt"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
          />
        ))}
      </svg>

      {/* Labels */}
      {points.map((point, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-abyss-500 dark:text-bone-400 whitespace-nowrap"
          style={{
            left: `${point.labelX}%`,
            top: `${point.labelY}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.7 + i * 0.05 }}
        >
          {point.skill}
        </motion.div>
      ))}
    </div>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState(0);

  if (skills.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="overline-chip mb-4">Expertise</p>
          <h2 className="font-syne text-5xl font-extrabold tracking-tight text-abyss dark:text-bone sm:text-6xl">
            Skills
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Category tabs and skill bars */}
          <div className="lg:col-span-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                    activeCategory === index
                      ? 'bg-volt text-volt-ink shadow-glow-volt'
                      : 'border hairline text-abyss-500 dark:text-bone-300 hover:border-volt-600 dark:hover:border-volt/60'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category.category}
                </motion.button>
              ))}
            </div>

            {/* Skill Bars */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="panel p-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {skills[activeCategory].skills.map((skill, index) => (
                  <SkillBar key={skill} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
          >
            <div className="panel sticky top-24 p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-abyss-400 dark:text-bone-400 mb-4 text-center">
                Top Skills Overview
              </h3>
              <SkillRadar
                skills={skills.flatMap((c) => c.skills).slice(0, 6)}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
