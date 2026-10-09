"use client";

import { useLang } from "@/i18n";
import { storiesEn, storiesFr } from "@/showcase-stories";
import StoryCard, { type StoryLabels } from "./StoryCard";

export default function ShowcasePage() {
  const { lang, t } = useLang();
  const stories = lang === "fr" ? storiesFr : storiesEn;
  const s = t.storiesPage;
  const labels: StoryLabels = {
    howWeKnow: s.howWeKnow,
    cite: s.cite,
    copy: s.copy,
    copied: s.copied,
    share: s.share,
    copyLink: s.copyLink,
    exploreProject: s.exploreProject,
    storyNoun: s.storyNoun,
  };

  return (
    <main>
      <section className="mx-auto max-w-[1392px] px-6 pb-10 pt-16 text-center md:pt-24">
        <div className="mx-auto max-w-[760px]">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">{s.kicker}</p>
          <h1 className="display text-[clamp(38px,6vw,72px)] leading-[1.05]">{s.title}</h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-relaxed text-ink/65">{s.sub}</p>
        </div>
      </section>

      <nav aria-label={s.indexTitle} className="mx-auto max-w-[880px] px-6 pb-4">
        <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/45">{s.indexTitle}</p>
        <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {stories.map((st, i) => (
            <li key={st.slug}>
              <a
                href={`#${st.slug}`}
                className="flex items-baseline gap-3 rounded-2xl border border-line px-4 py-3 transition hover:border-canada/50 hover:bg-paper-warm"
              >
                <span className="font-mono text-[13px] font-semibold text-canada">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[14.5px] font-medium leading-snug text-ink/80">{st.question}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mx-auto max-w-[1392px] px-6">
        {stories.map((st, i) => (
          <StoryCard key={st.slug} story={st} index={i} total={stories.length} labels={labels} lang={lang} />
        ))}
      </div>

      <section className="mx-auto max-w-[880px] px-6 pb-24 pt-4 text-center">
        <p className="text-[15px] leading-relaxed text-ink/55">{s.footer}</p>
      </section>
    </main>
  );
}
