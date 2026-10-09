"use client";

import { useLang } from "@/i18n";
import { CHARTS } from "@/charts/chart-data";
import { ShareCard, OpenNshipyardMark } from "@/charts/ShareCard";
import { CardActions } from "@/charts/CardActions";

const COPY = {
  en: {
    kicker: "Charts, made to share",
    title: "What the data says, in one chart each.",
    sub: "Every card below answers one question our projects can answer, drawn as a publication-grade chart with the source printed on it. Download the PNG, post it anywhere.",
    note: "Numbers are computed from the publishers' open datasets and checked against the project pipelines. The fine print travels with the chart.",
  },
  fr: {
    kicker: "Graphiques, prêts à partager",
    title: "Les données, un graphique à la fois.",
    sub: "Chaque carte répond à une question que nos projets peuvent trancher, avec un graphique de qualité éditoriale et la source imprimée dessus. Téléchargez le PNG, publiez-le partout.",
    note: "Les chiffres sont calculés à partir des données ouvertes des diffuseurs et vérifiés contre les pipelines des projets. Les petits caractères voyagent avec le graphique.",
  },
} as const;

export default function ChartsPageClient() {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <main style={{ maxWidth: 1240, margin: "0 auto", padding: "56px 24px 80px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 18 }}>
        <OpenNshipyardMark box="92px" leaf="38px" text="18px" gap="7px" />
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#6f695a",
            margin: 0,
          }}
        >
          {t.kicker}
        </p>
      </div>
      <h1 className="display" style={{ fontSize: "clamp(34px, 5vw, 58px)", margin: "0 0 16px", maxWidth: 900 }}>
        {t.title}
      </h1>
      <p style={{ fontSize: 18, color: "#3c3a33", maxWidth: 760, lineHeight: 1.6, margin: "0 0 12px" }}>{t.sub}</p>
      <p style={{ fontSize: 15, color: "#6f695a", maxWidth: 760, lineHeight: 1.6, margin: "0 0 48px" }}>{t.note}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
          gap: "48px 40px",
        }}
      >
        {CHARTS.map((def) => (
          <div key={def.slug}>
            <div
              style={{
                border: "1px solid rgba(10,15,30,0.12)",
                borderRadius: 6,
                overflow: "hidden",
                boxShadow: "0 18px 50px -24px rgba(20,16,8,0.35)",
              }}
            >
              <ShareCard def={def} lang={lang} id={`chart-${def.slug}`} />
            </div>
            <CardActions
              slug={def.slug}
              lang={lang}
              shareText={lang === "fr" ? def.fr.shareText : def.shareText}
              projectUrl={def.projectUrl}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
