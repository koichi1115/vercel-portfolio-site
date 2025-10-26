import Image from 'next/image';
import type { ProfileData } from '@/lib/content';

interface ProfileDetailProps {
  profile: ProfileData;
}

export function ProfileDetail({ profile }: ProfileDetailProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            {profile.avatar ? (
              <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-xl">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold shadow-xl">
                {profile.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
              {profile.title}
            </p>
            <div
              className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: profile.content }}
            />
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              {profile.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
