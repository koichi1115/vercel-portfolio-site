import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/content';

interface ProjectDetailProps {
  project: Project;
}

const PROSE_CLASS =
  'prose prose-lg max-w-none dark:prose-invert prose-headings:font-syne prose-headings:tracking-tight prose-p:leading-loose prose-p:text-abyss-500 dark:prose-p:text-bone-300 prose-a:text-volt-600 dark:prose-a:text-volt prose-a:no-underline hover:prose-a:underline prose-strong:text-abyss dark:prose-strong:text-bone prose-code:text-abyss dark:prose-code:text-bone prose-pre:bg-abyss-800 prose-pre:text-bone [&_pre_code]:!text-bone prose-li:text-abyss-500 dark:prose-li:text-bone-300 prose-blockquote:border-volt';

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article>
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b hairline px-5 py-16 sm:px-8">
        <div className="aurora-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-10">
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-abyss-400 dark:text-bone-400">
              <li>
                <Link href="/" className="transition-colors hover:text-volt-600 dark:hover:text-volt">
                  Home
                </Link>
              </li>
              <li className="text-volt-600 dark:text-volt">/</li>
              <li>
                <Link href="/projects" className="transition-colors hover:text-volt-600 dark:hover:text-volt">
                  Projects
                </Link>
              </li>
              <li className="text-volt-600 dark:text-volt">/</li>
              <li className="line-clamp-1 text-abyss dark:text-bone">{project.title}</li>
            </ol>
          </nav>

          {/* Thumbnail */}
          {project.thumbnail ? (
            <div className="panel mb-10 flex min-h-[420px] items-center justify-center overflow-hidden py-10 md:min-h-[560px]">
              <Image
                src={project.thumbnail}
                alt={project.title}
                width={600}
                height={836}
                className="max-h-[480px] w-auto object-contain md:max-h-[640px]"
                priority
              />
            </div>
          ) : (
            <div className="panel mb-10 flex aspect-video items-center justify-center">
              <span className="font-syne text-7xl font-extrabold text-aurora">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Title and Meta */}
          <div className="mb-10">
            <div className="mb-5 flex items-center gap-4">
              <span className="rounded-full bg-volt px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-volt-ink">
                {project.category}
              </span>
              <span className="font-mono text-xs tracking-widest text-abyss-400 dark:text-bone-400">
                {new Date(project.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>

            <h1 className="mb-5 font-syne text-4xl font-extrabold tracking-tight text-abyss dark:text-bone md:text-6xl">
              {project.title}
            </h1>

            <p className="text-lg leading-loose text-abyss-500 dark:text-bone-300 md:text-xl">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-10">
            <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-abyss-400 dark:text-bone-400">
              使用技術
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border hairline px-4 py-2 font-mono text-xs uppercase tracking-wider text-abyss-500 dark:text-bone-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.demoUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-volt px-7 py-3.5 text-sm"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {project.demoLabel || 'デモを見る'}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-7 py-3.5 text-sm"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className={PROSE_CLASS} dangerouslySetInnerHTML={{ __html: project.content }} />
        </div>
      </div>

      {/* Back Link */}
      <div className="border-t hairline px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-volt-700 dark:text-volt hover:underline underline-offset-4"
          >
            ← プロジェクト一覧に戻る
          </Link>
        </div>
      </div>
    </article>
  );
}
