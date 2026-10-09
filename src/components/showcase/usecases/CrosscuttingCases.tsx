"use client";

import { useEffect, useMemo, useState } from "react";
import UseCaseCard, { type UseCase } from "../UseCaseCard";
import type { CiteLabels } from "../CiteShare";

const RED = "#d80621";
const INK = "#0a0f1e";

function fmt(n: number, lang: "en" | "fr") {
  return n.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA");
}
function pct(x: number, lang: "en" | "fr", digits = 1) {
  return (x * 100).toLocaleString(lang === "fr" ? "fr-CA" : "en-CA", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }) + "%";
}

const L = {
  en: {
    loading: "Loading cross-cutting data…",
    // card 1
    c1labels: { x: "Homes built", y: "Pre-1955 pipe share", avg: "City average: 33% pre-1955" },
    // card 2
    c2labels: { x: "Pre-1955 pipe share", y: "Water 311 requests per km of pipe" },
    // card 3
    c3labels: { perKm2: "tickets / km²", tickets: "tickets", densityNote: "Sorted by tickets per km². Density adjusts for ward size, not for curb supply." },
    // card 4
    c4labels: {
      ward: "Ward",
      backlogRate: "backlog rate",
      income: "median household income",
      topDivision: "division with most requests",
      divisionBacklog: "Backlog rate by division",
      open: "open",
      of: "of",
    },
    // card 5
    c5labels: {
      ward: "Ward",
      licences: "active licences",
      topSectors: "Top licence sectors",
      tickets: "parking tickets 2023-2025",
      ticketsSub: "foot-traffic and curb-activity proxy",
      projects: "pipeline projects",
      units: "proposed homes",
      projectsSub: "active + proposed",
    },
    // card 6
    c6labels: { x: "Active + proposed development projects", y: "Parking tickets 2023-2025" },
    // card 7
    c7labels: {
      spend: "city awards",
      awards: "contracts",
      missingTitle: "The missing field",
      vendorsNote: "Top construction vendors by city awards, 2012-2026.",
    },
  },
  fr: {
    loading: "Chargement des données croisées…",
    c1labels: { x: "Logements construits", y: "Part des conduites d'avant 1955", avg: "Moyenne municipale : 33 % d'avant 1955" },
    c2labels: { x: "Part des conduites d'avant 1955", y: "Requêtes 311 eau par km de conduite" },
    c3labels: { perKm2: "contraventions / km²", tickets: "contraventions", densityNote: "Trié par contraventions au km². La densité corrige la taille du quartier, pas l'offre de stationnement." },
    c4labels: {
      ward: "Quartier électoral",
      backlogRate: "taux d'arriéré",
      income: "revenu médian des ménages",
      topDivision: "division la plus demandée",
      divisionBacklog: "Taux d'arriéré par division",
      open: "ouvertes",
      of: "sur",
    },
    c5labels: {
      ward: "Quartier électoral",
      licences: "licences actives",
      topSectors: "Principaux secteurs de licences",
      tickets: "contraventions 2023-2025",
      ticketsSub: "indicateur d'achalandage et d'activité",
      projects: "projets du pipeline",
      units: "logements proposés",
      projectsSub: "actifs + proposés",
    },
    c6labels: { x: "Projets de développement actifs + proposés", y: "Contraventions 2023-2025" },
    c7labels: {
      spend: "contrats municipaux",
      awards: "contrats",
      missingTitle: "Le champ manquant",
      vendorsNote: "Principaux fournisseurs en construction par contrats municipaux, 2012-2026.",
    },
  },
} as const;

interface Copy {
  id: string;
  kicker: string;
  question: string;
  stat: string;
  statLabel: string;
  mechanism: string[];
  howWeKnow: string;
  shareText: string;
  projectUrl: string;
  projectName: string;
}

const COPY: Record<"en" | "fr", Copy[]> = {
  en: [
    {
      id: "growth-vs-pipes",
      kicker: "Pipeline × Watermains",
      question: "Are the neighbourhoods gaining the most homes sitting on the oldest pipes?",
      stat: "34% vs 33%",
      statLabel:
        "pre-1955 pipe share in the 10 fastest-growing neighbourhoods vs the citywide average. Growth is landing on pipes about as old as the city's, not older.",
      mechanism: [
        "Across 141 neighbourhoods, the correlation between homes gained and pre-1955 pipe share is r = 0.02, effectively zero: growth follows downtown land and zoning, not pipe vintage.",
        "The null result still matters. It rules out the scary story that new homes concentrate on the oldest infrastructure, while flagging exceptions like Wellington Place: 7,190 homes on 58% pre-1955 pipe.",
      ],
      howWeKnow:
        "Development Pipeline: 124,326 net homes in Built projects by neighbourhood; Watermain Codebook: 49,414 segments assigned to 158 neighbourhoods by midpoint, pre-1955 = construction year before 1955. Pre-1955 is an age proxy, never a lead measurement.",
      shareText:
        "Toronto's fastest-growing neighbourhoods sit on pipes about as old as the city average: 34% pre-1955 vs 33% citywide. The growth-vs-infrastructure question, answered with two open datasets.",
      projectUrl: "https://toronto-development-pipeline.vercel.app",
      projectName: "Development Pipeline",
    },
    {
      id: "pipes-vs-water311",
      kicker: "Watermains × 311",
      question: "Do older pipes mean more water complaints?",
      stat: "2.6×",
      statLabel:
        "water-related 311 requests per km of pipe in the three oldest-pipe wards vs the three newest (42.5 vs 16.4 per km). Correlation r = 0.91 across 25 wards.",
      mechanism: [
        "Wards where 78-79% of pipe predates 1955 (Toronto-St. Paul's, Beaches-East York, Toronto-Danforth) report the most water requests per kilometre of main; wards under 4% pre-1955 (Scarborough North, Don Valley North) report the fewest.",
        "Age is not the whole story: dense inner-city wards also have more service connections per kilometre of main, which raises request counts independent of pipe condition. The correlation validates the age proxy as a planning signal, not a diagnosis.",
      ],
      howWeKnow:
        "Watermain Codebook: 49,414 segments assigned to 25 wards by midpoint; 311 Taxonomy: Toronto Water division request counts by ward, 2022-2026. Ward-level correlation; not proof of causation at the pipe level.",
      shareText:
        "Toronto wards with the oldest pipes report 2.6x more water-related 311 requests per km of pipe. The pipe-age proxy, validated with real break data.",
      projectUrl: "https://toronto-watermain-codebook.vercel.app",
      projectName: "Watermain Codebook",
    },
    {
      id: "enforcement-density",
      kicker: "Parking × Wards",
      question: "Where does parking enforcement fall hardest?",
      stat: "98,623",
      statLabel:
        "tickets per km² in Toronto Centre, 2023-2025. By raw count Spadina-Fort York leads with 811,816 tickets, but density shows where a parked car is most likely to be ticketed.",
      mechanism: [
        "Enforcement follows curb demand: downtown wards pack meters, rush-hour routes, and private-property complaints into a few square kilometres.",
        "Density is still a partial normalization. It adjusts for ward size but not for curb supply or traffic volume, which the city does not publish.",
      ],
      howWeKnow:
        "Parking Tickets Geocoded: 5,606,483 geocoded tickets by ward, 2023-2025; ward areas computed from ward polygons. Ranking by tickets per km².",
      shareText:
        "Toronto Centre sees 98,623 parking tickets per km². Raw counts say Spadina-Fort York; density tells the real enforcement story.",
      projectUrl: "https://toronto-parking-tickets-geocoded.vercel.app",
      projectName: "Parking Tickets",
    },
    {
      id: "service-wait",
      kicker: "311 × Divisions",
      question: "Which city services keep you waiting longest?",
      stat: "44.6%",
      statLabel:
        "of Parks requests from 2022-2024 were still open in Oct 2026. Solid Waste: 0.8%. The backlog is a priority choice, not a capacity problem.",
      mechanism: [
        "Parks left 43,747 requests open against a 98,077 base; Solid Waste cleared all but 3,568 of 438,442. Same city, same years, fifty-fold difference in follow-through.",
        "Backlog is a proxy: the source publishes no completion dates, so requests from 2022-2024 still marked New or In Progress stand in for the queue.",
      ],
      howWeKnow:
        "311 Taxonomy: 2,225,151 requests 2022-2026; backlog = 2022-2024 requests still open in the Oct 2026 extract, by division and ward.",
      shareText:
        "44.6% of Toronto Parks 311 requests sit open vs 0.8% for Solid Waste. The backlog is a priority choice, not a capacity problem.",
      projectUrl: "https://toronto-311-taxonomy.vercel.app",
      projectName: "311 Taxonomy",
    },
    {
      id: "open-business",
      kicker: "Licences × Activity × Growth",
      question: "Where should you open a business?",
      stat: "2,763",
      statLabel:
        "active licences in Spadina-Fort York (ward 10), the city leader. Pick a ward to see its licence mix, foot-traffic proxy, and incoming housing.",
      mechanism: [
        "Licences reveal demand: food services are 43% of active licences citywide, but the mix shifts ward by ward, and 5,424 licences carry no ward and are excluded.",
        "Parking tickets proxy foot traffic and curb activity; pipeline projects show where future customers are moving in. No single dataset answers the location question; the three together do.",
      ],
      howWeKnow:
        "Licence NAICS: 37,469 active licences joined to NAICS sectors by ward; Parking Tickets Geocoded: tickets by ward 2023-2025; Development Pipeline: active and proposed projects by ward.",
      shareText:
        "Where should you open a business in Toronto? Licence mix, foot-traffic proxy, and incoming housing, ward by ward, from three open datasets.",
      projectUrl: "https://toronto-licence-naics.vercel.app",
      projectName: "Licence NAICS",
    },
    {
      id: "construction-tickets",
      kicker: "Development × Parking",
      question: "Do construction zones get more tickets?",
      stat: "r = 0.54",
      statLabel:
        "neighbourhood-level correlation between active development projects and parking tickets. Positive, but both concentrate downtown, so this is correlation with a named confounder, not proof that construction causes tickets.",
      mechanism: [
        "Neighbourhoods like Wellington Place (47 active projects, 218,386 tickets) sit high on both axes, consistent with construction displacing parking supply.",
        "A street-level causal test would need project dates matched to ticket timestamps; the open files give locations, not timelines. Until then, the honest claim is correlation.",
      ],
      howWeKnow:
        "Development Pipeline: active and proposed projects by 158 neighbourhood; Parking Tickets Geocoded: tickets by 158 neighbourhood, 2023-2025. Neighbourhood-level correlation.",
      shareText:
        "Neighbourhoods with more active construction see more parking tickets (r = 0.54). Correlation with a named confounder, presented honestly.",
      projectUrl: "https://toronto-parking-tickets-geocoded.vercel.app",
      projectName: "Parking Tickets",
    },
    {
      id: "builders-vs-vendors",
      kicker: "Procurement × Development",
      question: "Who builds the city vs who does the city pay?",
      stat: "$781.7M",
      statLabel:
        "Furfari Paving's city awards across 58 contracts, the top construction vendor. But the development pipeline file publishes no builder names, so vendor-to-builder matching is impossible from open data today.",
      mechanism: [
        "The procurement side is solved: 4,082 canonical vendors, $21.5B in awards, 577 of them in construction. The pipeline side lists 2,391 projects with addresses and unit counts but no builder or developer field.",
        "Publishing the builder on each development application would unlock the join: which firms win city contracts and build its housing, and whether the two lists overlap.",
      ],
      howWeKnow:
        "Procurement Spending: 4,082 canonical vendors, top construction vendors by spend 2012-2026; Development Pipeline: 2,391 projects. Entity match not performed: pipeline.csv carries no builder names.",
      shareText:
        "Toronto knows exactly who it pays ($21.5B, 4,082 vendors) but publishes no builder names on development applications. The join that open data cannot do yet.",
      projectUrl: "https://toronto-procurement-spending.vercel.app",
      projectName: "Procurement Spending",
    },
  ],
  fr: [
    {
      id: "growth-vs-pipes",
      kicker: "Pipeline × Conduites",
      question: "Les quartiers qui gagnent le plus de logements reposent-ils sur les conduites les plus anciennes ?",
      stat: "34 % contre 33 %",
      statLabel:
        "part des conduites d'avant 1955 dans les 10 quartiers à plus forte croissance, contre la moyenne municipale. La croissance arrive sur des conduites à peu près aussi âgées que la moyenne.",
      mechanism: [
        "Sur 141 quartiers, la corrélation entre logements gagnés et part des conduites d'avant 1955 est de r = 0,02, soit zéro : la croissance suit les terrains et le zonage du centre-ville, pas l'âge des conduites.",
        "Ce résultat nul compte quand même. Il écarte l'idée que les nouveaux logements se concentrent sur les infrastructures les plus anciennes, tout en signalant des exceptions comme Wellington Place : 7 190 logements sur 58 % de conduites d'avant 1955.",
      ],
      howWeKnow:
        "Pipeline de développement : 124 326 logements nets dans les projets marqués construits, par quartier; Registre des conduites : 49 414 segments assignés à 158 quartiers par leur point médian, avant 1955 = année de construction antérieure à 1955. Avant 1955 est un indicateur d'âge, jamais une mesure du plomb.",
      shareText:
        "Les quartiers torontois à plus forte croissance reposent sur des conduites à peu près aussi âgées que la moyenne : 34 % d'avant 1955 contre 33 %. La question croissance-infrastructures, tranchée avec deux jeux de données ouverts.",
      projectUrl: "https://toronto-development-pipeline.vercel.app",
      projectName: "Pipeline de développement",
    },
    {
      id: "pipes-vs-water311",
      kicker: "Conduites × 311",
      question: "Des conduites plus anciennes signifient-elles plus de plaintes liées à l'eau ?",
      stat: "2,6×",
      statLabel:
        "requêtes 311 liées à l'eau par km de conduite dans les trois quartiers électoraux aux conduites les plus anciennes, contre les trois plus récents (42,5 contre 16,4 par km). Corrélation r = 0,91 sur 25 quartiers.",
      mechanism: [
        "Les quartiers où 78 à 79 % des conduites datent d'avant 1955 (Toronto-St. Paul's, Beaches-East York, Toronto-Danforth) déclarent le plus de requêtes eau par kilomètre; ceux sous 4 % (Scarborough North, Don Valley North) en déclarent le moins.",
        "L'âge n'explique pas tout : les quartiers denses du centre ont aussi plus de branchements par kilomètre, ce qui gonfle les requêtes indépendamment de l'état des conduites. La corrélation valide l'indicateur d'âge comme signal de planification, pas comme diagnostic.",
      ],
      howWeKnow:
        "Registre des conduites : 49 414 segments assignés à 25 quartiers par leur point médian; Taxonomie 311 : requêtes de la division Toronto Water par quartier, 2022-2026. Corrélation à l'échelle du quartier, pas une preuve causale à la conduite.",
      shareText:
        "Les quartiers torontois aux conduites les plus anciennes déclarent 2,6 fois plus de requêtes 311 liées à l'eau par km. L'indicateur d'âge, validé avec de vraies données de bris.",
      projectUrl: "https://toronto-watermain-codebook.vercel.app",
      projectName: "Registre des conduites",
    },
    {
      id: "enforcement-density",
      kicker: "Stationnement × Quartiers",
      question: "Où l'application du stationnement frappe-t-elle le plus fort ?",
      stat: "98 623",
      statLabel:
        "contraventions par km² à Toronto Centre, 2023-2025. En nombre brut, Spadina-Fort York mène avec 811 816 contraventions, mais la densité montre où une voiture stationnée risque le plus d'être verbalisée.",
      mechanism: [
        "L'application suit la demande de trottoir : les quartiers du centre concentrent parcomètres, axes aux heures de pointe et plaintes sur terrains privés sur quelques kilomètres carrés.",
        "La densité reste une normalisation partielle. Elle corrige la taille du quartier, mais pas l'offre de stationnement ni le volume de circulation, que la Ville ne publie pas.",
      ],
      howWeKnow:
        "Contraventions géocodées : 5 606 483 contraventions par quartier, 2023-2025; superficies calculées depuis les polygones des quartiers. Classement par contraventions au km².",
      shareText:
        "Toronto Centre compte 98 623 contraventions de stationnement par km². Les chiffres bruts disent Spadina-Fort York; la densité raconte la vraie histoire.",
      projectUrl: "https://toronto-parking-tickets-geocoded.vercel.app",
      projectName: "Contraventions",
    },
    {
      id: "service-wait",
      kicker: "311 × Divisions",
      question: "Quels services municipaux vous font attendre le plus longtemps ?",
      stat: "44,6 %",
      statLabel:
        "des requêtes Parcs de 2022-2024 étaient encore ouvertes en oct. 2026. Déchets solides : 0,8 %. L'arriéré est un choix de priorités, pas un problème de capacité.",
      mechanism: [
        "Parcs a laissé 43 747 requêtes ouvertes sur une base de 98 077; les Déchets solides n'en ont laissé que 3 568 sur 438 442. Même ville, mêmes années, un suivi cinquante fois différent.",
        "L'arriéré est un indicateur indirect : la source ne publie pas de dates d'achèvement, donc les requêtes de 2022-2024 encore marquées Nouvelles ou En cours servent d'approximation.",
      ],
      howWeKnow:
        "Taxonomie 311 : 2 225 151 requêtes 2022-2026; arriéré = requêtes 2022-2024 encore ouvertes dans l'extrait d'oct. 2026, par division et quartier.",
      shareText:
        "44,6 % des requêtes 311 Parcs de Toronto restent ouvertes contre 0,8 % pour les Déchets solides. L'arriéré est un choix de priorités, pas un problème de capacité.",
      projectUrl: "https://toronto-311-taxonomy.vercel.app",
      projectName: "Taxonomie 311",
    },
    {
      id: "open-business",
      kicker: "Licences × Activité × Croissance",
      question: "Où devriez-vous ouvrir un commerce ?",
      stat: "2 763",
      statLabel:
        "licences actives à Spadina-Fort York (quartier 10), le meneur municipal. Choisissez un quartier pour voir son mélange de licences, son achalandage et ses logements à venir.",
      mechanism: [
        "Les licences révèlent la demande : la restauration représente 43 % des licences actives dans la ville, mais le mélange varie par quartier, et 5 424 licences sans quartier sont exclues.",
        "Les contraventions servent d'indicateur d'achalandage et d'activité au trottoir; les projets du pipeline montrent où les futurs clients emménagent. Aucun jeu de données ne répond seul à la question d'emplacement; les trois ensemble oui.",
      ],
      howWeKnow:
        "SCIAN des licences : 37 469 licences actives jointes aux secteurs SCIAN par quartier; Contraventions géocodées : contraventions par quartier 2023-2025; Pipeline : projets actifs et proposés par quartier.",
      shareText:
        "Où ouvrir un commerce à Toronto ? Mélange de licences, indicateur d'achalandage et logements à venir, quartier par quartier, depuis trois jeux de données ouverts.",
      projectUrl: "https://toronto-licence-naics.vercel.app",
      projectName: "Permis SCIAN",
    },
    {
      id: "construction-tickets",
      kicker: "Développement × Stationnement",
      question: "Les zones de construction reçoivent-elles plus de contraventions ?",
      stat: "r = 0,54",
      statLabel:
        "corrélation à l'échelle du quartier entre projets de développement actifs et contraventions de stationnement. Positive, mais les deux se concentrent au centre-ville : c'est une corrélation avec un facteur confondant nommé, pas une preuve.",
      mechanism: [
        "Des quartiers comme Wellington Place (47 projets actifs, 218 386 contraventions) sont élevés sur les deux axes, ce qui cadre avec l'idée que la construction déplace l'offre de stationnement.",
        "Un test causal à la rue exigerait de croiser les dates des projets avec les horodatages des contraventions; les fichiers ouverts donnent des lieux, pas des chronologies. D'ici là, l'affirmation honnête est la corrélation.",
      ],
      howWeKnow:
        "Pipeline de développement : projets actifs et proposés par 158 quartiers; Contraventions géocodées : contraventions par 158 quartiers, 2023-2025. Corrélation à l'échelle du quartier.",
      shareText:
        "Les quartiers avec plus de construction active reçoivent plus de contraventions (r = 0,54). Une corrélation avec facteur confondant nommé, présentée honnêtement.",
      projectUrl: "https://toronto-parking-tickets-geocoded.vercel.app",
      projectName: "Contraventions",
    },
    {
      id: "builders-vs-vendors",
      kicker: "Approvisionnement × Développement",
      question: "Qui construit la ville contre qui la ville paie-t-elle ?",
      stat: "781,7 M$",
      statLabel:
        "contrats municipaux de Furfari Paving sur 58 contrats, premier fournisseur en construction. Mais le fichier du pipeline ne publie aucun nom de constructeur : le rapprochement est impossible depuis les données ouvertes actuelles.",
      mechanism: [
        "Le côté approvisionnement est résolu : 4 082 fournisseurs canoniques, 21,5 G$ en contrats, 577 en construction. Le côté pipeline liste 2 391 projets avec adresses et logements, mais aucun champ constructeur ou promoteur.",
        "Publier le constructeur sur chaque demande d'aménagement débloquerait la jointure : quelles entreprises gagnent les contrats municipaux et construisent ses logements, et si les deux listes se recoupent.",
      ],
      howWeKnow:
        "Dépenses d'approvisionnement : 4 082 fournisseurs canoniques, principaux fournisseurs en construction 2012-2026; Pipeline : 2 391 projets. Rapprochement non effectué : pipeline.csv ne contient aucun nom de constructeur.",
      shareText:
        "Toronto sait exactement qui elle paie (21,5 G$, 4 082 fournisseurs) mais ne publie aucun nom de constructeur sur les demandes d'aménagement. La jointure que les données ouvertes ne permettent pas encore.",
      projectUrl: "https://toronto-procurement-spending.vercel.app",
      projectName: "Dépenses d'approvisionnement",
    },
  ],
};

/* ---------- small SVG helpers ---------- */

function Scatter({
  points,
  xLabel,
  yLabel,
  lang,
  highlight,
  xFmt,
  yFmt,
}: {
  points: { x: number; y: number; label: string }[];
  xLabel: string;
  yLabel: string;
  lang: "en" | "fr";
  highlight?: (p: { x: number; y: number; label: string }) => boolean;
  xFmt: (v: number, lang: "en" | "fr") => string;
  yFmt: (v: number, lang: "en" | "fr") => string;
}) {
  const W = 760, H = 300, P = { l: 56, r: 16, t: 16, b: 44 };
  const xs = points.map((p) => p.x), ys = points.map((p) => p.y);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = 0, y1 = Math.max(...ys) * 1.05;
  const X = (v: number) => P.l + ((v - x0) / (x1 - x0 || 1)) * (W - P.l - P.r);
  const Y = (v: number) => H - P.b - (v / (y1 || 1)) * (H - P.t - P.b);
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[560px] w-full" role="img" aria-label={`${xLabel} / ${yLabel}`}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} x1={P.l} x2={W - P.r} y1={Y(y1 * f)} y2={Y(y1 * f)} stroke="#0a0f1e" strokeOpacity="0.08" />
        ))}
        {points.map((p, i) => {
          const hot = highlight?.(p);
          const flip = X(p.x) > W - 170;
          return (
            <g key={i}>
              <circle cx={X(p.x)} cy={Y(p.y)} r={hot ? 6 : 3.5} fill={hot ? RED : INK} fillOpacity={hot ? 0.95 : 0.45}>
                <title>{`${p.label}: ${xFmt(p.x, lang)}, ${yFmt(p.y, lang)}`}</title>
              </circle>
              {hot && (
                <text x={flip ? X(p.x) - 9 : X(p.x) + 9} y={Y(p.y) + 4} fontSize="11" fill={INK} fontWeight="600" textAnchor={flip ? "end" : "start"}>
                  {p.label}
                </text>
              )}
            </g>
          );
        })}
        <text x={(W + P.l - P.r) / 2} y={H - 8} fontSize="12" fill="#0a0f1e" opacity="0.55" textAnchor="middle">
          {xLabel}
        </text>
        <text x={14} y={(H + P.t - P.b) / 2} fontSize="12" fill="#0a0f1e" opacity="0.55" textAnchor="middle" transform={`rotate(-90 14 ${(H + P.t - P.b) / 2})`}>
          {yLabel}
        </text>
      </svg>
    </div>
  );
}

function HBars({
  rows,
  lang,
  format,
}: {
  rows: { label: string; value: number; sub?: string }[];
  lang: "en" | "fr";
  format: (v: number) => string;
}) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between gap-3 text-[13.5px]">
            <span className="font-medium text-ink/85">{r.label}</span>
            <span className="display whitespace-nowrap text-[15px] text-ink">
              {format(r.value)}
              {r.sub && <span className="ml-2 text-[12px] font-normal text-ink/50">{r.sub}</span>}
            </span>
          </div>
          <div className="mt-1 h-[9px] overflow-hidden rounded-full bg-ink/8">
            <div className="h-full rounded-full bg-canada" style={{ width: `${(r.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- data types ---------- */

interface G1 { code: string; name: string; homes_built: number | null; pipe_km: number; pre1955_km: number; pre1955_share: number | null }
interface G2 { code: string; name: string; pipe_km: number; pre1955_share: number | null; water_311_requests: number; water_per_pipe_km: number | null }
interface G3 { code: string; name: string; tickets: number; area_km2: number | null; tickets_per_km2: number | null; share: number }
interface G4D { division: string; backlog_rate: number; backlog_open: number; backlog_base: number }
interface G4W { code: string; name: string; backlog_rate: number; income: number; top_division: string }
interface G5S { code: string; title: string; count: number }
interface G5 { code: string; name: string; active_licences: number; top_sectors: G5S[]; parking_tickets: number | null; pipeline_projects: number; pipeline_units: number }
interface G6 { code: string; name: string; projects: number; tickets: number | null }
interface G7V { name: string; spend: number; awards: number }

interface All {
  g1: G1[]; g2: G2[]; g3: G3[]; g4d: G4D[]; g4w: G4W[]; g5: G5[]; g6: G6[]; g7: G7V[];
}

const DIV_FR: Record<string, string> = {
  "311": "311",
  "Municipal Licensing & Standards": "Permis et normes municipales",
  Parks: "Parcs",
  "Parks and Recreation": "Parcs et loisirs",
  "Solid Waste Management Services": "Gestion des déchets solides",
  "Toronto Water": "Toronto Water",
  "Transportation Services": "Services de transport",
  Unknown: "Inconnu",
  Environment: "Environnement",
};

export default function CrosscuttingCases({ labels, lang }: { labels: CiteLabels & { howWeKnow: string }; lang: "en" | "fr" }) {
  const t = L[lang];
  const copy = COPY[lang];
  const [all, setAll] = useState<All | null>(null);
  const [ward4, setWard4] = useState("10");
  const [ward5, setWard5] = useState("10");

  useEffect(() => {
    (async () => {
      try {
        const [j1, j2, j3, j4, j5, j6, j7] = await Promise.all(
          [
            "cross-growth-vs-pipes.json",
            "cross-pipes-vs-water311.json",
            "cross-enforcement.json",
            "cross-service-wait.json",
            "cross-open-business.json",
            "cross-construction-tickets.json",
            "cross-builders-vs-vendors.json",
          ].map((f) => fetch(`/data/${f}`).then((r) => r.json()))
        );
        setAll({
          g1: j1.neighbourhoods, g2: j2.wards, g3: j3.wards,
          g4d: j4.divisions, g4w: j4.wards, g5: j5.wards, g6: j6.neighbourhoods,
          g7: j7.top_construction_vendors,
        });
      } catch {
        setAll(null);
      }
    })();
  }, []);

  const uc = (i: number): UseCase => {
    const c = copy[i];
    return { ...c, stat: c.stat };
  };

  const w4 = useMemo(() => all?.g4w.find((w) => w.code === ward4) ?? null, [all, ward4]);
  const w5 = useMemo(() => all?.g5.find((w) => w.code === ward5) ?? null, [all, ward5]);

  if (!all) return <div className="mx-auto max-w-[880px] py-16 text-center text-[15px] text-ink/55">{t.loading}</div>;

  const g1pts = all.g1.filter((g) => g.homes_built && g.pre1955_share !== null).map((g) => ({ x: g.homes_built!, y: g.pre1955_share!, label: g.name }));
  const g2pts = all.g2.filter((g) => g.pre1955_share !== null && g.water_per_pipe_km !== null).map((g) => ({ x: g.pre1955_share!, y: g.water_per_pipe_km!, label: g.name }));
  const g6pts = all.g6.filter((g) => g.tickets !== null).map((g) => ({ x: g.projects, y: g.tickets!, label: g.name }));
  const topDensity = [...all.g3].sort((a, b) => (b.tickets_per_km2 ?? 0) - (a.tickets_per_km2 ?? 0)).slice(0, 8);
  const divRows = [...all.g4d].sort((a, b) => b.backlog_rate - a.backlog_rate).map((d) => ({
    label: lang === "fr" ? DIV_FR[d.division] ?? d.division : d.division,
    value: d.backlog_rate,
    sub: `${fmt(d.backlog_open, lang)} ${t.c4labels.open}`,
  }));
  const vendorRows = all.g7.slice(0, 8).map((v) => ({
    label: v.name.length > 34 ? v.name.slice(0, 34) + "…" : v.name,
    value: v.spend,
    sub: `${v.awards} ${t.c7labels.awards}`,
  }));

  const uc5: UseCase = {
    ...copy[4],
    stat: w5 ? fmt(w5.active_licences, lang) : "…",
    statLabel: w5
      ? lang === "fr"
        ? `${t.c5labels.licences} à ${w5.name} (quartier ${w5.code})`
        : `${t.c5labels.licences} in ${w5.name} (ward ${w5.code})`
      : copy[4].statLabel,
  };
  const uc4: UseCase = {
    ...copy[3],
    stat: w4 ? pct(w4.backlog_rate, lang) : copy[3].stat,
    statLabel: w4
      ? lang === "fr"
        ? `${t.c4labels.backlogRate} à ${w4.name} (quartier ${w4.code})`
        : `${t.c4labels.backlogRate} in ${w4.name} (ward ${w4.code})`
      : copy[3].statLabel,
  };

  return (
    <>
      <p className="mx-auto max-w-[880px] border-t border-line py-10 text-[16px] leading-relaxed text-ink/70">
        {lang === "fr"
          ? "Chaque carte ci-dessous croise deux de nos jeux de données ou plus : ce que l'un montre seul ne suffit pas, c'est la combinaison qui révèle l'insight."
          : "Each card below joins two or more of our datasets: what either one shows on its own is not enough, the combination is what reveals the insight."}
      </p>
      {/* 1. growth vs pipes */}
      <UseCaseCard usecase={uc(0)} labels={labels} lang={lang}>
        <div className="rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
          <Scatter points={g1pts} xLabel={t.c1labels.x} yLabel={t.c1labels.y} lang={lang}
            xFmt={(v, l) => fmt(Math.round(v), l)} yFmt={(v, l) => pct(v, l)}
            highlight={(p) => p.label === "Wellington Place" || p.label === "Bayview Village" || (p.x >= 7000)} />
          <p className="mt-3 text-[13px] text-ink/55">{t.c1labels.avg}</p>
        </div>
      </UseCaseCard>

      {/* 2. pipes vs water 311 */}
      <UseCaseCard usecase={uc(1)} labels={labels} lang={lang}>
        <div className="rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
          <Scatter points={g2pts} xLabel={t.c2labels.x} yLabel={t.c2labels.y} lang={lang}
            xFmt={(v, l) => pct(v, l)} yFmt={(v, l) => v.toLocaleString(l === "fr" ? "fr-CA" : "en-CA", { maximumFractionDigits: 1 })}
            highlight={(p) => p.x > 0.7 || p.x < 0.05} />
        </div>
      </UseCaseCard>

      {/* 3. enforcement density */}
      <UseCaseCard usecase={uc(2)} labels={labels} lang={lang}>
        <div className="rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
          <HBars lang={lang} format={(v) => fmt(Math.round(v), lang)}
            rows={topDensity.map((w) => ({ label: `${w.name} (${w.code})`, value: w.tickets_per_km2 ?? 0, sub: `${fmt(w.tickets, lang)} ${t.c3labels.tickets}` }))} />
          <p className="mt-3 text-[13px] text-ink/55">{t.c3labels.densityNote}</p>
        </div>
      </UseCaseCard>

      {/* 4. service wait */}
      <UseCaseCard usecase={uc4} labels={labels} lang={lang}>
        <div className="rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">{t.c4labels.divisionBacklog}</p>
          <HBars lang={lang} format={(v) => pct(v, lang)} rows={divRows} />
          <div className="mt-6 border-t border-line pt-6">
            <label className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">{t.c4labels.ward}</label>
            <select value={ward4} onChange={(e) => setWard4(e.target.value)}
              className="w-full max-w-[420px] rounded-2xl border border-line bg-paper px-4 py-3 text-[16px] font-medium text-ink">
              {all.g4w.map((w) => (
                <option key={w.code} value={w.code}>{w.name} ({pct(w.backlog_rate, lang)})</option>
              ))}
            </select>
            {w4 && (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-ink px-5 py-4 text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/55">{t.c4labels.backlogRate}</p>
                  <p className="display mt-1 text-[28px]">{pct(w4.backlog_rate, lang)}</p>
                </div>
                <div className="rounded-2xl border border-line px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/50">{t.c4labels.income}</p>
                  <p className="display mt-1 text-[28px]">${fmt(w4.income, lang)}</p>
                </div>
                <div className="rounded-2xl border border-line px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/50">{t.c4labels.topDivision}</p>
                  <p className="mt-1 text-[15px] font-semibold leading-snug">{lang === "fr" ? DIV_FR[w4.top_division] ?? w4.top_division : w4.top_division}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </UseCaseCard>

      {/* 5. open a business */}
      <UseCaseCard usecase={uc5} labels={labels} lang={lang}>
        <div className="rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
          <label className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">{t.c5labels.ward}</label>
          <select value={ward5} onChange={(e) => setWard5(e.target.value)}
            className="w-full max-w-[420px] rounded-2xl border border-line bg-paper px-4 py-3 text-[16px] font-medium text-ink">
            {all.g5.map((w) => (
              <option key={w.code} value={w.code}>{w.name} ({fmt(w.active_licences, lang)})</option>
            ))}
          </select>
          {w5 && (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-ink px-5 py-4 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/55">{t.c5labels.topSectors}</p>
                {w5.top_sectors.map((s) => (
                  <p key={s.code} className="mt-2 text-[14px]"><span className="font-semibold">{fmt(s.count, lang)}</span> <span className="text-white/70">{s.title}</span></p>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl border border-line px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/50">{t.c5labels.tickets}</p>
                  <p className="display mt-1 text-[28px]">{w5.parking_tickets !== null ? fmt(w5.parking_tickets, lang) : "n/a"}</p>
                  <p className="mt-1 text-[13px] text-ink/60">{t.c5labels.ticketsSub}</p>
                </div>
                <div className="rounded-2xl border border-line px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/50">{t.c5labels.projects}</p>
                  <p className="display mt-1 text-[28px]">{fmt(w5.pipeline_projects, lang)}</p>
                  <p className="mt-1 text-[13px] text-ink/60">{fmt(w5.pipeline_units, lang)} {t.c5labels.units} · {t.c5labels.projectsSub}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </UseCaseCard>

      {/* 6. construction vs tickets */}
      <UseCaseCard usecase={uc(5)} labels={labels} lang={lang}>
        <div className="rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
          <Scatter points={g6pts} xLabel={t.c6labels.x} yLabel={t.c6labels.y} lang={lang}
            xFmt={(v, l) => fmt(Math.round(v), l)} yFmt={(v, l) => fmt(Math.round(v), l)}
            highlight={(p) => p.label === "Wellington Place" || p.label === "Etobicoke City Centre" || p.label === "Moss Park"} />
        </div>
      </UseCaseCard>

      {/* 7. builders vs vendors */}
      <UseCaseCard usecase={uc(6)} labels={labels} lang={lang}>
        <div className="rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
          <HBars lang={lang} format={(v) => "$" + fmt(Math.round(v / 1e6), lang) + (lang === "fr" ? " M$" : "M")}
            rows={vendorRows} />
          <p className="mt-3 text-[13px] text-ink/55">{t.c7labels.vendorsNote}</p>
          <div className="mt-5 rounded-[20px] border border-dashed border-ink/25 bg-muted px-6 py-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">{t.c7labels.missingTitle}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-ink/75">
              {lang === "fr"
                ? "Le fichier du pipeline ne publie aucun nom de constructeur ou de promoteur : le rapprochement avec les 4 082 fournisseurs est impossible depuis les données ouvertes actuelles."
                : "The pipeline file publishes no builder or developer names: matching against the 4,082 vendors is impossible from today's open data."}
            </p>
          </div>
        </div>
      </UseCaseCard>
    </>
  );
}
