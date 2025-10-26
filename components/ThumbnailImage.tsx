import Image from 'next/image';

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
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
  };

  const gradientColors = {
    video: 'from-blue-500 to-purple-600',
    portrait: 'from-gray-400 to-gray-600',
    square: 'from-blue-400 to-indigo-600',
  };

  if (src) {
    return (
      <div className={`relative ${aspectClasses[aspectRatio]} ${className} overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`${aspectClasses[aspectRatio]} ${className} bg-gradient-to-br ${gradientColors[aspectRatio]} flex items-center justify-center`}
    >
      <div className="text-white text-4xl font-bold opacity-50">
        {fallbackText.charAt(0)}
      </div>
    </div>
  );
}
