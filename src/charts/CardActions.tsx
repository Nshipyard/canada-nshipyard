"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/charts/chart-svgs";

const LABELS: Record<Lang, { download: string; share: string; copy: string; copied: string; explore: string }> = {
  en: { download: "Download PNG", share: "Share image", copy: "Copy caption", copied: "Copied", explore: "Explore the data" },
  fr: { download: "Télécharger le PNG", share: "Partager l’image", copy: "Copier la légende", copied: "Copié", explore: "Explorer les données" },
};

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 15V3m0 0L8 7m4-4l4 4" />
      <path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4" />
      <path d="M5 21h14" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4h6v6" />
      <path d="M20 4L10 14" />
      <path d="M20 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h5" />
    </svg>
  );
}

export function CardActions({
  slug,
  lang,
  shareText,
  projectUrl,
  dark = false,
}: {
  slug: string;
  lang: Lang;
  shareText: string;
  projectUrl: string;
  dark?: boolean;
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
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    textDecoration: "none",
    flexShrink: 0,
  };
  const primary: React.CSSProperties = {
    ...btn,
    background: "#0a0f1e",
    color: "#fff",
    border: "1px solid #0a0f1e",
  };
  const ghost: React.CSSProperties = dark
    ? { ...btn, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.35)" }
    : { ...btn, background: "#fff", color: "#0a0f1e", border: "1px solid rgba(10,15,30,0.18)" };

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      {canShareFile ? (
        <button onClick={share} style={primary} type="button" title={t.share} aria-label={t.share}>
          <ShareIcon />
        </button>
      ) : (
        <a href={fileUrl} download={fileName} style={primary} title={t.download} aria-label={t.download}>
          <DownloadIcon />
        </a>
      )}
      <button onClick={copy} style={ghost} type="button" title={copied ? t.copied : t.copy} aria-label={t.copy}>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      {projectUrl && (
        <a href={projectUrl} target="_blank" rel="noreferrer" style={ghost} title={t.explore} aria-label={t.explore}>
          <ExternalIcon />
        </a>
      )}
    </div>
  );
}
