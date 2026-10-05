import { getDiaryBySlug, getAllDiaries } from '@/lib/content';
import { DiaryDetail } from '@/components/DiaryDetail';
import { Floor } from '@/components/floor/Floor';
import { Footer } from '@/components/Footer';
import { signFont } from '@/components/town/font';
import { loadTownConfig, resolveFloor } from '@/lib/town/floors';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface DiaryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const diaries = await getAllDiaries();
  return diaries.map((diary) => ({
    slug: diary.slug,
  }));
}

export async function generateMetadata({ params }: DiaryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const diary = await getDiaryBySlug(slug);

  if (!diary) {
    return {
      title: 'Diary Not Found | Portfolio',
    };
  }

  return {
    title: `${diary.title} | Diaries | Portfolio`,
    description: diary.excerpt,
  };
}

export default async function DiaryPage({ params }: DiaryPageProps) {
  const { slug } = await params;
  const diary = await getDiaryBySlug(slug);
  const floor = resolveFloor(loadTownConfig(), '/diaries');

  if (!diary || !floor) {
    notFound();
  }

  return (
    <>
      <Floor
        floor={floor}
        title={diary.title}
        lead={diary.excerpt}
        headingFontClassName={signFont.className}
      >
        <DiaryDetail diary={diary} />
      </Floor>
      <Footer />
    </>
  );
}
