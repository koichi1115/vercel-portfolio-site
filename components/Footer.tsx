"use client";

import Link from "next/link";
import Image from "next/image";

const navigation = [
  { href: "/projects", label: "作品" },
  { href: "/profile", label: "プロフィール" },
  { href: "/diaries", label: "日記" },
  { href: "/contact", label: "問い合わせ" },
];

const social = [
  {
    name: "GitHub",
    href: "https://github.com/ko1115productjp-hub",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/48cent",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Filmarks",
    href: "https://filmarks.com",
    icon: (
      <span className="relative block h-5 w-5 overflow-hidden rounded-sm">
        <Image
          src="/images/logos/filmarks.jpg"
          alt="Filmarks"
          fill
          className="object-contain"
        />
      </span>
    ),
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t hairline bg-bone dark:bg-abyss font-zen">
      <div className="aurora-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-10">
        {/* Wordmark + tagline */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="overline-chip mb-4">Get in touch</p>
            <Link
              href="/contact"
              className="group block font-syne text-5xl sm:text-7xl font-extrabold tracking-tight text-abyss dark:text-bone"
            >
              Let&apos;s build
              <span className="text-aurora"> together</span>
              <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">
                ↗
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-abyss-500 dark:text-bone-400">
              技術とビジネスの両面から、本質的な価値創造に取り組んでいます。
              プロジェクトのご相談はお気軽に。
            </p>
          </div>

          {/* Nav + social */}
          <div className="flex gap-16">
            <div>
              <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-abyss-400 dark:text-bone-400">
                Sitemap
              </h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-syne text-sm font-semibold text-abyss-500 dark:text-bone-300 transition-colors hover:text-volt-600 dark:hover:text-volt"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-abyss-400 dark:text-bone-400">
                Social
              </h3>
              <div className="flex flex-col gap-3">
                {social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="flex items-center gap-3 text-abyss-500 dark:text-bone-300 transition-colors hover:text-volt-600 dark:hover:text-volt"
                  >
                    {item.icon}
                    <span className="font-mono text-xs">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-widest text-abyss-400 dark:text-bone-400">
            © {currentYear} SAI — Crafted with Next.js × Three.js
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.25em] text-abyss-500 dark:text-bone-300 hover:text-volt-600 dark:hover:text-volt transition-colors"
          >
            Back to top
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
