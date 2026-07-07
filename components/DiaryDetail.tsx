import Link from 'next/link';
import type { Diary } from '@/lib/content';

interface DiaryDetailProps {
  diary: Diary;
}

const PROSE_CLASS =
  'prose prose-lg max-w-none dark:prose-invert prose-headings:font-syne prose-headings:tracking-tight prose-p:leading-loose prose-p:text-abyss-500 dark:prose-p:text-bone-300 prose-a:text-volt-600 dark:prose-a:text-volt prose-a:no-underline hover:prose-a:underline prose-strong:text-abyss dark:prose-strong:text-bone prose-code:text-abyss dark:prose-code:text-bone prose-pre:bg-abyss-800 prose-pre:text-bone prose-li:text-abyss-500 dark:prose-li:text-bone-300 prose-blockquote:border-volt';

export function DiaryDetail({ diary }: DiaryDetailProps) {
  return (
    <article>
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b hairline px-5 py-16 sm:px-8">
        <div className="aurora-glow pointer-events-none absolute inset-0" />
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-10">
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-abyss-400 dark:text-bone-400">
              <li>
                <Link href="/" className="transition-colors hover:text-volt-600 dark:hover:text-volt">
                  Home
                </Link>
              </li>
              <li className="text-volt-600 dark:text-volt">/</li>
              <li>
                <Link href="/diaries" className="transition-colors hover:text-volt-600 dark:hover:text-volt">
                  Diaries
                </Link>
              </li>
              <li className="text-volt-600 dark:text-volt">/</li>
              <li className="line-clamp-1 text-abyss dark:text-bone">{diary.title}</li>
            </ol>
          </nav>

          {/* Title and Meta */}
          <div className="mb-8">
            <time
              dateTime={diary.date}
              className="mb-5 block font-mono text-xs tracking-[0.2em] text-abyss-400 dark:text-bone-400"
            >
              {new Date(diary.date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </time>

            <h1 className="mb-5 font-syne text-4xl font-extrabold leading-tight tracking-tight text-abyss dark:text-bone md:text-5xl">
              {diary.title}
            </h1>

            <p className="border-l-2 border-volt pl-5 text-lg leading-loose text-abyss-500 dark:text-bone-300">
              {diary.excerpt}
            </p>
          </div>

          {/* Tags */}
          {diary.tags && diary.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {diary.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border hairline px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-volt-700 dark:text-volt"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className={PROSE_CLASS} dangerouslySetInnerHTML={{ __html: diary.content }} />
        </div>
      </div>

      {/* Back Link */}
      <div className="border-t hairline px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/diaries"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-volt-700 dark:text-volt hover:underline underline-offset-4"
          >
            ← 日記一覧に戻る
          </Link>
        </div>
      </div>
    </article>
  );
}
