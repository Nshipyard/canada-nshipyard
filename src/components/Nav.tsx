"use client";

import { useState } from "react";
import { useLang } from "@/i18n";
import MapleLeaf from "./MapleLeaf";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#projects", label: t.nav.projects },
    { href: "#showcase", label: t.nav.showcase },
    { href: "#developers", label: t.nav.developers },
  ];

  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1392px] items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <MapleLeaf className="h-7 w-7 text-canada" />
          <span className="display whitespace-nowrap text-[20px] sm:text-[26px]">Open Nshipyard</span>
          <span className="mt-1 hidden rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-widest text-ink/60 sm:inline">
            Canada
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[15px] font-medium text-ink/70 hover:text-ink">
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/Nshipyard"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-ink px-5 py-2.5 text-[15px] font-medium text-white transition hover:bg-canada"
          >
            GitHub
          </a>
          <div className="flex items-center rounded-full border border-line text-[14px] font-medium">
            {(["en", "fr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1.5 uppercase ${
                  lang === l ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
                }`}
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>

        <button
          className="rounded-full border border-line px-4 py-2 text-[15px] font-medium md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {open ? t.nav.close : t.nav.menu}
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-[16px] font-medium">
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/Nshipyard"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink px-5 py-2.5 text-center text-[15px] font-medium text-white"
            >
              GitHub
            </a>
            <div className="flex items-center gap-2 pt-1 text-[14px] font-medium">
              {(["en", "fr"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full border px-3 py-1.5 uppercase ${
                    lang === l ? "border-ink bg-ink text-white" : "border-line text-ink/60"
                  }`}
                >
                  {l === "en" ? "English" : "Français"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
