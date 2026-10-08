"use client";

import { useLang } from "@/i18n";

export default function Showcase() {
  const { t } = useLang();
  return (
    <section id="showcase" className="bg-ink text-white">
      <div className="mx-auto max-w-[1392px] scroll-mt-20 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/60">
            {t.showcase.kicker}
          </p>
          <h2 className="display text-[clamp(34px,4.5vw,56px)]">{t.showcase.title}</h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-relaxed text-white/65">
            {t.showcase.body}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.showcase.items.map((s) => (
            <article
              key={s.q}
              className="flex flex-col rounded-[40px] border border-white/12 bg-white/[0.04] p-8"
            >
              <span className="w-fit rounded-full border border-white/20 px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-white/60">
                {t.showcase.soon}
              </span>
              <h3 className="display mt-5 text-[28px] leading-tight">{s.q}</h3>
              <p className="mt-auto pt-6 text-[14px] text-white/50">
                {t.showcase.needs}: {s.needs}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
