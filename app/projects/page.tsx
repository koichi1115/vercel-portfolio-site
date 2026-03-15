import { getAllProjects } from '@/lib/content';
import { ProjectsList } from '@/components/ProjectsList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description: 'Showcase of development projects and technical implementations',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Hero section */}
      <section className="relative py-24 bg-paper dark:bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block font-mono text-sm uppercase tracking-widest text-accent border-l-4 border-accent pl-4 mb-8">
              Works
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-ink dark:text-paper mb-6">
              Projects<span className="text-accent">.</span>
            </h1>
            <p className="text-xl text-ink-600 dark:text-ink-300 max-w-xl">
              これまでに取り組んだ個人開発の一覧です。技術的な挑戦と学びの軌跡。
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-ink-100 dark:border-ink-900 hidden lg:block" />
        <div className="absolute bottom-10 right-40 w-32 h-32 border-2 border-accent/30 hidden lg:block" />
      </section>

      <ProjectsList projects={projects} />
    </div>
  );
}
