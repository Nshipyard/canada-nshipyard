"use client";

import { useMemo, useState } from "react";
import { storiesEn, storiesFr, type BarRow } from "@/showcase-stories";
import StoryChart from "../charts";
import UseCaseCard, { type UseCase } from "../UseCaseCard";
import type { CiteLabels } from "../CiteShare";

const L = {
  en: {
    typeLabel: "Permit type",
    loading: "Loading…",
    median: "median wait",
    sub: "from application to issuance",
  },
  fr: {
    typeLabel: "Type de permis",
    loading: "Chargement…",
    median: "délai médian",
    sub: "de la demande à la délivrance",
  },
};

export default function PermitCases({ labels, lang }: { labels: CiteLabels & { howWeKnow: string }; lang: "en" | "fr" }) {
  const t = L[lang];
  const stories = lang === "fr" ? storiesFr : storiesEn;
  const story = stories.find((s) => s.slug === "permit-wait")!;
  const rows = (story.chart as { kind: "bars"; rows: BarRow[] }).rows;
  const [label, setLabel] = useState(rows[rows.length - 1].label);
  const row = useMemo(() => rows.find((r) => r.label === label) ?? rows[rows.length - 1], [rows, label]);

  const uc: UseCase = {
    id: "permit-wait-time",
    kicker: story.kicker,
    question: lang === "fr" ? "Combien de temps prendra votre permis ?" : "How long will your permit take?",
    stat: row.display,
    statLabel: `${t.median} ${t.sub}: ${row.label}`,
    mechanism: story.mechanism.slice(0, 2),
    howWeKnow: story.howWeKnow,
    shareText: story.shareText,
    projectUrl: story.projectUrl,
    projectName: story.projectName,
  };

  return (
    <UseCaseCard usecase={uc} labels={labels} lang={lang}>
      <div className="rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
        <label className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">
          {t.typeLabel}
        </label>
        <select
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full max-w-[420px] rounded-2xl border border-line bg-paper px-4 py-3 text-[16px] font-medium text-ink"
        >
          {rows.map((r) => (
            <option key={r.label} value={r.label}>
              {r.label} ({r.display})
            </option>
          ))}
        </select>
        <div className="mt-6 border-t border-line pt-6">
          <StoryChart spec={story.chart} />
        </div>
      </div>
    </UseCaseCard>
  );
}
