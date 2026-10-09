"use client";

import { useLang } from "@/i18n";
import MapleLeaf from "./MapleLeaf";

export default function Footer() {
  const { t, lang, setLang } = useLang();
  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-[1392px] border-t border-line px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <MapleLeaf className="h-6 w-6 text-canada" />
            <span className="display whitespace-nowrap text-[22px]">Open Nshipyard</span>
          </div>
          <div className="flex items-center gap-2 text-[14px] font-medium">
            {(["en", "fr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1.5 uppercase ${
                  lang === l ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
                }`}
              >
                {l === "en" ? "English" : "Français"}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-8 max-w-[640px] text-[14px] leading-relaxed text-ink/55">{t.footer.line}</p>
        <a
          href="https://x.com/richardsondx"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-[14px] text-ink/55 transition-colors hover:text-ink"
        >
          <span>{t.footer.builtBy}</span>
          <img
            src="/richardson-avatar.jpg"
            alt="Richardson Dackam"
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="font-semibold text-ink">Richardson Dackam</span>
        </a>
      </div>
    </footer>
  );
}
