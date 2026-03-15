import { getProfileData } from '@/lib/content';
import { ProfileDetail } from '@/components/ProfileDetail';
import { CareerTimeline } from '@/components/CareerTimeline';
import { SkillsSection } from '@/components/SkillsSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | Portfolio',
  description: 'Professional profile, career history, and technical skills',
};

export default async function ProfilePage() {
  const profile = await getProfileData();

  if (!profile) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-ink dark:text-paper">
            Profile data not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      <ProfileDetail profile={profile} />
      <CareerTimeline careers={profile.careers} />
      <SkillsSection skills={profile.skills} />
    </div>
  );
}
