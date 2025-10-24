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
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile data not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ProfileDetail profile={profile} />
      <CareerTimeline careers={profile.careers} />
      <SkillsSection skills={profile.skills} />
    </div>
  );
}
