"use client";

import { useState } from "react";
import type { Lang } from "@/charts/chart-svgs";

const LABELS: Record<Lang, { download: string; copy: string; copied: string; explore: string }> = {
  en: { download: "Download PNG", copy: "Copy caption", copied: "Copied", explore: "Explore the data" },
  fr: { download: "Télécharger le PNG", copy: "Copier la légende", copied: "Copié", explore: "Explorer les données" },
};

export function CardActions({
  slug,
  lang,
  shareText,
  projectUrl,
}: {
  slug: string;
  lang: Lang;
  shareText: string;
  projectUrl: string;
}) {
  const [copied, setCopied] = useState(false);
  const t = LABELS[lang];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  const btn: React.CSSProperties = {
    fontFamily: "Archivo, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    padding: "10px 18px",
    borderRadius: 999,
    border: "1px solid rgba(10,15,30,0.18)",
    background: "#fff",
    color: "#0a0f1e",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
      <a
        href={`/charts/${slug}${lang === "fr" ? "-fr" : ""}.png`}
        download
        style={{ ...btn, background: "#0a0f1e", color: "#fff", borderColor: "#0a0f1e" }}
      >
        {t.download}
      </a>
      <button onClick={copy} style={btn} type="button">
        {copied ? t.copied : t.copy}
      </button>
      {projectUrl && (
        <a href={projectUrl} target="_blank" rel="noreferrer" style={btn}>
          {t.explore}
        </a>
      )}
    </div>
  );
}
