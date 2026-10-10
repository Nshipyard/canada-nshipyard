"use client";

import { useEffect } from "react";
import { ShareCard } from "@/charts/ShareCard";
import { CardActions } from "@/charts/CardActions";
import type { ChartDef } from "@/charts/chart-data";
import type { Lang } from "@/charts/chart-svgs";

export function ChartLightbox({
  def,
  lang,
  onClose,
}: {
  def: ChartDef;
  lang: Lang;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const shareText = lang === "fr" ? def.fr.shareText : def.shareText;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shareText}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(14, 12, 8, 0.86)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        cursor: "zoom-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(94vw, calc((100vh - 230px) * 0.75), 620px)",
          cursor: "default",
        }}
      >
        <div
          style={{
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 30px 90px -20px rgba(0,0,0,0.6)",
            background: "#fff",
          }}
        >
          <ShareCard def={def} lang={lang} id={`chart-full-${def.slug}`} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <CardActions
            slug={def.slug}
            lang={lang}
            shareText={shareText}
            projectUrl={def.projectUrl}
            dark
          />
          <button
            onClick={onClose}
            type="button"
            aria-label={lang === "fr" ? "Fermer" : "Close"}
            title={lang === "fr" ? "Fermer" : "Close"}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.35)",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
