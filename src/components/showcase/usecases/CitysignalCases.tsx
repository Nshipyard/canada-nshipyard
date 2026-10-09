"use client";

import CiteShare, { type CiteLabels } from "../CiteShare";

const CARDS = {
  en: [
    {
      id: "citysignal-api",
      kicker: "Toronto",
      name: "citysignal",
      question: "What if every city dataset came with a clean API?",
      body: "citysignal, a municipal open-data normalization API, takes Toronto's 202,779 active building permits, published with 31 inconsistent CKAN fields, and serves them through 8 documented fields: id, address, ward, category, status, applied date, description, and source. Every response carries its provenance, so you always know what the numbers are and where they came from. Permits are the reference city and the reference dataset; 311 requests and business licences are next.",
      stat: "31 → 8",
      statLabel: "messy CKAN fields normalized into one documented schema, with provenance on every response",
      url: "https://city.nshipyard.com",
      shareText: "citysignal: Toronto's 202,779 building permits normalized from 31 messy fields into 8 clean ones, behind one documented API.",
    },
  ],
  fr: [
    {
      id: "citysignal-api",
      kicker: "Toronto",
      name: "citysignal",
      question: "Et si chaque jeu de données municipal venait avec une API propre ?",
      body: "citysignal, une API de normalisation des données municipales ouvertes, prend les 202 779 permis de construire actifs de Toronto, publiés avec 31 champs CKAN disparates, et les sert à travers 8 champs documentés : identifiant, adresse, quartier, catégorie, statut, date de demande, description et source. Chaque réponse porte sa provenance, pour toujours savoir ce que les chiffres sont et d'où ils viennent. Les permis sont la ville et le jeu de données de référence ; les requêtes 311 et les permis d'entreprise suivront.",
      stat: "31 → 8",
      statLabel: "champs CKAN disparates normalisés en un schéma documenté, avec provenance sur chaque réponse",
      url: "https://city.nshipyard.com",
      shareText: "citysignal : les 202 779 permis de construire de Toronto normalisés de 31 champs disparates en 8 champs propres, derrière une API documentée.",
    },
  ],
};

export default function CitysignalCases({ labels, lang }: { labels: CiteLabels & { howWeKnow: string }; lang: "en" | "fr" }) {
  const cards = CARDS[lang];
  return (
    <>
      {cards.map((c) => (
        <article key={c.id} id={c.id} className="scroll-mt-24 border-t border-line py-12 md:py-16">
          <div className="mx-auto max-w-[880px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">{c.kicker}</p>
            <h2 className="display mt-4 text-[clamp(28px,4vw,46px)] leading-[1.08]">{c.question}</h2>

            <div className="mt-8 rounded-[28px] bg-ink px-7 py-8 text-white md:px-10">
              <p className="display text-[clamp(40px,6vw,72px)] leading-none text-white">{c.stat}</p>
              <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-white/70">{c.statLabel}</p>
            </div>

            <p className="mt-8 text-[16.5px] leading-relaxed text-ink/80">{c.body}</p>

            <div className="mt-8">
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-canada px-8 py-4 text-[16px] font-medium text-white transition hover:bg-canada-dark"
              >
                {lang === "fr" ? `Ouvrir ${c.name} →` : `Open ${c.name} →`}
              </a>
              <p className="mt-3 font-mono text-[13px] text-ink/50">{c.url.replace("https://", "")}</p>
            </div>

            <div className="mt-8">
              <CiteShare
                id={c.id}
                title={c.question}
                shareText={c.shareText}
                projectUrl={c.url}
                projectName={c.name}
                labels={labels}
                lang={lang}
              />
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
