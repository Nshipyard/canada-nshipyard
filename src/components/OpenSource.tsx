"use client";

import { useLang } from "@/i18n";
import MapleLeaf from "./MapleLeaf";

export default function OpenSource() {
  const { t } = useLang();
  return (
    <section className="bg-paper-warm">
      <div className="mx-auto max-w-[1392px] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[720px] text-center">
          <MapleLeaf className="mx-auto mb-6 h-10 w-10 text-canada" />
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">
            {t.opensource.kicker}
          </p>
          <h2 className="display text-[clamp(34px,4.5vw,56px)]">{t.opensource.title}</h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-relaxed text-ink/65">
            {t.opensource.body}
          </p>
          <ul className="mx-auto mt-8 grid max-w-[560px] grid-cols-1 gap-3 text-left sm:grid-cols-2">
            {t.opensource.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[15px] text-ink/75">
                <span className="mt-0.5 font-mono text-canada">✓</span>
                {p}
              </li>
            ))}
          </ul>
          <a
            href="https://github.com/Nshipyard"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-full bg-ink px-8 py-4 font-mono text-[16px] text-white transition hover:bg-canada"
          >
            {t.opensource.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
