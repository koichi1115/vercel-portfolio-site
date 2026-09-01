import { getAllProjects } from '@/lib/content';
import { ProjectsList } from '@/components/ProjectsList';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Sai — DX Strategist & Engineer',
  description: 'Showcase of development projects and technical implementations',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-bone dark:bg-abyss font-zen text-abyss dark:text-bone selection:bg-volt selection:text-volt-ink">
      <div className="grain-overlay" />

      <PageHero
        overline="Selected Works"
        title="Projects"
        description="これまでに取り組んだ個人開発の一覧です。技術的な挑戦と学びの軌跡。"
      />

      <ProjectsList projects={projects} />
      <Footer />
    </div>
  );
}
