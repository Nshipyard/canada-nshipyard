"use client";

import { useEffect, useMemo, useState } from "react";
import StoryChart from "../charts";
import UseCaseCard, { type UseCase } from "../UseCaseCard";
import type { CiteLabels } from "../CiteShare";

interface Ward {
  code: string;
  name: string;
  backlog_rate: number;
  income: number;
  top_division: string;
}

const DIV_FR: Record<string, string> = {
  "Solid Waste Management Services": "Gestion des déchets solides",
  "Municipal Licensing & Standards": "Licences et normes municipales",
  "Transportation Services": "Services de transport",
  "Toronto Water": "Toronto Water",
  Parks: "Parcs",
  "Parks and Recreation": "Parcs et loisirs",
  Environment: "Environnement",
  "311": "311",
  Unknown: "Inconnu",
};

const L = {
  en: {
    wardLabel: "Ward",
    loading: "Loading ward data…",
    backlog: "backlog rate",
    income: "median household income",
    topDivision: "most common request division",
    vsMean: "city mean",
    above: "above",
    below: "below",
  },
  fr: {
    wardLabel: "Quartier",
    loading: "Chargement des données…",
    backlog: "taux d'arriéré",
    income: "revenu médian des ménages",
    topDivision: "division la plus demandée",
    vsMean: "moyenne de la ville",
    above: "au-dessus",
    below: "en dessous",
  },
};

function fmt(n: number, lang: "en" | "fr") {
  return n.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA");
}
function pct(r: number, lang: "en" | "fr") {
  const s = (r * 100).toFixed(2);
  return lang === "fr" ? s.replace(".", ",") + " %" : s + "%";
}

export default function Cases311({ labels, lang }: { labels: CiteLabels & { howWeKnow: string }; lang: "en" | "fr" }) {
  const t = L[lang];
  const [wards, setWards] = useState<Ward[] | null>(null);
  const [code, setCode] = useState("10");

  useEffect(() => {
    fetch("/data/ward-backlog.json")
      .then((r) => r.json())
      .then((j) => setWards(j.wards.filter((w: Ward) => w.code !== "UNK")))
      .catch(() => setWards([]));
  }, []);

  const ward = useMemo(() => wards?.find((w) => w.code === code) ?? null, [wards, code]);
  const mean = useMemo(
    () => (wards ? wards.reduce((a, w) => a + w.backlog_rate, 0) / wards.length : 0),
    [wards]
  );

  const points = useMemo(
    () =>
      (wards ?? []).map((w) => ({
        x: w.income,
        y: `${(w.backlog_rate * 100).toFixed(2)}%`,
        label: w.code,
      })),
    [wards]
  );

  const uc: UseCase = {
    id: "ward-311-backlog",
    kicker: lang === "fr" ? "Taxonomie 311" : "311 Taxonomy",
    question: lang === "fr" ? "Comment le 311 traite-t-il votre quartier ?" : "How does 311 treat your ward?",
    stat: ward ? pct(ward.backlog_rate, lang) : "…",
    statLabel: ward
      ? lang === "fr"
        ? `quartier ${ward.code} (${ward.name}) : part des demandes 2022-2024 encore ouvertes`
        : `Ward ${ward.code} (${ward.name}): share of 2022-2024 requests still open`
      : "",
    mechanism:
      lang === "fr"
        ? [
            "Ce qui prédit une demande bloquée, c'est le type de travail, pas le code postal : les Parcs laissent 44,6 % de leurs demandes ouvertes, presque toutes des travaux d'arbres, tandis que la Gestion des déchets solides n'en laisse que 0,8 %.",
            "Les données ouvertes ne contiennent aucune date d'achèvement, donc personne ne peut calculer le vrai délai de traitement. La mesure honnête est l'arriéré.",
          ]
        : [
            "What predicts a stuck request is the kind of work, not the postal code: Parks leaves 44.6% of its requests open, almost entirely tree work, while Solid Waste leaves 0.8%.",
            "The open data has no completion dates, so nobody can compute true time-to-close from it. The honest measure is backlog.",
          ],
    howWeKnow:
      lang === "fr"
        ? "Ville de Toronto, Demandes de service 311, 2 225 151 lignes (2022-2026). Arriéré = demandes 2022-2024 encore nouvelles ou en cours dans l'extrait d'oct. 2026; revenu = revenu médian des ménages du Recensement 2021."
        : "City of Toronto, 311 Service Requests, 2,225,151 rows (2022-2026). Backlog = 2022-2024 requests still New or In Progress in the Oct 2026 extract; income = 2021 Census median household income.",
    shareText:
      lang === "fr"
        ? "Le 311 de Toronto ne favorise pas les quartiers riches : le revenu contre l'arriéré corrèle à r = 0,18. Vérifiez votre quartier."
        : "Toronto's 311 does not favor rich wards: income vs backlog correlates at r = 0.18. Check your ward.",
    projectUrl: "https://toronto-311-taxonomy.vercel.app",
    projectName: lang === "fr" ? "Taxonomie 311" : "311 Taxonomy",
  };

  return ward ? (
    <UseCaseCard usecase={uc} labels={labels} lang={lang}>
      <div className="rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
        <label className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">
          {t.wardLabel}
        </label>
        <select
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full max-w-[420px] rounded-2xl border border-line bg-paper px-4 py-3 text-[16px] font-medium text-ink"
        >
          {wards!.map((w) => (
            <option key={w.code} value={w.code}>
              {w.code} · {w.name}
            </option>
          ))}
        </select>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-ink px-5 py-4 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/55">{t.backlog}</p>
            <p className="display mt-1 text-[28px]">{pct(ward.backlog_rate, lang)}</p>
            <p className="mt-1 text-[13px] text-white/65">
              {ward.backlog_rate >= mean ? t.above : t.below} {t.vsMean} ({pct(mean, lang)})
            </p>
          </div>
          <div className="rounded-2xl border border-line px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/50">{t.income}</p>
            <p className="display mt-1 text-[28px]">${fmt(ward.income, lang)}</p>
            <p className="mt-1 text-[13px] text-ink/60">{lang === "fr" ? "Recensement 2021" : "2021 Census"}</p>
          </div>
          <div className="rounded-2xl border border-line px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/50">{t.topDivision}</p>
            <p className="mt-2 text-[16px] font-semibold leading-snug">
              {lang === "fr" ? DIV_FR[ward.top_division] ?? ward.top_division : ward.top_division}
            </p>
          </div>
        </div>
        <div className="mt-6 border-t border-line pt-6">
          <StoryChart
            spec={{
              kind: "scatter",
              points,
              xLabel:
                lang === "fr"
                  ? "Revenu médian des ménages par quartier (Recensement 2021)"
                  : "Median household income by ward (2021 Census)",
              yLabel: lang === "fr" ? "Taux d'arriéré" : "Backlog rate",
              note:
                lang === "fr"
                  ? "Chaque point est l'un des 25 quartiers. Nuage plat : r = 0,18."
                  : "Each dot is one of 25 wards. Flat cloud: r = 0.18.",
            }}
          />
        </div>
      </div>
    </UseCaseCard>
  ) : (
    <div className="mx-auto max-w-[880px] py-16 text-center text-[15px] text-ink/55">{t.loading}</div>
  );
}
