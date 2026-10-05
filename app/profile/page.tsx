import { getProfileData } from '@/lib/content';
import { ProfileDetail } from '@/components/ProfileDetail';
import { CareerTimeline } from '@/components/CareerTimeline';
import { SkillsSection } from '@/components/SkillsSection';
import { Floor } from '@/components/floor/Floor';
import { Footer } from '@/components/Footer';
import { signFont } from '@/components/town/font';
import { loadTownConfig, resolveFloor } from '@/lib/town/floors';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | Sai — DX Strategist & Engineer',
  description: 'Professional profile, career history, and technical skills',
};

export default async function ProfilePage() {
  const profile = await getProfileData();
  const floor = resolveFloor(loadTownConfig(), '/profile');

  if (!floor) return null;

  return (
    <>
      <Floor floor={floor} title={floor.label} headingFontClassName={signFont.className}>
        {profile ? (
          <>
            <ProfileDetail profile={profile} headingFontClassName={signFont.className} />
            <CareerTimeline careers={profile.careers} headingFontClassName={signFont.className} />
            <SkillsSection skills={profile.skills} headingFontClassName={signFont.className} />
          </>
        ) : (
          <p>プロフィールを読み込めませんでした。</p>
        )}
      </Floor>
      <Footer />
    </>
  );
}
