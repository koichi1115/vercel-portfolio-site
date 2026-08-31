export interface HomeProject {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  category: string;
  date: string;
  demoUrl?: string;
  demoLabel?: string;
}

export interface HomeDiary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
}

export interface HomeReview {
  slug: string;
  title: string;
  category: string;
  rating: number;
  thumbnail: string;
}
