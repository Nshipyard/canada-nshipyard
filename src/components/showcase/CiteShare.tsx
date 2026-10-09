"use client";

import { useEffect, useState } from "react";

export interface CiteLabels {
  cite: string;
  copy: string;
  copied: string;
  share: string;
  copyLink: string;
  exploreProject: string;
}

const SITE = "https://canada.nshipyard.com/showcase";

export function CopyButton({ text, label, doneLabel }: { text: string; label: string; doneLabel: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  };
  return (
    <button
      onClick={copy}
      className="rounded-full border border-line px-4 py-1.5 text-[13px] font-medium text-ink/70 transition hover:border-ink/40 hover:text-ink"
    >
      {done ? doneLabel : label}
    </button>
  );
}

export default function CiteShare({
  id,
  title,
  shareText,
  projectUrl,
  projectName,
  labels,
  lang,
}: {
  id: string;
  title: string;
  shareText: string;
  projectUrl: string;
  projectName: string;
  labels: CiteLabels;
  lang: "en" | "fr";
}) {
  const url = `${SITE}#${id}`;
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, [lang]);
  const citation =
    lang === "fr"
      ? `Open Nshipyard (2026). « ${title} » Vitrine. Consulté le ${today} à ${url}.`
      : `Open Nshipyard (2026). "${title}" Showcase. Retrieved ${today} from ${url}.`;
  const xHref = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
  const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div>
      <div className="rounded-[20px] border border-line px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">{labels.cite}</p>
          <CopyButton text={citation} label={labels.copy} doneLabel={labels.copied} />
        </div>
        <p className="mt-3 text-[14px] leading-relaxed text-ink/75">{citation}</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">{labels.share}:</span>
        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-ink px-5 py-2 text-[14px] font-medium text-white transition hover:bg-canada"
        >
          X
        </a>
        <a
          href={liHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-ink px-5 py-2 text-[14px] font-medium text-white transition hover:bg-canada"
        >
          LinkedIn
        </a>
        <CopyButton text={url} label={labels.copyLink} doneLabel={labels.copied} />
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[14px] font-semibold text-canada hover:text-canada-dark"
        >
          {labels.exploreProject}: {projectName} →
        </a>
      </div>
    </div>
  );
}
