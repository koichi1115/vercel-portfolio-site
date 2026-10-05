import Image from 'next/image';
import type { ProfileData } from '@/lib/content';
import { FloorCard } from '@/components/floor/FloorCard';
import styles from '@/components/floor/floor.module.css';

interface ProfileDetailProps {
  profile: ProfileData;
  headingFontClassName?: string;
}

export function ProfileDetail({ profile, headingFontClassName = '' }: ProfileDetailProps) {
  return (
    <div className={styles.stack}>
      <FloorCard>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            {profile.avatar && (
              <Image src={profile.avatar} alt={profile.name} fill sizes="96px" className={styles.image} priority />
            )}
          </div>
          <div>
            <h2 className={`${styles.h2} ${headingFontClassName}`}>{profile.name}</h2>
            <p className={styles.muted}>{profile.title}</p>
          </div>
        </div>
        <p className={`${styles.cardText} ${styles.spaced}`}>{profile.bio}</p>
      </FloorCard>
      {profile.content && (
        <FloorCard className={`prose ${styles.prose}`}>
          <div dangerouslySetInnerHTML={{ __html: profile.content }} />
        </FloorCard>
      )}
      <div className={styles.actions}>
        <a href="https://github.com/ko1115productjp-hub" target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.tap}`}>GitHub</a>
        <a href="/contact" className={`${styles.btnGhost} ${styles.tap}`}>問い合わせ</a>
      </div>
    </div>
  );
}
