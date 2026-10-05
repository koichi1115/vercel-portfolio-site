import Image from 'next/image';
import type { Project } from '@/lib/content';
import { FloorCard } from '@/components/floor/FloorCard';
import styles from '@/components/floor/floor.module.css';

interface ProjectsListProps {
  projects: Project[];
  headingFontClassName?: string;
}

export function ProjectsList({ projects, headingFontClassName = '' }: ProjectsListProps) {
  if (projects.length === 0) {
    return <p className={styles.muted}>作品がまだ登録されていません。</p>;
  }

  return (
    <div className={styles.stack}>
      {projects.map((project) => (
        <FloorCard key={project.slug} href={`/projects/${project.slug}`}>
          {project.thumbnail && (
            <div className={`${styles.imageFrame} ${styles.aspectVideo}`}>
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                className={styles.image}
              />
            </div>
          )}
          <div className={styles.chips}>
            <span className={styles.chip}>{project.category}</span>
            {project.technologies.map((tech) => (
              <span key={tech} className={styles.chip}>{tech}</span>
            ))}
          </div>
          <h2 className={`${styles.h2} ${styles.spaced} ${headingFontClassName}`}>
            {project.title}
          </h2>
          <p className={styles.cardText}>{project.description}</p>
        </FloorCard>
      ))}
    </div>
  );
}
