"use client";

import type { ReactNode } from "react";
import CiteShare, { type CiteLabels } from "./CiteShare";

export interface UseCase {
  id: string;
  kicker: string;
  question: string;
  stat: string;
  statLabel: string;
  mechanism: string[];
  howWeKnow: string;
  shareText: string;
  projectUrl: string;
  projectName: string;
}

export default function UseCaseCard({
  usecase,
  labels,
  lang,
  children,
}: {
  usecase: UseCase;
  labels: CiteLabels & { howWeKnow: string };
  lang: "en" | "fr";
  children: ReactNode;
}) {
  return (
    <article id={usecase.id} className="scroll-mt-24 border-t border-line py-12 md:py-16">
      <div className="mx-auto max-w-[880px]">
        <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">{usecase.kicker}</p>
        <h2 className="display mt-4 text-[clamp(28px,4vw,46px)] leading-[1.08]">{usecase.question}</h2>

        <div className="mt-8 rounded-[28px] bg-ink px-7 py-8 text-white md:px-10">
          <p className="display text-[clamp(40px,6vw,72px)] leading-none text-white">{usecase.stat}</p>
          <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-white/70">{usecase.statLabel}</p>
        </div>

        <div className="mt-8">{children}</div>

        <div className="mt-8 space-y-4 text-[16.5px] leading-relaxed text-ink/80">
          {usecase.mechanism.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-8 rounded-[20px] border border-dashed border-ink/25 bg-muted px-6 py-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">{labels.howWeKnow}</p>
          <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink/70">{usecase.howWeKnow}</p>
        </div>

        <div className="mt-6">
          <CiteShare
            id={usecase.id}
            title={usecase.question}
            shareText={usecase.shareText}
            projectUrl={usecase.projectUrl}
            projectName={usecase.projectName}
            labels={labels}
            lang={lang}
          />
        </div>
      </div>
    </article>
  );
}
