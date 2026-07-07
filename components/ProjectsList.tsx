"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/content';

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  if (projects.length === 0) {
    return (
      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-mono text-sm tracking-widest text-abyss-400 dark:text-bone-400">
            プロジェクトがまだ登録されていません。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="panel panel-hover group block overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-abyss-700/10 dark:bg-bone/5">
                      <span className="font-syne text-6xl font-extrabold text-aurora">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-abyss/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3 flex items-baseline justify-between gap-4">
                    <h3 className="font-syne text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-volt-600 dark:group-hover:text-volt">
                      {project.title}
                    </h3>
                    <span className="shrink-0 font-mono text-[10px] tracking-widest text-abyss-400 dark:text-bone-400">
                      /{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-abyss-500 dark:text-bone-400">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border hairline px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-abyss-500 dark:text-bone-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-full border hairline px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-volt-700 dark:text-volt">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t hairline pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-volt-700 dark:text-volt">
                    View project
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
