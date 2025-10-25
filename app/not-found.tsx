import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white text-6xl font-bold">
            404
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          ページが見つかりません
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            ホームに戻る
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            プロジェクトを見る
          </Link>
        </div>

        {/* Additional Links */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            他のページをご覧ください：
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/profile"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              プロフィール
            </Link>
            <span className="text-gray-400 dark:text-gray-600">•</span>
            <Link
              href="/reviews"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              レビュー
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
