'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/profile', label: 'Profile' },
    { href: '/projects', label: 'Projects' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/diaries', label: 'Diaries' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-40 dark:border-neutral-800 bg-neutral-0/95 dark:bg-dark-neutral-900/95 backdrop-blur-md supports-[backdrop-filter]:bg-neutral-0/60 dark:supports-[backdrop-filter]:bg-dark-neutral-900/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-neutral-900 dark:text-neutral-0 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
            >
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive(item.href)
                    ? 'text-primary-500 dark:text-primary-300 bg-primary-50 dark:bg-primary-700/20'
                    : 'text-neutral-700 dark:text-neutral-100 hover:bg-neutral-20 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-0'
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 dark:bg-primary-300" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side - Theme toggle + Mobile menu button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 dark:text-neutral-100 hover:bg-neutral-20 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-40 dark:border-neutral-800 py-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-base font-medium rounded-md transition-colors',
                    isActive(item.href)
                      ? 'text-primary-500 dark:text-primary-300 bg-primary-50 dark:bg-primary-700/20'
                      : 'text-neutral-700 dark:text-neutral-100 hover:bg-neutral-20 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-0'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
