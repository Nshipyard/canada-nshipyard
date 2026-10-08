"use client";

import { useLang } from "@/i18n";

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-[1392px] px-6 pb-24 pt-20 text-center md:pb-32 md:pt-28">
      <div className="mx-auto max-w-[720px]">
        <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">
          {t.hero.kicker}
        </p>
        <h1 className="display text-[clamp(44px,7vw,84px)]">{t.hero.title}</h1>
        <p className="mx-auto mt-6 max-w-[600px] text-[18px] leading-relaxed text-ink/65">
          {t.hero.sub}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#projects"
            className="rounded-full bg-canada px-8 py-4 text-[16px] font-medium text-white transition hover:bg-canada-dark"
          >
            {t.hero.cta1}
          </a>
          <a
            href="#showcase"
            className="rounded-full border border-ink/20 px-8 py-4 text-[16px] font-medium transition hover:border-ink"
          >
            {t.hero.cta2}
          </a>
        </div>
      </div>
    </section>
  );
}
