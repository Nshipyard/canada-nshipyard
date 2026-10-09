"use client";

import CiteShare, { type CiteLabels } from "../CiteShare";

const CARDS = {
  en: [
    {
      id: "camera-postmortem",
      kicker: "Toronto",
      name: "The Camera Post-Mortem",
      question: "Which Toronto traffic camera collected the most in fines?",
      body: "Toronto's speed cameras issued 2,150,715 tickets between July 2020 and November 2025. Parkside Drive's camera alone issued 70,243 of them, the most of any speed site. Red-light cameras are the bigger story: 1,304,807 tickets since 2007, an exact $424.1M implied at the flat $325 fine, led by Bayview Ave/Truman Rd at $11.66M.",
      stat: "$424.1M",
      statLabel: "implied red-light fines since 2007 at $325 a ticket; Parkside Dr's speed camera issued 70,243 tickets",
      url: "https://cameras.canada.nshipyard.com",
      live: true,
      shareText:
        "The Camera Post-Mortem: every Toronto traffic camera ranked. $424.1M in implied red-light fines since 2007; Parkside Dr's speed camera issued 70,243 tickets.",
    },
    {
      id: "adoption-inversion",
      kicker: "Canada",
      name: "The Adoption Inversion",
      question: "Is Canada actually behind the US in AI adoption?",
      body: "No. On the one survey question both countries asked in nearly identical words, Canadian businesses were ahead in 2025: 12.2% vs 10.0% in the US. The American reading jumped to 17.3% in November 2025, but that came from the Census changing the question, not from real adoption. The 'Canada lags' narrative was built on mismatched numbers.",
      stat: "12.2% vs 10.0%",
      statLabel: "Canadian vs US businesses using AI in 2025, on the identically worded survey question",
      url: "https://adoption.canada.nshipyard.com",
      live: true,
      shareText:
        "The Adoption Inversion: on the one AI question both countries asked identically, Canada was ahead, 12.2% to 10.0%.",
    },
    {
      id: "landlord-index",
      kicker: "Toronto",
      name: "The Landlord Operator Index",
      question: "Which management companies run Toronto's worst-rated rental buildings?",
      body: "RentSafeTO audited every large rental building in Toronto, and the scores are now ranked by the company behind the building: 831 property-management companies, 3,593 buildings. 34 buildings rate red, 557 yellow. Greenwin Corp., the largest operator with 104 buildings, has zero red and averages 92.2. The ranking covers management companies, never legal owners.",
      stat: "831 companies",
      statLabel: "ranked from RentSafeTO's own audits; 34 buildings rate red, 557 yellow",
      url: "https://landlord.canada.nshipyard.com",
      live: true,
      shareText:
        "The Landlord Operator Index: 831 Toronto property-management companies ranked by RentSafeTO scores. 34 buildings rate red.",
    },
    {
      id: "dinesafe-chains",
      kicker: "Toronto",
      name: "DineSafe Chain Report Card",
      question: "Which restaurant chains fail food-safety inspections most?",
      body: "84 chains ranked by infraction rate per inspection, from Toronto Public Health's own DineSafe records. bb.q Chicken sits at the bottom with a 19.4% conditional-pass rate across 10 locations, against 6.7% citywide; Tim Hortons sits at 2.0% across 351 locations. A conditional pass means the infraction was corrected within 48 hours, not an ongoing hazard.",
      stat: "19.4% vs 2.0%",
      statLabel: "conditional-pass rate: bb.q Chicken (10 locations) vs Tim Hortons (351 locations); 6.7% citywide",
      url: "https://dinesafe.canada.nshipyard.com",
      live: false,
      shareText:
        "DineSafe Chain Report Card: 84 restaurant chains ranked by food-safety infraction rates. bb.q Chicken 19.4%, Tim Hortons 2.0%.",
    },
  ],
  fr: [
    {
      id: "camera-postmortem",
      kicker: "Toronto",
      name: "Le bilan des caméras",
      question: "Quelle caméra de Toronto a rapporté le plus en amendes ?",
      body: "Les caméras de vitesse de Toronto ont émis 2 150 715 contraventions entre juillet 2020 et novembre 2025. Celle de Parkside Drive en a émis 70 243 à elle seule, le record. Les caméras aux feux rouges racontent une histoire plus grande : 1 304 807 contraventions depuis 2007, soit 424,1 M$ implicites à l'amende fixe de 325 $, menées par Bayview Ave/Truman Rd à 11,66 M$.",
      stat: "424,1 M$",
      statLabel:
        "d'amendes implicites aux feux rouges depuis 2007, à 325 $ la contravention ; la caméra de Parkside Dr a émis 70 243 contraventions",
      url: "https://cameras.canada.nshipyard.com",
      live: true,
      shareText:
        "Le bilan des caméras : chaque caméra de Toronto classée. 424,1 M$ d'amendes implicites aux feux rouges depuis 2007 ; 70 243 contraventions pour la caméra de Parkside Dr.",
    },
    {
      id: "adoption-inversion",
      kicker: "Canada",
      name: "L'inversion de l'adoption",
      question: "Le Canada est-il vraiment derrière les États-Unis dans l'adoption de l'IA ?",
      body: "Non. Sur la seule question d'enquête formulée à l'identique des deux côtés de la frontière, les entreprises canadiennes devançaient en 2025 : 12,2 % contre 10,0 % aux États-Unis. La lecture américaine a bondi à 17,3 % en novembre 2025, mais le Bureau du recensement avait changé la question, pas l'adoption réelle. Le récit du « retard canadien » reposait sur des chiffres incomparables.",
      stat: "12,2 % contre 10,0 %",
      statLabel:
        "d'entreprises canadiennes contre américaines utilisant l'IA en 2025, sur la question formulée à l'identique",
      url: "https://adoption.canada.nshipyard.com",
      live: true,
      shareText:
        "L'inversion de l'adoption : sur la seule question IA posée à l'identique, le Canada devançait, 12,2 % contre 10,0 %.",
    },
    {
      id: "landlord-index",
      kicker: "Toronto",
      name: "L'indice des gestionnaires d'immeubles",
      question: "Quelles sociétés de gestion gèrent les immeubles locatifs les moins bien notés de Toronto ?",
      body: "RentSafeTO a audité chaque grand immeuble locatif de Toronto, et les scores sont désormais classés par société de gestion : 831 sociétés, 3 593 immeubles. 34 immeubles au rouge, 557 au jaune. Greenwin Corp., le plus grand exploitant avec 104 immeubles, n'a aucun rouge et affiche 92,2 de moyenne. Le classement porte sur les sociétés de gestion, jamais sur les propriétaires légaux.",
      stat: "831 sociétés",
      statLabel: "classées à partir des audits de RentSafeTO ; 34 immeubles au rouge, 557 au jaune",
      url: "https://landlord.canada.nshipyard.com",
      live: true,
      shareText:
        "L'indice des gestionnaires d'immeubles : 831 sociétés de gestion torontoises classées par scores RentSafeTO. 34 immeubles au rouge.",
    },
    {
      id: "dinesafe-chains",
      kicker: "Toronto",
      name: "Bulletin DineSafe des chaînes",
      question: "Quelles chaînes de restaurants échouent le plus aux inspections sanitaires ?",
      body: "84 chaînes classées par taux d'infractions par inspection, d'après les propres dossiers DineSafe de Toronto Public Health. bb.q Chicken ferme la marche avec 19,4 % de mentions conditionnelles sur 10 emplacements, contre 6,7 % à l'échelle de la ville ; Tim Hortons affiche 2,0 % sur 351 emplacements. Une mention conditionnelle signifie que l'infraction a été corrigée dans les 48 heures, pas un danger persistant.",
      stat: "19,4 % contre 2,0 %",
      statLabel:
        "de mentions conditionnelles : bb.q Chicken (10 emplacements) contre Tim Hortons (351 emplacements) ; 6,7 % à l'échelle de la ville",
      url: "https://dinesafe.canada.nshipyard.com",
      live: false,
      shareText:
        "Bulletin DineSafe des chaînes : 84 chaînes de restaurants classées par taux d'infractions. bb.q Chicken 19,4 %, Tim Hortons 2,0 %.",
    },
  ],
};

export default function NewQuestionsCases({ labels, lang }: { labels: CiteLabels & { howWeKnow: string }; lang: "en" | "fr" }) {
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
