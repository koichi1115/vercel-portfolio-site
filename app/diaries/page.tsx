import { getAllDiaries } from '@/lib/content';
import { DiariesList } from '@/components/DiariesList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diaries | Portfolio',
  description: 'Daily thoughts, learning notes, and personal reflections',
};

export default async function DiariesPage() {
  const diaries = await getAllDiaries();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              日記
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              日々の気づき、学び、思考の記録
            </p>
          </div>
        </div>
      </div>

      <DiariesList diaries={diaries} />
    </div>
  );
}
