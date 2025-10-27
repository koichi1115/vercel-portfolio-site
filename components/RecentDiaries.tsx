import Link from 'next/link';
import { getAllDiaries } from '@/lib/content';

export async function RecentDiaries() {
  const allDiaries = await getAllDiaries();
  const recentDiaries = allDiaries.slice(0, 3);

  if (recentDiaries.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              最新の日記
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              日々の学びや考えたことを記録しています
            </p>
          </div>
          <Link
            href="/diaries"
            className="hidden sm:block text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            すべて見る →
          </Link>
        </div>

        {/* Diaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {recentDiaries.map((diary) => (
            <Link
              key={diary.slug}
              href={`/diaries/${diary.slug}`}
              className="group block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Date */}
              <div className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={diary.date} className="text-sm">
                  {new Date(diary.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {diary.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                {diary.excerpt}
              </p>

              {/* Tags */}
              {diary.tags && diary.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {diary.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs font-medium"
                    >
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      {tag}
                    </span>
                  ))}
                  {diary.tags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-500 self-center">
                      +{diary.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile "View All" Button */}
        <div className="sm:hidden text-center">
          <Link
            href="/diaries"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            すべての日記を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
