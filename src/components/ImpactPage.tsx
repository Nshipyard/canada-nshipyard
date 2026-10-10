"use client";

import { useLang } from "@/i18n";

export default function ImpactPage() {
  const { t } = useLang();
  const im = t.impact;

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/impact/hero.png"
            alt="A lively Toronto street at golden hour"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink/75" />
        </div>
        <div className="relative mx-auto max-w-[1392px] px-6 pb-20 pt-24 md:pb-28 md:pt-36">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {im.kicker}
            </p>
            <h1 className="display text-[clamp(38px,5.5vw,64px)] leading-[1.05] text-white">
              {im.title}
            </h1>
            <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-relaxed text-white/85">
              {im.heroBody}
            </p>
          </div>
        </div>
      </section>

      {/* Why this exists */}
      <section className="mx-auto max-w-[1392px] px-6 py-14 md:py-20">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">
            {im.whyKicker}
          </p>
          <h2 className="display text-[clamp(28px,3.6vw,44px)] leading-[1.1]">{im.whyTitle}</h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[17px] leading-relaxed text-ink/70">
            {im.whyBody}
          </p>
          <a
            href="/data-fixes"
            className="mt-6 inline-block rounded-full border border-ink/25 px-6 py-3 text-[15px] font-semibold text-ink transition hover:border-canada hover:text-canada"
          >
            {im.fixesLink} {"\u2192"}
          </a>
        </div>
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-[1392px] px-6 pb-6">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-10 md:gap-14">
          {im.sections.map((s, i) => (
            <article
              key={s.id}
              className="overflow-hidden rounded-[32px] border border-line bg-paper md:rounded-[40px]"
            >
              <div
                className={`grid md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative min-h-[260px] md:min-h-[380px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-8 md:p-12">
                  <h3 className="display text-[clamp(24px,2.8vw,34px)] leading-[1.15]">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.15em] text-ink/45">
                    {im.problemLabel}
                  </p>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-ink/75">{s.problem}</p>
                  <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.15em] text-canada">
                    {im.enablesLabel}
                  </p>
                  <ul className="mt-2 space-y-2.5">
                    {(s.enables as string[]).map((e, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[15.5px] leading-relaxed text-ink/85"
                      >
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-canada" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-[14px] italic text-ink/55">{s.fixNote}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* What we don't claim */}
      <section className="mx-auto max-w-[1392px] px-6 py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] rounded-[32px] bg-ink p-8 text-white md:rounded-[40px] md:p-14">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/60">
            {im.honestKicker}
          </p>
          <h2 className="display max-w-[640px] text-[clamp(28px,3.6vw,44px)] leading-[1.1]">
            {im.honestTitle}
          </h2>
          <p className="mt-5 max-w-[620px] text-[16px] leading-relaxed text-white/75">
            {im.honestBody}
          </p>
        </div>
      </section>

      {/* Record so far */}
      <section className="mx-auto max-w-[1392px] px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-[1200px] text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">
            {im.recordKicker}
          </p>
          <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-4 md:grid-cols-4">
            {im.stats.map((s) => (
              <div
                key={s.value}
                className="rounded-[24px] border border-line bg-paper-warm p-5 text-center"
              >
                <p className="display text-[30px] text-canada md:text-[34px]">{s.value}</p>
                <p className="mt-2 text-[13px] leading-snug text-ink/60">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-[640px] text-[14px] leading-relaxed text-ink/55">
            {im.closing}
          </p>
        </div>
      </section>
    </main>
  );
}
