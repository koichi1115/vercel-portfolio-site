"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ProfileData } from '@/lib/content';

interface ProfileDetailProps {
  profile: ProfileData;
}

export function ProfileDetail({ profile }: ProfileDetailProps) {
  return (
    <section className="relative py-24 bg-paper dark:bg-ink overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 border-2 border-ink-100 dark:border-ink-900 hidden lg:block" />
      <div className="absolute bottom-20 left-10 w-32 h-32 border-2 border-accent/30 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Avatar Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Decorative frames */}
              <div className="absolute -inset-4 border-2 border-ink dark:border-paper translate-x-4 translate-y-4" />
              <div className="absolute -inset-4 border-2 border-accent -translate-x-2 -translate-y-2" />

              {/* Avatar */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden border-4 border-ink dark:border-paper bg-ink-100 dark:bg-ink-900">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-accent-600 text-paper text-8xl font-display font-bold">
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-accent text-paper font-mono text-xs uppercase tracking-wider">
                Available
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-8"
          >
            {/* Label */}
            <span className="inline-block font-mono text-sm uppercase tracking-widest text-accent border-l-4 border-accent pl-4">
              About Me
            </span>

            {/* Name */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-ink dark:text-paper leading-none">
              {profile.name}<span className="text-accent">.</span>
            </h1>

            {/* Title */}
            <p className="font-display text-2xl md:text-3xl text-ink-500 dark:text-ink-400">
              {profile.title}
            </p>

            {/* Bio */}
            <p className="text-lg text-ink-600 dark:text-ink-300 leading-relaxed max-w-2xl">
              {profile.bio}
            </p>

            {/* Content from markdown */}
            {profile.content && (
              <div
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-display prose-headings:tracking-tight
                  prose-p:text-ink-600 dark:prose-p:text-ink-300
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-ink dark:prose-strong:text-paper"
                dangerouslySetInnerHTML={{ __html: profile.content }}
              />
            )}

            {/* Divider */}
            <div className="h-px w-full bg-ink-200 dark:bg-ink-800" />

            {/* Contact/Social Links placeholder */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-ink dark:bg-paper text-paper dark:text-ink font-display font-semibold text-sm border-2 border-ink dark:border-paper transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 shadow-brutal dark:shadow-[4px_4px_0_0_#FEFEFE]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-ink dark:text-paper font-display font-semibold text-sm border-2 border-ink dark:border-paper transition-all duration-300 hover:bg-accent hover:border-accent hover:text-paper"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
