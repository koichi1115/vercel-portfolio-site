import { getAllDiaries } from '@/lib/content';
import { DiariesList } from '@/components/DiariesList';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diaries | Sai — DX Strategist & Engineer',
  description: 'Daily thoughts, learning notes, and personal reflections',
};

export default async function DiariesPage() {
  const diaries = await getAllDiaries();

  return (
    <div className="min-h-screen bg-bone dark:bg-abyss font-zen text-abyss dark:text-bone selection:bg-volt selection:text-volt-ink">
      <div className="grain-overlay" />

      <PageHero
        overline="Journal"
        title="Diaries"
        description="日々の気づき、学び、思考の記録。"
      />

      <DiariesList diaries={diaries} />
      <Footer />
    </div>
  );
}
