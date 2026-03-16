"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  skills?: { category: string; skills: string[] }[];
}

// Character animation component
function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const characters = text.split("");

  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection({ name, title, bio, avatar, skills }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const avatarY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-paper dark:bg-ink">
      {/* Background decorative elements with parallax */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
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
        {/* Additional decorative elements */}
        <motion.div
          className="absolute top-1/2 left-10 w-px h-32 bg-accent/50"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <div className="absolute bottom-20 right-1/4 w-8 h-8 border border-ink-300 dark:border-ink-600 rotate-45" />
      </motion.div>

      <motion.div
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        style={{ y: textY, opacity }}
      >
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

            {/* Name with character animation */}
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-ink dark:text-paper leading-none">
              <AnimatedText text={name} delay={0.1} />
              <motion.span
                className="text-accent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + name.length * 0.03 + 0.2 }}
              >
                .
              </motion.span>
            </h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl md:text-3xl text-ink-500 dark:text-ink-400"
            >
              {title}
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-ink-600 dark:text-ink-300 max-w-xl leading-relaxed"
            >
              {bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                transition={{ duration: 0.8, delay: 0.7 }}
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
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                      whileHover={{ scale: 1.05, borderColor: "var(--accent)" }}
                      className="px-3 py-1 font-mono text-xs border border-ink-300 dark:border-ink-600 text-ink-700 dark:text-ink-300 hover:border-accent hover:text-accent transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right column - Avatar with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
            style={{ y: avatarY }}
          >
            <div className="relative">
              {/* Decorative frame */}
              <motion.div
                className="absolute -inset-4 border-2 border-ink dark:border-paper"
                initial={{ x: 0, y: 0 }}
                animate={{ x: 16, y: 16 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.div
                className="absolute -inset-4 border-2 border-accent"
                initial={{ x: 0, y: 0 }}
                animate={{ x: -8, y: -8 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              {/* Avatar container */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden border-4 border-ink dark:border-paper bg-ink-100 dark:bg-ink-900"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.div>

              {/* Status indicator */}
              <motion.div
                className="absolute -bottom-6 -right-6 px-4 py-2 bg-accent text-paper font-mono text-xs uppercase tracking-wider"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                Available
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity }}
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
