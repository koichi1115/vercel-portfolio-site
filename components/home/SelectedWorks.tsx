"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, easeExpo } from "./motion";
import type { HomeProject } from "./types";

export function SelectedWorks({ projects }: { projects: HomeProject[] }) {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div {...fadeUp} className="mb-16 flex items-end justify-between">
          <div>
            <p className="overline-chip mb-4">Selected Works — 01</p>
            <h2 className="font-syne text-5xl font-extrabold tracking-tight sm:text-7xl">
              作品
            </h2>
          </div>
          <Link
            href="/projects"
            className="group hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-abyss-500 dark:text-bone-400 transition-colors hover:text-volt-600 dark:hover:text-volt sm:flex"
          >
            View all
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        <div className="border-t hairline">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: easeExpo }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group grid grid-cols-1 gap-6 border-b hairline py-10 transition-colors md:grid-cols-12 md:items-center"
              >
                <div className="flex items-baseline gap-6 md:col-span-2 md:flex-col md:gap-3">
                  <span className="font-syne text-sm font-bold text-abyss-400 dark:text-bone-400">
                    /{String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-volt-700 dark:text-volt">
                    {project.category}
                  </span>
                </div>

                <div className="md:col-span-6">
                  <h3 className="font-syne text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-volt-600 dark:group-hover:text-volt sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-relaxed text-abyss-500 dark:text-bone-400">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border hairline px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-abyss-500 dark:text-bone-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="panel panel-hover relative aspect-video overflow-hidden rounded-xl">
                    {project.thumbnail ? (
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-syne text-6xl font-extrabold text-aurora">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link href="/projects" className="btn-ghost w-full px-6 py-3 text-sm">
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
