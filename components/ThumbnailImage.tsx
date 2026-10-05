import Image from 'next/image';
import styles from '@/components/floor/floor.module.css';

interface ThumbnailImageProps {
  src?: string;
  alt: string;
  fallbackText: string;
  className?: string;
  aspectRatio?: 'video' | 'portrait' | 'square';
}

export function ThumbnailImage({
  src,
  alt,
  fallbackText,
  className = '',
  aspectRatio = 'video',
}: ThumbnailImageProps) {
  const aspectClasses = {
    video: styles.video,
    portrait: styles.portrait,
    square: styles.square,
  };

  if (src) {
    return (
      <div className={`${styles.thumbnail} ${aspectClasses[aspectRatio]} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div className={`${styles.thumbnail} ${styles.fallback} ${aspectClasses[aspectRatio]} ${className}`}>
      <div className={styles.fallbackText}>{fallbackText.charAt(0)}</div>
    </div>
  );
}
