"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "fr";

const en = {
  banner: {
    line: "An open-source data project. Not affiliated with the Government of Canada or the City of Toronto.",
    badge: "Open source",
  },
  nav: {
    projects: "Projects",
    apps: "Live apps",
    showcase: "Showcase",
    developers: "Developers",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    kicker: "Nshipyard Canada",
    title: "Open data, rebuilt for the people who use it.",
    sub: "We turn messy public data into open infrastructure: explorer interfaces for humans, documented APIs and MCP tools for AI agents. Starting with Canada's civic data, already answering questions about the whole planet.",
    cta1: "Explore the projects",
    cta2: "See the showcase",
  },
  problem: {
    kicker: "The problem",
    title: "The data is public. Using it is another story.",
    body: "Toronto is where we started: hundreds of open datasets, but inconsistent schemas, free-text fields, and missing keys force every analyst to rebuild the same cleaning work by hand. We do it once, in the open, so nobody has to again. The same pattern now runs across Canada, and worldwide wherever the underlying data is global.",
    stats: [
      { value: "722,000", label: "street-name variants across parking tickets, entered by hand" },
      { value: "57.8%", label: "of building-permit cost fields are non-numeric" },
      { value: "600+", label: "311 problem codes, in a taxonomy retired in 2019" },
      { value: "16 → 34", label: "neighbourhoods split in the census re-cut, breaking every time series" },
    ],
  },
  projects: {
    kicker: "The projects",
    title: "Open datasets, rebuilt as infrastructure.",
    body: "Each project takes one messy public dataset and turns it into something a person can explore and a machine can query. One repo per project, versioned releases, open methodology. Most start with Canadian civic data; the worldwide ones prove the pattern travels.",
    status: { planned: "Planned", building: "Building", live: "Live" },
    explore: "Explore",
    api: "API docs",
    items: [
      {
        repo: "toronto-geo-concordances",
        name: "Geo Concordances",
        tag: "Toronto",
        desc: "Every neighbourhood boundary, joined across census years. The key that unlocks every time series.",
        user: "For analysts, journalists, and city staff",
        status: "planned" as const,
      },
      {
        repo: "toronto-licence-naics",
        name: "Licence → NAICS",
        tag: "Toronto",
        desc: "160,000 business licences mapped to NAICS codes. Corridor analytics without the keyword guessing.",
        user: "For BIAs, brokers, and B2B prospecting",
        status: "planned" as const,
      },
      {
        repo: "toronto-watermain-codebook",
        name: "Watermain Codebook",
        tag: "Toronto",
        desc: "The codes behind the pipes, finally documented. Including the missing lead classification.",
        user: "For engineers and Toronto Water",
        status: "planned" as const,
      },
      {
        repo: "toronto-parcel-spine",
        name: "Parcel Spine",
        tag: "Toronto",
        desc: "One stable ID for every Toronto property. The master key for joining it all together.",
        user: "For everyone building on property data",
        status: "planned" as const,
      },
      {
        repo: "toronto-311-taxonomy",
        name: "311 Taxonomy",
        tag: "Toronto",
        desc: "850+ request types, versioned so renames stop breaking history.",
        user: "For city operations and researchers",
        status: "planned" as const,
      },
      {
        repo: "toronto-parking-tickets-geocoded",
        name: "Parking Tickets, Geocoded",
        tag: "Toronto",
        desc: "50 million tickets, geocoded and mappable for the first time.",
        user: "For fleets, mobility, and insurers",
        status: "planned" as const,
      },
      {
        repo: "toronto-civic-codebooks",
        name: "Civic Codebooks",
        tag: "Toronto",
        desc: "NOC, infraction, and procurement codes, translated into one reference.",
        user: "For analysts, staffing, and watchdogs",
        status: "planned" as const,
      },
      {
        repo: "toronto-development-pipeline",
        name: "Development Pipeline",
        tag: "Toronto",
        desc: "Every project in the housing pipeline, normalized and queryable.",
        user: "For developers, lenders, and media",
        status: "planned" as const,
      },
      {
        repo: "earthquery",
        name: "earthquery",
        tag: "Worldwide",
        desc: "Ask the planet a question: natural-language search over satellite imagery embeddings.",
        user: "For researchers, journalists, and the curious",
        status: "live" as const,
      },
      {
        repo: "cyclonewatch",
        name: "cyclonewatch",
        tag: "Worldwide",
        desc: "Live tropical cyclone risk scores from official hurricane forecasts, with the math shown.",
        user: "For ports, vessels, and coastal communities",
        status: "live" as const,
      },
    ],
  },
  apps: {
    kicker: "Live apps",
    title: "Built on this data.",
    body: "Real applications already running on City of Toronto open feeds, maintained by Nshipyard.",
    visit: "Visit live app",
    repo: "Source code",
    items: [
      {
        repo: "my-street",
        name: "My Street",
        tag: "Toronto",
        desc: "What's happening on your street this week? Live road work and building permits within 500 metres of any Toronto address, pulled straight from the city's open data.",
        url: "https://my-street.canada.nshipyard.com",
        status: "live" as const,
      },
    ],
  },
  showcase: {
    kicker: "Showcase",
    title: "Questions you couldn't ask before.",
    body: "Each chart below is currently impossible to build from the city's open data. Each one becomes a query once its project ships.",
    soon: "Ships with its project",
    live: "Live project",
    explore: "Explore the data",
    needs: "Needs",
    items: [
      {
        q: "Which neighbourhoods actually gained homes, net?",
        needs: "cleaned permits + geo concordances",
        url: "https://toronto-development-pipeline.vercel.app",
        thumb: "/showcase/development-pipeline.png",
        answer: "124,326 homes sit in projects the City marks Built: the net homes gained. St Lawrence-East Bayfront-The Islands leads with 12,113.",
      },
      {
        q: "Does 311 fix rich neighbourhoods faster?",
        needs: "311 taxonomy + geocoding",
        url: "https://toronto-311-taxonomy.vercel.app",
        thumb: "/showcase/311-taxonomy.png",
        answer: "Essentially no: backlog vs ward income correlates at r = 0.18. What predicts backlog is the kind of work, not the income. Parks tree work sits open for years.",
      },
      {
        q: "What do 50 million parking tickets look like on a map?",
        needs: "geocoded tickets",
        url: "https://toronto-parking-tickets-geocoded.vercel.app",
        thumb: "/showcase/parking-tickets.png",
        answer: "Ward 10 (Spadina-Fort York) takes 14.5% of all tickets; private lots, not streets, are the top infraction at 19.4%.",
      },
      {
        q: "Which main streets are losing businesses?",
        needs: "licence NAICS crosswalk",
        url: "https://toronto-licence-naics.vercel.app",
        thumb: "/showcase/licence-naics.png",
        answer: "Every Toronto licence mapped to its industry: food services are 43% of active licences, and only Wards 6 and 7 break the pattern.",
      },
      {
        q: "How long does a building permit really take?",
        needs: "cleaned permit dates",
        url: "https://toronto-development-pipeline.vercel.app",
        thumb: "/showcase/permit-times.png",
        answer: "A New Building permit takes a median of 272 days from application to issuance. A small residential project takes 19 days.",
      },
      { q: "Where does federal grant money land in Toronto?", needs: "entity-resolved grants" },
    ],
  },
  agents: {
    kicker: "For developers",
    title: "Built for humans and agents.",
    body: "Every project ships three ways to consume it: a visual explorer, a documented REST API, and MCP tools over streamable HTTP, so AI agents can query the data directly.",
    rest: "REST",
    mcp: "MCP",
    restLabel: "One endpoint, one answer.",
    mcpLabel: "One connection, every project.",
    points: [
      { n: "01", head: "Explorer.", body: "Search, filter, map, and download every dataset as CSV or Parquet." },
      { n: "02", head: "REST API.", body: "Documented endpoints with OpenAPI specs and a try-it console." },
      { n: "03", head: "MCP.", body: "One streamable-HTTP server, namespaced tools per project, for AI agents." },
    ],
  },
  opensource: {
    kicker: "Open source",
    title: "Our contribution to better public data.",
    body: "Every project lives in its own public repo under the Nshipyard organization: MIT licensed, versioned data releases, open methodology. If publishers clean up their own data, we will happily become redundant.",
    points: [
      "MIT licensed, no exceptions",
      "Versioned data releases (CSV + Parquet)",
      "Methodology documented in every README",
      "Accepting corrections and contributions",
    ],
    cta: "github.com/Nshipyard",
  },
  footer: {
    line: "An open-data infrastructure project by Nshipyard. Not affiliated with the Government of Canada or the City of Toronto.",
    sources: "Sources: City of Toronto Open Data, open.canada.ca, Statistics Canada.",
  },
};

export type Dict = typeof en;

const fr: Dict = {
  banner: {
    line: "Un projet de données à code source ouvert. Sans affiliation avec le gouvernement du Canada ni la Ville de Toronto.",
    badge: "Code source ouvert",
  },
  nav: {
    projects: "Projets",
    apps: "Applis en direct",
    showcase: "Vitrine",
    developers: "Développeurs",
    menu: "Menu",
    close: "Fermer",
  },
  hero: {
    kicker: "Nshipyard Canada",
    title: "Les données ouvertes, reconstruites pour ceux qui s'en servent.",
    sub: "Nous transformons les données publiques désordonnées en infrastructure ouverte : des interfaces d'exploration pour les humains, des API documentées et des outils MCP pour les agents IA. En commençant par les données civiques du Canada, et en répondant déjà à des questions sur la planète entière.",
    cta1: "Explorer les projets",
    cta2: "Voir la vitrine",
  },
  problem: {
    kicker: "Le problème",
    title: "Les données sont publiques. Les utiliser est une autre histoire.",
    body: "Toronto est notre point de départ : des centaines de jeux de données ouverts, mais des schémas incohérents, des champs en texte libre et des clés manquantes obligent chaque analyste à refaire le même nettoyage à la main. Nous le faisons une fois, en public, pour que personne n'ait à le refaire. Le même modèle s'applique maintenant à travers le Canada, et dans le monde entier là où les données sont mondiales.",
    stats: [
      { value: "722 000", label: "variantes de noms de rue dans les contraventions, saisies à la main" },
      { value: "57,8 %", label: "des champs de coût des permis ne sont pas numériques" },
      { value: "600+", label: "codes de problème dans le 311, dans une taxonomie abandonnée en 2019" },
      { value: "16 → 34", label: "quartiers divisés lors du redécoupage, ce qui brise chaque série chronologique" },
    ],
  },
  projects: {
    kicker: "Les projets",
    title: "Des jeux de données ouverts, reconstruits en infrastructure.",
    body: "Chaque projet prend un jeu de données public désordonné et le transforme en quelque chose qu'une personne peut explorer et qu'une machine peut interroger. Un dépôt par projet, des versions numérotées, une méthodologie ouverte. La plupart commencent par les données civiques canadiennes ; les projets mondiaux prouvent que le modèle voyage.",
    status: { planned: "Prévu", building: "En construction", live: "En ligne" },
    explore: "Explorer",
    api: "API",
    items: [
      {
        repo: "toronto-geo-concordances",
        name: "Geo Concordances",
        tag: "Toronto",
        desc: "Toutes les limites de quartier, reliées entre les recensements. La clé qui déverrouille chaque série chronologique.",
        user: "Pour analystes, journalistes et personnel municipal",
        status: "planned" as const,
      },
      {
        repo: "toronto-licence-naics",
        name: "Licence → NAICS",
        tag: "Toronto",
        desc: "160 000 permis d'entreprise associés aux codes SCIAN. L'analyse des artères commerciales sans devinettes.",
        user: "Pour les ZAC, les courtiers et la prospection B2B",
        status: "planned" as const,
      },
      {
        repo: "toronto-watermain-codebook",
        name: "Watermain Codebook",
        tag: "Toronto",
        desc: "Les codes des conduites d'eau, enfin documentés. Y compris la classification manquante pour le plomb.",
        user: "Pour les ingénieurs et Toronto Water",
        status: "planned" as const,
      },
      {
        repo: "toronto-parcel-spine",
        name: "Parcel Spine",
        tag: "Toronto",
        desc: "Un identifiant stable pour chaque propriété torontoise. La clé maîtresse pour tout relier.",
        user: "Pour tous ceux qui bâtissent sur les données foncières",
        status: "planned" as const,
      },
      {
        repo: "toronto-311-taxonomy",
        name: "311 Taxonomy",
        tag: "Toronto",
        desc: "Plus de 850 types de demandes, versionnés pour que les renommages cessent de briser l'historique.",
        user: "Pour les opérations municipales et les chercheurs",
        status: "planned" as const,
      },
      {
        repo: "toronto-parking-tickets-geocoded",
        name: "Parking Tickets, Geocoded",
        tag: "Toronto",
        desc: "50 millions de contraventions, géocodées et cartographiables pour la première fois.",
        user: "Pour les flottes, la mobilité et les assureurs",
        status: "planned" as const,
      },
      {
        repo: "toronto-civic-codebooks",
        name: "Civic Codebooks",
        tag: "Toronto",
        desc: "Codes CNP, d'infractions et d'approvisionnement, réunis en une seule référence.",
        user: "Pour les analystes, le recrutement et la surveillance",
        status: "planned" as const,
      },
      {
        repo: "toronto-development-pipeline",
        name: "Development Pipeline",
        tag: "Toronto",
        desc: "Chaque projet du pipeline de logement, normalisé et interrogeable.",
        user: "Pour les promoteurs, les prêteurs et les médias",
        status: "planned" as const,
      },
      {
        repo: "earthquery",
        name: "earthquery",
        tag: "Mondial",
        desc: "Posez une question à la planète : recherche en langage naturel dans les images satellites.",
        user: "Pour chercheurs, journalistes et curieux",
        status: "live" as const,
      },
      {
        repo: "cyclonewatch",
        name: "cyclonewatch",
        tag: "Mondial",
        desc: "Scores de risque cyclonique en direct, issus des prévisions officielles, avec le calcul exposé.",
        user: "Pour les ports, les navires et les communautés côtières",
        status: "live" as const,
      },
    ],
  },
  apps: {
    kicker: "Applications en direct",
    title: "Construit sur ces données.",
    body: "Des applications réelles qui utilisent déjà les flux ouverts de la Ville de Toronto, maintenues par Nshipyard.",
    visit: "Voir l'application",
    repo: "Code source",
    items: [
      {
        repo: "my-street",
        name: "My Street",
        tag: "Toronto",
        desc: "Que se passe-t-il dans votre rue cette semaine? Travaux routiers et permis de construire en direct, dans un rayon de 500 mètres de n'importe quelle adresse à Toronto.",
        url: "https://my-street.canada.nshipyard.com",
        status: "live" as const,
      },
    ],
  },
  showcase: {
    kicker: "Vitrine",
    title: "Des questions jusque-là sans réponse.",
    body: "Chacun des graphiques ci-dessous est actuellement impossible à construire à partir des données ouvertes de la ville. Chacun devient une simple requête une fois son projet en ligne.",
    soon: "Avec son projet",
    live: "Projet en direct",
    explore: "Explorer les données",
    needs: "Requiert",
    items: [
      {
        q: "Quels quartiers ont vraiment gagné des logements, en net ?",
        needs: "permis nettoyés + concordances géographiques",
        url: "https://toronto-development-pipeline.vercel.app",
        thumb: "/showcase/development-pipeline.png",
        answer: "124 326 logements dans des projets que la ville marque construits : le gain net. St Lawrence-East Bayfront-The Islands mène avec 12 113.",
      },
      {
        q: "Le 311 répare-t-il plus vite les quartiers riches ?",
        needs: "taxonomie 311 + géocodage",
        url: "https://toronto-311-taxonomy.vercel.app",
        thumb: "/showcase/311-taxonomy.png",
        answer: "Essentiellement non : l'arriéré contre le revenu par quartier corrèle à r = 0,18. Ce qui prédit l'arriéré, c'est le type de travail, pas le revenu. Les travaux d'arbres des parcs restent ouverts des années.",
      },
      {
        q: "À quoi ressemblent 50 millions de contraventions sur une carte ?",
        needs: "contraventions géocodées",
        url: "https://toronto-parking-tickets-geocoded.vercel.app",
        thumb: "/showcase/parking-tickets.png",
        answer: "Le quartier 10 (Spadina-Fort York) reçoit 14,5 % des contraventions ; les terrains privés, pas les rues, arrivent en tête à 19,4 %.",
      },
      {
        q: "Quelles artères commerciales perdent leurs commerces ?",
        needs: "correspondance SCIAN des permis",
        url: "https://toronto-licence-naics.vercel.app",
        thumb: "/showcase/licence-naics.png",
        answer: "Chaque permis de Toronto relié à son industrie : la restauration représente 43 % des permis actifs, et seuls les quartiers 6 et 7 brisent le schéma.",
      },
      {
        q: "Combien de temps prend vraiment un permis de construire ?",
        needs: "dates de permis nettoyées",
        url: "https://toronto-development-pipeline.vercel.app",
        thumb: "/showcase/permit-times.png",
        answer: "Un permis de nouveau bâtiment prend en médiane 272 jours de la demande à la délivrance. Un petit projet résidentiel prend 19 jours.",
      },
      { q: "Où atterrit l'argent des subventions fédérales à Toronto ?", needs: "subventions résolues par entité" },
    ],
  },
  agents: {
    kicker: "Pour les développeurs",
    title: "Conçu pour les humains et les agents.",
    body: "Chaque projet se consomme de trois façons : un explorateur visuel, une API REST documentée et des outils MCP en HTTP continu, pour que les agents IA interrogent les données directement.",
    rest: "REST",
    mcp: "MCP",
    restLabel: "Un point de terminaison, une réponse.",
    mcpLabel: "Une connexion, tous les projets.",
    points: [
      { n: "01", head: "Explorateur.", body: "Recherchez, filtrez, cartographiez et téléchargez chaque jeu de données en CSV ou Parquet." },
      { n: "02", head: "API REST.", body: "Des points de terminaison documentés avec spécifications OpenAPI et console d'essai." },
      { n: "03", head: "MCP.", body: "Un serveur HTTP continu, des outils par projet, pour les agents IA." },
    ],
  },
  opensource: {
    kicker: "Code source ouvert",
    title: "Notre contribution à de meilleures données publiques.",
    body: "Chaque projet vit dans son propre dépôt public sous l'organisation Nshipyard : licence MIT, versions de données numérotées, méthodologie ouverte. Si les éditeurs nettoient leurs propres données, nous deviendrons redondants avec plaisir.",
    points: [
      "Licence MIT, sans exception",
      "Versions de données numérotées (CSV + Parquet)",
      "Méthodologie documentée dans chaque README",
      "Corrections et contributions acceptées",
    ],
    cta: "github.com/Nshipyard",
  },
  footer: {
    line: "Un projet d'infrastructure de données ouvertes par Nshipyard. Sans affiliation avec le gouvernement du Canada ni la Ville de Toronto.",
    sources: "Sources : Données ouvertes de la Ville de Toronto, ouvert.canada.ca, Statistique Canada.",
  },
};

const dicts: Record<Lang, Dict> = { en, fr };

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang, t: dicts[lang] }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}
