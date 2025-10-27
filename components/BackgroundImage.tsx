import Image from 'next/image';

interface BackgroundImageProps {
  src: string;
  alt?: string;
  overlay?: 'light' | 'dark' | 'gradient';
  blur?: boolean;
}

export function BackgroundImage({
  src,
  alt = 'Background',
  overlay = 'gradient',
  blur = true,
}: BackgroundImageProps) {
  const overlayClasses = {
    light: 'bg-white/80 dark:bg-gray-900/80',
    dark: 'bg-gray-900/60 dark:bg-gray-950/70',
    gradient: 'bg-gradient-to-b from-white/90 via-white/80 to-white/90 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/90',
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${blur ? 'scale-110 blur-sm' : ''}`}
          priority
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlay]} backdrop-blur-sm`} />

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
