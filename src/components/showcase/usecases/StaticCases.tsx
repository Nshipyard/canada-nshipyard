"use client";

import { storiesEn, storiesFr, type Story } from "@/showcase-stories";
import StoryChart from "../charts";
import UseCaseCard, { type UseCase } from "../UseCaseCard";
import type { CiteLabels } from "../CiteShare";

function storyToUseCase(s: Story): UseCase {
  return {
    id: s.slug,
    kicker: s.kicker,
    question: s.question,
    stat: s.stat,
    statLabel: s.statLabel,
    mechanism: s.mechanism,
    howWeKnow: s.howWeKnow,
    shareText: s.shareText,
    projectUrl: s.projectUrl,
    projectName: s.projectName,
  };
}

function StoryUseCase({
  slug,
  labels,
  lang,
}: {
  slug: string;
  labels: CiteLabels & { howWeKnow: string };
  lang: "en" | "fr";
}) {
  const stories = lang === "fr" ? storiesFr : storiesEn;
  const story = stories.find((s) => s.slug === slug)!;
  return (
    <UseCaseCard usecase={storyToUseCase(story)} labels={labels} lang={lang}>
      <div className="rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
        <StoryChart spec={story.chart} />
        {story.chart2 && (
          <div className="mt-6 border-t border-line pt-6">
            <StoryChart spec={story.chart2} />
          </div>
        )}
      </div>
    </UseCaseCard>
  );
}

export function ParcelCases(p: { labels: CiteLabels & { howWeKnow: string }; lang: "en" | "fr" }) {
  return <StoryUseCase slug="stacked-parcels" {...p} />;
}
export function LicenceCases(p: { labels: CiteLabels & { howWeKnow: string }; lang: "en" | "fr" }) {
  return <StoryUseCase slug="business-mix" {...p} />;
}
export function WatermainCases(p: { labels: CiteLabels & { howWeKnow: string }; lang: "en" | "fr" }) {
  return <StoryUseCase slug="pipe-age" {...p} />;
}
export function CodebookCases(p: { labels: CiteLabels & { howWeKnow: string }; lang: "en" | "fr" }) {
  return <StoryUseCase slug="code-meaning" {...p} />;
}
