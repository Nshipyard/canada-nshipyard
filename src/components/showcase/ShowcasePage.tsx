"use client";

import { useCallback, useEffect, useState } from "react";
import { useLang } from "@/i18n";
import ParkingCases from "./usecases/ParkingCases";
import Cases311 from "./usecases/Cases311";
import PermitCases from "./usecases/PermitCases";
import HousingCases from "./usecases/HousingCases";
import { ParcelCases, LicenceCases, WatermainCases, CodebookCases } from "./usecases/StaticCases";
import CrosscuttingCases from "./usecases/CrosscuttingCases";
import NewerCases from "./usecases/NewerCases";
import type { CiteLabels } from "./CiteShare";

const DATASET_IDS = ["crosscutting", "parking", "311", "permits", "housing", "parcels", "licences", "watermains", "codebooks", "procurement", "supply", "flood", "fire", "livable", "contagion", "my-street", "geo", "cameras", "rentals", "foodsafety", "aiadoption", "gpuprices", "aispending"] as const;
type DatasetId = (typeof DATASET_IDS)[number];

// use-case anchors per dataset, for deep-link resolution
const DATASET_CASES: Record<DatasetId, string[]> = {
  crosscutting: ["growth-vs-pipes", "pipes-vs-water311", "enforcement-density", "service-wait", "open-business", "construction-tickets", "builders-vs-vendors"],
  parking: ["worst-time-to-park", "when-tickets-happen"],
  "311": ["ward-311-backlog"],
  permits: ["permit-wait-time"],
  housing: ["homes-gained"],
  parcels: ["stacked-parcels"],
  licences: ["business-mix"],
  watermains: ["pipe-age"],
  codebooks: ["code-meaning"],
  procurement: ["procurement-vendors"],
  supply: ["supply-stations"],
  flood: ["flood-history"],
  fire: ["fire-watch"],
  livable: ["livable-isochrone"],
  contagion: ["contagion-ripple"],
  "my-street": ["my-street-live"],
  geo: ["geo-crosswalk"],
  cameras: ["camera-postmortem"],
  rentals: ["landlord-index"],
  foodsafety: ["dinesafe-chains"],
  aiadoption: ["adoption-inversion"],
  gpuprices: ["gpu-premium"],
  aispending: ["ai-receipt"],
};

function readHash(): DatasetId {
  if (typeof window === "undefined") return "parking";
  const h = window.location.hash.replace("#", "");
  for (const d of DATASET_IDS) {
    if (h === d || DATASET_CASES[d].includes(h)) return d;
  }
  return "parking";
}

export default function ShowcasePage() {
  const { lang, t } = useLang();
  const s = t.storiesPage;
  // Initialize to the server-rendered default so hydration matches; the URL
  // hash is applied after mount (see effect below).
  const [dataset, setDataset] = useState<DatasetId>("parking");
  const labels: CiteLabels & { howWeKnow: string } = {
    howWeKnow: s.howWeKnow,
    cite: s.cite,
    copy: s.copy,
    copied: s.copied,
    share: s.share,
    copyLink: s.copyLink,
    exploreProject: s.exploreProject,
  };

  const select = useCallback((d: DatasetId) => {
    setDataset(d);
    window.history.replaceState(null, "", `#${d}`);
    document.getElementById("usecases")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // apply the URL hash after mount (server has no window.location)
  useEffect(() => {
    setDataset(readHash());
  }, []);

  // keep selection in sync if the hash changes externally
  useEffect(() => {
    const onHash = () => setDataset(readHash());
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

      {/* dataset switcher */}
      <div className="mx-auto max-w-[1392px] px-6">
        <div className="mx-auto mt-2 max-w-[880px]">
          <div className="-mx-6 overflow-x-auto px-6 pb-2">
            <div className="flex w-max gap-2">
              {DATASET_IDS.map((d) => (
                <button
                  key={d}
                  onClick={() => select(d)}
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
      </div>

      <div id="usecases" className="mx-auto max-w-[1392px] scroll-mt-24 px-6">
        {dataset === "crosscutting" ? (
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
