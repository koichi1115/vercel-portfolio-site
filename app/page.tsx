import { getAllDiaries, getAllProjects, getAllReviews } from "@/lib/content";
import { HomeClient } from "@/components/home/HomeClient";

export default async function Home() {
  const [projects, diaries, reviews] = await Promise.all([
    getAllProjects(),
    getAllDiaries(),
    getAllReviews(),
  ]);

  return (
    <HomeClient
      projects={projects.slice(0, 4).map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        thumbnail: p.thumbnail,
        technologies: p.technologies,
        category: p.category,
        date: p.date,
        demoUrl: p.demoUrl,
        demoLabel: p.demoLabel,
      }))}
      diaries={diaries.slice(0, 3).map((d) => ({
        slug: d.slug,
        title: d.title,
        date: d.date,
        excerpt: d.excerpt,
        tags: d.tags,
      }))}
      reviews={reviews
        .filter((r) => r.title !== "工事中")
        .slice(0, 4)
        .map((r) => ({
          slug: r.slug,
          title: r.title,
          category: r.category,
          rating: r.rating,
          thumbnail: r.thumbnail,
        }))}
    />
  );
}
