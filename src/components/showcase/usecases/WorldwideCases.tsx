"use client";

import CiteShare, { type CiteLabels } from "../CiteShare";

const CARDS = {
  en: [
    {
      id: "earthquery",
      kicker: "Worldwide",
      name: "earthquery",
      question: "Ask the planet a question, get a map.",
      body: "earthquery, a natural-language search engine over satellite imagery, turns a sentence like “solar farms in deserts” into an embedding vector and ranks every tile in a planetary index against it. No GIS syntax, no bounding-box math. The same ranking ships as JSON, so AI agents can skip the interface entirely.",
      stat: "Planet-scale",
      statLabel: "natural-language search over satellite imagery embeddings",
      url: "https://earthquery.nshipyard.com",
      live: true,
      shareText: "earthquery: ask the planet a question, get a map. Natural-language search over satellite imagery.",
    },
    {
      id: "cyclonewatch",
      kicker: "Worldwide",
      name: "CycloneWatch",
      question: "Is a cyclone heading for your port?",
      body: "CycloneWatch, a live tropical cyclone risk service, turns official hurricane forecasts into transparent 0-100 risk scores for ports, vessels, and any latitude/longitude on Earth, with the math shown for every score. It reads live NOAA hurricane data with a labeled demo replay fallback.",
      stat: "0–100",
      statLabel: "transparent cyclone risk scores from official forecasts",
      url: "https://cyclonewatch.nshipyard.com",
      live: true,
      shareText: "CycloneWatch: live tropical cyclone risk scores for ports and vessels, with the math shown.",
    },
    {
      id: "hazardlens",
      kicker: "Worldwide",
      name: "hazardlens",
      question: "Which disasters never make the dataset?",
      body: "hazardlens, a hazard data factory, turns global news into a structured, queryable open dataset of under-observed hazard events, starting with landslides. Every event carries its article provenance and extraction method, so the data is auditable instead of a black box. Landslides are the reference hazard; floods, wildfires, and earthquakes are next.",
      stat: "News → data",
      statLabel: "global news coverage converted into structured hazard events with full provenance",
      url: "https://hazards.nshipyard.com",
      live: false,
      shareText: "hazardlens: global news turned into a structured open dataset of under-observed hazard events, starting with landslides.",
    },
  ],
  fr: [
    {
      id: "earthquery",
      kicker: "Monde",
      name: "earthquery",
      question: "Posez une question à la planète, obtenez une carte.",
      body: "earthquery, un moteur de recherche en langage naturel sur l'imagerie satellite, transforme une phrase comme « solar farms in deserts » en vecteur et classe chaque tuile d'un index planétaire. Sans syntaxe SIG, sans calcul de cadre. Le même classement est offert en JSON, pour que les agents IA sautent l'interface.",
      stat: "Échelle planétaire",
      statLabel: "recherche en langage naturel sur l'imagerie satellite",
      url: "https://earthquery.nshipyard.com",
      live: true,
      shareText: "earthquery : posez une question à la planète, obtenez une carte. Recherche en langage naturel sur l'imagerie satellite.",
    },
    {
      id: "cyclonewatch",
      kicker: "Monde",
      name: "CycloneWatch",
      question: "Un cyclone se dirige-t-il vers votre port ?",
      body: "CycloneWatch, un service de risque cyclonique en direct, transforme les prévisions officielles d'ouragans en scores de risque transparents de 0 à 100 pour les ports, les navires et n'importe quelle latitude/longitude, avec le calcul montré pour chaque score. Il lit les données d'ouragans de la NOAA en direct, avec une rediffusion de démonstration étiquetée en repli.",
      stat: "0–100",
      statLabel: "scores de risque cyclonique transparents issus des prévisions officielles",
      url: "https://cyclonewatch.nshipyard.com",
      live: true,
      shareText: "CycloneWatch : scores de risque cyclonique en direct pour les ports et navires, avec le calcul montré.",
    },
    {
      id: "hazardlens",
      kicker: "Monde",
      name: "hazardlens",
      question: "Quelles catastrophes n'entrent jamais dans les jeux de données ?",
      body: "hazardlens, une fabrique de données sur les aléas, transforme l'actualité mondiale en un jeu de données ouvert, structuré et interrogeable, sur les catastrophes sous-observées, à commencer par les glissements de terrain. Chaque événement porte la provenance de ses articles et sa méthode d'extraction, pour des données vérifiables plutôt qu'une boîte noire. Les glissements de terrain sont l'aléa de référence ; inondations, feux de forêt et séismes suivront.",
      stat: "Actualités → données",
      statLabel: "la couverture médiatique mondiale convertie en événements structurés, avec provenance complète",
      url: "https://hazards.nshipyard.com",
      live: false,
      shareText: "hazardlens : l'actualité mondiale transformée en jeu de données ouvert et structuré sur les catastrophes sous-observées, à commencer par les glissements de terrain.",
    },
  ],
};

export default function WorldwideCases({ labels, lang }: { labels: CiteLabels & { howWeKnow: string }; lang: "en" | "fr" }) {
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

            {c.live ? (
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
            ) : (
              <p className="mt-8 inline-block rounded-full bg-canada/10 px-6 py-3 text-[14px] font-semibold text-canada">
                {lang === "fr" ? "En construction" : "Building now"}
              </p>
            )}

            <div className="mt-8">
              <CiteShare
                id={c.id}
                title={c.question}
                shareText={c.shareText}
                projectUrl={c.url}
                projectName={c.name}
                projectLive={c.live}
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
