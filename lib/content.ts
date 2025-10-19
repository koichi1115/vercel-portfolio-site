import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  careers: Career[];
  skills: SkillCategory[];
  content: string;
}

export interface Career {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  category: string;
  date: string;
  demoUrl?: string;
  githubUrl?: string;
  content: string;
}

export interface Review {
  slug: string;
  title: string;
  category: 'music' | 'movie' | 'manga' | 'book';
  rating: number;
  thumbnail: string;
  excerpt: string;
  publishedAt: string;
  author?: string;
  releaseYear?: number;
  content: string;
}

export async function getProfileData(): Promise<ProfileData | null> {
  try {
    const fullPath = path.join(contentDirectory, 'profile.md');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(gfm)
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      name: data.name,
      title: data.title,
      bio: data.bio,
      careers: data.careers || [],
      skills: data.skills || [],
      content: contentHtml,
    };
  } catch (error) {
    console.error('Error loading profile:', error);
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const projectsDirectory = path.join(contentDirectory, 'projects');

    if (!fs.existsSync(projectsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(projectsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          const processedContent = await remark()
            .use(gfm)
            .use(html)
            .process(content);
          const contentHtml = processedContent.toString();

          return {
            slug,
            title: data.title,
            description: data.description,
            thumbnail: data.thumbnail,
            technologies: data.technologies || [],
            category: data.category,
            date: data.date,
            demoUrl: data.demoUrl,
            githubUrl: data.githubUrl,
            content: contentHtml,
          };
        })
    );

    return allProjectsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(contentDirectory, 'projects', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(gfm)
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail,
      technologies: data.technologies || [],
      category: data.category,
      date: data.date,
      demoUrl: data.demoUrl,
      githubUrl: data.githubUrl,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
}

export async function getAllReviews(): Promise<Review[]> {
  try {
    const reviewsDirectory = path.join(contentDirectory, 'reviews');

    if (!fs.existsSync(reviewsDirectory)) {
      return [];
    }

    const categories = ['music', 'movies', 'manga', 'books'];
    const allReviewsData: Review[] = [];

    for (const category of categories) {
      const categoryPath = path.join(reviewsDirectory, category);
      if (!fs.existsSync(categoryPath)) continue;

      const fileNames = fs.readdirSync(categoryPath);
      const categoryReviews = await Promise.all(
        fileNames
          .filter((fileName) => fileName.endsWith('.md'))
          .map(async (fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(categoryPath, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            const processedContent = await remark()
              .use(gfm)
              .use(html)
              .process(content);
            const contentHtml = processedContent.toString();

            return {
              slug,
              title: data.title,
              category: data.category,
              rating: data.rating,
              thumbnail: data.thumbnail,
              excerpt: data.excerpt,
              publishedAt: data.publishedAt,
              author: data.author,
              releaseYear: data.releaseYear,
              content: contentHtml,
            };
          })
      );

      allReviewsData.push(...categoryReviews);
    }

    return allReviewsData.sort((a, b) =>
      a.publishedAt < b.publishedAt ? 1 : -1
    );
  } catch (error) {
    console.error('Error loading reviews:', error);
    return [];
  }
}

export async function getReviewBySlug(slug: string): Promise<Review | null> {
  try {
    const reviewsDirectory = path.join(contentDirectory, 'reviews');
    const categories = ['music', 'movies', 'manga', 'books'];

    for (const category of categories) {
      const fullPath = path.join(reviewsDirectory, category, `${slug}.md`);
      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const processedContent = await remark()
          .use(gfm)
          .use(html)
          .process(content);
        const contentHtml = processedContent.toString();

        return {
          slug,
          title: data.title,
          category: data.category,
          rating: data.rating,
          thumbnail: data.thumbnail,
          excerpt: data.excerpt,
          publishedAt: data.publishedAt,
          author: data.author,
          releaseYear: data.releaseYear,
          content: contentHtml,
        };
      }
    }

    return null;
  } catch (error) {
    console.error(`Error loading review ${slug}:`, error);
    return null;
  }
}
