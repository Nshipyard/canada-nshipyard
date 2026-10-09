"use client";

import { useCallback, useEffect, useState } from "react";
import { useLang } from "@/i18n";
import ParkingCases from "./usecases/ParkingCases";
import Cases311 from "./usecases/Cases311";
import PermitCases from "./usecases/PermitCases";
import HousingCases from "./usecases/HousingCases";
import { ParcelCases, LicenceCases, WatermainCases, CodebookCases } from "./usecases/StaticCases";
import WorldwideCases from "./usecases/WorldwideCases";
import CrosscuttingCases from "./usecases/CrosscuttingCases";
import CitysignalCases from "./usecases/CitysignalCases";
import NewerCases from "./usecases/NewerCases";
import NewQuestionsCases from "./usecases/NewQuestionsCases";
import type { CiteLabels } from "./CiteShare";

type Context = "toronto" | "worldwide";

const DATASET_IDS = ["newquestions", "crosscutting", "parking", "311", "permits", "housing", "parcels", "licences", "watermains", "codebooks", "citysignal", "procurement", "supply", "flood", "fire", "livable", "contagion", "my-street", "geo"] as const;
type DatasetId = (typeof DATASET_IDS)[number];

// use-case anchors per dataset, for deep-link resolution
const DATASET_CASES: Record<DatasetId, string[]> = {
  newquestions: ["camera-postmortem", "adoption-inversion", "landlord-index", "dinesafe-chains"],
  crosscutting: ["growth-vs-pipes", "pipes-vs-water311", "enforcement-density", "service-wait", "open-business", "construction-tickets", "builders-vs-vendors"],
  parking: ["worst-time-to-park", "when-tickets-happen"],
  "311": ["ward-311-backlog"],
  permits: ["permit-wait-time"],
  housing: ["homes-gained"],
  parcels: ["stacked-parcels"],
  licences: ["business-mix"],
  watermains: ["pipe-age"],
  codebooks: ["code-meaning"],
  citysignal: ["citysignal-api"],
  procurement: ["procurement-vendors"],
  supply: ["supply-stations"],
  flood: ["flood-history"],
  fire: ["fire-watch"],
  livable: ["livable-isochrone"],
  contagion: ["contagion-ripple"],
  "my-street": ["my-street-live"],
  geo: ["geo-crosswalk"],
};
const WORLDWIDE_CASES = ["earthquery", "cyclonewatch", "hazardlens"];

function readHash(): { context: Context; dataset: DatasetId } {
  if (typeof window === "undefined") return { context: "toronto", dataset: "parking" };
  const h = window.location.hash.replace("#", "");
  if (h === "worldwide" || WORLDWIDE_CASES.includes(h)) return { context: "worldwide", dataset: "parking" };
  for (const d of DATASET_IDS) {
    if (h === d || DATASET_CASES[d].includes(h)) return { context: "toronto", dataset: d };
  }
  return { context: "toronto", dataset: "parking" };
}

export default function ShowcasePage() {
  const { lang, t } = useLang();
  const s = t.storiesPage;
  // Initialize to the server-rendered default so hydration matches; the URL
  // hash is applied after mount (see effect below).
  const [{ context, dataset }, setSel] = useState<{ context: Context; dataset: DatasetId }>({
    context: "toronto",
    dataset: "parking",
  });
  const labels: CiteLabels & { howWeKnow: string } = {
    howWeKnow: s.howWeKnow,
    cite: s.cite,
    copy: s.copy,
    copied: s.copied,
    share: s.share,
    copyLink: s.copyLink,
    exploreProject: s.exploreProject,
  };

  const select = useCallback((c: Context, d: DatasetId) => {
    setSel({ context: c, dataset: d });
    const target = c === "worldwide" ? "worldwide" : d;
    window.history.replaceState(null, "", `#${target}`);
    document.getElementById("usecases")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // apply the URL hash after mount (server has no window.location)
  useEffect(() => {
    setSel(readHash());
  }, []);

  // keep selection in sync if the hash changes externally
  useEffect(() => {
    const onHash = () => setSel(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const datasetName = (id: DatasetId) => s.datasets[id];

  return (
    <main>
      <section className="mx-auto max-w-[1392px] px-6 pb-8 pt-16 text-center md:pt-24">
        <div className="mx-auto max-w-[760px]">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">{s.kicker}</p>
          <h1 className="display text-[clamp(38px,6vw,72px)] leading-[1.05]">{s.title}</h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-relaxed text-ink/65">{s.sub}</p>
        </div>
      </section>

      {/* context switcher */}
      <div className="mx-auto max-w-[1392px] px-6">
        <div className="mx-auto flex w-fit rounded-full border border-line bg-paper-warm p-1.5" role="tablist" aria-label="context">
          {(["toronto", "worldwide"] as const).map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={context === c}
              onClick={() => select(c, dataset)}
              className={`rounded-full px-6 py-2.5 text-[15px] font-semibold transition sm:px-10 ${
                context === c ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
              }`}
            >
              {c === "toronto" ? s.contextToronto : s.contextWorldwide}
            </button>
          ))}
        </div>

        {/* dataset switcher */}
        {context === "toronto" && (
          <div className="mx-auto mt-6 max-w-[880px]">
            <div className="-mx-6 overflow-x-auto px-6 pb-2">
              <div className="flex w-max gap-2">
                {DATASET_IDS.map((d) => (
                  <button
                    key={d}
                    onClick={() => select("toronto", d)}
                    aria-pressed={dataset === d}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-[14px] font-medium transition ${
                      dataset === d
                        ? "border-canada bg-canada text-white"
                        : "border-line bg-paper text-ink/65 hover:border-ink/30 hover:text-ink"
                    }`}
                  >
                    {datasetName(d)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div id="usecases" className="mx-auto max-w-[1392px] scroll-mt-24 px-6">
        {context === "worldwide" ? (
          <WorldwideCases labels={labels} lang={lang} />
        ) : dataset === "newquestions" ? (
          <NewQuestionsCases labels={labels} lang={lang} />
        ) : dataset === "crosscutting" ? (
          <CrosscuttingCases labels={labels} lang={lang} />
        ) : dataset === "parking" ? (
          <ParkingCases labels={labels} lang={lang} />
        ) : dataset === "311" ? (
          <Cases311 labels={labels} lang={lang} />
        ) : dataset === "permits" ? (
          <PermitCases labels={labels} lang={lang} />
        ) : dataset === "housing" ? (
          <HousingCases labels={labels} lang={lang} />
        ) : dataset === "parcels" ? (
          <ParcelCases labels={labels} lang={lang} />
        ) : dataset === "licences" ? (
          <LicenceCases labels={labels} lang={lang} />
        ) : dataset === "watermains" ? (
          <WatermainCases labels={labels} lang={lang} />
        ) : dataset === "codebooks" ? (
          <CodebookCases labels={labels} lang={lang} />
        ) : dataset === "citysignal" ? (
          <CitysignalCases labels={labels} lang={lang} />
        ) : (
          <NewerCases dataset={dataset} labels={labels} lang={lang} />
        )}
      </div>

      <section className="mx-auto max-w-[880px] px-6 pb-24 pt-4 text-center">
        <p className="text-[15px] leading-relaxed text-ink/55">{s.footer}</p>
      </section>
    </main>
  );
}
