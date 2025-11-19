import { MetadataRoute } from 'next';
import { getAllProjects, getAllReviews } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';

  // ★安全装置：日付データがおかしい場合、現在時刻を返す関数
  const safeDate = (dateStr: string | undefined | null) => {
    if (!dateStr) return new Date();
    const d = new Date(dateStr);
    // 日付として無効(Invalid Date)なら現在時刻を返す
    return isNaN(d.getTime()) ? new Date() : d;
  };

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic project pages
  const projects = await getAllProjects();
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    // ★修正箇所：安全装置を通す
    lastModified: safeDate(project.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic review pages
  const reviews = await getAllReviews();
  const reviewPages: MetadataRoute.Sitemap = reviews.map((review) => ({
    url: `${baseUrl}/reviews/${review.slug}`,
    // ★修正箇所：安全装置を通す
    lastModified: safeDate(review.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...reviewPages];
}