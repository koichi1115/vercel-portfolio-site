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
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-lg text-ink-500 dark:text-ink-400">
            プロジェクトがまだ登録されていません。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-ink-50 dark:bg-ink-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block bg-paper dark:bg-ink-900 border-2 border-ink dark:border-paper overflow-hidden transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-brutal dark:shadow-[4px_4px_0_0_#FEFEFE] hover:shadow-brutal-lg dark:hover:shadow-[6px_6px_0_0_#FEFEFE]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-ink-100 dark:bg-ink-800 overflow-hidden">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-accent-600">
                      <span className="font-display text-6xl font-bold text-paper/50">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Category overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-ink dark:bg-paper text-paper dark:text-ink">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-ink dark:text-paper mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-ink-600 dark:text-ink-300 mb-6 line-clamp-2 text-sm">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 font-mono text-[10px] uppercase tracking-wider border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 font-mono text-[10px] uppercase tracking-wider border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View link */}
                  <div className="mt-6 pt-4 border-t-2 border-ink-100 dark:border-ink-800 flex items-center gap-2 text-accent font-display font-semibold text-sm">
                    <span>View Project</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
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
