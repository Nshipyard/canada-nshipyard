"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/charts/chart-svgs";

const LABELS: Record<Lang, { download: string; share: string; copy: string; copied: string; explore: string }> = {
  en: { download: "Download PNG", share: "Share image", copy: "Copy caption", copied: "Copied", explore: "Explore the data" },
  fr: { download: "Télécharger le PNG", share: "Partager l’image", copy: "Copier la légende", copied: "Copié", explore: "Explorer les données" },
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
  const [canShareFile, setCanShareFile] = useState(false);
  const t = LABELS[lang];
  const fileName = `${slug}${lang === "fr" ? "-fr" : ""}.png`;
  const fileUrl = `/charts/${fileName}`;

  useEffect(() => {
    try {
      const probe = new File([], "probe.png", { type: "image/png" });
      setCanShareFile(!!navigator.canShare && navigator.canShare({ files: [probe] }));
    } catch {
      setCanShareFile(false);
    }
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  // On phones the share sheet offers "Save Image", which lands in Photos.
  // A plain download link on iOS always goes to Files instead.
  const share = async () => {
    try {
      const res = await fetch(fileUrl);
      const blob = await res.blob();
      const file = new File([blob], fileName, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Open Nshipyard" });
        return;
      }
    } catch {
      /* fall through to a regular download */
    }
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
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
      {canShareFile ? (
        <button onClick={share} style={{ ...btn, background: "#0a0f1e", color: "#fff", borderColor: "#0a0f1e" }} type="button">
          {t.share}
        </button>
      ) : (
        <a
          href={fileUrl}
          download={fileName}
          style={{ ...btn, background: "#0a0f1e", color: "#fff", borderColor: "#0a0f1e" }}
        >
          {t.download}
        </a>
      )}
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
