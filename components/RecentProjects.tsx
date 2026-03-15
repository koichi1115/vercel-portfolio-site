import Link from 'next/link';
import { getAllProjects } from '@/lib/content';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Container } from '@/components/ui/Container';

export async function RecentProjects() {
  const allProjects = await getAllProjects();
  const recentProjects = allProjects.slice(0, 3);

  if (recentProjects.length === 0) {
    return null;
  }

  return (
    <section className="section-spacing bg-neutral-10/30 dark:bg-dark-neutral-800/30 backdrop-blur-sm">
      <Container>
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <Heading size="h2" className="mb-2">
              個人開発一覧
            </Heading>
            <Text color="secondary">
              最近取り組んだ個人開発（Vibe Coding）をご紹介します
            </Text>
          </div>
          <Link href="/projects" className="hidden sm:block">
            <Button variant="ghost">
              すべて見る →
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recentProjects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <Card
                variant="brutal"
                clickable
                padding="default"
                className="h-full overflow-hidden group"
              >
                {/* Thumbnail Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 flex items-center justify-center -mx-4 -mt-4 mb-4">
                  <div className="text-neutral-0 text-4xl font-bold opacity-50">
                    {project.title.charAt(0)}
                  </div>
                </div>

                <CardBody className="space-y-3">
                  {/* Category Badge */}
                  <Badge variant="primary" size="small">
                    {project.category}
                  </Badge>

                  {/* Title */}
                  <Heading
                    size="h4"
                    className="group-hover:text-primary-500 dark:group-hover:text-primary-300 transition-colors"
                  >
                    {project.title}
                  </Heading>

                  {/* Description */}
                  <Text color="secondary" className="line-clamp-2">
                    {project.description}
                  </Text>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="default" size="small">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="default" size="small">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile "View All" Button */}
        <div className="sm:hidden text-center">
          <Link href="/projects">
            <Button variant="primary" fullWidth>
              すべてのプロジェクトを見る
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
