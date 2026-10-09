"use client";

import { useEffect, useState } from "react";
import type { Story } from "@/showcase-stories";
import StoryChart from "./charts";

export interface StoryLabels {
  howWeKnow: string;
  cite: string;
  copy: string;
  copied: string;
  share: string;
  copyLink: string;
  exploreProject: string;
  storyNoun: string;
}

const SITE = "https://canada.nshipyard.com/showcase";

function CopyButton({ text, labels }: { text: string; labels: StoryLabels }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  };
  return (
    <button
      onClick={copy}
      className="rounded-full border border-line px-4 py-1.5 text-[13px] font-medium text-ink/70 transition hover:border-ink/40 hover:text-ink"
    >
      {done ? labels.copied : labels.copy}
    </button>
  );
}

export default function StoryCard({
  story,
  index,
  total,
  labels,
  lang,
}: {
  story: Story;
  index: number;
  total: number;
  labels: StoryLabels;
  lang: "en" | "fr";
}) {
  const url = `${SITE}#${story.slug}`;
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, [lang]);
  const citation =
    lang === "fr"
      ? `Open Nshipyard (2026). « ${story.question} » Histoires de données. Consulté le ${today} à ${url}.`
      : `Open Nshipyard (2026). "${story.question}" Data Stories. Retrieved ${today} from ${url}.`;
  const xHref = `https://x.com/intent/tweet?text=${encodeURIComponent(story.shareText)}&url=${encodeURIComponent(url)}`;
  const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <article id={story.slug} className="scroll-mt-24 border-t border-line py-14 md:py-20">
      <div className="mx-auto max-w-[880px]">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">
            {labels.storyNoun} {index + 1} / {total} · {story.kicker}
          </p>
        </div>

        <h2 className="display mt-4 text-[clamp(30px,4.5vw,52px)] leading-[1.08]">{story.question}</h2>

        <div className="mt-8 rounded-[28px] bg-ink px-7 py-8 text-white md:px-10">
          <p className="display text-[clamp(44px,7vw,84px)] leading-none text-white">{story.stat}</p>
          <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-white/70">{story.statLabel}</p>
        </div>

        <div className="mt-8 rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
          <StoryChart spec={story.chart} />
          {story.chart2 && (
            <div className="mt-6 border-t border-line pt-6">
              <StoryChart spec={story.chart2} />
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4 text-[16.5px] leading-relaxed text-ink/80">
          {story.mechanism.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-8 rounded-[20px] border border-dashed border-ink/25 bg-muted px-6 py-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">{labels.howWeKnow}</p>
          <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink/70">{story.howWeKnow}</p>
        </div>

        <div className="mt-6 rounded-[20px] border border-line px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">{labels.cite}</p>
            <CopyButton text={citation} labels={labels} />
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-ink/75">{citation}</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">{labels.share}:</span>
          <a
            href={xHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-5 py-2 text-[14px] font-medium text-white transition hover:bg-canada"
          >
            X
          </a>
          <a
            href={liHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-5 py-2 text-[14px] font-medium text-white transition hover:bg-canada"
          >
            LinkedIn
          </a>
          <CopyButton text={url} labels={{ ...labels, copy: labels.copyLink }} />
          <a
            href={story.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-[14px] font-semibold text-canada hover:text-canada-dark"
          >
            {labels.exploreProject} →
          </a>
        </div>
      </div>
    </article>
  );
}
