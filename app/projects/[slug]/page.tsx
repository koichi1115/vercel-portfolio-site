import { getProjectBySlug, getAllProjects } from '@/lib/content';
import { ProjectDetail } from '@/components/ProjectDetail';
import { Footer } from '@/components/Footer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Portfolio',
    };
  }

  return {
    title: `${project.title} | Projects | Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bone dark:bg-abyss font-zen text-abyss dark:text-bone selection:bg-volt selection:text-volt-ink">
      <div className="grain-overlay" />
      <ProjectDetail project={project} />
      <Footer />
    </div>
  );
}
