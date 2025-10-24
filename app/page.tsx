import { HeroSection } from '@/components/HeroSection';
import { RecentProjects } from '@/components/RecentProjects';
import { RecentReviews } from '@/components/RecentReviews';

export default function Home() {
  return (
    <>
      <HeroSection />
      <RecentProjects />
      <RecentReviews />
    </>
  );
}
