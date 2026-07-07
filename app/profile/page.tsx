import { getProfileData } from '@/lib/content';
import { ProfileDetail } from '@/components/ProfileDetail';
import { CareerTimeline } from '@/components/CareerTimeline';
import { SkillsSection } from '@/components/SkillsSection';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | Koichi — DX Strategist & Engineer',
  description: 'Professional profile, career history, and technical skills',
};

export default async function ProfilePage() {
  const profile = await getProfileData();

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bone dark:bg-abyss">
        <h1 className="font-syne text-2xl font-bold text-abyss dark:text-bone">
          Profile data not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone dark:bg-abyss font-zen text-abyss dark:text-bone selection:bg-volt selection:text-volt-ink">
      <div className="grain-overlay" />

      <ProfileDetail profile={profile} />
      <CareerTimeline careers={profile.careers} />
      <SkillsSection skills={profile.skills} />
      <Footer />
    </div>
  );
}
