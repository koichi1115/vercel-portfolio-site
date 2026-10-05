import Image from 'next/image';
import type { Project } from '@/lib/content';
import { FloorCard } from '@/components/floor/FloorCard';
import { FloorSection } from '@/components/floor/FloorSection';
import styles from '@/components/floor/floor.module.css';

interface ProjectDetailProps {
  project: Project;
  headingFontClassName?: string;
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.demoUrl && !project.githubUrl) return null;
  return (
    <div className={styles.actions}>
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.tap}`}>
          {project.demoLabel || 'デモを見る'}
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btnGhost} ${styles.tap}`}>
          GitHub
        </a>
      )}
    </div>
  );
}

export function ProjectDetail({ project, headingFontClassName = '' }: ProjectDetailProps) {
  return (
    <article className={styles.stack}>
      {project.thumbnail && (
        <div className={`${styles.imageFrame} ${styles.detailImage}`}>
          <Image src={project.thumbnail} alt={project.title} fill priority className={styles.image} />
        </div>
      )}
      <div className={styles.meta}>
        <span className={styles.chip}>{project.category}</span>
        <time className={styles.date} dateTime={project.date}>{project.date}</time>
      </div>
      <FloorSection title="使用技術" headingFontClassName={headingFontClassName}>
        <div className={styles.chips}>
          {project.technologies.map((tech) => <span key={tech} className={styles.chip}>{tech}</span>)}
        </div>
      </FloorSection>
      <ProjectLinks project={project} />
      <FloorCard className={`prose ${styles.prose}`}>
        <div dangerouslySetInnerHTML={{ __html: project.content }} />
      </FloorCard>
      <FloorCard href="/projects">← 作品一覧に戻る</FloorCard>
    </article>
  );
}
