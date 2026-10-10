"use client";

import { useState } from "react";
import { useLang } from "@/i18n";

const methodOrder = [
  "normalization",
  "dedup",
  "entity-resolution",
  "geocoding",
  "spatial-join",
  "crosswalk",
  "codebook",
  "quarantine",
  "reprojection",
] as const;

type MethodId = (typeof methodOrder)[number];

export default function DataFixesPage() {
  const { t } = useLang();
  const df = t.dataFixes;
  const [active, setActive] = useState<"all" | MethodId>("all");

  const entries = df.entries.filter(
    (e) => active === "all" || (e.methods as string[]).includes(active)
  );

  const methodInfo = (id: string) =>
    (df.methods as Record<string, { label: string; desc: string }>)[id];

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-[1392px] px-6 pb-10 pt-16 md:pt-24">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">
            {df.kicker}
          </p>
          <h1 className="display text-[clamp(36px,5vw,60px)] leading-[1.05]">{df.title}</h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-relaxed text-ink/65">
            {df.body}
          </p>
        </div>

        {/* Stats band */}
        <div className="mx-auto mt-12 grid max-w-[1200px] grid-cols-2 gap-4 md:grid-cols-5">
          {df.stats.map((s) => (
            <div
              key={s.value}
              className="rounded-[24px] border border-line bg-paper-warm p-5 text-center"
            >
              <p className="display text-[30px] text-canada md:text-[34px]">{s.value}</p>
              <p className="mt-2 text-[13px] leading-snug text-ink/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Method filter */}
      <section className="mx-auto max-w-[1392px] px-6 pb-4">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-ink/45">
            {df.filterLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActive("all")}
              className={`rounded-full px-4 py-2 text-[14px] font-medium transition ${
                active === "all"
                  ? "bg-ink text-white"
                  : "border border-line text-ink/70 hover:border-ink/40"
              }`}
            >
              {df.allMethods}
            </button>
            {methodOrder.map((id) => (
              <button
                key={id}
                title={methodInfo(id).desc}
                onClick={() => setActive(active === id ? "all" : id)}
                className={`rounded-full px-4 py-2 text-[14px] font-medium transition ${
                  active === id
                    ? "bg-canada text-white"
                    : "border border-line text-ink/70 hover:border-ink/40"
                }`}
              >
                {methodInfo(id).label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Entries */}
      <section className="mx-auto max-w-[1392px] px-6 py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
          {entries.map((e) => (
            <article
              key={e.id}
              className="rounded-[40px] border border-line bg-paper p-8 md:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[13px] font-medium uppercase tracking-[0.15em] text-ink/45">
                  {e.tag}
                </span>
                <div className="flex flex-wrap gap-2">
                  {(e.methods as string[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setActive(m as MethodId)}
                      title={methodInfo(m).desc}
                      className="rounded-full bg-muted px-3 py-1 text-[12px] font-semibold text-ink/70 transition hover:bg-canada hover:text-white"
                    >
                      {methodInfo(m).label}
                    </button>
                  ))}
                </div>
              </div>

              <h2 className="display mt-4 text-[30px] md:text-[36px]">{e.name}</h2>
              <p className="mt-2 text-[15px] text-ink/60">{e.dataset}</p>
              <p className="mt-1 text-[13px] font-medium uppercase tracking-wide text-ink/40">
                {e.vintage}
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-[14px] font-semibold uppercase tracking-[0.15em] text-canada">
                    {df.wrongTitle}
                  </h3>
                  <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-ink/75">
                    {e.problems.map((p, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-canada" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold uppercase tracking-[0.15em] text-green-700">
                    {df.fixTitle}
                  </h3>
                  <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-ink/75">
                    {e.fixes.map((f, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-6 rounded-[20px] bg-muted p-5 text-[15px] leading-relaxed text-ink/80">
                <span className="font-semibold text-ink">{df.resultLabel}: </span>
                {e.result}
              </p>

              {/* Visual diff */}
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.15em]">
                  <span className="text-red-700/80">{"\u2212"} {df.rawLabel}</span>
                  <span className="text-green-700/80">{"+"} {df.cleanedLabel}</span>
                </div>
                <div className="space-y-2.5">
                  {e.diffs.map((d, i) => (
                    <div key={i} className="grid items-stretch gap-2 md:grid-cols-[1fr_32px_1fr]">
                      <div className="rounded-2xl border border-red-200/70 bg-red-50/60 p-4">
                        <p className="font-mono text-[13.5px] leading-relaxed text-red-900/90">
                          {d.before}
                        </p>
                      </div>
                      <div className="flex items-center justify-center text-[18px] text-ink/35">
                        {"\u2192"}
                      </div>
                      <div className="rounded-2xl border border-green-200/70 bg-green-50/70 p-4">
                        <p className="font-mono text-[13.5px] leading-relaxed text-green-900/90">
                          {d.after}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-5 text-[15px] font-medium">
                <a
                  href={e.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-canada hover:text-canada-dark"
                >
                  {df.explore} {"\u2192"}
                </a>
                <a
                  href={`https://github.com/Nshipyard/${e.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink/60 hover:text-ink"
                >
                  {df.source} {"\u2192"}
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-[1200px] text-center text-[14px] text-ink/50">
          {df.repoNote}
        </p>
      </section>

      {/* Government contact */}
      <section className="mx-auto max-w-[1392px] px-6 pb-20 pt-6 md:pb-28">
        <div className="mx-auto max-w-[1200px] rounded-[40px] bg-ink p-8 text-white md:p-14">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/60">
            {df.contact.kicker}
          </p>
          <h2 className="display max-w-[640px] text-[clamp(28px,3.6vw,44px)] leading-[1.1]">
            {df.contact.title}
          </h2>
          <p className="mt-5 max-w-[620px] text-[16px] leading-relaxed text-white/70">
            {df.contact.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://github.com/Nshipyard"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-canada px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-canada-dark"
            >
              {df.contact.github}
            </a>
            <a
              href="https://x.com/richardsondx"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/30 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:border-white/70"
            >
              {df.contact.x}
            </a>
          </div>
          <p className="mt-6 text-[14px] text-white/50">{df.contact.note}</p>
        </div>
      </section>
    </main>
  );
}
