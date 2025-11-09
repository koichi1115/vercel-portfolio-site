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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              プロジェクト
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              これまでに取り組んだ個人開発の一覧です
            </p>
          </div>
        </div>
      </div>

      <ProjectsList projects={projects} />
    </div>
  );
}
