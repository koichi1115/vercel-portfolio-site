const MARQUEE_ITEMS = [
  "Python",
  "C#",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "AWS",
  "DX Strategy",
  "AI Consulting",
  "Claude Code",
  "Supabase",
];

export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-mask overflow-hidden border-y hairline py-4">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-syne text-sm font-semibold uppercase tracking-[0.2em] text-abyss-500 dark:text-bone-400"
          >
            {item}
            <span className="text-volt-600 dark:text-volt">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
