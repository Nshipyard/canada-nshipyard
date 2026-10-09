// Data stories for /showcase. Every number below traces to a real computed data
// file in ~/workspace/<project>/data/ (aggregates, never data/raw).
// See the "howWeKnow" field on each story for the exact source.

export interface BarRow {
  label: string;
  value: number;
  display: string;
}

export type ChartSpec =
  | { kind: "bars"; rows: BarRow[]; footnote: string }
  | {
      kind: "scatter";
      points: { x: number; y: string; label: string }[];
      xLabel: string;
      yLabel: string;
      note: string;
    }
  | { kind: "hourbars"; values: number[]; note: string }
  | { kind: "hourbars"; values: number[]; note: string }
  | { kind: "flow"; steps: { n: string; label: string }[]; note: string }
  | {
      kind: "beforeafter";
      items: { before: string; beforeSub: string; after: string; afterSub: string }[];
    };

export interface Story {
  slug: string;
  kicker: string;
  question: string;
  stat: string;
  statLabel: string;
  mechanism: string[];
  howWeKnow: string;
  chart: ChartSpec;
  chart2?: ChartSpec;
  shareText: string;
  projectUrl: string;
  projectName: string;
}

// Scatter points: [2020 median household income by ward, 2022-2024 backlog rate]
// from toronto-311-taxonomy/data/wards.json
const WARD_POINTS: { x: number; y: string; label: string }[] = [
  { x: 81000, y: "9.97%", label: "1" },
  { x: 100000, y: "10.96%", label: "2" },
  { x: 90000, y: "10.47%", label: "3" },
  { x: 85000, y: "10.40%", label: "4" },
  { x: 72000, y: "8.24%", label: "5" },
  { x: 82000, y: "6.91%", label: "6" },
  { x: 73000, y: "8.32%", label: "7" },
  { x: 97000, y: "7.79%", label: "8" },
  { x: 85000, y: "9.57%", label: "9" },
  { x: 89000, y: "11.85%", label: "10" },
  { x: 84000, y: "10.07%", label: "11" },
  { x: 86000, y: "11.21%", label: "12" },
  { x: 65000, y: "9.80%", label: "13" },
  { x: 93000, y: "9.11%", label: "14" },
  { x: 102000, y: "8.36%", label: "15" },
  { x: 78500, y: "8.21%", label: "16" },
  { x: 84000, y: "8.46%", label: "17" },
  { x: 81000, y: "9.88%", label: "18" },
  { x: 89000, y: "8.33%", label: "19" },
  { x: 79000, y: "7.59%", label: "20" },
  { x: 78000, y: "7.45%", label: "21" },
  { x: 77000, y: "7.50%", label: "22" },
  { x: 87000, y: "8.40%", label: "23" },
  { x: 78000, y: "8.47%", label: "24" },
  { x: 105000, y: "8.54%", label: "25" },
];

// Tickets by hour of day, 2023-2025, from
// toronto-parking-tickets-geocoded/data/temporal.json
const HOUR_VALUES = [
  198463, 205384, 252703, 274752, 214575, 52601, 87474, 157721, 253228, 361271,
  335621, 419777, 415493, 366014, 271390, 270252, 293229, 238361, 214825,
  223984, 208337, 148019, 89729, 52285,
];

export const storiesEn: Story[] = [
  {
    slug: "permit-wait",
    kicker: "Development Pipeline",
    question: "A new building permit takes 272 days. A small residential one takes 19.",
    stat: "272 days",
    statLabel: "median from application to issuance for a New Building permit (n=2,183)",
    mechanism: [
      "Review rounds scale with project complexity: a New Building file passes through zoning, structural, and servicing checks that a deck permit never touches.",
      "The spread is wide too. A quarter of New Building permits take more than 764 days, while small residential work clears in 19 days because the checklist is short and standard.",
      "That gap is the housing story in one number: the projects that add the most homes wait the longest.",
    ],
    howWeKnow:
      "City of Toronto open data, Building Permits (Active Permits), 202,779 records retrieved Oct 8 2026. Medians from 187,673 records with both dates; 14 negative values excluded as data-entry errors. Caveat: the file is a snapshot of permits active in Oct 2026, so older years only include permits still open (survivorship bias).",
    chart: {
      kind: "bars",
      rows: [
        { label: "Small Residential Projects", value: 19, display: "19 days" },
        { label: "Drain and Site Service", value: 28, display: "28 days" },
        { label: "Plumbing", value: 31, display: "31 days" },
        { label: "Building Additions/Alterations", value: 33, display: "33 days" },
        { label: "Mechanical", value: 35, display: "35 days" },
        { label: "New Houses", value: 75, display: "75 days" },
        { label: "Demolition", value: 75, display: "75 days" },
        { label: "New Building", value: 272, display: "272 days" },
      ],
      footnote: "Median days, application to issuance, by permit type.",
    },
    shareText:
      "A new building permit in Toronto takes a median of 272 days. A small residential one takes 19. The projects that add the most homes wait the longest.",
    projectUrl: "https://toronto-development-pipeline.vercel.app",
    projectName: "Development Pipeline",
  },
  {
    slug: "homes-gained",
    kicker: "Development Pipeline",
    question: "Toronto gained 124,326 homes, net. One waterfront neighbourhood built 12,113 of them.",
    stat: "124,326 homes",
    statLabel: "in projects the City marks Built: the net homes actually gained",
    mechanism: [
      "Construction concentrates on the downtown waterfront, where 31 projects in St Lawrence-East Bayfront-The Islands added 12,113 homes.",
      "Another 803,206 homes sit in the pipeline (367,469 proposed, 435,737 active), so the map of future Toronto is already drawn.",
      "Built counts use the City's own status marker on 2,391 tracked applications, matched to coordinates at 96.8% and to neighbourhoods at 96.2%.",
    ],
    howWeKnow:
      "City of Toronto Development Pipeline analytical dataset (official), 2,391 records retrieved Oct 8 2026. Status taxonomy normalized by Open Nshipyard: proposed = Under Review, active = Active, built = Built.",
    chart: {
      kind: "bars",
      rows: [
        { label: "St Lawrence-East Bayfront-The Islands", value: 12113, display: "12,113" },
        { label: "Wellington Place", value: 7190, display: "7,190" },
        { label: "Downtown Yonge East", value: 7079, display: "7,079" },
        { label: "Bayview Village", value: 4871, display: "4,871" },
        { label: "Bay-Cloverhill", value: 4800, display: "4,800" },
        { label: "North Toronto", value: 4767, display: "4,767" },
        { label: "Fort York-Liberty Village", value: 3576, display: "3,576" },
        { label: "Harbourfront-CityPlace", value: 3078, display: "3,078" },
      ],
      footnote: "Built homes by neighbourhood (158-model), top 8.",
    },
    shareText:
      "Toronto gained 124,326 homes net, in projects the City marks Built. One waterfront neighbourhood accounts for 12,113 of them.",
    projectUrl: "https://toronto-development-pipeline.vercel.app",
    projectName: "Development Pipeline",
  },
  {
    slug: "311-equity",
    kicker: "311 Taxonomy",
    question: "311 does not favor rich neighbourhoods. The correlation is r = 0.18.",
    stat: "r = 0.18",
    statLabel: "correlation between ward income and request backlog: essentially none",
    mechanism: [
      "What predicts a stuck request is the kind of work, not the postal code. Parks leaves 44.6% of its 2022-2024 requests open, almost entirely tree work, while Solid Waste closes all but 0.8%.",
      "This matches peer-reviewed US research across 7 cities, which found 311 response times roughly equal across rich and poor neighbourhoods.",
      "The open data has no completion dates, so nobody can compute true time-to-close from it. The honest measure is backlog: 118,460 of 1,294,275 requests filed in 2022-2024 were still open in the October 2026 extract.",
    ],
    howWeKnow:
      "City of Toronto, 311 Service Requests - Customer Initiated, 2,225,151 rows (2022-2026 extracts, retrieved Oct 8 2026). Ward income: 2021 Census median household income by ward. Backlog = 2022-2024 requests still New or In Progress; 2025-2026 excluded as too recent to judge.",
    chart: {
      kind: "scatter",
      points: WARD_POINTS,
      xLabel: "Median household income by ward (2021 Census)",
      yLabel: "Backlog rate",
      note: "Each dot is one of 25 wards. Flat cloud: r = 0.18.",
    },
    shareText:
      "Toronto's 311 does not favor rich neighbourhoods: ward income vs request backlog correlates at r = 0.18, essentially zero. What predicts delay is the kind of work. Parks leaves 44.6% open; Solid Waste 0.8%.",
    projectUrl: "https://toronto-311-taxonomy.vercel.app",
    projectName: "311 Taxonomy",
  },
  {
    slug: "pipe-age",
    kicker: "Watermain Codebook",
    question: "One third of Toronto's water pipe predates 1955.",
    stat: "32.9%",
    statLabel: "of the city's water pipe-km was laid before 1955: 2,014.9 of 6,131.6 km",
    mechanism: [
      "Cast iron was the default for a century and still makes up 51.3% of segments; PVC, the modern replacement, is 26.3%.",
      "The pre-1955 flag is an age-based geographic proxy the City itself uses (lead service pipes affect homes built before the mid-1950s), applied here to street watermains.",
      "Watermains are street pipes, not household service connections, and zero segments carry an explicit lead material code. This is not a lead measurement and says nothing about any specific home.",
    ],
    howWeKnow:
      "City of Toronto Watermains package (distribution + transmission), 49,414 segments / 6,131.6 km, retrieved Oct 8 2026. Lead-era = construction year before 1955, per the City's own lead-and-drinking-water guidance.",
    chart: {
      kind: "bars",
      rows: [
        { label: "Cast Iron", value: 51.3, display: "51.3%" },
        { label: "PVC", value: 26.3, display: "26.3%" },
        { label: "Ductile Iron", value: 9.0, display: "9.0%" },
        { label: "Steel", value: 3.5, display: "3.5%" },
        { label: "Ductile Iron, Cement Lined", value: 3.0, display: "3.0%" },
        { label: "Cast Iron, Cement Lined", value: 2.0, display: "2.0%" },
      ],
      footnote: "Share of segments by material code.",
    },
    shareText:
      "32.9% of Toronto's water pipe-km was laid before 1955. Cast iron still makes up 51.3% of segments. (Age proxy, not a lead measurement.)",
    projectUrl: "https://toronto-watermain-codebook.vercel.app",
    projectName: "Watermain Codebook",
  },
  {
    slug: "parking-enforcement",
    kicker: "Parking Tickets",
    question: "14.5% of all parking tickets land in a single ward. The top infraction is not on a street.",
    stat: "14.5%",
    statLabel: "of geocoded tickets land in Ward 10 (Spadina-Fort York): 811,816 of 5.6M",
    mechanism: [
      "Enforcement follows density: downtown wards absorb far more than their share of streets, and Yonge St is the most-ticketed street at 148,504.",
      "The surprise is what gets ticketed. Code 3, parking on private property, is the top infraction at 1,085,167 tickets (19.4%), ahead of every street violation.",
      "Tickets peak at 11am and in May; Sundays are the quietest day. Set fines on geocoded tickets total $377.7M.",
    ],
    howWeKnow:
      "City of Toronto Parking Tickets, 2023-2025 monthly files, 6,454,695 tickets retrieved Oct 8 2026. 5,606,483 geocoded (86.9%) by matching street addresses to the City's Address Points; 454,178 tickets have no house number and cannot be matched.",
    chart: {
      kind: "bars",
      rows: [
        { label: "10 Spadina-Fort York", value: 811816, display: "811,816" },
        { label: "11 University-Rosedale", value: 755588, display: "755,588" },
        { label: "13 Toronto Centre", value: 576378, display: "576,378" },
        { label: "09 Davenport", value: 367606, display: "367,606" },
        { label: "14 Toronto-Danforth", value: 357778, display: "357,778" },
      ],
      footnote: "Geocoded tickets by ward, top 5 of 25.",
    },
    chart2: {
      kind: "hourbars",
      values: HOUR_VALUES,
      note: "Tickets by hour of day, 2023-2025.",
    },
    shareText:
      "14.5% of Toronto's parking tickets land in a single ward. And the top infraction isn't on a street at all: parking on private property, 19.4% of tickets.",
    projectUrl: "https://toronto-parking-tickets-geocoded.vercel.app",
    projectName: "Parking Tickets",
  },
  {
    slug: "stacked-parcels",
    kicker: "Parcel Spine",
    question: "947 Toronto parcels carry 10 or more addresses each.",
    stat: "947",
    statLabel: "stacked parcels: condos and multi-unit buildings sharing one legal parcel",
    mechanism: [
      "525,085 of 525,343 city address points matched to their parcel (99.95%), giving every Toronto property one stable ID of the form TOP-<PARCELID>.",
      "The stacked parcels are the interesting edge: one legal parcel, dozens of addresses, which is why address-level analysis breaks without the join.",
      "The 200-500 square metre lot dominates the city at 230,994 parcels (46.3%).",
    ],
    howWeKnow:
      "City of Toronto Property Boundaries + Address Points (Toronto One Address Repository), retrieved Oct 8 2026. Point-in-polygon match over a grid index; every PARCELID appeared exactly once.",
    chart: {
      kind: "bars",
      rows: [
        { label: "Under 200 m²", value: 86544, display: "86,544" },
        { label: "200-500 m²", value: 230994, display: "230,994" },
        { label: "500-2,000 m²", value: 160604, display: "160,604" },
        { label: "2,000-10,000 m²", value: 13857, display: "13,857" },
        { label: "Over 10,000 m²", value: 6478, display: "6,478" },
      ],
      footnote: "Parcels by size band (areas approximate, from polygon geometry).",
    },
    shareText:
      "947 Toronto parcels carry 10+ addresses each. One legal parcel, dozens of addresses: that is why address-level analysis breaks without a parcel spine.",
    projectUrl: "https://toronto-parcel-spine.vercel.app",
    projectName: "Parcel Spine",
  },
  {
    slug: "business-mix",
    kicker: "Licence NAICS",
    question: "43% of Toronto's active business licences are food services.",
    stat: "43%",
    statLabel: "of active licences: 16,284 of 37,469 in accommodation and food services",
    mechanism: [
      "All 92 licence categories map to NAICS 2022 with 99.99% coverage, so the mix is measured, not guessed from keywords.",
      "Food services lead in 23 of 25 wards. Only York Centre (6) and Humber River-Black Creek (7) break the pattern, where other services lead.",
      "The 4,848 tow-truck records all cancelled when licensing moved to the province in 2024, a clean example of why raw licence counts mislead.",
    ],
    howWeKnow:
      "City of Toronto Municipal Licensing and Standards, Business Licences and Permits, 159,955 records retrieved Oct 8 2026; 37,469 active (no cancel date). NAICS 2022 structure from Statistics Canada.",
    chart: {
      kind: "bars",
      rows: [
        { label: "Accommodation and food services", value: 16284, display: "16,284" },
        { label: "Other services", value: 8313, display: "8,313" },
        { label: "Transportation and warehousing", value: 5229, display: "5,229" },
        { label: "Construction", value: 3904, display: "3,904" },
        { label: "Retail trade", value: 1592, display: "1,592" },
        { label: "Educational services", value: 1162, display: "1,162" },
      ],
      footnote: "Active licences by NAICS sector, top 6.",
    },
    shareText:
      "43% of Toronto's active business licences are food services, and they lead in 23 of 25 wards. Only Wards 6 and 7 break the pattern.",
    projectUrl: "https://toronto-licence-naics.vercel.app",
    projectName: "Licence NAICS",
  },
  {
    slug: "geo-key",
    kicker: "Geo Concordances",
    question: "Toronto's neighbourhood map changed. 687 overlap pairs stitch 20 years of data together.",
    stat: "687",
    statLabel: "geometry-overlap pairs joining 158 current neighbourhoods to 140 historical ones",
    mechanism: [
      "Neighbourhood boundaries were redrawn, so a 2006 time series and a 2024 one do not share a map. Sixteen historical neighbourhoods split into 34 current ones; 124 are unchanged.",
      "Every current neighbourhood is also assigned to its primary municipal ward, so any dataset with a ward field joins cleanly.",
      "Without the concordance, every long time series across the boundary change is broken. With it, each becomes one query.",
    ],
    howWeKnow:
      "City of Toronto official neighbourhood geometries, current (158) and historical (140), retrieved Oct 8 2026. Overlaps computed from polygon geometry.",
    chart: {
      kind: "flow",
      steps: [
        { n: "140", label: "historical neighbourhoods" },
        { n: "687", label: "overlap pairs" },
        { n: "158", label: "current neighbourhoods" },
      ],
      note: "16 historical parents split into 34 current neighbourhoods; 124 unchanged.",
    },
    shareText:
      "Toronto redrew its neighbourhood map, breaking every long time series. 687 geometry-overlap pairs stitch the 140 historical neighbourhoods to the 158 current ones.",
    projectUrl: "https://toronto-geo-concordances.vercel.app",
    projectName: "Geo Concordances",
  },
  {
    slug: "code-meaning",
    kicker: "Civic Codebooks",
    question: "21211 means Data scientists. Every civic code, resolved.",
    stat: "5,620",
    statLabel: "codes resolved to human meaning: 516 occupations, 195 infractions, 4,909 procurement codes",
    mechanism: [
      "Raw civic data speaks in codes: a licence file says 21211, a ticket says 3, a procurement file says V502A. Analysts guess, or they join by hand.",
      "The codebooks translate all three tables verbatim from Statistics Canada, the City of Toronto, and Public Services and Procurement Canada, with official French titles included.",
      "Code 3 alone accounts for 1,085,167 parking tickets and $64.7M in fines. Knowing what it means changes the question you ask next.",
    ],
    howWeKnow:
      "Statistics Canada, NOC 2021 V1.0 classification structure; City of Toronto parking infraction codes with real ticket counts (2023-2025); PSPC GSIN (federal fallback, Toronto publishes no commodity table). Retrieved Oct 8 2026.",
    chart: {
      kind: "beforeafter",
      items: [
        {
          before: "21211",
          beforeSub: "NOC 2021 unit group",
          after: "Data scientists",
          afterSub: "TEER 1, Natural and applied sciences",
        },
        {
          before: "3",
          beforeSub: "Toronto parking infraction",
          after: "PARK ON PRIVATE PROPERTY",
          afterSub: "1,085,167 tickets, $64.7M in fines",
        },
        {
          before: "V502A",
          beforeSub: "GSIN procurement code",
          after: "Relocation Services",
          afterSub: "Service, Active",
        },
      ],
    },
    shareText:
      "Raw civic data speaks in codes. 5,620 of them now resolve to human meaning: 516 occupations, 195 infractions, 4,909 procurement codes.",
    projectUrl: "https://toronto-civic-codebooks.vercel.app",
    projectName: "Civic Codebooks",
  },
];

export const storiesFr: Story[] = [
  {
    slug: "permit-wait",
    kicker: "Pipeline de développement",
    question: "Un permis de nouveau bâtiment prend 272 jours. Un petit projet résidentiel prend 19 jours.",
    stat: "272 jours",
    statLabel: "médiane de la demande à la délivrance pour un permis de nouveau bâtiment (n=2 183)",
    mechanism: [
      "Les rondes d'examen suivent la complexité du projet : un dossier de nouveau bâtiment passe par le zonage, la structure et les services, des étapes qu'un permis de terrasse ne connaît jamais.",
      "La dispersion est large aussi : un quart des permis de nouveau bâtiment dépassent 764 jours, tandis que les petits projets résidentiels passent en 19 jours parce que la liste de contrôle est courte et standard.",
      "Cet écart résume le logement en un chiffre : les projets qui ajoutent le plus de logements attendent le plus longtemps.",
    ],
    howWeKnow:
      "Données ouvertes de la Ville de Toronto, Permis de construire (permis actifs), 202 779 dossiers récupérés le 8 oct. 2026. Médianes calculées sur 187 673 dossiers avec les deux dates; 14 valeurs négatives exclues (erreurs de saisie). Réserve : le fichier est un instantané des permis actifs en oct. 2026, donc les années anciennes ne contiennent que les permis encore ouverts (biais de survie).",
    chart: {
      kind: "bars",
      rows: [
        { label: "Petits projets résidentiels", value: 19, display: "19 jours" },
        { label: "Drainage et services", value: 28, display: "28 jours" },
        { label: "Plomberie", value: 31, display: "31 jours" },
        { label: "Agrandissements et modifications", value: 33, display: "33 jours" },
        { label: "Mécanique", value: 35, display: "35 jours" },
        { label: "Maisons neuves", value: 75, display: "75 jours" },
        { label: "Démolition", value: 75, display: "75 jours" },
        { label: "Nouveau bâtiment", value: 272, display: "272 jours" },
      ],
      footnote: "Jours médians, de la demande à la délivrance, par type de permis.",
    },
    shareText:
      "Un permis de nouveau bâtiment à Toronto prend en médiane 272 jours. Un petit projet résidentiel prend 19 jours. Les projets qui ajoutent le plus de logements attendent le plus longtemps.",
    projectUrl: "https://toronto-development-pipeline.vercel.app",
    projectName: "Pipeline de développement",
  },
  {
    slug: "homes-gained",
    kicker: "Pipeline de développement",
    question: "Toronto a gagné 124 326 logements, en net. Un seul quartier riverain en a construit 12 113.",
    stat: "124 326 logements",
    statLabel: "dans des projets que la Ville marque construits : le gain net réel",
    mechanism: [
      "La construction se concentre sur le front de mer du centre-ville, où 31 projets à St Lawrence-East Bayfront-The Islands ont ajouté 12 113 logements.",
      "802 206 autres logements sont encore dans le pipeline (367 469 proposés, 435 737 actifs) : la carte du Toronto futur est déjà dessinée.",
      "Les chiffres de construction utilisent le marqueur de statut de la Ville sur 2 391 demandes suivies, appariées aux coordonnées à 96,8 % et aux quartiers à 96,2 %.",
    ],
    howWeKnow:
      "Jeu de données analytique Pipeline de développement de la Ville de Toronto (officiel), 2 391 dossiers récupérés le 8 oct. 2026. Taxonomie de statuts normalisée par Open Nshipyard : proposé = à l'étude, actif = actif, construit = construit.",
    chart: {
      kind: "bars",
      rows: [
        { label: "St Lawrence-East Bayfront-The Islands", value: 12113, display: "12 113" },
        { label: "Wellington Place", value: 7190, display: "7 190" },
        { label: "Downtown Yonge East", value: 7079, display: "7 079" },
        { label: "Bayview Village", value: 4871, display: "4 871" },
        { label: "Bay-Cloverhill", value: 4800, display: "4 800" },
        { label: "North Toronto", value: 4767, display: "4 767" },
        { label: "Fort York-Liberty Village", value: 3576, display: "3 576" },
        { label: "Harbourfront-CityPlace", value: 3078, display: "3 078" },
      ],
      footnote: "Logements construits par quartier (modèle 158), 8 premiers.",
    },
    shareText:
      "Toronto a gagné 124 326 logements en net, dans des projets que la Ville marque construits. Un seul quartier riverain en compte 12 113.",
    projectUrl: "https://toronto-development-pipeline.vercel.app",
    projectName: "Pipeline de développement",
  },
  {
    slug: "311-equity",
    kicker: "Taxonomie 311",
    question: "Le 311 ne favorise pas les quartiers riches. La corrélation est de r = 0,18.",
    stat: "r = 0,18",
    statLabel: "corrélation entre le revenu du quartier et l'arriéré des demandes : essentiellement nulle",
    mechanism: [
      "Ce qui prédit une demande bloquée, c'est le type de travail, pas le code postal. Les Parcs laissent 44,6 % de leurs demandes 2022-2024 ouvertes, presque toutes des travaux d'arbres, tandis que la Gestion des déchets solides n'en laisse que 0,8 %.",
      "Cela rejoint la recherche américaine évaluée par les pairs dans 7 villes, qui a trouvé des délais de réponse à peu près égaux entre quartiers riches et pauvres.",
      "Les données ouvertes ne contiennent aucune date d'achèvement, donc personne ne peut calculer le vrai délai de traitement. La mesure honnête est l'arriéré : 118 460 des 1 294 275 demandes déposées en 2022-2024 étaient encore ouvertes dans l'extrait d'octobre 2026.",
    ],
    howWeKnow:
      "Ville de Toronto, Demandes de service 311 (initiées par les clients), 2 225 151 lignes (extraits 2022-2026, récupérés le 8 oct. 2026). Revenu par quartier : revenu médian des ménages du Recensement 2021. Arriéré = demandes 2022-2024 encore nouvelles ou en cours; 2025-2026 exclues car trop récentes pour juger.",
    chart: {
      kind: "scatter",
      points: WARD_POINTS,
      xLabel: "Revenu médian des ménages par quartier (Recensement 2021)",
      yLabel: "Taux d'arriéré",
      note: "Chaque point est l'un des 25 quartiers. Nuage plat : r = 0,18.",
    },
    shareText:
      "Le 311 de Toronto ne favorise pas les quartiers riches : le revenu du quartier contre l'arriéré des demandes corrèle à r = 0,18, essentiellement zéro. Ce qui prédit le retard, c'est le type de travail.",
    projectUrl: "https://toronto-311-taxonomy.vercel.app",
    projectName: "Taxonomie 311",
  },
  {
    slug: "pipe-age",
    kicker: "Registre des conduites",
    question: "Un tiers des conduites d'eau de Toronto date d'avant 1955.",
    stat: "32,9 %",
    statLabel: "des kilomètres de conduites posés avant 1955 : 2 014,9 sur 6 131,6 km",
    mechanism: [
      "La fonte était la norme pendant un siècle et représente encore 51,3 % des segments; le PVC, son remplaçant moderne, en est à 26,3 %.",
      "Le marqueur d'avant 1955 est un indicateur géographique fondé sur l'âge que la Ville utilise elle-même (les branchements en plomb touchent les maisons d'avant le milieu des années 1950), appliqué ici aux conduites de rue.",
      "Les conduites principales sont des tuyaux de rue, pas des branchements domestiques, et aucun segment ne porte un code de matériau plomb explicite. Ce n'est pas une mesure de plomb et ne dit rien d'une maison en particulier.",
    ],
    howWeKnow:
      "Paquet Conduites d'eau de la Ville de Toronto (distribution + transmission), 49 414 segments / 6 131,6 km, récupéré le 8 oct. 2026. Ère plomb = année de construction avant 1955, selon le guide plomb et eau potable de la Ville.",
    chart: {
      kind: "bars",
      rows: [
        { label: "Fonte", value: 51.3, display: "51,3 %" },
        { label: "PVC", value: 26.3, display: "26,3 %" },
        { label: "Fonte ductile", value: 9.0, display: "9,0 %" },
        { label: "Acier", value: 3.5, display: "3,5 %" },
        { label: "Fonte ductile, revêtement ciment", value: 3.0, display: "3,0 %" },
        { label: "Fonte, revêtement ciment", value: 2.0, display: "2,0 %" },
      ],
      footnote: "Part des segments par code de matériau.",
    },
    shareText:
      "32,9 % des kilomètres de conduites d'eau de Toronto ont été posés avant 1955. La fonte représente encore 51,3 % des segments. (Indicateur d'âge, pas une mesure de plomb.)",
    projectUrl: "https://toronto-watermain-codebook.vercel.app",
    projectName: "Registre des conduites",
  },
  {
    slug: "parking-enforcement",
    kicker: "Contraventions",
    question: "14,5 % des contraventions atterrissent dans un seul quartier. La première infraction n'est pas dans une rue.",
    stat: "14,5 %",
    statLabel: "des contraventions géocodées dans le quartier 10 (Spadina-Fort York) : 811 816 sur 5,6 M",
    mechanism: [
      "L'application suit la densité : les quartiers du centre absorbent bien plus que leur part de rues, et la rue Yonge est la plus verbalisée avec 148 504 contraventions.",
      "La surprise est ce qui est verbalisé. Le code 3, stationnement sur un terrain privé, est la première infraction avec 1 085 167 contraventions (19,4 %), devant toutes les infractions de rue.",
      "Les contraventions culminent à 11 h et en mai; le dimanche est le jour le plus calme. Les amendes des contraventions géocodées totalisent 377,7 M$.",
    ],
    howWeKnow:
      "Ville de Toronto, Contraventions de stationnement, fichiers mensuels 2023-2025, 6 454 695 contraventions récupérées le 8 oct. 2026. 5 606 483 géocodées (86,9 %) par appariement des adresses aux points d'adresse de la Ville; 454 178 contraventions sans numéro civique ne peuvent être appariées.",
    chart: {
      kind: "bars",
      rows: [
        { label: "10 Spadina-Fort York", value: 811816, display: "811 816" },
        { label: "11 University-Rosedale", value: 755588, display: "755 588" },
        { label: "13 Toronto Centre", value: 576378, display: "576 378" },
        { label: "09 Davenport", value: 367606, display: "367 606" },
        { label: "14 Toronto-Danforth", value: 357778, display: "357 778" },
      ],
      footnote: "Contraventions géocodées par quartier, 5 premiers sur 25.",
    },
    chart2: {
      kind: "hourbars",
      values: HOUR_VALUES,
      note: "Contraventions par heure du jour, 2023-2025.",
    },
    shareText:
      "14,5 % des contraventions de Toronto atterrissent dans un seul quartier. Et la première infraction n'est pas dans une rue : le stationnement sur terrain privé, 19,4 % des contraventions.",
    projectUrl: "https://toronto-parking-tickets-geocoded.vercel.app",
    projectName: "Contraventions",
  },
  {
    slug: "stacked-parcels",
    kicker: "Registre des parcelles",
    question: "947 parcelles de Toronto portent 10 adresses ou plus chacune.",
    stat: "947",
    statLabel: "parcelles empilées : condos et immeubles multi-logements sur une seule parcelle légale",
    mechanism: [
      "525 085 des 525 343 points d'adresse de la ville ont été appariés à leur parcelle (99,95 %), donnant à chaque propriété torontoise un identifiant stable de la forme TOP-<PARCELID>.",
      "Les parcelles empilées sont le cas intéressant : une parcelle légale, des dizaines d'adresses, et c'est pourquoi l'analyse par adresse échoue sans la jointure.",
      "Le lot de 200 à 500 mètres carrés domine la ville avec 230 994 parcelles (46,3 %).",
    ],
    howWeKnow:
      "Ville de Toronto, Limites de propriétés + Points d'adresse (référentiel d'adresses unique de Toronto), récupérés le 8 oct. 2026. Appariement point-dans-polygone sur index spatial; chaque PARCELID apparaît exactement une fois.",
    chart: {
      kind: "bars",
      rows: [
        { label: "Moins de 200 m²", value: 86544, display: "86 544" },
        { label: "200-500 m²", value: 230994, display: "230 994" },
        { label: "500-2 000 m²", value: 160604, display: "160 604" },
        { label: "2 000-10 000 m²", value: 13857, display: "13 857" },
        { label: "Plus de 10 000 m²", value: 6478, display: "6 478" },
      ],
      footnote: "Parcelles par tranche de superficie (superficies approximatives, issues de la géométrie).",
    },
    shareText:
      "947 parcelles de Toronto portent 10 adresses ou plus chacune. Une parcelle légale, des dizaines d'adresses : voilà pourquoi l'analyse par adresse échoue sans registre des parcelles.",
    projectUrl: "https://toronto-parcel-spine.vercel.app",
    projectName: "Registre des parcelles",
  },
  {
    slug: "business-mix",
    kicker: "Permis SCIAN",
    question: "43 % des permis d'entreprise actifs de Toronto sont de la restauration.",
    stat: "43 %",
    statLabel: "des permis actifs : 16 284 sur 37 469 dans l'hébergement et la restauration",
    mechanism: [
      "Les 92 catégories de permis sont reliées au SCIAN 2022 avec une couverture de 99,99 %, donc le portrait est mesuré, pas deviné à partir de mots-clés.",
      "La restauration mène dans 23 quartiers sur 25. Seuls York Centre (6) et Humber River-Black Creek (7) brisent le schéma, où les autres services mènent.",
      "Les 4 848 dossiers de remorquage ont tous été annulés quand la délivrance est passée à la province en 2024, un bon exemple de la façon dont les comptes bruts de permis trompent.",
    ],
    howWeKnow:
      "Ville de Toronto, Permis et licences d'entreprise (Licences et normes municipales), 159 955 dossiers récupérés le 8 oct. 2026; 37 469 actifs (sans date d'annulation). Structure SCIAN 2022 de Statistique Canada.",
    chart: {
      kind: "bars",
      rows: [
        { label: "Hébergement et restauration", value: 16284, display: "16 284" },
        { label: "Autres services", value: 8313, display: "8 313" },
        { label: "Transport et entreposage", value: 5229, display: "5 229" },
        { label: "Construction", value: 3904, display: "3 904" },
        { label: "Commerce de détail", value: 1592, display: "1 592" },
        { label: "Services d'enseignement", value: 1162, display: "1 162" },
      ],
      footnote: "Permis actifs par secteur SCIAN, 6 premiers.",
    },
    shareText:
      "43 % des permis d'entreprise actifs de Toronto sont de la restauration, en tête dans 23 quartiers sur 25. Seuls les quartiers 6 et 7 brisent le schéma.",
    projectUrl: "https://toronto-licence-naics.vercel.app",
    projectName: "Permis SCIAN",
  },
  {
    slug: "geo-key",
    kicker: "Concordances géographiques",
    question: "Toronto a redessiné sa carte de quartiers. 687 paires de chevauchement recollent 20 ans de données.",
    stat: "687",
    statLabel: "paires de chevauchement géométrique reliant 158 quartiers actuels à 140 quartiers historiques",
    mechanism: [
      "Les limites de quartiers ont été redessinées, donc une série de 2006 et une de 2024 ne partagent pas la même carte. Seize quartiers historiques se sont divisés en 34 quartiers actuels; 124 sont inchangés.",
      "Chaque quartier actuel est aussi rattaché à son quartier municipal principal, donc tout jeu de données avec un champ de quartier se joint proprement.",
      "Sans la concordance, chaque longue série chronologique chevauchant le redécoupage est brisée. Avec elle, chacune devient une simple requête.",
    ],
    howWeKnow:
      "Géométries officielles des quartiers de la Ville de Toronto, actuelles (158) et historiques (140), récupérées le 8 oct. 2026. Chevauchements calculés à partir de la géométrie des polygones.",
    chart: {
      kind: "flow",
      steps: [
        { n: "140", label: "quartiers historiques" },
        { n: "687", label: "paires de chevauchement" },
        { n: "158", label: "quartiers actuels" },
      ],
      note: "16 quartiers historiques parents divisés en 34 quartiers actuels; 124 inchangés.",
    },
    shareText:
      "Toronto a redessiné sa carte de quartiers, brisant chaque longue série chronologique. 687 paires de chevauchement géométrique recollent les 140 quartiers historiques aux 158 actuels.",
    projectUrl: "https://toronto-geo-concordances.vercel.app",
    projectName: "Concordances géographiques",
  },
  {
    slug: "code-meaning",
    kicker: "Recueils de codes",
    question: "21211 signifie scientifiques des données. Chaque code civique, résolu.",
    stat: "5 620",
    statLabel: "codes résolus en langage humain : 516 professions, 195 infractions, 4 909 codes d'approvisionnement",
    mechanism: [
      "Les données civiques brutes parlent en codes : un fichier de permis dit 21211, une contravention dit 3, un fichier d'approvisionnement dit V502A. Les analystes devinent, ou joignent à la main.",
      "Les recueils traduisent les trois tables mot à mot depuis Statistique Canada, la Ville de Toronto et Services publics et Approvisionnement Canada, titres français officiels inclus.",
      "Le code 3 à lui seul représente 1 085 167 contraventions et 64,7 M$ d'amendes. Savoir ce qu'il signifie change la question suivante.",
    ],
    howWeKnow:
      "Statistique Canada, structure de la CNP 2021 V1.0; codes d'infraction de stationnement de la Ville de Toronto avec les vrais comptes de contraventions (2023-2025); GSIN de SPAC (solution fédérale de repli, Toronto ne publiant pas de table de codes). Récupérés le 8 oct. 2026.",
    chart: {
      kind: "beforeafter",
      items: [
        {
          before: "21211",
          beforeSub: "Groupe de base CNP 2021",
          after: "Scientifiques des données",
          afterSub: "FEER 1, Sciences naturelles et appliquées",
        },
        {
          before: "3",
          beforeSub: "Infraction de stationnement de Toronto",
          after: "STATIONNEMENT SUR TERRAIN PRIVÉ",
          afterSub: "1 085 167 contraventions, 64,7 M$ d'amendes",
        },
        {
          before: "V502A",
          beforeSub: "Code d'approvisionnement GSIN",
          after: "Services de réinstallation",
          afterSub: "Service, actif",
        },
      ],
    },
    shareText:
      "Les données civiques brutes parlent en codes. 5 620 d'entre eux se résolvent maintenant en langage humain : 516 professions, 195 infractions, 4 909 codes d'approvisionnement.",
    projectUrl: "https://toronto-civic-codebooks.vercel.app",
    projectName: "Recueils de codes",
  },
];
