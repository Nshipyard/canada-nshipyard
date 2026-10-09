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
          {t.showcase.items.map((s) => {
            const live = !!s.url;
            const card = (
              <>
                {live && s.thumb && (
                  <span className="mb-6 block overflow-hidden rounded-[24px] border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.thumb} alt={s.q} className="aspect-[16/10] w-full object-cover object-top" loading="lazy" />
                  </span>
                )}
                <span
                  className={`w-fit rounded-full border px-3 py-1 text-[12px] font-semibold uppercase tracking-wide ${
                    live ? "border-canada bg-canada text-white" : "border-white/20 text-white/60"
                  }`}
                >
                  {live ? t.showcase.live : t.showcase.soon}
                </span>
                <h3 className="display mt-5 text-[28px] leading-tight">{s.q}</h3>
                {live && s.answer && (
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">{s.answer}</p>
                )}
                <p className="mt-auto pt-6 text-[14px] text-white/50">
                  {live ? (
                    <span className="font-semibold text-white/80">
                      {t.showcase.explore} <span aria-hidden="true">→</span>
                    </span>
                  ) : (
                    <>
                      {t.showcase.needs}: {s.needs}
                    </>
                  )}
                </p>
              </>
            );
            return live && s.url ? (
              <a
                key={s.q}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-[40px] border border-white/12 bg-white/[0.04] p-8 transition-colors hover:border-canada/60 hover:bg-white/[0.07]"
              >
                {card}
              </a>
            ) : (
              <article
                key={s.q}
                className="flex flex-col rounded-[40px] border border-white/12 bg-white/[0.04] p-8"
              >
                {card}
              </article>
            );
          })}
        </div>
        <div className="mx-auto mt-12 max-w-[1200px] text-center">
          <a
            href="/showcase"
            className="inline-block rounded-full bg-white px-8 py-4 text-[16px] font-semibold text-ink transition hover:bg-canada hover:text-white"
          >
            {t.showcase.all} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
