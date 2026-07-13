"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ProfileData } from '@/lib/content';

interface ProfileDetailProps {
  profile: ProfileData;
}

const easeExpo = [0.16, 1, 0.3, 1] as const;

export function ProfileDetail({ profile }: ProfileDetailProps) {
  return (
    <section className="relative overflow-hidden border-b hairline py-24">
      <div className="aurora-glow pointer-events-none absolute inset-0" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Avatar Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: easeExpo }}
            className="flex justify-center lg:col-span-4 lg:justify-start"
          >
            <div className="relative">
              {/* aurora ring */}
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-volt/50 via-transparent to-ion/50 blur-lg" />

              <div className="relative h-64 w-64 overflow-hidden rounded-[1.75rem] border hairline bg-abyss-700/10 dark:bg-bone/5 md:h-80 md:w-80">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    sizes="(min-width: 768px) 320px, 256px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-syne text-8xl font-extrabold text-aurora">
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="absolute -bottom-4 -right-2 inline-flex items-center gap-2 rounded-full bg-volt px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-volt-ink shadow-glow-volt">
                <span className="h-1.5 w-1.5 rounded-full bg-volt-ink" />
                Available
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeExpo }}
            className="space-y-8 lg:col-span-8"
          >
            <p className="overline-chip">About Me</p>

            <h1 className="font-syne text-[clamp(3rem,8vw,6rem)] font-extrabold leading-none tracking-tight text-abyss dark:text-bone">
              {profile.name}
            </h1>

            <p className="font-syne text-2xl font-semibold md:text-3xl">
              <span className="text-aurora">{profile.title}</span>
            </p>

            <p className="max-w-2xl text-lg leading-loose text-abyss-500 dark:text-bone-300">
              {profile.bio}
            </p>

            {profile.content && (
              <div
                className="prose prose-lg max-w-none dark:prose-invert
                  prose-headings:font-syne prose-headings:tracking-tight
                  prose-p:leading-loose prose-p:text-abyss-500 dark:prose-p:text-bone-300
                  prose-a:text-volt-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-volt
                  prose-strong:text-abyss dark:prose-strong:text-bone
                  prose-li:text-abyss-500 dark:prose-li:text-bone-300"
                dangerouslySetInnerHTML={{ __html: profile.content }}
              />
            )}

            <div className="h-px w-full bg-gradient-to-r from-volt/40 via-ion/20 to-transparent" />

            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/koichi1115"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-volt px-7 py-3.5 text-sm"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a href="/contact" className="btn-ghost px-7 py-3.5 text-sm">
                Contact
                <span aria-hidden>→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
