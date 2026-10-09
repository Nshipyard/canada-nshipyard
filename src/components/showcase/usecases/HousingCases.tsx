"use client";

import { useEffect, useMemo, useState } from "react";
import { storiesEn, storiesFr } from "@/showcase-stories";
import UseCaseCard, { type UseCase } from "../UseCaseCard";
import type { CiteLabels } from "../CiteShare";

interface Hood {
  name: string;
  units: number;
  projects: number;
}

const L = {
  en: {
    hoodLabel: "Neighbourhood",
    loading: "Loading neighbourhood data…",
    homesBuilt: "homes built",
    projects: "projects",
    rankOf: "of",
  },
  fr: {
    hoodLabel: "Quartier",
    loading: "Chargement des données…",
    homesBuilt: "logements construits",
    projects: "projets",
    rankOf: "sur",
  },
};

function fmt(n: number, lang: "en" | "fr") {
  return n.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA");
}

export default function HousingCases({ labels, lang }: { labels: CiteLabels & { howWeKnow: string }; lang: "en" | "fr" }) {
  const t = L[lang];
  const stories = lang === "fr" ? storiesFr : storiesEn;
  const story = stories.find((s) => s.slug === "homes-gained")!;
  const [hoods, setHoods] = useState<Hood[] | null>(null);
  const [name, setName] = useState("St Lawrence-East Bayfront-The Islands");

  useEffect(() => {
    fetch("/data/housing-built-by-neighbourhood.json")
      .then((r) => r.json())
      .then((j) => setHoods(j.neighbourhoods))
      .catch(() => setHoods([]));
  }, []);

  const hood = useMemo(() => hoods?.find((h) => h.name === name) ?? null, [hoods, name]);
  const rank = useMemo(() => (hoods && hood ? hoods.indexOf(hood) + 1 : 0), [hoods, hood]);

  const uc: UseCase = {
    id: "homes-gained",
    kicker: story.kicker,
    question: lang === "fr" ? "Combien de logements votre quartier a-t-il gagnés ?" : "How many homes did your neighbourhood gain?",
    stat: hood ? `${fmt(hood.units, lang)}` : "…",
    statLabel: hood
      ? lang === "fr"
        ? `${t.homesBuilt} à ${hood.name} (nº ${rank} ${t.rankOf} ${hoods!.length})`
        : `${t.homesBuilt} in ${hood.name} (ranked #${rank} ${t.rankOf} ${hoods!.length})`
      : "",
    mechanism: story.mechanism.slice(0, 2),
    howWeKnow: story.howWeKnow,
    shareText: story.shareText,
    projectUrl: story.projectUrl,
    projectName: story.projectName,
  };

  return hood ? (
    <UseCaseCard usecase={uc} labels={labels} lang={lang}>
      <div className="rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
        <label className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">
          {t.hoodLabel}
        </label>
        <select
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[420px] rounded-2xl border border-line bg-paper px-4 py-3 text-[16px] font-medium text-ink"
        >
          {hoods!.map((h) => (
            <option key={h.name} value={h.name}>
              {h.name} ({fmt(h.units, lang)})
            </option>
          ))}
        </select>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-ink px-5 py-4 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/55">{t.homesBuilt}</p>
            <p className="display mt-1 text-[28px]">{fmt(hood.units, lang)}</p>
            <p className="mt-1 text-[13px] text-white/65">
              #{rank} {t.rankOf} {hoods!.length}
            </p>
          </div>
          <div className="rounded-2xl border border-line px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/50">{t.projects}</p>
            <p className="display mt-1 text-[28px]">{fmt(hood.projects, lang)}</p>
            <p className="mt-1 text-[13px] text-ink/60">
              {lang === "fr" ? "projets marqués construits par la Ville" : "projects the City marks Built"}
            </p>
          </div>
        </div>
      </div>
    </UseCaseCard>
  ) : (
    <div className="mx-auto max-w-[880px] py-16 text-center text-[15px] text-ink/55">{t.loading}</div>
  );
}
