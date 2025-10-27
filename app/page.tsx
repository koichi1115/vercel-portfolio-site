import { HeroSection } from '@/components/HeroSection';
import { RecentProjects } from '@/components/RecentProjects';
import { RecentReviews } from '@/components/RecentReviews';
import { RecentDiaries } from '@/components/RecentDiaries';

export default function Home() {
  return (
    <>
      <HeroSection />
      <RecentProjects />
      <RecentReviews />
      <RecentDiaries />
    </>
  );
}
