"use client";

import { StatsSection } from "@/components/StatsSection";
import { Footer } from "@/components/Footer";
import { Hero } from "./Hero";
import { SelectedWorks } from "./SelectedWorks";
import { Journal } from "./Journal";
import { Cta } from "./Cta";
import type { HomeProject, HomeDiary, HomeReview } from "./types";

export type { HomeProject, HomeDiary, HomeReview };

interface HomeClientProps {
  projects: HomeProject[];
  diaries: HomeDiary[];
  reviews: HomeReview[];
}

export function HomeClient({ projects, diaries, reviews }: HomeClientProps) {
  const featured = projects[0];

  return (
    <div className="min-h-screen bg-bone dark:bg-abyss font-zen text-abyss dark:text-bone selection:bg-volt selection:text-volt-ink">
      <div className="grain-overlay" />

      <main className="relative">
        <Hero featured={featured} />
        <SelectedWorks projects={projects} />
        <StatsSection />
        <Journal diaries={diaries} reviews={reviews} />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}
