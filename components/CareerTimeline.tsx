import type { Career } from '@/lib/content';

interface CareerTimelineProps {
  careers: Career[];
}

export function CareerTimeline({ careers }: CareerTimelineProps) {
  if (careers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            キャリア
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            これまでの職歴をご紹介します
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform md:-translate-x-1/2"></div>

          {/* Career Items */}
          <div className="space-y-12">
            {careers.map((career, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-900 transform md:-translate-x-1/2 z-10"></div>

                {/* Content Card */}
                <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                    {/* Period */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        {career.period}
                      </span>
                      {career.current && (
                        <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-full">
                          現在
                        </span>
                      )}
                    </div>

                    {/* Company */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {career.company}
                    </h3>

                    {/* Position */}
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-4">
                      {career.position}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {career.description}
                    </p>

                    {/* Achievements */}
                    {career.achievements && career.achievements.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                          主な実績
                        </h4>
                        <ul className="space-y-2">
                          {career.achievements.map((achievement, achievementIndex) => (
                            <li
                              key={achievementIndex}
                              className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                            >
                              <svg
                                className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
