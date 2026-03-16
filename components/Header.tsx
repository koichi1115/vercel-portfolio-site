"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/profile" },
  { name: "Projects", path: "/projects" },
  { name: "Reviews", path: "/reviews" },
  { name: "Diaries", path: "/diaries" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="group relative font-display text-2xl font-bold tracking-tight text-ink dark:text-paper"
          >
            <span className="relative z-10">Koichi</span>
            <span className="text-accent">.</span>
            <motion.span
              className="absolute -bottom-1 left-0 h-1 bg-accent"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.path}
                    className={`relative px-4 py-2 font-display text-sm font-medium tracking-wide uppercase transition-all duration-200 ${
                      isActive
                        ? "text-accent"
                        : "text-ink-500 dark:text-ink-300 hover:text-ink dark:hover:text-paper"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center border-2 border-ink dark:border-paper"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className="w-5 h-0.5 bg-ink dark:bg-paper" />
              <span className="w-5 h-0.5 bg-ink dark:bg-paper" />
              <span className="w-3 h-0.5 bg-accent" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-200 dark:via-ink-700 to-transparent" />
    </motion.header>
  );
}
