"use client";

import { useLang } from "@/i18n";

const statusStyle: Record<string, string> = {
  planned: "bg-muted text-ink/60",
  building: "bg-canada/10 text-canada",
  live: "bg-green-50 text-green-700",
};

export default function Tools() {
  const { t } = useLang();
  return (
    <section id="tools" className="mx-auto max-w-[1392px] scroll-mt-20 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[720px] text-center">
        <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">
          {t.tools.kicker}
        </p>
        <h2 className="display text-[clamp(34px,4.5vw,56px)]">{t.tools.title}</h2>
        <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-relaxed text-ink/65">
          {t.tools.body}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {t.tools.items.map((p) => (
          <article
            key={p.name}
            className="flex flex-col rounded-[40px] border border-line bg-paper p-8 transition hover:border-ink/25 md:p-10"
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium uppercase tracking-[0.15em] text-ink/45">
                {p.tag}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-wide ${statusStyle[p.status]}`}
              >
                {t.tools.status[p.status]}
              </span>
            </div>
            <h3 className="display mt-5 text-[32px]">{p.name}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink/70">{p.desc}</p>
            <p className="mt-2 text-[14px] font-medium text-ink/45">{p.user}</p>
            <div className="mt-auto flex items-center gap-5 pt-7 text-[15px] font-medium">
              {p.status === "live" && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-canada hover:text-canada-dark"
                >
                  {t.tools[p.cta]} →
                </a>
              )}
              {p.repo && (
                <a
                  href={`https://github.com/Nshipyard/${p.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink/60 hover:text-ink"
                >
                  {t.tools.source} →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
