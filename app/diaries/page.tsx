import { getAllDiaries } from '@/lib/content';
import { DiariesList } from '@/components/DiariesList';
import { Floor } from '@/components/floor/Floor';
import { Footer } from '@/components/Footer';
import { signFont } from '@/components/town/font';
import { loadTownConfig, resolveFloor } from '@/lib/town/floors';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diaries | Sai — DX Strategist & Engineer',
  description: 'Daily thoughts, learning notes, and personal reflections',
};

export default async function DiariesPage() {
  const diaries = await getAllDiaries();
  const floor = resolveFloor(loadTownConfig(), '/diaries');
  if (!floor) return null;

  return (
    <>
      <Floor
        floor={floor}
        title={floor.label}
        lead="日々の気づき、学び、思考の記録。"
        headingFontClassName={signFont.className}
      >
        <DiariesList diaries={diaries} headingFontClassName={signFont.className} />
      </Floor>
      <Footer />
    </>
  );
}
