import Link from 'next/link';
import type { Diary } from '@/lib/content';

interface DiariesListProps {
  diaries: Diary[];
}

export function DiariesList({ diaries }: DiariesListProps) {
  if (diaries.length === 0) {
    return (
      <div className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            日記がまだ投稿されていません。
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl">
        {/* Diaries List */}
        <div className="space-y-8">
          {diaries.map((diary) => (
            <Link
              key={diary.slug}
              href={`/diaries/${diary.slug}`}
              className="group block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Date */}
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={diary.date}>
                  {new Date(diary.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {diary.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {diary.excerpt}
              </p>

              {/* Tags */}
              {diary.tags && diary.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {diary.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                    >
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
