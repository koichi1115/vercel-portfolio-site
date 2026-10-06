import { getProjectBySlug, getAllProjects } from '@/lib/content';
import { ProjectDetail } from '@/components/ProjectDetail';
import { Floor } from '@/components/floor/Floor';
import { Footer } from '@/components/Footer';
import { signFont } from '@/components/town/font';
import { loadTownConfig, resolveFloor } from '@/lib/town/floors';
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
  const floor = resolveFloor(loadTownConfig(), '/projects');

  if (!project || !floor) {
    notFound();
  }

  return (
    <>
      <Floor
        floor={floor}
        title={project.title}
        lead={project.description}
        headingFontClassName={signFont.className}
      >
        <ProjectDetail project={project} headingFontClassName={signFont.className} />
      </Floor>
      <Footer />
    </>
  );
}
