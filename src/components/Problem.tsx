"use client";

import { useLang } from "@/i18n";

export default function Problem() {
  const { t } = useLang();
  return (
    <section className="bg-paper-warm">
      <div className="mx-auto max-w-[1392px] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">
            {t.problem.kicker}
          </p>
          <h2 className="display text-[clamp(34px,4.5vw,56px)]">{t.problem.title}</h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-relaxed text-ink/65">
            {t.problem.body}
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.problem.stats.map((s) => (
            <div key={s.label} className="rounded-[32px] border border-line bg-paper p-8">
              <p className="display text-[44px] text-canada">{s.value}</p>
              <p className="mt-3 text-[15px] leading-snug text-ink/65">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
