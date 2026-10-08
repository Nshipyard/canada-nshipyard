"use client";

import { useLang } from "@/i18n";

export default function Apps() {
  const { t } = useLang();
  return (
    <section id="apps" className="mx-auto max-w-[1392px] scroll-mt-20 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[720px] text-center">
        <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">
          {t.apps.kicker}
        </p>
        <h2 className="display text-[clamp(34px,4.5vw,56px)]">{t.apps.title}</h2>
        <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-relaxed text-ink/65">
          {t.apps.body}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-5 md:grid-cols-2">
        {t.apps.items.map((a, i) => (
          <article
            key={a.repo}
            className="flex flex-col rounded-[40px] border border-line bg-paper p-8 transition hover:border-ink/25 md:p-10"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[13px] text-ink/45">
                {String(i + 1).padStart(2, "0")} — {a.tag}
              </span>
              <span className="rounded-full bg-green-50 px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-green-700">
                {t.projects.status[a.status]}
              </span>
            </div>
            <h3 className="display mt-5 text-[32px]">{a.name}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink/70">{a.desc}</p>
            <div className="mt-auto flex items-center gap-5 pt-7 text-[15px] font-medium">
              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="text-canada hover:text-canada-dark"
              >
                {t.apps.visit} →
              </a>
              <a
                href={`https://github.com/Nshipyard/${a.repo}`}
                target="_blank"
                rel="noreferrer"
                className="text-ink/60 hover:text-ink"
              >
                {t.apps.repo} →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
