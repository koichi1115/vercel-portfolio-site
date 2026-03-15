"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  skills?: { category: string; skills: string[] }[];
}

export function HeroSection({ name, title, bio, avatar, skills }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-paper dark:bg-ink">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 border-2 border-ink-200 dark:border-ink-800 opacity-20" />
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-accent/10" />
        <motion.div
          className="absolute top-1/3 right-1/4 w-4 h-4 bg-accent"
          animate={{ y: [0, -20, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-2 h-8 bg-ink dark:bg-paper"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left column - Text content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block font-mono text-sm uppercase tracking-widest text-accent border-l-4 border-accent pl-4">
                Portfolio
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-ink dark:text-paper leading-none"
            >
              {name}
              <span className="text-accent">.</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl md:text-3xl text-ink-500 dark:text-ink-400"
            >
              {title}
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-ink-600 dark:text-ink-300 max-w-xl leading-relaxed"
            >
              {bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                href="/profile"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-ink dark:bg-paper text-paper dark:text-ink font-display font-semibold text-base border-2 border-ink dark:border-paper transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 shadow-brutal dark:shadow-[4px_4px_0_0_#FEFEFE]"
              >
                <span>View Profile</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-ink dark:text-paper font-display font-semibold text-base border-2 border-ink dark:border-paper transition-all duration-300 hover:bg-accent hover:border-accent hover:text-paper"
              >
                <span>Projects</span>
              </Link>
            </motion.div>

            {/* Skills */}
            {skills && skills.length > 0 && skills[0].skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="pt-8 border-t border-ink-200 dark:border-ink-800"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-4 block">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {skills[0].skills.slice(0, 6).map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                      className="px-3 py-1 font-mono text-xs border border-ink-300 dark:border-ink-600 text-ink-700 dark:text-ink-300 hover:border-accent hover:text-accent transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right column - Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border-2 border-ink dark:border-paper translate-x-4 translate-y-4" />
              <div className="absolute -inset-4 border-2 border-accent -translate-x-2 -translate-y-2" />

              {/* Avatar container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden border-4 border-ink dark:border-paper bg-ink-100 dark:bg-ink-900">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt={name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-accent-600 text-paper text-8xl font-display font-bold">
                    {name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Status indicator */}
              <div className="absolute -bottom-6 -right-6 px-4 py-2 bg-accent text-paper font-mono text-xs uppercase tracking-wider">
                Available
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-ink-400 dark:text-ink-500"
        >
          <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
