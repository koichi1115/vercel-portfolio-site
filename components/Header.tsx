"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "作品", path: "/projects" },
  { name: "プロフィール", path: "/profile" },
  { name: "日記", path: "/diaries" },
  { name: "問い合わせ", path: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on navigation + lock scroll while open
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-bone/75 dark:bg-abyss/70 border-b hairline"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-baseline gap-1 font-syne text-xl font-extrabold tracking-tight text-abyss dark:text-bone"
              aria-label="Home"
            >
              KOICHI
              <span className="inline-block h-2 w-2 rounded-full bg-volt transition-transform duration-300 group-hover:scale-150" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-200 ${
                      isActive
                        ? "text-volt-ink dark:text-volt"
                        : "text-abyss-500 dark:text-bone-400 hover:text-abyss dark:hover:text-bone"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-volt/90 dark:bg-volt/10 dark:ring-1 dark:ring-volt/40"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
              <div className="ml-3">
                <ThemeToggle />
              </div>
            </nav>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
                aria-expanded={menuOpen}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border hairline"
              >
                <span
                  className={`absolute h-0.5 w-4 bg-current transition-all duration-300 ${
                    menuOpen ? "rotate-45" : "-translate-y-[3px]"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-4 bg-current transition-all duration-300 ${
                    menuOpen ? "-rotate-45" : "translate-y-[3px]"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-bone dark:bg-abyss aurora-glow"
          >
            <div className="grid-lines absolute inset-0" />
            <nav className="relative flex h-full flex-col justify-center gap-2 px-10">
              {navItems.map((item, i) => {
                const isActive =
                  item.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.path);
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`group flex items-baseline gap-4 py-2 font-syne text-4xl font-bold tracking-tight ${
                        isActive
                          ? "text-aurora"
                          : "text-abyss dark:text-bone"
                      }`}
                    >
                      <span className="font-mono text-xs tracking-[0.3em] text-abyss-400 dark:text-bone-400">
                        0{i + 1}
                      </span>
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12 left-10 font-mono text-[11px] uppercase tracking-[0.3em] text-abyss-400 dark:text-bone-400"
              >
                DX Strategist & Engineer
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
