export default function Home() {
  return (
    <div className="flex items-center justify-center py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          キャリア、プロジェクト、レビューを通じて、私の経験と興味をご紹介します。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/profile"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            プロフィールを見る
          </a>
          <a
            href="/projects"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            プロジェクトを見る
          </a>
        </div>
      </div>
    </div>
  );
}
