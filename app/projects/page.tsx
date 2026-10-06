import { getAllProjects } from '@/lib/content';
import { ProjectsList } from '@/components/ProjectsList';
import { Floor } from '@/components/floor/Floor';
import { Footer } from '@/components/Footer';
import { signFont } from '@/components/town/font';
import { loadTownConfig, resolveFloor } from '@/lib/town/floors';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Sai — DX Strategist & Engineer',
  description: 'Showcase of development projects and technical implementations',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const floor = resolveFloor(loadTownConfig(), '/projects');
  if (!floor) return null;

  return (
    <>
      <Floor
        floor={floor}
        title={floor.label}
        lead="これまでに取り組んだ個人開発の一覧です。技術的な挑戦と学びの軌跡。"
        headingFontClassName={signFont.className}
      >
        <ProjectsList projects={projects} headingFontClassName={signFont.className} />
      </Floor>
      <Footer />
    </>
  );
}
