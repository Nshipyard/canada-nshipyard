// Shareable chart cards. Every number below was verified against the real
// computed aggregates in ~/workspace/<project>/data/ on Oct 9, 2026.
// Verification notes live in the side-chat build log; the "source" line on
// each card names the publisher dataset.

export interface BarDatum {
  label: string;
  labelFr: string;
  value: number;
  display?: string;
  displayFr?: string;
  highlight?: boolean;
}

export interface TSeriesDatum {
  name: string;
  nameFr: string;
  values: number[];
  color?: string;
  dashed?: boolean;
}

export interface DonutSegment {
  label: string;
  labelFr: string;
  value: number;
}

export interface GroupedSeries {
  name: string;
  nameFr: string;
  values: number[];
  color?: string;
}

export interface StatRow {
  value: string;
  valueFr?: string;
  label: string;
  labelFr: string;
}

export interface ChartFr {
  headline: string;
  deck: string;
  kicker: string;
  note: string;
  source: string;
  shareText: string;
}

export interface ChartDef {
  slug: string;
  kicker: string;
  headline: string;
  deck: string;
  note: string;
  source: string;
  shareText: string;
  projectName: string;
  projectUrl: string;
  fr: ChartFr;
  chart:
    | { kind: "hbars"; rows: BarDatum[]; unit: string; unitFr: string; maxLabelChars?: number }
    | {
        kind: "scatter";
        points: { x: number; y: number; label: string; tag?: string; tagFr?: string }[];
        xLabel: string;
        xLabelFr: string;
        yLabel: string;
        yLabelFr: string;
        annotation: string;
        annotationFr: string;
        xDomain?: [number, number];
        yDomain?: [number, number];
        xTicks?: number[];
        yTicks?: number[];
        xTickFmt?: "money-k" | "pct" | "num" | "money" | "money-b";
        yTickFmt?: "money-k" | "pct" | "num" | "money" | "money-b";
        tickDecimals?: number;
        trend?: { a: number; b: number; x0: number };
        titleTemplate?: "ward" | "label";
      }
    | {
        kind: "histogram";
        bars: { label: string; labelFr: string; value: number; era: "pre" | "post" }[];
        preLabel: string;
        preLabelFr: string;
        postLabel: string;
        postLabelFr: string;
        marker: string;
        markerNote: string;
        markerNoteFr: string;
      }
    | {
        kind: "line";
        values: number[];
        xLabels: string[];
        peakIndex: number;
        peakLabel: string;
        peakLabelFr: string;
        yLabel: string;
        yLabelFr: string;
      }
    | {
        kind: "tseries";
        series?: TSeriesDatum[];
        bars?: BarDatum[];
        xLabels: string[];
        xLabelsFr?: string[];
        yPrefix?: string;
        ySuffix?: string;
        decimals?: number;
        meanLine?: { value: number; label: string; labelFr: string };
        variant?: "line" | "bar";
      }
    | {
        kind: "donut";
        segments: DonutSegment[];
        centerTop: string;
        centerTopFr: string;
        centerBottom: string;
        centerBottomFr: string;
      }
    | {
        kind: "grouped";
        categories: string[];
        categoriesFr?: string[];
        series: GroupedSeries[];
        yPrefix?: string;
        ySuffix?: string;
        decimals?: number;
      }
    | {
        kind: "stat";
        bigValue: string;
        bigValueFr?: string;
        bigLabel: string;
        bigLabelFr: string;
        stats: StatRow[];
      };
}

export const CHARTS: ChartDef[] = [
  {
    slug: "permit-wait",
    kicker: "Median days, application to issuance · City of Toronto",
    headline: "A new building permit takes 272 days. A small residential one takes 19.",
    deck: "Review rounds scale with project complexity. A quarter of New Building permits take more than 764 days, while small residential work clears because the checklist is short and standard.",
    note: "Medians from 187,673 records with both dates; 14 negative values excluded as data-entry errors. Snapshot of permits active Oct 2026, so older years carry survivorship bias.",
    source: "City of Toronto open data, Building Permits (Active Permits), retrieved Oct 8, 2026.",
    shareText:
      "A new building permit in Toronto takes a median of 272 days. A small residential one takes 19. The projects that add the most homes wait the longest.",
    projectName: "Development Pipeline",
    projectUrl: "https://toronto-development-pipeline.vercel.app",
    fr: {
      headline: "Un permis de nouveau bâtiment prend 272 jours. Un petit projet résidentiel prend 19 jours.",
      deck: "Les rondes d'examen suivent la complexité du projet. Un quart des permis de nouveau bâtiment dépassent 764 jours, tandis que les petits projets résidentiels passent parce que la liste de contrôle est courte et standard.",
      kicker: "Jours médians, de la demande à la délivrance · Ville de Toronto",
      note: "Médianes calculées sur 187 673 dossiers avec les deux dates; 14 valeurs négatives exclues (erreurs de saisie). Instantané des permis actifs en oct. 2026 : les années anciennes portent un biais de survie.",
      source: "Données ouvertes de la Ville de Toronto, Permis de construire (permis actifs), récupérés le 8 oct. 2026.",
      shareText: "Un permis de nouveau bâtiment à Toronto prend en médiane 272 jours. Un petit projet résidentiel prend 19 jours. Les projets qui ajoutent le plus de logements attendent le plus longtemps.",
    },
    chart: {
      kind: "hbars",
      unit: "days", unitFr: "jours",
      rows: [
        { label: "Small Residential Projects", labelFr: "Petits projets résidentiels", value: 19, display: "19" },
        { label: "Drain and Site Service", labelFr: "Drainage et services de site", value: 28, display: "28" },
        { label: "Plumbing", labelFr: "Plomberie", value: 31, display: "31" },
        { label: "Building Additions/Alterations", labelFr: "Agrandissements et modifications", value: 33, display: "33" },
        { label: "Mechanical", labelFr: "Mécanique", value: 35, display: "35" },
        { label: "New Houses", labelFr: "Maisons neuves", value: 75, display: "75" },
        { label: "Demolition", labelFr: "Démolition", value: 75, display: "75" },
        { label: "New Building", labelFr: "Nouveau bâtiment", value: 272, display: "272", highlight: true },
      ],
    },
  },
  {
    slug: "homes-gained",
    kicker: "Built homes by neighbourhood, top 8 · City of Toronto",
    headline: "Toronto gained 124,326 homes, net. One waterfront neighbourhood built 12,113 of them.",
    deck: "Construction concentrates on the downtown waterfront: 31 projects in St Lawrence-East Bayfront-The Islands. Another 803,206 homes sit in the pipeline, so the map of future Toronto is already drawn.",
    note: "Built counts use the City's own status marker on 2,391 tracked applications, matched to coordinates at 96.8% and to neighbourhoods at 96.2%.",
    source: "City of Toronto, Development Pipeline analytical dataset, retrieved Oct 8, 2026.",
    shareText:
      "Toronto gained 124,326 homes net, in projects the City marks Built. One waterfront neighbourhood accounts for 12,113 of them.",
    projectName: "Development Pipeline",
    projectUrl: "https://toronto-development-pipeline.vercel.app",
    fr: {
      headline: "Toronto a gagné 124 326 logements, en net. Un seul quartier riverain en a construit 12 113.",
      deck: "La construction se concentre sur le front de mer du centre-ville : 31 projets à St Lawrence-East Bayfront-The Islands. 803 206 autres logements sont dans le pipeline : la carte du Toronto futur est déjà dessinée.",
      kicker: "Logements construits par quartier, 8 premiers · Ville de Toronto",
      note: "Les chiffres de construction utilisent le marqueur de statut de la Ville sur 2 391 demandes suivies, appariées aux coordonnées à 96,8 % et aux quartiers à 96,2 %.",
      source: "Ville de Toronto, jeu de données analytique Pipeline de développement, récupéré le 8 oct. 2026.",
      shareText: "Toronto a gagné 124 326 logements en net, dans des projets que la Ville marque construits. Un seul quartier riverain en compte 12 113.",
    },
    chart: {
      kind: "hbars",
      unit: "homes", unitFr: "logements",
      rows: [
        { label: "St Lawrence-East Bayfront-The Islands", labelFr: "St Lawrence-East Bayfront-The Islands", value: 12113, display: "12,113", displayFr: "12 113", highlight: true },
        { label: "Wellington Place", labelFr: "Wellington Place", value: 7190, display: "7,190", displayFr: "7 190" },
        { label: "Downtown Yonge East", labelFr: "Downtown Yonge East", value: 7079, display: "7,079", displayFr: "7 079" },
        { label: "Bayview Village", labelFr: "Bayview Village", value: 4871, display: "4,871", displayFr: "4 871" },
        { label: "Bay-Cloverhill", labelFr: "Bay-Cloverhill", value: 4800, display: "4,800", displayFr: "4 800" },
        { label: "North Toronto", labelFr: "North Toronto", value: 4767, display: "4,767", displayFr: "4 767" },
        { label: "Fort York-Liberty Village", labelFr: "Fort York-Liberty Village", value: 3576, display: "3,576", displayFr: "3 576" },
        { label: "Harbourfront-CityPlace", labelFr: "Harbourfront-CityPlace", value: 3078, display: "3,078", displayFr: "3 078" },
      ],
    },
  },
  {
    slug: "311-equity",
    kicker: "Each dot is one of 25 wards · 2022-2024 requests",
    headline: "311 does not favour rich neighbourhoods. The correlation is r = 0.18.",
    deck: "What predicts a stuck request is the kind of work, not the postal code. Parks leaves 44.6% of its 2022-2024 requests open, almost entirely tree work, while Solid Waste closes all but 0.8%.",
    note: "Backlog = 2022-2024 requests still New or In Progress in the Oct 2026 extract: 118,460 of 1,294,275. 2025-2026 excluded as too recent to judge. Ward income: 2021 Census median household income.",
    source: "City of Toronto, 311 Service Requests - Customer Initiated; Statistics Canada, 2021 Census.",
    shareText:
      "Toronto's 311 does not favour rich neighbourhoods: ward income vs request backlog correlates at r = 0.18, essentially zero. What predicts delay is the kind of work.",
    projectName: "311 Taxonomy",
    projectUrl: "https://toronto-311-taxonomy.vercel.app",
    fr: {
      headline: "Le 311 ne favorise pas les quartiers riches. La corrélation est de r = 0,18.",
      deck: "Ce qui prédit une demande bloquée, c'est le type de travail, pas le code postal. Les Parcs laissent 44,6 % de leurs demandes 2022-2024 ouvertes, presque toutes des travaux d'arbres, tandis que la Gestion des déchets solides n'en laisse que 0,8 %.",
      kicker: "Chaque point est l'un des 25 quartiers · demandes 2022-2024",
      note: "Arriéré = demandes 2022-2024 encore nouvelles ou en cours dans l'extrait d'oct. 2026 : 118 460 sur 1 294 275. 2025-2026 exclues car trop récentes pour juger. Revenu par quartier : revenu médian des ménages du Recensement 2021.",
      source: "Ville de Toronto, Demandes de service 311 (initiées par les clients); Statistique Canada, Recensement 2021.",
      shareText: "Le 311 de Toronto ne favorise pas les quartiers riches : le revenu du quartier contre l'arriéré des demandes corrèle à r = 0,18, essentiellement zéro. Ce qui prédit le retard, c'est le type de travail.",
    },
    chart: {
      kind: "scatter",
      xLabel: "Median household income by ward",
      xLabelFr: "Revenu médian des ménages par quartier",
      yLabel: "Backlog rate",
        yLabelFr: "Taux d'arriéré",
      annotation: "Flat cloud: r = 0.18, essentially no relationship.",
        annotationFr: "Nuage plat : r = 0,18, essentiellement aucune relation.",
      trend: { a: 9.034, b: 0.00002452, x0: 84820 },
      points: [
        { x: 81000, y: 9.97, label: "1" },
        { x: 100000, y: 10.96, label: "2" },
        { x: 90000, y: 10.47, label: "3" },
        { x: 85000, y: 10.4, label: "4" },
        { x: 72000, y: 8.24, label: "5" },
        { x: 82000, y: 6.91, label: "6" },
        { x: 73000, y: 8.32, label: "7" },
        { x: 97000, y: 7.79, label: "8" },
        { x: 85000, y: 9.57, label: "9" },
        { x: 89000, y: 11.85, label: "10" },
        { x: 84000, y: 10.07, label: "11" },
        { x: 86000, y: 11.21, label: "12" },
        { x: 65000, y: 9.8, label: "13" },
        { x: 93000, y: 9.11, label: "14" },
        { x: 102000, y: 8.36, label: "15" },
        { x: 78500, y: 8.21, label: "16" },
        { x: 84000, y: 8.46, label: "17" },
        { x: 81000, y: 9.88, label: "18" },
        { x: 89000, y: 8.33, label: "19" },
        { x: 79000, y: 7.59, label: "20" },
        { x: 78000, y: 7.45, label: "21" },
        { x: 77000, y: 7.5, label: "22" },
        { x: 87000, y: 8.4, label: "23" },
        { x: 78000, y: 8.47, label: "24" },
        { x: 105000, y: 8.54, label: "25" },
      ],
    },
  },
  {
    slug: "pipe-age",
    kicker: "Watermain segments by decade laid · 48,683 segments with a year",
    headline: "One third of Toronto's water pipe predates 1955.",
    deck: "Cast iron was the default for a century and still makes up 51.3% of segments. The pre-1955 flag is the City's own age proxy for lead-era service pipes, applied here to street watermains.",
    note: "Age proxy, not a lead measurement: zero segments carry an explicit lead material code, and these are street watermains, not household connections. 32.9% of pipe-km (2,014.9 of 6,131.6 km) was laid before 1955.",
    source: "City of Toronto, Watermains package (distribution + transmission), retrieved Oct 8, 2026.",
    shareText:
      "32.9% of Toronto's water pipe-km was laid before 1955. Cast iron still makes up 51.3% of segments. (Age proxy, not a lead measurement.)",
    projectName: "Watermain Codebook",
    projectUrl: "https://toronto-watermain-codebook.vercel.app",
    fr: {
      headline: "Un tiers des conduites d'eau de Toronto date d'avant 1955.",
      deck: "La fonte était la norme pendant un siècle et représente encore 51,3 % des segments. Le marqueur d'avant 1955 est l'indicateur d'âge que la Ville utilise elle-même pour les branchements de l'ère du plomb, appliqué ici aux conduites de rue.",
      kicker: "Segments de conduites par décennie de pose · 48 683 segments avec une année",
      note: "Indicateur d'âge, pas une mesure de plomb : aucun segment ne porte un code de matériau plomb explicite, et ce sont des conduites de rue, pas des branchements domestiques. 32,9 % des km de conduites (2 014,9 sur 6 131,6 km) ont été posés avant 1955.",
      source: "Ville de Toronto, paquet Conduites d'eau (distribution + transmission), récupéré le 8 oct. 2026.",
      shareText: "32,9 % des kilomètres de conduites d'eau de Toronto ont été posés avant 1955. La fonte représente encore 51,3 % des segments. (Indicateur d'âge, pas une mesure de plomb.)",
    },
    chart: {
      kind: "histogram",
      marker: "1955",
      markerNote: "32.9% of pipe-km predates 1955",
        markerNoteFr: "32,9 % des km de conduites datent d'avant 1955",
        preLabel: "Laid before 1955",
        preLabelFr: "Posé avant 1955",
        postLabel: "1955 or later",
        postLabelFr: "1955 ou après",
      bars: [
        { label: "1870s", labelFr: "1870", value: 752, era: "pre" },
        { label: "1880s", labelFr: "1880", value: 1094, era: "pre" },
        { label: "1890s", labelFr: "1890", value: 543, era: "pre" },
        { label: "1900s", labelFr: "1900", value: 1133, era: "pre" },
        { label: "1910s", labelFr: "1910", value: 3228, era: "pre" },
        { label: "1920s", labelFr: "1920", value: 4367, era: "pre" },
        { label: "1930s", labelFr: "1930", value: 1102, era: "pre" },
        { label: "1940s", labelFr: "1940", value: 1573, era: "pre" },
        { label: "1950s", labelFr: "1950", value: 8882, era: "post" },
        { label: "1960s", labelFr: "1960", value: 5762, era: "post" },
        { label: "1970s", labelFr: "1970", value: 3814, era: "post" },
        { label: "1980s", labelFr: "1980", value: 2732, era: "post" },
        { label: "1990s", labelFr: "1990", value: 1676, era: "post" },
        { label: "2000s", labelFr: "2000", value: 4494, era: "post" },
        { label: "2010s", labelFr: "2010", value: 5325, era: "post" },
        { label: "2020s", labelFr: "2020", value: 2206, era: "post" },
      ],
    },
  },
  {
    slug: "parking-wards",
    kicker: "Geocoded tickets by ward, top 5 of 25 · 2023-2025",
    headline: "14.5% of all parking tickets land in a single ward. The top infraction is not on a street.",
    deck: "Enforcement follows density: Ward 10 (Spadina-Fort York) absorbs 811,816 tickets. And the most-ticketed infraction is code 3, parking on private property: 1,085,167 tickets, 19.4% of the total.",
    note: "5,606,483 tickets geocoded (86.9%) by matching street addresses to the City's Address Points; 454,178 tickets have no house number and cannot be matched.",
    source: "City of Toronto, Parking Tickets, 2023-2025 monthly files, retrieved Oct 8, 2026.",
    shareText:
      "14.5% of Toronto's parking tickets land in a single ward. And the top infraction isn't on a street at all: parking on private property, 19.4% of tickets.",
    projectName: "Parking Tickets",
    projectUrl: "https://toronto-parking-tickets-geocoded.vercel.app",
    fr: {
      headline: "14,5 % des contraventions atterrissent dans un seul quartier. La première infraction n'est pas dans une rue.",
      deck: "L'application suit la densité : le quartier 10 (Spadina-Fort York) absorbe 811 816 contraventions. Et l'infraction la plus verbalisée est le code 3, stationnement sur terrain privé : 1 085 167 contraventions, 19,4 % du total.",
      kicker: "Contraventions géocodées par quartier, 5 premiers sur 25 · 2023-2025",
      note: "5 606 483 contraventions géocodées (86,9 %) par appariement des adresses aux points d'adresse de la Ville; 454 178 contraventions sans numéro civique ne peuvent être appariées.",
      source: "Ville de Toronto, Contraventions de stationnement, fichiers mensuels 2023-2025, récupérées le 8 oct. 2026.",
      shareText: "14,5 % des contraventions de Toronto atterrissent dans un seul quartier. Et la première infraction n'est pas dans une rue : le stationnement sur terrain privé, 19,4 % des contraventions.",
    },
    chart: {
      kind: "hbars",
      unit: "tickets", unitFr: "contraventions",
      rows: [
        { label: "10 Spadina-Fort York", labelFr: "10 Spadina-Fort York", value: 811816, display: "811,816", displayFr: "811 816", highlight: true },
        { label: "11 University-Rosedale", labelFr: "11 University-Rosedale", value: 755588, display: "755,588", displayFr: "755 588" },
        { label: "13 Toronto Centre", labelFr: "13 Toronto Centre", value: 576378, display: "576,378", displayFr: "576 378" },
        { label: "09 Davenport", labelFr: "09 Davenport", value: 367606, display: "367,606", displayFr: "367 606" },
        { label: "14 Toronto-Danforth", labelFr: "14 Toronto-Danforth", value: 357778, display: "357,778", displayFr: "357 778" },
      ],
    },
  },
  {
    slug: "parking-hours",
    kicker: "Tickets by hour of day · 2023-2025",
    headline: "Toronto writes the most parking tickets at 11 a.m.",
    deck: "Enforcement ramps up through the morning, peaks at 419,777 tickets in the 11 a.m. hour, and falls off a cliff after 6 p.m. Set fines on geocoded tickets total $377.7M.",
    note: "Hour from ticket issue time on 6,454,695 tickets, 2023-2025. May is the busiest month; Sunday is the quietest day.",
    source: "City of Toronto, Parking Tickets, 2023-2025 monthly files, retrieved Oct 8, 2026.",
    shareText:
      "Toronto writes the most parking tickets at 11 a.m.: 419,777 of them, 2023-2025. Enforcement falls off a cliff after 6 p.m.",
    projectName: "Parking Tickets",
    projectUrl: "https://toronto-parking-tickets-geocoded.vercel.app",
    fr: {
      headline: "C'est à 11 h que Toronto émet le plus de contraventions.",
      deck: "L'application s'intensifie le matin, culmine à 419 777 contraventions à 11 h, puis chute après 18 h. Les amendes des contraventions géocodées totalisent 377,7 M$.",
      kicker: "Contraventions par heure du jour · 2023-2025",
      note: "Heure d'émission sur 6 454 695 contraventions, 2023-2025. Mai est le mois le plus chargé; le dimanche est le jour le plus calme.",
      source: "Ville de Toronto, Contraventions de stationnement, fichiers mensuels 2023-2025, récupérées le 8 oct. 2026.",
      shareText: "C'est à 11 h que Toronto émet le plus de contraventions : 419 777, 2023-2025. L'application chute après 18 h.",
    },
    chart: {
      kind: "line",
      values: [
        198463, 205384, 252703, 274752, 214575, 52601, 87474, 157721, 253228,
        361271, 335621, 419777, 415493, 366014, 271390, 270252, 293229, 238361,
        214825, 223984, 208337, 148019, 89729, 52285,
      ],
      xLabels: ["12a", "6a", "12p", "6p", "11p"],
      peakIndex: 11,
      peakLabel: "11 a.m. · 419,777",
        peakLabelFr: "11 h · 419 777",
      yLabel: "Tickets",
        yLabelFr: "Contraventions",
    },
  },
  {
    slug: "business-mix",
    kicker: "Active licences by NAICS sector, top 6 · 37,469 active",
    headline: "43% of Toronto's active business licences are food services.",
    deck: "All 92 licence categories map to NAICS 2022 with 99.99% coverage. Food services lead in 23 of 25 wards; only York Centre and Humber River-Black Creek break the pattern.",
    note: "Active = no cancel date on the record. The 4,848 tow-truck records all cancelled when licensing moved to the province in 2024.",
    source: "City of Toronto, Municipal Licensing and Standards; Statistics Canada, NAICS 2022.",
    shareText:
      "43% of Toronto's active business licences are food services, and they lead in 23 of 25 wards. Only Wards 6 and 7 break the pattern.",
    projectName: "Licence NAICS",
    projectUrl: "https://toronto-licence-naics.vercel.app",
    fr: {
      headline: "43 % des permis d'entreprise actifs de Toronto sont de la restauration.",
      deck: "Les 92 catégories de permis sont reliées au SCIAN 2022 avec une couverture de 99,99 %. La restauration mène dans 23 quartiers sur 25; seuls York Centre et Humber River-Black Creek brisent le schéma.",
      kicker: "Permis actifs par secteur SCIAN, 6 premiers · 37 469 actifs",
      note: "Actif = sans date d'annulation au dossier. Les 4 848 dossiers de remorquage ont tous été annulés quand la délivrance est passée à la province en 2024.",
      source: "Ville de Toronto, Permis et licences d'entreprise (Licences et normes municipales); Statistique Canada, SCIAN 2022.",
      shareText: "43 % des permis d'entreprise actifs de Toronto sont de la restauration, en tête dans 23 quartiers sur 25. Seuls les quartiers 6 et 7 brisent le schéma.",
    },
    chart: {
      kind: "hbars",
      unit: "licences", unitFr: "permis",
      rows: [
        { label: "Accommodation and food services", labelFr: "Hébergement et restauration", value: 16284, display: "16,284", displayFr: "16 284", highlight: true },
        { label: "Other services", labelFr: "Autres services", value: 8313, display: "8,313", displayFr: "8 313" },
        { label: "Transportation and warehousing", labelFr: "Transport et entreposage", value: 5229, display: "5,229", displayFr: "5 229" },
        { label: "Construction", labelFr: "Construction", value: 3904, display: "3,904", displayFr: "3 904" },
        { label: "Retail trade", labelFr: "Commerce de détail", value: 1592, display: "1,592", displayFr: "1 592" },
        { label: "Educational services", labelFr: "Services d'enseignement", value: 1162, display: "1,162", displayFr: "1 162" },
      ],
    },
  },
  {
    slug: "spend-concentration",
    kicker: "Top 6 vendors by total awarded spend · 2012-2026",
    headline: "The top 10 vendors capture 20.8% of the city's $21.5B.",
    deck: "Toronto publishes every awarded contract, but the same vendor hides behind 4,240 spellings. Entity resolution collapses them into 4,082 canonical vendors; Furfari Paving leads at $781.7M across 58 awards.",
    note: "13,084 records; $21.5B after quarantining 3 defective records that would have overstated spend by $15.1B. 2,268 vendors won exactly once.",
    source: "City of Toronto Open Data (CKAN): awarded contracts, non-competitive contracts, consulting expenditures.",
    shareText:
      "The top 10 vendors capture 20.8% of Toronto's $21.5B in awarded contracts. Furfari Paving alone took $781.7M across 58 awards.",
    projectName: "Procurement Spending",
    projectUrl: "https://procurement.canada.nshipyard.com",
    fr: {
      headline: "Les 10 premiers fournisseurs captent 20,8 % des 21,5 G$ de la ville.",
      deck: "Toronto publie chaque contrat attribué, mais un même fournisseur se cache derrière 4 240 graphies. La résolution d'entités les ramène à 4 082 fournisseurs canoniques; Furfari Paving mène avec 781,7 M$ sur 58 attributions.",
      kicker: "6 premiers fournisseurs par dépenses attribuées totales · 2012-2026",
      note: "13 084 dossiers; 21,5 G$ après mise en quarantaine de 3 dossiers défectueux qui auraient surévalué les dépenses de 15,1 G$. 2 268 fournisseurs n'ont gagné qu'une seule fois.",
      source: "Données ouvertes de la Ville de Toronto (CKAN) : contrats attribués, contrats non concurrentiels, dépenses de services-conseils.",
      shareText: "Les 10 premiers fournisseurs captent 20,8 % des 21,5 G$ de contrats attribués par Toronto. Furfari Paving à elle seule a pris 781,7 M$ sur 58 attributions.",
    },
    chart: {
      kind: "hbars",
      unit: "$",
      unitFr: "$",
      rows: [
        { label: "Furfari Paving Co. Ltd.", labelFr: "Furfari Paving Co. Ltd.", value: 781.7, display: "$781.7M", displayFr: "781,7 M$", highlight: true },
        { label: "GFL Environmental Inc.", labelFr: "GFL Environmental Inc.", value: 517.6, display: "$517.6M", displayFr: "517,6 M$" },
        { label: "Sanscon Construction Ltd.", labelFr: "Sanscon Construction Ltd.", value: 490.3, display: "$490.3M", displayFr: "490,3 M$" },
        { label: "2489960 Ontario Inc.", labelFr: "2489960 Ontario Inc.", value: 469.6, display: "$469.6M", displayFr: "469,6 M$" },
        { label: "Fer-Pal Construction Ltd.", labelFr: "Fer-Pal Construction Ltd.", value: 436.7, display: "$436.7M", displayFr: "436,7 M$" },
        { label: "North Tunnel Constructors ULC", labelFr: "North Tunnel Constructors ULC", value: 397.3, display: "$397.3M", displayFr: "397,3 M$" },
      ],
    },
  },
  {
    slug: "noncomp-reasons",
    kicker: "Non-competitive awards by stated reason, top 6",
    headline: "Toronto handed out 8.5% of its procurement spending with no competitive bidding. Emergency exemptions were the biggest slice, at $450M.",
    deck: "$19.4B of city spending (90.1%) went through open bidding. The remaining $1.8B across 2,887 contracts skipped bidding: $450M cited emergencies, $417M cited exclusive rights.",
    note: "Reasons as stated in the City's non-competitive contracts file. Three records carried bare 10-digit integers in the amount field, the pattern of phone numbers; quarantined and excluded.",
    source: "City of Toronto Open Data (CKAN), Non-Competitive Contracts, retrieved Oct 8, 2026.",
    shareText:
      "8.5% of Toronto's procurement spend ($1.8B) skips competition. Emergencies lead the stated reasons at $450M, followed by exclusive rights at $417M.",
    projectName: "Procurement Spending",
    projectUrl: "https://procurement.canada.nshipyard.com",
    fr: {
      headline: "Toronto a attribué 8,5 % de ses dépenses d'approvisionnement sans appel d'offres. Les exemptions d'urgence forment la plus grande part, à 450 M$.",
      deck: "19,4 G$ de dépenses municipales (90,1 %) sont passés par des appels d'offres ouverts. Le 1,8 G$ restant, sur 2 887 contrats, y a échappé : 450 M$ pour urgences, 417 M$ pour droits exclusifs.",
      kicker: "Attributions non concurrentielles par motif invoqué, 6 premiers",
      note: "Motifs tels qu'invoqués dans le fichier des contrats non concurrentiels de la Ville. Trois dossiers portaient des entiers bruts de 10 chiffres dans le champ du montant, le profil de numéros de téléphone; mis en quarantaine et exclus.",
      source: "Données ouvertes de la Ville de Toronto (CKAN), contrats non concurrentiels, récupérés le 8 oct. 2026.",
      shareText: "Toronto a attribué 8,5 % de ses dépenses d'approvisionnement sans appel d'offres. Les exemptions d'urgence forment la plus grande part, à 450 M$.",
    },
    chart: {
      kind: "hbars",
      unit: "$",
      unitFr: "$",
      rows: [
        { label: "Emergency", labelFr: "Urgence", value: 450.4, display: "$450.4M", displayFr: "450,4 M$", highlight: true },
        { label: "Exclusive Rights", labelFr: "Droits exclusifs", value: 417.2, display: "$417.2M", displayFr: "417,2 M$" },
        { label: "Other", labelFr: "Autre", value: 222.8, display: "$222.8M", displayFr: "222,8 M$" },
        { label: "Time Constraint", labelFr: "Contrainte de temps", value: 212.2, display: "$212.2M", displayFr: "212,2 M$" },
        { label: "Compatible", labelFr: "Compatible", value: 163.1, display: "$163.1M", displayFr: "163,1 M$" },
        { label: "Bridging Contract", labelFr: "Contrat de transition", value: 105.4, display: "$105.4M", displayFr: "105,4 M$" },
      ],
    },
  },

  {
    slug: "ontario-line-33x",
    kicker: "Marginal 30-minute reach per dollar · Union Station origin",
    headline: "The $27.2B Ontario Line buys 1.0 km² of new 30-minute reach. The $13.5B GO expansion buys 17.7.",
    deck: "Per dollar, GO expansion delivers 33 times more downtown-centric reachability: 1.31 km² per billion versus 0.04. The $4.7B Scarborough extension and $3.97B Eglinton West add effectively zero at the 30-minute mark.",
    note: "Marginal reachable area measured from Union Station at a 30-minute threshold; it captures downtown-centric trips, not network-wide benefits. Budgets are Metrolinx June 2024 figures; the Ontario Line was revised to $34B in Aug 2026.",
    source: "Open Nshipyard Livable Area, isochrone computation; Metrolinx budget figures, retrieved Oct 9, 2026.",
    shareText: "Toronto handed out 8.5% of its procurement spending with no competitive bidding. Emergency exemptions were the biggest slice, at $450M.",
    projectName: "Livable Area",
    projectUrl: "https://livable.canada.nshipyard.com",
    fr: {
      kicker: "Portée marginale de 30 minutes par dollar · origine : gare Union",
      headline: "La ligne Ontario à 27,2 G$ achète 1,0 km² de portée de 30 minutes. L'expansion GO à 13,5 G$ en achète 17,7.",
      deck: "Par dollar, l'expansion GO offre 33 fois plus d'accessibilité centrée sur le centre-ville : 1,31 km² par milliard contre 0,04. Le prolongement Scarborough (4,7 G$) et Eglinton Ouest (3,97 G$) ajoutent pratiquement zéro au seuil de 30 minutes.",
      note: "Zone accessible marginale mesurée depuis la gare Union au seuil de 30 minutes; elle capte les déplacements centrés sur le centre-ville, pas les avantages à l'échelle du réseau. Budgets : chiffres Metrolinx, juin 2024; la ligne Ontario a été révisée à 34 G$ en août 2026.",
      source: "Open Nshipyard, Livable Area, calcul d'isochrones; budgets Metrolinx, récupérés le 9 oct. 2026.",
      shareText: "Par dollar, l'expansion GO offre 33 fois plus de portée de 30 minutes depuis la gare Union que la ligne Ontario : 1,31 km² par milliard contre 0,04.",
    },
    chart: {"kind": "scatter", "points": [{"x": 27.2, "y": 0.04, "label": "Ontario Line: $27.2B budget, 0.04 km² per $B", "tag": "Ontario Line", "tagFr": "Ligne Ontario"}, {"x": 13.5, "y": 1.31, "label": "GO expansion: $13.5B budget, 1.31 km² per $B"}, {"x": 4.7, "y": 0.0, "label": "Scarborough extension: $4.7B budget, 0.0 km² per $B at 30 min"}, {"x": 3.97, "y": 0.0, "label": "Eglinton West: $3.97B budget, 0.0 km² per $B at 30 min"}], "xLabel": "Budget (CAD billions)", "xLabelFr": "Budget (milliards $ CA)", "yLabel": "New 30-min reachable km² per $B", "yLabelFr": "Nouveaux km² accessibles en 30 min par G$", "annotation": "GO expansion: 33x more reach per dollar.", "annotationFr": "Expansion GO : 33 fois plus de portée par dollar.", "xDomain": [0, 36], "yDomain": [0, 1.5], "xTicks": [0, 10, 20, 30], "yTicks": [0, 0.5, 1, 1.5], "xTickFmt": "money-b", "yTickFmt": "num", "titleTemplate": "label", "tickDecimals": 1},
  },
  {
    slug: "wildfire-2023",
    kicker: "Area burned per year · Canada, 1972-2025",
    headline: "2023 burned 14.8 million hectares, six times the 54-year average.",
    deck: "One year accounted for 11.2% of all area burned since 1972. The previous record, 1989, burned 6.7 million hectares, less than half of 2023.",
    note: "Adjusted hectares (unburned islands excluded). 2025 data through Oct 2026.",
    source: "Natural Resources Canada, CWFIS National Burned Area Composite, retrieved Oct 8, 2026.",
    shareText: "2023 burned 14.8M hectares of Canada, 6x the 54-year average and 11.2% of everything burned since 1972.",
    projectName: "Wildfire Watch",
    projectUrl: "https://fire.canada.nshipyard.com",
    fr: {
      kicker: "Superficie brûlée par année · Canada, 1972-2025",
      headline: "2023 a brûlé 14,8 millions d'hectares, six fois la moyenne sur 54 ans.",
      deck: "Une seule année représente 11,2 % de toute la superficie brûlée depuis 1972. Le record précédent, 1989, avait brûlé 6,7 millions d'hectares, moins de la moitié.",
      note: "Hectares ajustés (îlots non brûlés exclus). Données 2025 jusqu'en oct. 2026.",
      source: "Ressources naturelles Canada, Composite national des superficies brûlées du SCFCI, récupéré le 8 oct. 2026.",
      shareText: "2023 a brûlé 14,8 M d'hectares au Canada, 6 fois la moyenne sur 54 ans et 11,2 % de tout ce qui a brûlé depuis 1972.",
    },
    chart: {"kind": "tseries", "variant": "bar", "bars": [{"label": "1972", "labelFr": "1972", "value": 0.6}, {"label": "1973", "labelFr": "1973", "value": 1.8}, {"label": "1974", "labelFr": "1974", "value": 0.9}, {"label": "1975", "labelFr": "1975", "value": 0.8}, {"label": "1976", "labelFr": "1976", "value": 2.3}, {"label": "1977", "labelFr": "1977", "value": 1.2}, {"label": "1978", "labelFr": "1978", "value": 0.3}, {"label": "1979", "labelFr": "1979", "value": 2.5}, {"label": "1980", "labelFr": "1980", "value": 4.7}, {"label": "1981", "labelFr": "1981", "value": 5.1}, {"label": "1982", "labelFr": "1982", "value": 1.7}, {"label": "1983", "labelFr": "1983", "value": 1.8}, {"label": "1984", "labelFr": "1984", "value": 0.9}, {"label": "1985", "labelFr": "1985", "value": 0.7}, {"label": "1986", "labelFr": "1986", "value": 0.8}, {"label": "1987", "labelFr": "1987", "value": 0.9}, {"label": "1988", "labelFr": "1988", "value": 1.2}, {"label": "1989", "labelFr": "1989", "value": 6.7}, {"label": "1990", "labelFr": "1990", "value": 0.9}, {"label": "1991", "labelFr": "1991", "value": 1.6}, {"label": "1992", "labelFr": "1992", "value": 0.9}, {"label": "1993", "labelFr": "1993", "value": 2.0}, {"label": "1994", "labelFr": "1994", "value": 5.0}, {"label": "1995", "labelFr": "1995", "value": 5.8}, {"label": "1996", "labelFr": "1996", "value": 1.8}, {"label": "1997", "labelFr": "1997", "value": 0.7}, {"label": "1998", "labelFr": "1998", "value": 4.1}, {"label": "1999", "labelFr": "1999", "value": 1.7}, {"label": "2000", "labelFr": "2000", "value": 0.6}, {"label": "2001", "labelFr": "2001", "value": 0.6}, {"label": "2002", "labelFr": "2002", "value": 2.6}, {"label": "2003", "labelFr": "2003", "value": 1.8}, {"label": "2004", "labelFr": "2004", "value": 2.9}, {"label": "2005", "labelFr": "2005", "value": 1.6}, {"label": "2006", "labelFr": "2006", "value": 1.9}, {"label": "2007", "labelFr": "2007", "value": 1.5}, {"label": "2008", "labelFr": "2008", "value": 1.4}, {"label": "2009", "labelFr": "2009", "value": 0.8}, {"label": "2010", "labelFr": "2010", "value": 2.8}, {"label": "2011", "labelFr": "2011", "value": 1.9}, {"label": "2012", "labelFr": "2012", "value": 1.6}, {"label": "2013", "labelFr": "2013", "value": 4.0}, {"label": "2014", "labelFr": "2014", "value": 3.9}, {"label": "2015", "labelFr": "2015", "value": 3.4}, {"label": "2016", "labelFr": "2016", "value": 1.2}, {"label": "2017", "labelFr": "2017", "value": 3.0}, {"label": "2018", "labelFr": "2018", "value": 1.8}, {"label": "2019", "labelFr": "2019", "value": 1.6}, {"label": "2020", "labelFr": "2020", "value": 0.2}, {"label": "2021", "labelFr": "2021", "value": 3.8}, {"label": "2022", "labelFr": "2022", "value": 1.5}, {"label": "2023", "labelFr": "2023", "value": 14.8, "highlight": true}, {"label": "2024", "labelFr": "2024", "value": 4.9}, {"label": "2025", "labelFr": "2025", "value": 7.3}], "xLabels": ["1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"], "ySuffix": "M ha", "decimals": 1, "meanLine": {"value": 2.45, "label": "54-year mean: 2.45M ha", "labelFr": "Moyenne 54 ans : 2,45 M ha"}},
  },
  {
    slug: "ai-roi-zero",
    kicker: "Federal AI register · cost and outcome data",
    headline: "Zero of 412 registered federal AI systems have public cost or outcome data.",
    deck: "The register lists 412 systems across 43 organizations, with 160 in production. The outcome table that would join costs and results to each system is intentionally empty: no per-system cost data and no outcome metrics exist in any public source.",
    note: "A stated structural finding of the project: the register publishes no cost, go-live, or outcome fields to join against.",
    source: "Government of Canada AI Register (MVP), open.canada.ca, dataset date Apr 28, 2026.",
    shareText: "Canada's federal AI register lists 412 systems. Zero of them have public cost or outcome data, so ROI cannot be computed.",
    projectName: "AI ROI Ledger",
    projectUrl: "",
    fr: {
      kicker: "Registre fédéral de l'IA · données de coûts et de résultats",
      headline: "Zéro des 412 systèmes d'IA fédéraux enregistrés ont des données publiques de coûts ou de résultats.",
      deck: "Le registre compte 412 systèmes dans 43 organisations, dont 160 en production. La table qui relierait coûts et résultats à chaque système est intentionnellement vide : aucune donnée de coût par système ni aucune mesure de résultats n'existe dans une source publique.",
      note: "Constat structurel du projet : le registre ne publie aucun champ de coût, de mise en service ou de résultat à croiser.",
      source: "Registre de l'IA du gouvernement du Canada (version minimale), ouvert.canada.ca, données du 28 avr. 2026.",
      shareText: "Le registre fédéral de l'IA du Canada compte 412 systèmes. Zéro ont des données publiques de coûts ou de résultats : le rendement est incalculable.",
    },
    chart: {"kind": "stat", "bigValue": "0 of 412", "bigValueFr": "0 sur 412", "bigLabel": "registered federal AI systems have any public cost or outcome data", "bigLabelFr": "systèmes d'IA fédéraux enregistrés ont des données publiques de coûts ou de résultats", "stats": [{"value": "0", "label": "systems with cost data", "labelFr": "systèmes avec données de coûts"}, {"value": "160", "label": "in production, outcomes unmeasured", "labelFr": "en production, résultats non mesurés"}, {"value": "43", "label": "organizations on the register", "labelFr": "organisations au registre"}]},
  },
  {
    slug: "dc-sixplex",
    kicker: "Development charges per unit · frozen June 2024 schedule",
    headline: "A new detached house carries a $137,846 development charge. A sixplex typically owes $0.",
    deck: "Toronto's frozen 2024 schedule charges $137,846 per single or semi-detached unit and $80,690 per apartment unit. Developments of up to six units are exempt from city development charges, so a sixplex on the same lot typically pays nothing.",
    note: "Rates hand-encoded from the City rate notice; verify against By-law 1137-2022. The sixplex exemption is per Chapter 415 and project guidance; check before relying on it.",
    source: "City of Toronto rate notice, Development Charge Rates Effective June 6, 2024; By-law 1137-2022.",
    shareText: "Toronto charges $137,846 in development charges for one detached house, and $0 for a sixplex. The exemption is the whole ballgame.",
    projectName: "Build Check",
    projectUrl: "https://buildcheck.nshipyard.com",
    fr: {
      kicker: "Redevances d'aménagement par logement · grille gelée de juin 2024",
      headline: "Une maison individuelle neuve coûte 137 846 $ en redevances. Un sixplex ne doit généralement rien.",
      deck: "La grille 2024 gelée de Toronto exige 137 846 $ par maison individuelle ou jumelée et 80 690 $ par logement en appartement. Les projets d'au plus six logements sont exemptés des redevances municipales : un sixplex sur le même terrain ne paie généralement rien.",
      note: "Tarifs transcrits à la main de l'avis municipal; vérifier au règlement 1137-2022. L'exemption du sixplex découle du chapitre 415 et des guides du projet; à vérifier avant usage.",
      source: "Ville de Toronto, avis de tarifs, Redevances d'aménagement en vigueur le 6 juin 2024; règlement 1137-2022.",
      shareText: "Toronto exige 137 846 $ de redevances pour une maison individuelle, et 0 $ pour un sixplex. L'exemption change tout.",
    },
    chart: {"kind": "hbars", "unit": "$ per unit", "unitFr": "$ par logement", "rows": [{"label": "Single / semi-detached", "labelFr": "Individuelle ou jumelée", "value": 137846, "display": "$137,846", "displayFr": "137 846 $", "highlight": true}, {"label": "Multiples, 2+ bedroom", "labelFr": "Multiplex, 2 chambres et +", "value": 113938, "display": "$113,938", "displayFr": "113 938 $"}, {"label": "Apartments, 2+ bedroom", "labelFr": "Appartements, 2 chambres et +", "value": 80690, "display": "$80,690", "displayFr": "80 690 $"}, {"label": "Sixplex (exempt)", "labelFr": "Sixplex (exempté)", "value": 0, "display": "$0", "displayFr": "0 $"}]},
  },
  {
    slug: "coa-approvals",
    kicker: "Committee of Adjustment approval rates · decided since 2017",
    headline: "Adding to your home is approved 95.6% of the time. Splitting your lot fails 1 in 6.",
    deck: "The refusal rate on lot splits (16.5%, n=1,620) runs 3.7 times the refusal rate on home additions (4.4%, n=11,029). Consent applications are refused nearly twice as often as minor variances: 13.0% versus 7.5%.",
    note: "Decided applications only; withdrawn and deferred excluded. Descriptive rates with Wilson 95% intervals in the source file, not predictions.",
    source: "City of Toronto open data, Committee of Adjustment Applications, 33,992 records since 2017, retrieved Oct 9, 2026.",
    shareText: "Toronto approves 95.6% of home additions but refuses 1 in 6 lot splits. Lot splits fail 3.7x as often.",
    projectName: "Build Check",
    projectUrl: "https://buildcheck.nshipyard.com",
    fr: {
      kicker: "Taux d'approbation du Comité de dérogation · décisions depuis 2017",
      headline: "Agrandir sa maison est approuvé 95,6 % du temps. Diviser son terrain échoue 1 fois sur 6.",
      deck: "Le taux de refus des divisions de lot (16,5 %, n = 1 620) est 3,7 fois celui des agrandissements (4,4 %, n = 11 029). Les demandes d'autorisation sont refusées près de deux fois plus souvent que les dérogations mineures : 13,0 % contre 7,5 %.",
      note: "Demandes tranchées seulement; retraits et reports exclus. Taux descriptifs avec intervalles de Wilson à 95 % au fichier source, pas des prédictions.",
      source: "Ville de Toronto, données ouvertes, Demandes au Comité de dérogation, 33 992 dossiers depuis 2017, récupérées le 9 oct. 2026.",
      shareText: "Toronto approuve 95,6 % des agrandissements de maison, mais refuse 1 division de lot sur 6. Les divisions échouent 3,7 fois plus souvent.",
    },
    chart: {"kind": "grouped", "categories": ["Home addition", "Lot split", "Consent", "Minor variance"], "categoriesFr": ["Agrandissement", "Division de lot", "Autorisation", "Dérogation mineure"], "series": [{"name": "Approval rate", "nameFr": "Taux d'approbation", "values": [95.58, 83.52, 87.02, 92.51]}], "ySuffix": "%", "decimals": 1},
  },
  {
    slug: "youth-unemployment",
    kicker: "Unemployment rate · Labour Force Survey, Aug 2026",
    headline: "Youth unemployment is 12.9%, double the national rate of 6.4%.",
    deck: "Men (6.9%) trail women (6.0%) by nearly a point. The provincial spread runs from 5.0% in Manitoba to 8.6% in Newfoundland and Labrador, and Ontario (6.9%) sits 1.3 points above Quebec (5.6%).",
    note: "Seasonally adjusted Labour Force Survey estimates; 17 LFS series verified against StatCan's official CSV during the WDS nightly lock.",
    source: "Statistics Canada, Labour Force Survey, table 14-10-0287-01, Aug 2026.",
    shareText: "Canadian youth unemployment is 12.9%, double the national 6.4%. Provincial rates run from 5.0% (Manitoba) to 8.6% (N.L.).",
    projectName: "Cred",
    projectUrl: "",
    fr: {
      kicker: "Taux de chômage · Enquête sur la population active, août 2026",
      headline: "Le chômage des jeunes est de 12,9 %, le double du taux national de 6,4 %.",
      deck: "Les hommes (6,9 %) dépassent les femmes (6,0 %) de près d'un point. L'écart provincial va de 5,0 % au Manitoba à 8,6 % à Terre-Neuve-et-Labrador, et l'Ontario (6,9 %) se situe 1,3 point au-dessus du Québec (5,6 %).",
      note: "Estimations désaisonnalisées de l'Enquête sur la population active; 17 séries vérifiées au CSV officiel de StatCan pendant le verrou nocturne du SSD.",
      source: "Statistique Canada, Enquête sur la population active, tableau 14-10-0287-01, août 2026.",
      shareText: "Le chômage des jeunes au Canada est de 12,9 %, le double du 6,4 % national. Les taux provinciaux vont de 5,0 % (Manitoba) à 8,6 % (T.-N.-L.).",
    },
    chart: {"kind": "grouped", "categories": ["National", "Youth 15-24", "Men", "Women"], "categoriesFr": ["National", "Jeunes 15-24 ans", "Hommes", "Femmes"], "series": [{"name": "Unemployment rate", "nameFr": "Taux de chômage", "values": [6.4, 12.9, 6.9, 6.0]}], "ySuffix": "%", "decimals": 1},
  },
  {
    slug: "ai-spend",
    kicker: "Tracked federal AI spend · $655.3M across 42 contracts",
    headline: "Two line items are 90.1% of Ottawa's tracked AI spend.",
    deck: "The $350.6M Dayforce payroll contract and the $240M Cohere investment total $590.6M of $655.3M tracked. 97.4% went to Canadian-owned vendors; the $16.4M foreign tail is led by Thales of France at $10.3M.",
    note: "Award and announced values, not audited payments. A verifiable floor of the $800M+ topline, not a census; CSE and CSIS declined the Order Paper request.",
    source: "Order Paper responses + CanadaBuys via Wire Report Q-1229 (Oct 1, 2026); Canadian Press topline May 13, 2026.",
    shareText: "90.1% of Ottawa's tracked AI spend is two line items: the $350.6M Dayforce contract and the $240M Cohere investment.",
    projectName: "AI Spending Receipt",
    projectUrl: "",
    fr: {
      kicker: "Dépenses fédérales suivies en IA · 655,3 M$ sur 42 contrats",
      headline: "Deux postes représentent 90,1 % des dépenses suivies d'Ottawa en IA.",
      deck: "Le contrat de paie Dayforce (350,6 M$) et l'investissement Cohere (240 M$) totalisent 590,6 M$ sur 655,3 M$ suivis. 97,4 % sont allés à des fournisseurs canadiens; la part étrangère de 16,4 M$ est menée par Thales (France) à 10,3 M$.",
      note: "Valeurs d'attribution et annoncées, pas des paiements vérifiés. Plancher vérifiable du total de plus de 800 M$, pas un recensement; le CST et le SCRS ont refusé la demande d'ordre de la Chambre.",
      source: "Réponses aux ordres de la Chambre + AchatsCanada via Wire Report Q-1229 (1er oct. 2026); La Presse canadienne, 13 mai 2026.",
      shareText: "90,1 % des dépenses suivies d'Ottawa en IA tiennent en deux postes : le contrat Dayforce (350,6 M$) et l'investissement Cohere (240 M$).",
    },
    chart: {"kind": "hbars", "unit": "$M", "unitFr": "M$", "rows": [{"label": "Dayforce, Inc.", "labelFr": "Dayforce, Inc.", "value": 350.6, "display": "$350.6M", "displayFr": "350,6 M$", "highlight": true}, {"label": "Cohere Inc.", "labelFr": "Cohere Inc.", "value": 240.0, "display": "$240.0M", "displayFr": "240,0 M$", "highlight": true}, {"label": "IBISKA - Lemay.ai JV", "labelFr": "IBISKA - Lemay.ai (coentr.)", "value": 11.5, "display": "$11.5M", "displayFr": "11,5 M$"}, {"label": "Thales", "labelFr": "Thales", "value": 10.3, "display": "$10.3M", "displayFr": "10,3 M$"}, {"label": "Calian", "labelFr": "Calian", "value": 6.7, "display": "$6.7M", "displayFr": "6,7 M$"}, {"label": "Louis Tanguay Informatique", "labelFr": "Louis Tanguay Informatique", "value": 5.7, "display": "$5.7M", "displayFr": "5,7 M$"}, {"label": "NuEnergy.ai", "labelFr": "NuEnergy.ai", "value": 3.3, "display": "$3.3M", "displayFr": "3,3 M$"}, {"label": "Experis", "labelFr": "Experis", "value": 3.3, "display": "$3.3M", "displayFr": "3,3 M$"}]},
  },
  {
    slug: "kw-contagion",
    kicker: "New-house price ratio to Toronto · 2016-2026",
    headline: "Kitchener-Waterloo new-house prices outgrew Toronto's by 47% since 2017.",
    deck: "K-W's price ratio to Toronto rose from 1.02 in 2016 to 1.43 in 2026, after tracking Toronto within 10% for decades. Hamilton fell 6.6% from 2021 to 2026 while K-W still gained 8.4%.",
    note: "StatCan New Housing Price Index covers new housing only, not resale. Barrie and Brantford have no NHPI coverage.",
    source: "Statistics Canada, New Housing Price Index, table 18-10-0205-01, monthly 1981-2026.",
    shareText: "Kitchener-Waterloo new-house prices tracked Toronto within 10% for decades, then outgrew it by 47% since 2017.",
    projectName: "Contagion Tracker",
    projectUrl: "https://pricewave.canada.nshipyard.com",
    fr: {
      kicker: "Ratio des prix des maisons neuves à Toronto · 2016-2026",
      headline: "Les prix des maisons neuves de Kitchener-Waterloo ont crû 47 % plus vite que ceux de Toronto depuis 2017.",
      deck: "Le ratio de K.-W. à Toronto est passé de 1,02 en 2016 à 1,43 en 2026, après avoir suivi Toronto à 10 % près pendant des décennies. Hamilton a reculé de 6,6 % de 2021 à 2026 pendant que K.-W. gagnait encore 8,4 %.",
      note: "L'Indice des prix des logements neufs de StatCan couvre les logements neufs seulement, pas la revente. Barrie et Brantford ne sont pas couvertes.",
      source: "Statistique Canada, Indice des prix des logements neufs, tableau 18-10-0205-01, mensuel 1981-2026.",
      shareText: "Les prix des maisons neuves de Kitchener-Waterloo suivaient Toronto à 10 % près pendant des décennies, puis l'ont dépassé de 47 % depuis 2017.",
    },
    chart: {"kind": "tseries", "variant": "line", "series": [{"name": "Kitchener-Waterloo", "nameFr": "Kitchener-Waterloo", "values": [1.016, 1.0, 1.008, 1.035, 1.088, 1.27, 1.383, 1.378, 1.366, 1.402, 1.425]}, {"name": "Hamilton", "nameFr": "Hamilton", "values": [1.034, 1.0, 1.014, 1.03, 1.05, 1.065, 1.023, 1.017, 1.013, 1.024, 1.03]}, {"name": "Oshawa", "nameFr": "Oshawa", "values": [1.038, 1.0, 1.012, 1.011, 1.019, 1.061, 1.06, 1.059, 1.066, 1.074, 1.076]}, {"name": "Guelph", "nameFr": "Guelph", "values": [1.035, 1.0, 1.014, 1.031, 1.066, 1.1, 1.075, 1.071, 1.075, 1.095, 1.117]}], "xLabels": ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"], "decimals": 2},
  },
  {
    slug: "gpu-premium",
    kicker: "On-demand GPU list price premium, Canada vs US · Oct 2026",
    headline: "The Canada GPU premium scales with scarcity: H100s cost 23% more in Montreal than Virginia.",
    deck: "All 18 surveyed SKUs are cheaper in the US, with a 10% floor on older cards like the V100. Eight A100s run $35.96/hr in Montreal versus $31.27 in Virginia, about $41,100 extra per year of continuous use.",
    note: "On-demand list prices only, not spot or reserved; FX-adjusted at the Bank of Canada rate of Oct 8, 2026. Azure and AWS only.",
    source: "Azure Retail Prices API; AWS Price List Bulk API; Bank of Canada Valet FX, snapshot Oct 9, 2026.",
    shareText: "An H100 costs 23% more per hour in Montreal than Virginia. All 18 GPU SKUs surveyed are cheaper in the US.",
    projectName: "GPU Premium",
    projectUrl: "",
    fr: {
      kicker: "Surprime des GPU au Canada c. É.-U., prix à la demande · oct. 2026",
      headline: "La surprime canadienne des GPU suit la rareté : un H100 coûte 23 % plus cher à Montréal qu'en Virginie.",
      deck: "Les 18 modèles étudiés sont tous moins chers aux États-Unis, avec un plancher de 10 % sur les cartes plus anciennes comme la V100. Huit A100 coûtent 35,96 $/h à Montréal contre 31,27 $ en Virginie, soit environ 41 100 $ de plus par année d'usage continu.",
      note: "Prix à la demande seulement, hors au comptant et réservé; convertis au taux de la Banque du Canada du 8 oct. 2026. Azure et AWS seulement.",
      source: "API de prix Azure; API de prix AWS; taux de change de la Banque du Canada, instantané du 9 oct. 2026.",
      shareText: "Un H100 coûte 23 % plus cher l'heure à Montréal qu'en Virginie. Les 18 modèles de GPU étudiés sont moins chers aux É.-U.",
    },
    chart: {"kind": "hbars", "unit": "% premium over US price", "unitFr": "% de plus qu'aux É.-U.", "rows": [{"label": "H100 80GB (Azure)", "labelFr": "H100 80 Go (Azure)", "value": 23.07, "display": "23.1%", "displayFr": "23,1 %", "highlight": true}, {"label": "A100 80GB (Azure)", "labelFr": "A100 80 Go (Azure)", "value": 20.0, "display": "20.0%", "displayFr": "20,0 %"}, {"label": "A100 40GB (AWS)", "labelFr": "A100 40 Go (AWS)", "value": 15.0, "display": "15.0%", "displayFr": "15,0 %"}, {"label": "A10G 24GB (AWS)", "labelFr": "A10G 24 Go (AWS)", "value": 11.03, "display": "11.0%", "displayFr": "11,0 %"}, {"label": "T4 16GB (Azure)", "labelFr": "T4 16 Go (Azure)", "value": 11.03, "display": "11.0%", "displayFr": "11,0 %"}, {"label": "V100 16GB (Azure)", "labelFr": "V100 16 Go (Azure)", "value": 10.0, "display": "10.0%", "displayFr": "10,0 %"}]},
  },
  {
    slug: "permit-collapse",
    kicker: "Median days, application to issuance · by year",
    headline: "New-building permit review collapsed: a 753-day median in 2021, 45 days in 2026.",
    deck: "New-house permits fell from 523 days in 2015 to 43 in 2026. One in four new buildings still takes over two years: the 75th percentile sits at 764 days.",
    note: "Strong survivorship bias in early years: only permits still open appear, skewing old medians upward. 2026 is a partial year.",
    source: "City of Toronto open data, Building Permits (Active Permits), retrieved Oct 8, 2026.",
    shareText: "Toronto's new-building permit median fell from 753 days (2021) to 45 days (2026). One in four still takes over two years.",
    projectName: "Development Pipeline",
    projectUrl: "https://development.canada.nshipyard.com",
    fr: {
      kicker: "Jours médians, demande à délivrance · par année",
      headline: "L'examen des permis de construction neuve s'est effondré : médiane de 753 jours en 2021, 45 jours en 2026.",
      deck: "Les permis de maisons neuves sont passés de 523 jours en 2015 à 43 en 2026. Un nouveau bâtiment sur quatre prend encore plus de deux ans : le 75e percentile est à 764 jours.",
      note: "Fort biais de survie les premières années : seuls les permis encore ouverts figurent, ce qui gonfle les médianes anciennes. 2026 est une année partielle.",
      source: "Ville de Toronto, données ouvertes, Permis de construire (permis actifs), récupérés le 8 oct. 2026.",
      shareText: "La médiane des permis de construction neuve à Toronto est passée de 753 jours (2021) à 45 jours (2026). Un sur quatre prend encore plus de deux ans.",
    },
    chart: {"kind": "tseries", "variant": "line", "series": [{"name": "New Building", "nameFr": "Nouveau bâtiment", "values": [167.0, 168.0, 492.0, 436.0, 605.5, 257.0, 753.0, 219.5, 342.0, 184.0, 83.5, 45.0]}, {"name": "New Houses", "nameFr": "Nouvelles maisons", "values": [523.0, 80.0, 67.0, 53.0, 94.0, 56.0, 403.0, 97.5, 94.0, 66.0, 54.0, 43.0]}], "xLabels": ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]},
  },
  {
    slug: "311-wildlife",
    kicker: "Top 311 request types · 2.23M requests, 2022-2026",
    headline: "Toronto's number one 311 request is injured wildlife.",
    deck: "Injured - Wildlife drew 75,726 requests, the single largest request type citywide. Animal-related calls total 162,731, or 7.3% of all 2.23M requests. Garbage bins and potholes fill most of the rest of the top 10.",
    note: "Counts from the City's normalized request-type taxonomy (952 types). Type wording is the City's own.",
    source: "City of Toronto open data, 311 Service Requests - Customer Initiated, 2022-01-01 to 2026-10-07, retrieved Oct 8, 2026.",
    shareText: "Toronto's most common 311 request is injured wildlife: 75,726 calls. Animal-related requests are 7.3% of all 2.23M.",
    projectName: "311 Taxonomy",
    projectUrl: "https://311.canada.nshipyard.com",
    fr: {
      kicker: "Types de demandes 311 les plus fréquents · 2,23 M de demandes, 2022-2026",
      headline: "La demande 311 la plus fréquente à Toronto concerne un animal sauvage blessé.",
      deck: "« Injured - Wildlife » a généré 75 726 demandes, le type le plus fréquent de la ville. Les demandes liées aux animaux totalisent 162 731, soit 7,3 % des 2,23 M de demandes. Les bacs à ordures et les nids-de-poule occupent la plupart des autres places du top 10.",
      note: "Comptes tirés de la taxonomie normalisée des types de demandes de la Ville (952 types). Le libellé des types est celui de la Ville.",
      source: "Ville de Toronto, données ouvertes, Demandes de service 311 (initiées par les clients), 2022-01-01 au 2026-10-07, récupérées le 8 oct. 2026.",
      shareText: "La demande 311 la plus fréquente à Toronto concerne un animal sauvage blessé : 75 726 appels. Les demandes liées aux animaux représentent 7,3 % des 2,23 M.",
    },
    chart: {"kind": "hbars", "unit": "requests", "unitFr": "demandes", "rows": [{"label": "Injured - Wildlife", "labelFr": "Animal sauvage blessé", "value": 75726, "display": "75,726", "displayFr": "75 726", "highlight": true}, {"label": "Residential: Bin: Repair or Replace Lid", "labelFr": "Bac résidentiel : réparer/remplacer le couvercle", "value": 56278, "display": "56,278", "displayFr": "56 278"}, {"label": "Property Standards", "labelFr": "Normes de propriété", "value": 45228, "display": "45,228", "displayFr": "45 228"}, {"label": "Cadaver - Wildlife", "labelFr": "Cadavre - animal sauvage", "value": 41894, "display": "41,894", "displayFr": "41 894"}, {"label": "Residential Bin Lid Damaged", "labelFr": "Couvercle de bac résidentiel endommagé", "value": 39071, "display": "39,071", "displayFr": "39 071"}, {"label": "Res / Garbage / Not Picked Up", "labelFr": "Ordures résidentielles non ramassées", "value": 37098, "display": "37,098", "displayFr": "37 098"}, {"label": "Road Pothole / Road Damage", "labelFr": "Nid-de-poule / dommage à la chaussée", "value": 35691, "display": "35,691", "displayFr": "35 691"}, {"label": "Sewer Service Line-Blocked", "labelFr": "Branchement d'égout bloqué", "value": 35018, "display": "35,018", "displayFr": "35 018"}, {"label": "General Pruning", "labelFr": "Élagage général", "value": 34545, "display": "34,545", "displayFr": "34 545"}, {"label": "Residential Furniture / Not Picked Up", "labelFr": "Meubles résidentiels non ramassés", "value": 33476, "display": "33,476", "displayFr": "33 476"}]},
  },
  {
    slug: "pipe-ward-gap",
    kicker: "Water pipes laid before 1955, by ward · 49,414 segments",
    headline: "84% of the water pipes in Toronto-St. Paul's were laid before 1955. In Scarborough North, 1% were.",
    deck: "The wards with the oldest pipes cluster downtown, where the median pipe was laid between 1916 and 1922. The newest wards are in Scarborough and Etobicoke, built out after 1969. The gap between the two ends of the city is 84 to 1.",
    note: "Age-based geographic proxy for lead-era service pipes, not a lead measurement. Street watermains only, not household connections.",
    source: "City of Toronto open data, Watermains package (distribution + transmission), retrieved Oct 8, 2026.",
    shareText: "84% of the water pipes in Toronto-St. Paul's were laid before 1955. In Scarborough North, 1% were.",
    projectName: "Watermain Codebook",
    projectUrl: "https://watermains.canada.nshipyard.com",
    fr: {
      kicker: "Conduites d'eau posées avant 1955, par quartier · 49 414 segments",
      headline: "84 % des conduites d'eau de Toronto-St. Paul's ont été posées avant 1955. À Scarborough North, c'est 1 %.",
      deck: "Les quartiers aux conduites les plus anciennes se concentrent au centre-ville, où la conduite médiane a été posée entre 1916 et 1922. Les quartiers les plus récents sont à Scarborough et à Etobicoke, aménagés après 1969. L'écart entre les deux extrémités de la ville est de 84 contre 1.",
      note: "Indicateur d'âge géographique pour les branchements de l'ère du plomb, pas une mesure de plomb. Conduites de rue seulement, pas les branchements domestiques.",
      source: "Ville de Toronto, données ouvertes, paquet Conduites d'eau (distribution + transmission), récupéré le 8 oct. 2026.",
      shareText: "84 % des conduites d'eau de Toronto-St. Paul's ont été posées avant 1955. À Scarborough North, c'est 1 %.",
    },
    chart: {"kind": "hbars", "unit": "% of watermains pre-1955", "unitFr": "% des conduites datant d'avant 1955", "rows": [{"label": "12 · Toronto-St. Paul's", "labelFr": "12 · Toronto-St. Paul's", "value": 84.2, "display": "84.2%", "displayFr": "84,2 %", "highlight": true}, {"label": "19 · Beaches-East York", "labelFr": "19 · Beaches-East York", "value": 79.8, "display": "79.8%", "displayFr": "79,8 %", "highlight": true}, {"label": "9 · Davenport", "labelFr": "9 · Davenport", "value": 77.3, "display": "77.3%", "displayFr": "77,3 %", "highlight": true}, {"label": "14 · Toronto-Danforth", "labelFr": "14 · Toronto-Danforth", "value": 76.5, "display": "76.5%", "displayFr": "76,5 %", "highlight": true}, {"label": "4 · Parkdale-High Park", "labelFr": "4 · Parkdale-High Park", "value": 72.7, "display": "72.7%", "displayFr": "72,7 %", "highlight": true}, {"label": "1 · Etobicoke North", "labelFr": "1 · Etobicoke North", "value": 4.9, "display": "4.9%", "displayFr": "4,9 %"}, {"label": "7 · Humber River-Black Creek", "labelFr": "7 · Humber River-Black Creek", "value": 4.1, "display": "4.1%", "displayFr": "4,1 %"}, {"label": "22 · Scarborough-Agincourt", "labelFr": "22 · Scarborough-Agincourt", "value": 3.7, "display": "3.7%", "displayFr": "3,7 %"}, {"label": "17 · Don Valley North", "labelFr": "17 · Don Valley North", "value": 2.4, "display": "2.4%", "displayFr": "2,4 %"}, {"label": "23 · Scarborough North", "labelFr": "23 · Scarborough North", "value": 1.0, "display": "1.0%", "displayFr": "1,0 %"}]},
  },
  {
    slug: "one-contract",
    kicker: "Top vendors by spend · $21.5B over 14 years",
    headline: "One company won a single City of Toronto contract worth $397.3M.",
    deck: "North Tunnel Constructors' single 2018 award is 1.85% of 14 years of city spending. The top vendor, Furfari Paving, needed 58 awards to reach $781.7M. The award counts beside each bar show how concentrated the money is.",
    note: "Award values as published, not audited payments; multi-year awards appear in full in the award year. Three phone-number-pattern records quarantined and excluded.",
    source: "City of Toronto open data (CKAN): awarded contracts, non-competitive contracts, consulting expenditures, retrieved Oct 8, 2026.",
    shareText: "One company won a single City of Toronto contract worth $397.3M.",
    projectName: "Procurement Spending",
    projectUrl: "https://procurement.canada.nshipyard.com",
    fr: {
      kicker: "Principaux fournisseurs par dépenses · 21,5 G$ sur 14 ans",
      headline: "Une entreprise a remporté un seul contrat de la Ville de Toronto : 397,3 M$.",
      deck: "L'unique contrat de 2018 de North Tunnel Constructors représente 1,85 % des dépenses de la Ville sur 14 ans. Le premier fournisseur, Furfari Paving, a eu besoin de 58 contrats pour atteindre 781,7 M$. Le nombre de contrats à côté de chaque barre montre la concentration de l'argent.",
      note: "Valeurs des contrats telles que publiées, pas des paiements vérifiés; les contrats pluriannuels figurent en entier l'année d'attribution. Trois dossiers à numéro de téléphone mis en quarantaine et exclus.",
      source: "Ville de Toronto, données ouvertes (CKAN) : contrats attribués, contrats non concurrentiels, dépenses de consultation, récupérées le 8 oct. 2026.",
      shareText: "Une entreprise a remporté un seul contrat de la Ville de Toronto : 397,3 M$.",
    },
    chart: {"kind": "hbars", "unit": "$M", "unitFr": "M$", "rows": [{"label": "Furfari Paving Co. Ltd.", "labelFr": "Furfari Paving Co. Ltd.", "value": 781.7, "display": "$781.7M · 58 awards", "displayFr": "781,7 M$ · 58 contrats"}, {"label": "GFL Environmental Inc.", "labelFr": "GFL Environmental Inc.", "value": 517.6, "display": "$517.6M · 17 awards", "displayFr": "517,6 M$ · 17 contrats"}, {"label": "Sanscon Construction Limited", "labelFr": "Sanscon Construction Limited", "value": 490.3, "display": "$490.3M · 109 awards", "displayFr": "490,3 M$ · 109 contrats"}, {"label": "2489960 Ontario Inc.", "labelFr": "2489960 Ontario Inc.", "value": 469.7, "display": "$469.7M · 44 awards", "displayFr": "469,7 M$ · 44 contrats"}, {"label": "Fer-Pal Construction Ltd.", "labelFr": "Fer-Pal Construction Ltd.", "value": 436.7, "display": "$436.7M · 38 awards", "displayFr": "436,7 M$ · 38 contrats"}, {"label": "North Tunnel Constructors ULC", "labelFr": "North Tunnel Constructors ULC", "value": 397.3, "display": "$397.3M · 1 award", "displayFr": "397,3 M$ · 1 contrat", "highlight": true}, {"label": "Rabcon Contractors Ltd.", "labelFr": "Rabcon Contractors Ltd.", "value": 374.8, "display": "$374.8M · 28 awards", "displayFr": "374,8 M$ · 28 contrats"}, {"label": "Pave-Tar Construction Ltd.", "labelFr": "Pave-Tar Construction Ltd.", "value": 349.7, "display": "$349.7M · 51 awards", "displayFr": "349,7 M$ · 51 contrats"}]},
  },
  {
    slug: "parking-decline",
    kicker: "Parking tickets by ward, % change 2023-2025",
    headline: "Toronto issued 9.4% fewer parking tickets in 2025. Downtown wards fell the most, while Scarborough wards rose.",
    deck: "Citywide tickets fell from 1,961,500 to 1,776,622. Toronto-Danforth dropped 22.0%, the steepest fall of any ward. Scarborough North rose 21.3% over the same period, so the citywide number hides two opposite trends.",
    note: "Ticket counts reflect enforcement levels and policy, not proven changes in violations. Calendar years 2023-2025.",
    source: "City of Toronto open data, Parking Tickets, 2023-2025 monthly files, retrieved Oct 8, 2026.",
    shareText: "Toronto issued 9.4% fewer parking tickets in 2025. Downtown wards fell the most, while Scarborough wards rose.",
    projectName: "Parking Tickets",
    projectUrl: "https://parking.canada.nshipyard.com",
    fr: {
      kicker: "Contraventions par quartier, % de variation 2023-2025",
      headline: "Toronto a émis 9,4 % de contraventions de stationnement en moins en 2025. Les quartiers du centre-ville ont le plus baissé, tandis que ceux de Scarborough ont augmenté.",
      deck: "Les contraventions sont passées de 1 961 500 à 1 776 622 dans toute la ville. Toronto-Danforth a chuté de 22,0 %, la plus forte baisse de tous les quartiers. Scarborough North a augmenté de 21,3 % sur la même période : le chiffre municipal cache deux tendances opposées.",
      note: "Le nombre de contraventions reflète les effectifs et les politiques d'application, pas une variation prouvée des infractions. Années civiles 2023-2025.",
      source: "Ville de Toronto, données ouvertes, Contraventions de stationnement, fichiers mensuels 2023-2025, récupérées le 8 oct. 2026.",
      shareText: "Toronto a émis 9,4 % de contraventions de stationnement en moins en 2025. Les quartiers du centre-ville ont le plus baissé, tandis que ceux de Scarborough ont augmenté.",
    },
    chart: {"kind": "hbars", "unit": "% change in tickets, 2023-2025", "unitFr": "% de variation des contraventions, 2023-2025", "rows": [{"label": "Toronto-Danforth", "labelFr": "Toronto-Danforth", "value": -22.0, "display": "-22.0%", "displayFr": "-22,0 %"}, {"label": "Beaches-East York", "labelFr": "Beaches-East York", "value": -21.5, "display": "-21.5%", "displayFr": "-21,5 %"}, {"label": "Parkdale-High Park", "labelFr": "Parkdale-High Park", "value": -14.0, "display": "-14.0%", "displayFr": "-14,0 %"}, {"label": "Scarborough-Rouge Park", "labelFr": "Scarborough-Rouge Park", "value": 15.4, "display": "+15.4%", "displayFr": "+15,4 %", "highlight": true}, {"label": "Don Valley East", "labelFr": "Don Valley East", "value": 18.7, "display": "+18.7%", "displayFr": "+18,7 %", "highlight": true}, {"label": "Scarborough North", "labelFr": "Scarborough North", "value": 21.3, "display": "+21.3%", "displayFr": "+21,3 %", "highlight": true}]},
  },
  {
    slug: "landlord-blank",
    kicker: "Management names vs worst evaluation scores · 3,593 buildings",
    headline: "Buildings with no named management company are 13.2% of Toronto's apartment buildings but 41.2% of the worst evaluation scores.",
    deck: "473 buildings list no management company, yet account for 14 of the 34 buildings with the worst scores. Named operators cover 86.8% of buildings and 58.8% of the worst scores. The worst buildings disproportionately hide behind blank paperwork.",
    note: "Operator = management company, not legal owner. Blank names kept as 'unattributed', not dropped.",
    source: "City of Toronto, Apartment Building Evaluation, open.toronto.ca, evaluation vintage Oct 8, 2026.",
    shareText: "Buildings with no named management company are 13.2% of Toronto's apartment buildings but 41.2% of the worst evaluation scores.",
    projectName: "Landlord Index",
    projectUrl: "https://canada-landlord-index.vercel.app",
    fr: {
      kicker: "Sociétés de gestion vs pires notes d'évaluation · 3 593 immeubles",
      headline: "Les immeubles sans société de gestion nommée sont 13,2 % des immeubles d'appartements de Toronto, mais 41,2 % des pires notes d'évaluation.",
      deck: "473 immeubles n'indiquent aucune société de gestion, mais comptent pour 14 des 34 immeubles aux pires notes. Les exploitants nommés couvrent 86,8 % des immeubles et 58,8 % des pires notes. Les pires immeubles se cachent de façon disproportionnée derrière des dossiers vierges.",
      note: "Exploitant = société de gestion, pas le propriétaire légal. Les noms vierges sont conservés comme « sans attribution », pas écartés.",
      source: "Ville de Toronto, Évaluation des immeubles d'appartements, open.toronto.ca, millésime d'évaluation 8 oct. 2026.",
      shareText: "Les immeubles sans société de gestion nommée sont 13,2 % des immeubles d'appartements de Toronto, mais 41,2 % des pires notes d'évaluation.",
    },
    chart: {"kind": "grouped", "categories": ["Share of buildings", "Share of red-scored buildings"], "categoriesFr": ["Part des immeubles", "Part des notes rouges"], "series": [{"name": "No operator name", "nameFr": "Sans nom d'exploitant", "values": [13.2, 41.2]}, {"name": "Named operator", "nameFr": "Exploitant nommé", "values": [86.8, 58.8]}], "ySuffix": "%", "decimals": 1},
  },
  {
    slug: "exports-us",
    kicker: "Merchandise exports by destination · Aug 2026",
    headline: "The US buys 73.8% of Canada's exports.",
    deck: "Exports to the US were $54.46B of $73.83B in August 2026. China ($4.20B) and the EU ($3.68B) are the next partners but far behind. The Canada-US surplus of $21.44B masks a $19.35B deficit with the rest of the world.",
    note: "Rest-of-world deficit is derived arithmetic, not a stored series. Merchandise trade only; services are near balance.",
    source: "Statistics Canada, tables 12-10-0174-01 and 12-10-0011-01, Aug 2026.",
    shareText: "73.8% of Canada's exports go to the US. The $21.44B surplus with America hides a $19.35B deficit with everyone else.",
    projectName: "CRED",
    projectUrl: "",
    fr: {
      kicker: "Exportations de marchandises par destination · août 2026",
      headline: "Les É.-U. achètent 73,8 % des exportations du Canada.",
      deck: "Les exportations vers les É.-U. ont atteint 54,46 G$ sur 73,83 G$ en août 2026. La Chine (4,20 G$) et l'UE (3,68 G$) suivent, loin derrière. L'excédent de 21,44 G$ avec les É.-U. masque un déficit de 19,35 G$ avec le reste du monde.",
      note: "Le déficit avec le reste du monde est un calcul dérivé, pas une série publiée. Marchandises seulement; les services sont presque à l'équilibre.",
      source: "Statistique Canada, tableaux 12-10-0174-01 et 12-10-0011-01, août 2026.",
      shareText: "73,8 % des exportations du Canada vont aux É.-U. L'excédent de 21,44 G$ avec l'Amérique cache un déficit de 19,35 G$ avec les autres.",
    },
    chart: {"kind": "donut", "segments": [{"label": "United States", "labelFr": "États-Unis", "value": 54.46}, {"label": "China", "labelFr": "Chine", "value": 4.2}, {"label": "European Union", "labelFr": "Union européenne", "value": 3.68}, {"label": "Rest of world", "labelFr": "Reste du monde", "value": 11.49}], "centerTop": "73.8%", "centerTopFr": "73,8 %", "centerBottom": "of exports go to the US", "centerBottomFr": "des exportations vont aux É.-U."},
  },
  {
    slug: "car-vs-transit",
    kicker: "Reachable area from Union Station · 30-minute threshold",
    headline: "Driving reaches 4.1x more of Toronto in 30 minutes than transit.",
    deck: "A car covers 339.5 km² in half an hour from Union Station; transit covers 82.5 km². At 60 minutes the ratio narrows to 1.9x: 1,793 vs 959 km². The transit isochrone is the one the city is trying to grow.",
    note: "Car assumes a 0.55 AM-peak congestion factor; transit includes 4.8 km/h walk speed. Single origin: Union Station.",
    source: "Open Nshipyard, Livable Area isochrone computation, Oct 9, 2026.",
    shareText: "From Union Station, 30 minutes of driving reaches 4.1x more of Toronto than 30 minutes of transit: 339.5 vs 82.5 km².",
    projectName: "Livable Area",
    projectUrl: "https://livable.canada.nshipyard.com",
    fr: {
      kicker: "Superficie accessible depuis Union Station · seuil de 30 minutes",
      headline: "En voiture, on atteint 4,1 fois plus de Toronto en 30 minutes qu'en transport en commun.",
      deck: "Une voiture couvre 339,5 km² en une demi-heure depuis Union Station; le transport en commun couvre 82,5 km². À 60 minutes, le ratio tombe à 1,9 : 1 793 contre 959 km². L'isochrone du transport en commun est celui que la ville cherche à agrandir.",
      note: "La voiture suppose un facteur de congestion de 0,55 à l'heure de pointe du matin; le transport en commun inclut une vitesse de marche de 4,8 km/h. Origine unique : Union Station.",
      source: "Open Nshipyard, calcul d'isochrones Livable Area, 9 oct. 2026.",
      shareText: "Depuis Union Station, 30 minutes en voiture atteignent 4,1 fois plus de Toronto que 30 minutes en transport en commun : 339,5 contre 82,5 km².",
    },
    chart: {"kind": "grouped", "categories": ["15 min", "30 min", "45 min", "60 min"], "series": [{"name": "Driving", "nameFr": "En voiture", "values": [53.2, 339.5, 938.2, 1793.0]}, {"name": "Transit", "nameFr": "Transport en commun", "values": [6.8, 82.5, 456.5, 959.2]}], "ySuffix": " km²", "decimals": 0},
  },
  {
    slug: "parking-offences",
    kicker: "Parking tickets by infraction code · 2023-2025",
    headline: "Two parking offences are one-third of all Toronto tickets.",
    deck: "Parking on private property (1,085,167 tickets) plus unpaid meters (849,159) total 1,934,326, or 34.5% of 5.6M tickets. Code 3 alone generated $64.7M in fines, 17.1% of all fine revenue in the file.",
    note: "Codebook rows sum to 5,606,483 tickets vs 6,454,695 in source extracts; about 848k unexplained in the file.",
    source: "City of Toronto open data, Parking Tickets, 2023-2025 extracts.",
    shareText: "Two offences, parking on private property and unpaid meters, are 34.5% of all Toronto parking tickets.",
    projectName: "Civic Codebooks",
    projectUrl: "https://codebooks.canada.nshipyard.com",
    fr: {
      kicker: "Contraventions par code d'infraction · 2023-2025",
      headline: "Deux infractions de stationnement sont le tiers de toutes les contraventions de Toronto.",
      deck: "Le stationnement sur propriété privée (1 085 167 contraventions) plus les parcomètres impayés (849 159) totalisent 1 934 326, soit 34,5 % des 5,6 M de contraventions. Le code 3 à lui seul a généré 64,7 M$ d'amendes, 17,1 % de tous les revenus d'amendes du fichier.",
      note: "Les lignes du codebook totalisent 5 606 483 contraventions contre 6 454 695 dans les extraits sources; environ 848 k inexpliqués dans le fichier.",
      source: "Ville de Toronto, données ouvertes, Contraventions de stationnement, extraits 2023-2025.",
      shareText: "Deux infractions, le stationnement sur propriété privée et les parcomètres impayés, sont 34,5 % de toutes les contraventions de Toronto.",
    },
    chart: {"kind": "hbars", "unit": "tickets 2023-2025", "unitFr": "contraventions 2023-2025", "rows": [{"label": "Park on private property", "labelFr": "Stationnement sur propriété privée", "value": 1085167, "display": "1,085,167", "displayFr": "1 085 167", "highlight": true}, {"label": "Machine fee not paid", "labelFr": "Frais de parcomètre impayés", "value": 849159, "display": "849,159", "displayFr": "849 159", "highlight": true}, {"label": "Park prohibited time, no permit", "labelFr": "Stationnement interdit sans permis", "value": 809625, "display": "809,625", "displayFr": "809 625"}, {"label": "Park on signed highway, prohibited day/time", "labelFr": "Stationnement sur route signalisée, jour/heure interdits", "value": 769476, "display": "769,476", "displayFr": "769 476"}, {"label": "Stop on signed highway, prohibited time/day", "labelFr": "Arrêt sur route signalisée, heure/jour interdits", "value": 349082, "display": "349,082", "displayFr": "349 082"}, {"label": "Park longer than 3 hours", "labelFr": "Stationnement de plus de 3 heures", "value": 321221, "display": "321,221", "displayFr": "321 221"}, {"label": "Stop on highway, rush hour", "labelFr": "Arrêt sur route à l'heure de pointe", "value": 199508, "display": "199,508", "displayFr": "199 508"}, {"label": "Stand vehicle, prohibited time/day", "labelFr": "Immobilisation, heure/jour interdits", "value": 163779, "display": "163,779", "displayFr": "163 779"}, {"label": "Parking machine not used, no fee", "labelFr": "Parcomètre non utilisé, frais impayés", "value": 130750, "display": "130,750", "displayFr": "130 750"}, {"label": "Park on municipal property", "labelFr": "Stationnement sur propriété municipale", "value": 125956, "display": "125,956", "displayFr": "125 956"}]},
  },
  {
    slug: "dinesafe-bbq",
    kicker: "Conditional-pass rate by chain · DineSafe, Oct 2025-Oct 2026",
    headline: "bb.q Chicken fails inspections at 3x the city rate.",
    deck: "Its conditional-pass rate is 19.4% vs 6.7% citywide, and 40% of its 10 locations were cited at least once. Monkey Sushi follows at 18.6%, with half its 12 locations cited. Booster Juice's 50 locations had zero conditional passes all year.",
    note: "Franchised vs corporate-owned locations not distinguished in source. Chains ranked with minimum 10 locations.",
    source: "City of Toronto open data, DineSafe, 2025-10-07 to 2026-10-07, retrieved Oct 9, 2026.",
    shareText: "bb.q Chicken's conditional-pass rate is 19.4%, triple Toronto's 6.7%. Booster Juice's 50 locations had zero.",
    projectName: "DineSafe Report Card",
    projectUrl: "",
    fr: {
      kicker: "Taux de réussite conditionnelle par chaîne · DineSafe, oct. 2025-oct. 2026",
      headline: "bb.q Chicken échoue aux inspections à 3 fois le taux de la ville.",
      deck: "Son taux de réussite conditionnelle est de 19,4 % contre 6,7 % dans la ville, et 40 % de ses 10 établissements ont été cités au moins une fois. Monkey Sushi suit à 18,6 %, avec la moitié de ses 12 établissements cités. Les 50 établissements de Booster Juice n'ont eu aucune réussite conditionnelle de l'année.",
      note: "Établissements franchisés et corporatifs non distingués dans la source. Chaînes classées avec un minimum de 10 établissements.",
      source: "Ville de Toronto, données ouvertes, DineSafe, 2025-10-07 au 2026-10-07, récupéré le 9 oct. 2026.",
      shareText: "Le taux de réussite conditionnelle de bb.q Chicken est de 19,4 %, le triple du 6,7 % de Toronto. Les 50 établissements de Booster Juice : zéro.",
    },
    chart: {"kind": "hbars", "unit": "% conditional pass", "unitFr": "% de réussite conditionnelle", "rows": [{"label": "bb.q Chicken", "labelFr": "bb.q Chicken", "value": 19.4, "display": "19.4%", "displayFr": "19,4 %", "highlight": true}, {"label": "Monkey Sushi", "labelFr": "Monkey Sushi", "value": 18.6, "display": "18.6%", "displayFr": "18,6 %"}, {"label": "241 Pizza", "labelFr": "241 Pizza", "value": 15.0, "display": "15.0%", "displayFr": "15,0 %"}, {"label": "Kung Fu Tea", "labelFr": "Kung Fu Tea", "value": 14.8, "display": "14.8%", "displayFr": "14,8 %"}, {"label": "Eggsmart", "labelFr": "Eggsmart", "value": 13.9, "display": "13.9%", "displayFr": "13,9 %"}, {"label": "Wild Wing", "labelFr": "Wild Wing", "value": 13.8, "display": "13.8%", "displayFr": "13,8 %"}, {"label": "Gino's Pizza", "labelFr": "Gino's Pizza", "value": 13.6, "display": "13.6%", "displayFr": "13,6 %"}, {"label": "Ali Baba's", "labelFr": "Ali Baba's", "value": 12.9, "display": "12.9%", "displayFr": "12,9 %"}]},
  },
  {
    slug: "lane-km",
    kicker: "Public laneway km by ward · 662 km citywide",
    headline: "Ward 9 holds a fifth of Toronto's 662 km of public laneways. Don Valley North has 0.1 km.",
    deck: "Davenport alone has 129.1 km of lane centreline; the top 5 wards hold 65.2% of all lane km. Don Valley North has 0.1 km, a 1,291-to-1 ratio. Lane-rich wards are the ones where laneway housing can actually be built.",
    note: "Lanes are centreline geometry, not lot-line abutment; the 3.5 m laneway-suite abutment test needs parcel polygons.",
    source: "City of Toronto open data, Toronto Centreline, retrieved Oct 9, 2026.",
    shareText: "One Toronto ward holds a fifth of the city's 662 km of public laneways. Another has 0.1 km.",
    projectName: "Build Check",
    projectUrl: "https://buildcheck.nshipyard.com",
    fr: {
      kicker: "Km de ruelles publiques par quartier · 662 km dans la ville",
      headline: "Le quartier 9 détient un cinquième des 662 km de ruelles publiques de Toronto. Don Valley North en a 0,1 km.",
      deck: "Davenport à lui seul compte 129,1 km de ruelles; les 5 premiers quartiers détiennent 65,2 % de tous les km de ruelles. Don Valley North en a 0,1 km, un ratio de 1 291 contre 1. Les quartiers riches en ruelles sont ceux où l'on peut vraiment construire des logements en ruelle.",
      note: "Les ruelles sont des géométries d'axe central, pas des limites de lot; le test de contiguïté de 3,5 m pour les suites en ruelle exige les polygones de parcelles.",
      source: "Ville de Toronto, données ouvertes, Toronto Centreline, récupéré le 9 oct. 2026.",
      shareText: "Un quartier de Toronto détient un cinquième des 662 km de ruelles publiques de la ville. Un autre en a 0,1 km.",
    },
    chart: {"kind": "hbars", "unit": "km of public laneway", "unitFr": "km de ruelles publiques", "rows": [{"label": "Ward 9 · Davenport", "labelFr": "Quartier 9 · Davenport", "value": 129.1, "display": "129.1 km", "displayFr": "129,1 km", "highlight": true}, {"label": "Ward 14 · Toronto-Danforth", "labelFr": "Quartier 14 · Toronto-Danforth", "value": 95.2, "display": "95.2 km", "displayFr": "95,2 km"}, {"label": "Ward 11 · University-Rosedale", "labelFr": "Quartier 11 · University-Rosedale", "value": 91.7, "display": "91.7 km", "displayFr": "91,7 km"}, {"label": "Ward 4 · Parkdale-High Park", "labelFr": "Quartier 4 · Parkdale-High Park", "value": 68.5, "display": "68.5 km", "displayFr": "68,5 km"}, {"label": "Ward 10 · Spadina-Fort York", "labelFr": "Quartier 10 · Spadina-Fort York", "value": 47.3, "display": "47.3 km", "displayFr": "47,3 km"}, {"label": "Ward 17 · Don Valley North", "labelFr": "Quartier 17 · Don Valley North", "value": 0.1, "display": "0.1 km", "displayFr": "0,1 km"}]},
  },
  {
    slug: "mortgage-markup",
    kicker: "Interest rates, posted · Oct 2026",
    headline: "The Bank of Canada cut its policy rate to 2.25%, but a posted 5-year mortgage still costs 6.19%.",
    deck: "That 3.94-point gap is the lender's markup: funding costs, risk pricing, and profit stacked on the policy rate. Prime sits 2.20 points above the policy rate at 4.45%; money markets track the target almost exactly, with CORRA at 2.29% against an overnight rate of 2.28%.",
    note: "Policy, overnight, CORRA, T-bill are market rates; prime and the 5-year mortgage are Bank of Canada-compiled posted rates, not transaction rates.",
    source: "Bank of Canada, Valet (policy instruments, money market, chartered bank interest), verified Oct 9, 2026.",
    shareText: "The Bank of Canada's policy rate is 2.25%. A posted 5-year mortgage is 6.19%. The 3.94-point gap is the lender's markup.",
    projectName: "CRED",
    projectUrl: "",
    fr: {
      kicker: "Taux d'intérêt, affichés · oct. 2026",
      headline: "La Banque du Canada a ramené son taux directeur à 2,25 %, mais une hypothèque affichée de 5 ans coûte encore 6,19 %.",
      deck: "Cet écart de 3,94 points est la marge du prêteur : coûts de financement, tarification du risque et profit empilés sur le taux directeur. Le taux préférentiel se situe 2,20 points au-dessus à 4,45 %; les marchés monétaires suivent la cible de près, avec le CORRA à 2,29 % contre 2,28 % pour le taux du jour le jour.",
      note: "Le taux directeur, le taux du jour le jour, le CORRA et les bons du Trésor sont des taux de marché; le taux préférentiel et l'hypothèque de 5 ans sont des taux affichés compilés par la Banque du Canada, pas des taux de transaction.",
      source: "Banque du Canada, Valet (instruments de politique, marché monétaire, taux d'intérêt des banques à charte), vérifié le 9 oct. 2026.",
      shareText: "Le taux directeur de la Banque du Canada est de 2,25 %. Une hypothèque affichée de 5 ans coûte 6,19 %. L'écart de 3,94 points est la marge du prêteur.",
    },
    chart: {"kind": "hbars", "rows": [{"display": "2.25%", "displayFr": "2,25 %", "label": "Policy rate", "labelFr": "Taux directeur", "value": 2.25}, {"display": "2.28%", "displayFr": "2,28 %", "label": "Overnight", "labelFr": "Taux du jour le jour", "value": 2.28}, {"display": "2.29%", "displayFr": "2,29 %", "label": "CORRA", "labelFr": "CORRA", "value": 2.29}, {"display": "2.39%", "displayFr": "2,39 %", "label": "3-month T-bill", "labelFr": "Bon du Trésor 3 mois", "value": 2.39}, {"display": "4.45%", "displayFr": "4,45 %", "label": "Prime rate", "labelFr": "Taux préférentiel", "value": 4.45}, {"display": "6.19%", "displayFr": "6,19 %", "highlight": true, "label": "Posted 5-year mortgage", "labelFr": "Hypothèque 5 ans affichée", "value": 6.19}], "unit": "%", "unitFr": "%"},
  },
  {
    slug: "transit-pipeline",
    kicker: "Homes near open stations by construction status · Toronto",
    headline: "41% of Toronto's planned new homes are within 800 metres of an open rail station, and fewer than 1 in 6 have been built.",
    deck: "177,005 of those homes are active applications and 128,255 are still proposed; only 60,510 are built. The 800-metre radius is the standard walkable catchment planners use for transit-oriented development.",
    note: "Per-station figures double-count projects near multiple stations; only the 41.1% headline share is deduped. Statuses are pipeline classifications, not delivery guarantees.",
    source: "City of Toronto, Development Pipeline analytical file, retrieved Oct 8, 2026.",
    shareText: "41% of Toronto's planned new homes are within 800 metres of an open rail station, and fewer than 1 in 6 have been built.",
    projectName: "Transit Supply",
    projectUrl: "https://supply.canada.nshipyard.com",
    fr: {
      kicker: "Logements près des stations ouvertes par étape de construction · Toronto",
      headline: "41 % des nouveaux logements prévus à Toronto sont à moins de 800 mètres d'une station de métro ouverte, et moins d'un sur six a été construit.",
      deck: "177 005 de ces logements sont des demandes actives et 128 255 sont encore proposés; seuls 60 510 sont construits. Le rayon de 800 mètres est la zone de chalandise piétonne standard des urbanistes pour le développement axé sur le transport en commun.",
      note: "Les chiffres par station comptent deux fois les projets proches de plusieurs stations; seul le 41,1 % global est dédupliqué. Les statuts sont des classifications du pipeline, pas des garanties de livraison.",
      source: "Ville de Toronto, fichier analytique du pipeline de développement, récupéré le 8 oct. 2026.",
      shareText: "41 % des nouveaux logements prévus à Toronto sont à moins de 800 mètres d'une station de métro ouverte, et moins d'un sur six a été construit.",
    },
    chart: {"categories": ["Homes within 800m of an open station"], "categoriesFr": ["Logements à 800 m d'une station ouverte"], "decimals": 0, "kind": "grouped", "series": [{"name": "Proposed", "nameFr": "Proposés", "values": [128255]}, {"name": "Active", "nameFr": "Actifs", "values": [177005]}, {"name": "Built", "nameFr": "Construits", "values": [60510]}]},
  },
  {
    slug: "cpi-shelter",
    kicker: "CPI components, index 2002=100 · Aug 2026",
    headline: "Housing costs are running 12.8% above overall inflation: the shelter index reads 190.9 versus 169.3 for all items.",
    deck: "Rent alone sits below overall inflation at 168.3, so the housing gap comes from homeowner costs, not tenants. Energy runs hotter than everything else: 220.5 overall, 252.2 for gasoline.",
    note: "Index levels on a 2002=100 base; seasonally adjusted for all-items, shelter, and food, unadjusted for energy, gasoline, and rent.",
    source: "Statistics Canada, tables 18-10-0006-01 and 18-10-0004-01, Aug 2026.",
    shareText: "Housing costs are running 12.8% above overall inflation: the shelter index reads 190.9 versus 169.3 for all items.",
    projectName: "CRED",
    projectUrl: "",
    fr: {
      kicker: "Composantes de l'IPC, indice 2002=100 · août 2026",
      headline: "Le coût du logement dépasse de 12,8 % l'inflation globale : l'indice du logement est à 190,9 contre 169,3 pour l'ensemble.",
      deck: "Le loyer seul est sous l'inflation globale à 168,3 : l'écart vient donc des coûts des propriétaires, pas des locataires. L'énergie est plus chaude que tout le reste : 220,5 au total, 252,2 pour l'essence.",
      note: "Niveaux d'indice sur base 2002=100; désaisonnalisés pour l'ensemble, le logement et l'alimentation, non désaisonnalisés pour l'énergie, l'essence et le loyer.",
      source: "Statistique Canada, tableaux 18-10-0006-01 et 18-10-0004-01, août 2026.",
      shareText: "Le coût du logement dépasse de 12,8 % l'inflation globale : l'indice du logement est à 190,9 contre 169,3 pour l'ensemble.",
    },
    chart: {"kind": "hbars", "rows": [{"display": "169.3", "displayFr": "169,3", "label": "All-items", "labelFr": "Ensemble", "value": 169.3}, {"display": "190.9", "displayFr": "190,9", "highlight": true, "label": "Shelter", "labelFr": "Logement", "value": 190.9}, {"display": "168.3", "displayFr": "168,3", "label": "Rent", "labelFr": "Loyer", "value": 168.3}, {"display": "202.6", "displayFr": "202,6", "label": "Food", "labelFr": "Alimentation", "value": 202.6}, {"display": "220.5", "displayFr": "220,5", "label": "Energy", "labelFr": "Énergie", "value": 220.5}, {"display": "252.2", "displayFr": "252,2", "label": "Gasoline", "labelFr": "Essence", "value": 252.2}], "unit": "index, 2002=100", "unitFr": "indice, 2002=100"},
  },
  {
    slug: "gdp-realestate",
    kicker: "GDP by industry, $B chained 2017 SAAR · Jul 2026",
    headline: "Real estate now outweighs manufacturing in Canada's GDP 1.56 to 1: $313.3B against $201.1B.",
    deck: "Finance ($182.8B) and construction ($171.8B) are the next largest; mining, oil and gas ($123.4B) is the smallest of the eight tracked industries. The ranking reflects an economy where housing services generate more measured value than factories.",
    note: "Chained 2017 dollars, seasonally adjusted at annual rates. Industry detail from the GDP-by-industry table; the parts do not sum to national GDP.",
    source: "Statistics Canada, table 36-10-0434-02, Jul 2026.",
    shareText: "Real estate ($313.3B) now outweighs manufacturing ($201.1B) in Canada's GDP, 1.56 to 1.",
    projectName: "CRED",
    projectUrl: "",
    fr: {
      kicker: "PIB par industrie, G$ enchaînés 2017 désais. · juil. 2026",
      headline: "L'immobilier dépasse maintenant la fabrication dans le PIB du Canada par 1,56 contre 1 : 313,3 G$ contre 201,1 G$.",
      deck: "La finance (182,8 G$) et la construction (171,8 G$) suivent; l'extraction minière, pétrolière et gazière (123,4 G$) est la plus petite des huit industries suivies. Ce classement reflète une économie où les services du logement génèrent plus de valeur mesurée que les usines.",
      note: "Dollars enchaînés de 2017, désaisonnalisés aux taux annuels. Le détail par industrie vient du tableau du PIB par industrie; les totaux ne correspondent pas au PIB national.",
      source: "Statistique Canada, tableau 36-10-0434-02, juil. 2026.",
      shareText: "L'immobilier (313,3 G$) dépasse maintenant la fabrication (201,1 G$) dans le PIB du Canada, par 1,56 contre 1.",
    },
    chart: {"kind": "hbars", "rows": [{"display": "$313.3B", "displayFr": "313,3 G$", "highlight": true, "label": "Real estate and rental", "labelFr": "Immobilier et location", "value": 313.3}, {"display": "$201.1B", "displayFr": "201,1 G$", "label": "Manufacturing", "labelFr": "Fabrication", "value": 201.1}, {"display": "$182.8B", "displayFr": "182,8 G$", "label": "Finance and insurance", "labelFr": "Finance et assurances", "value": 182.8}, {"display": "$171.8B", "displayFr": "171,8 G$", "label": "Construction", "labelFr": "Construction", "value": 171.8}, {"display": "$168.6B", "displayFr": "168,6 G$", "label": "Professional services", "labelFr": "Services professionnels", "value": 168.6}, {"display": "$130.3B", "displayFr": "130,3 G$", "label": "Wholesale", "labelFr": "Commerce de gros", "value": 130.3}, {"display": "$126.1B", "displayFr": "126,1 G$", "label": "Retail", "labelFr": "Commerce de détail", "value": 126.1}, {"display": "$123.4B", "displayFr": "123,4 G$", "label": "Mining, oil and gas", "labelFr": "Extraction minière, pétrolière et gazière", "value": 123.4}], "unit": "$B, Jul 2026 SAAR", "unitFr": "G$, juil. 2026 désais."},
  },
  {
    slug: "taxi-rideshare",
    kicker: "Active licences · Toronto, Oct 2026",
    headline: "Toronto still licences 960 taxis for every rideshare company: 4,819 taxi licences against 5 company licences.",
    deck: "The ratio is apples to oranges by design: taxis are licensed per driver and owner, rideshare per company, so the five company licences cover Uber Canada and every other operator's entire fleet. Taxi owner licences alone number 4,793; brokers and operators add 26.",
    note: "Active = no cancel date on the record. Tow-truck licensing moved to the province in 2024, zeroing 4,848 records.",
    source: "City of Toronto, Municipal Licensing and Standards, business licences, retrieved Oct 8, 2026.",
    shareText: "4,819 taxi licences vs 5 rideshare company licences in Toronto, a 960-to-1 ratio that counts drivers on one side and companies on the other.",
    projectName: "Licence NAICS",
    projectUrl: "https://licences.canada.nshipyard.com",
    fr: {
      kicker: "Permis actifs · Toronto, oct. 2026",
      headline: "Toronto délivre encore 960 permis de taxi pour chaque entreprise de covoiturage : 4 819 permis de taxi contre 5 permis d'entreprise.",
      deck: "Le ratio compare des pommes et des oranges par construction : les taxis sont permis par chauffeur et propriétaire, le covoiturage par entreprise, donc les cinq permis d'entreprise couvrent Uber Canada et la flotte entière de chaque autre exploitant. Les permis de propriétaires de taxi à eux seuls sont 4 793; courtiers et exploitants ajoutent 26.",
      note: "Actif = sans date d'annulation au dossier. La délivrance des permis de remorquage est passée à la province en 2024, annulant 4 848 dossiers.",
      source: "Ville de Toronto, Permis et licences d'entreprise (Licences et normes municipales), récupérés le 8 oct. 2026.",
      shareText: "4 819 permis de taxi contre 5 permis d'entreprises de covoiturage à Toronto, un ratio de 960 contre 1 qui compte les chauffeurs d'un côté et les entreprises de l'autre.",
    },
    chart: {"bigLabel": "taxi licences for every rideshare company licence in Toronto", "bigLabelFr": "permis de taxi pour chaque permis d'entreprise de covoiturage à Toronto", "bigValue": "960 to 1", "bigValueFr": "960 contre 1", "kind": "stat", "stats": [{"label": "Active taxi licences (per driver/owner)", "labelFr": "Permis de taxi actifs (par chauffeur/propriétaire)", "value": "4,819", "valueFr": "4 819"}, {"label": "Rideshare company licences (per company: Uber Canada et al.)", "labelFr": "Permis d'entreprises de covoiturage (par entreprise)", "value": "5", "valueFr": "5"}, {"label": "Comparability: taxi counts drivers, rideshare counts companies", "labelFr": "Comparabilité : le taxi compte les chauffeurs, le covoiturage les entreprises", "value": "n/a", "valueFr": "s. o."}]},
  },
  {
    slug: "consultants",
    kicker: "Contracts vs spend by kind · 2012-2026",
    headline: "Consultants win 24.4% of Toronto's contracts but 1.4% of its money: 3,187 awards worth $309M.",
    deck: "Competitive awards average $2.8M each against $97k for a consulting engagement, a 28x gap. Construction Services alone absorbs 60.4% of the $21.5B total, which is where the real money moves.",
    note: "Award values as published, not audited payments; multi-year awards appear in full in the award year. Vendor identity is heuristic name-matching.",
    source: "City of Toronto open data (CKAN): awarded contracts, non-competitive contracts, consulting expenditures, retrieved Oct 8, 2026.",
    shareText: "Toronto consultants won 3,187 contracts but only 1.4% of $21.5B in spending. Competitive awards average $2.8M; consulting averages $97k.",
    projectName: "Procurement Spending",
    projectUrl: "https://procurement.canada.nshipyard.com",
    fr: {
      kicker: "Contrats contre dépenses par type · 2012-2026",
      headline: "Les consultants remportent 24,4 % des contrats de Toronto mais 1,4 % de son argent : 3 187 contrats d'une valeur de 309 M$.",
      deck: "Les contrats concurrentiels valent en moyenne 2,8 M$ chacun contre 97 k$ pour un mandat de consultation, un écart de 28 fois. Les services de construction absorbent à eux seuls 60,4 % du total de 21,5 G$, là où l'argent bouge vraiment.",
      note: "Valeurs d'attribution publiées, pas des paiements vérifiés; les contrats pluriannuels apparaissent en entier l'année d'attribution. L'identité des fournisseurs repose sur un appariement heuristique des noms.",
      source: "Ville de Toronto, données ouvertes (CKAN) : contrats attribués, contrats non concurrentiels, dépenses de consultation, récupérées le 8 oct. 2026.",
      shareText: "Les consultants de Toronto ont remporté 3 187 contrats mais seulement 1,4 % des 21,5 G$ de dépenses. Les contrats concurrentiels valent en moyenne 2,8 M$; la consultation, 97 k$.",
    },
    chart: {"categories": ["Competitive awards", "Consulting"], "categoriesFr": ["Appels d'offres", "Consultants"], "decimals": 1, "kind": "grouped", "series": [{"name": "Share of awards", "nameFr": "Part des contrats", "values": [53.6, 24.4]}, {"name": "Share of spend", "nameFr": "Part des dépenses", "values": [90.1, 1.4]}], "ySuffix": "%"},
  },
  {
    slug: "structure-vs-land",
    kicker: "New Housing Price Index, January values · Toronto CMA, 1981-2026",
    headline: "Rising construction costs, not land values, drove Toronto's 45-year house-price boom: the building index rose 352% while the land index rose 190%.",
    deck: "In 1981 the lot was worth more than the building: land indexed at 39.1 against 22.6 for construction, a 1.73 ratio that has compressed to 1.11. The two split in 1990 when land spiked to 95.0 while construction sat at 55.3, then moved back together through the 1990s bust.",
    note: "Land-only series carries StatCan's E (use with caution) flag for all periods; the split is CMA-level, not station-level. January values shown.",
    source: "Statistics Canada, table 18-10-0205-01, New Housing Price Index, retrieved Oct 9, 2026.",
    shareText: "Rising construction costs, not land values, drove Toronto's 45-year house-price boom: the building index rose 352% while the land index rose 190%.",
    projectName: "Land Housing",
    projectUrl: "https://landvalue.canada.nshipyard.com",
    fr: {
      kicker: "Indice des prix des logements neufs, valeurs de janv. · RMR de Toronto, 1981-2026",
      headline: "La hausse des coûts de construction, pas la valeur des terrains, a porté le boom immobilier de 45 ans à Toronto : l'indice du bâtiment a grimpé de 352 % contre 190 % pour le terrain.",
      deck: "En 1981, le terrain valait plus que le bâtiment : 39,1 contre 22,6 pour la construction, un ratio de 1,73 qui s'est comprimé à 1,11. Les deux ont divergé en 1990 quand le terrain a bondi à 95,0 pendant que la construction stagnait à 55,3, puis se sont rejoints pendant la débâcle des années 1990.",
      note: "La série terrain seulement porte la mention E (à utiliser avec prudence) de Statistique Canada pour toutes les périodes; la décomposition est à l'échelle de la RMR, pas des stations. Valeurs de janvier illustrées.",
      source: "Statistique Canada, tableau 18-10-0205-01, Indice des prix des logements neufs, récupéré le 9 oct. 2026.",
      shareText: "La hausse des coûts de construction, pas la valeur des terrains, a porté le boom immobilier de 45 ans à Toronto : l'indice du bâtiment a grimpé de 352 % contre 190 % pour le terrain.",
    },
    chart: {"decimals": 1, "kind": "tseries", "series": [{"name": "House only", "nameFr": "Maison seulement", "values": [22.6, 28.2, 26.5, 26.1, 26.6, 29.2, 38.4, 44.4, 52.7, 55.3, 42.8, 41.6, 40.4, 39.7, 40.3, 40.3, 40.0, 42.4, 43.6, 45.0, 46.7, 48.2, 51.4, 55.5, 59.1, 61.6, 63.8, 67.3, 68.2, 69.7, 72.4, 77.9, 82.3, 83.7, 86.3, 91.0, 99.5, 103.2, 100.3, 98.7, 103.9, 112.2, 114.6, 112.5, 111.2, 104.8]}, {"name": "Land only", "nameFr": "Terrain seulement", "values": [39.1, 40.1, 38.6, 38.8, 38.9, 40.5, 44.7, 53.0, 81.0, 95.0, 90.2, 81.1, 78.1, 77.4, 77.6, 77.3, 77.0, 77.2, 77.4, 77.7, 78.0, 78.1, 78.1, 78.1, 80.7, 84.9, 86.4, 88.2, 88.7, 89.2, 87.7, 90.6, 92.3, 92.6, 93.3, 95.9, 101.1, 108.2, 108.2, 108.1, 110.7, 117.7, 117.7, 117.7, 114.9, 115.2]}], "variant": "line", "xLabels": ["1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]},
  },
  {
    slug: "multidwelling",
    kicker: "Building construction investment ($B), SA · Jul 2026",
    headline: "Multi-dwelling construction now beats single-dwelling in Canada: $8.44B against $7.80B in July.",
    deck: "The multi lead is $0.64B, or 8.2%. Residential building is 68.8% of all building investment ($16.24B of $23.60B); the rest is non-residential.",
    note: "Seasonally adjusted, current dollars. Rental vacancy is annual (2025 latest); starts and investment are different months.",
    source: "Statistics Canada, table 34-10-0293-01, Jul 2026.",
    shareText: "Canada now invests more in multi-dwelling construction ($8.44B) than single-dwelling ($7.80B). The multi lead is 8.2%.",
    projectName: "CRED",
    projectUrl: "",
    fr: {
      kicker: "Investissement en construction de bâtiments ($B/G$), désais. · juil. 2026",
      headline: "La construction multilogement dépasse maintenant l'unifamilial au Canada : 8,44 G$ contre 7,80 G$ en juillet.",
      deck: "L'avance du multilogement est de 0,64 G$, soit 8,2 %. Le résidentiel représente 68,8 % de tout l'investissement en construction de bâtiments (16,24 G$ sur 23,60 G$); le reste est non résidentiel.",
      note: "Désaisonnalisé, dollars courants. L'inoccupation locative est annuelle (dernière en 2025); les mises en chantier et l'investissement portent sur des mois différents.",
      source: "Statistique Canada, tableau 34-10-0293-01, juil. 2026.",
      shareText: "Le Canada investit maintenant plus dans la construction multilogement (8,44 G$) que dans l'unifamilial (7,80 G$). L'avance du multilogement est de 8,2 %.",
    },
    chart: {"categories": ["Single-dwelling", "Multi-dwelling"], "categoriesFr": ["Unifamilial", "Multilogement"], "decimals": 2, "kind": "grouped", "series": [{"name": "Construction investment", "nameFr": "Investissement en construction", "values": [7.8, 8.44]}], "yPrefix": "$"},
  },
  {
    slug: "finch-station",
    kicker: "Development applications before vs after station opening · 2017 subway extension",
    headline: "Finch Station went from zero development applications to 23 after the subway arrived in December 2017.",
    deck: "Finch West went from 0 to 4 projects (3,593 homes) and York University from 0 to 5 (1,009); every application near Finch West arrived after opening day. Downsview Park is the exception: 2 projects before, 1 after, showing stations alone do not guarantee supply.",
    note: "Before/after uses application receipt date, measuring timing not completion; it captures anticipation as well as response.",
    source: "City of Toronto, Development Pipeline (application receipt dates), retrieved Oct 8, 2026; TTC opening dates.",
    shareText: "Finch Station: 0 development applications before the Dec 2017 subway opening, 23 after. Stations pull supply, but not everywhere: Downsview Park went 2 to 1.",
    projectName: "Transit Supply",
    projectUrl: "https://supply.canada.nshipyard.com",
    fr: {
      kicker: "Demandes de développement avant et après l'ouverture · prolongement du métro 2017",
      headline: "La station Finch est passée de zéro demande de développement à 23 après l'arrivée du métro en décembre 2017.",
      deck: "Finch West est passée de 0 à 4 projets (3 593 logements) et l'Université York de 0 à 5 (1 009); chaque demande près de Finch West est arrivée après le jour de l'ouverture. Downsview Park est l'exception : 2 projets avant, 1 après, preuve que les stations seules ne garantissent pas l'offre.",
      note: "L'avant/après utilise la date de réception de la demande, qui mesure le moment et non l'achèvement; il capte l'anticipation autant que la réaction.",
      source: "Ville de Toronto, pipeline de développement (dates de réception des demandes), récupéré le 8 oct. 2026; dates d'ouverture de la TTC.",
      shareText: "Station Finch : 0 demande de développement avant l'ouverture du métro en déc. 2017, 23 après. Les stations attirent l'offre, mais pas partout : Downsview Park est passée de 2 à 1.",
    },
    chart: {"categories": ["Sheppard West", "Downsview Park", "Finch West", "York University", "Finch"], "categoriesFr": ["Sheppard West", "Downsview Park", "Finch West", "Université York", "Finch"], "decimals": 0, "kind": "grouped", "series": [{"name": "Projects before opening", "nameFr": "Projets avant l'ouverture", "values": [0, 2, 0, 0, 0]}, {"name": "Projects after", "nameFr": "Projets après l'ouverture", "values": [6, 1, 4, 5, 23]}]},
  },
  {
    slug: "wages-track-costs",
    kicker: "Construction cost drivers, rebased 1981=100 · Toronto CMA, 1981-2026",
    headline: "Toronto construction costs rose 4.64x since 1981. Union construction wages rose 4.55x, right alongside them. The fastest-rising material, fabricated metal, reached 4.01x.",
    deck: "All three series rebased to 1981=100. Wages (CUWR Toronto, including pay supplements) move with the NHPI house-only index across the full 45 years. National factory-gate materials prices sit below both for the whole period.",
    note: "Wages are a union wage-scale proxy for selected Toronto CMA trades, not all-worker earnings. Materials are national IPPI factory-gate prices, shown as upstream input-price shocks, not Toronto builder costs.",
    source: "Statistics Canada, tables 18-10-0205-01, 18-10-0140-01, 18-10-0266-01, extracted Oct 10, 2026.",
    shareText: "Toronto construction wages rose 4.55x since 1981, almost matching the 4.64x rise in construction costs. Materials rose less.",
    projectName: "Housing Cost Drivers",
    projectUrl: "https://housing-costs.nshipyard.com",
    fr: {
      kicker: "Moteurs des coûts de construction, base 1981=100 · RMR de Toronto, 1981-2026",
      headline: "Les coûts de construction à Toronto ont grimpé de 4,64x depuis 1981. Les salaires syndicaux ont grimpé de 4,55x, pratiquement au même rythme. Le métal fabriqué, le matériau en plus forte hausse, a atteint 4,01x.",
      deck: "Les trois séries sont ramenées à 1981=100. Les salaires (ICSS Toronto, suppléments inclus) suivent l'indice maison seulement de l'IPLN sur 45 ans. Les prix nationaux des matériaux à la sortie d'usine restent sous les deux pour toute la période.",
      note: "Les salaires sont un indicateur syndical pour des métiers torontois sélectionnés, pas les gains de l'ensemble des travailleurs. Les matériaux sont des prix IPPI nationaux à la sortie d'usine, présentés comme des chocs de prix en amont.",
      source: "Statistique Canada, tableaux 18-10-0205-01, 18-10-0140-01, 18-10-0266-01, extraits le 10 oct. 2026.",
      shareText: "Les salaires de la construction à Toronto ont grimpé de 4,55x depuis 1981, pratiquement autant que les coûts (4,64x). Les matériaux ont moins augmenté.",
    },
    chart: {"decimals": 0, "kind": "tseries", "variant": "line", "xLabels": ["1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"], "series": [{"name": "Construction costs", "nameFr": "Coûts de construction", "values": [100.0,124.8,117.3,115.5,117.7,129.2,169.9,196.5,233.2,244.7,189.4,184.1,178.8,175.7,178.3,178.3,177.0,187.6,192.9,199.1,206.6,213.3,227.4,245.6,261.5,272.6,282.3,297.8,301.8,308.4,320.4,344.7,364.2,370.4,381.9,402.6,440.3,456.6,443.8,436.7,459.7,496.5,507.1,497.8,492.0,463.7]},{"name": "Union wages", "nameFr": "Salaires syndicaux", "values": [100.0,106.6,119.9,131.0,131.7,137.3,143.6,148.8,158.5,167.9,181.2,193.0,197.2,201.7,210.1,212.2,213.6,220.2,221.6,225.8,231.0,238.0,244.6,251.6,259.6,266.6,273.5,278.8,292.7,301.7,309.4,316.7,325.1,333.1,341.5,351.9,357.5,363.8,370.7,378.1,386.1,394.4,411.1,426.8,442.2,454.7]},{"name": "Fabricated metal", "nameFr": "Métal fabriqué", "values": [100.0,109.6,113.4,116.9,120.8,125.4,128.7,133.9,138.8,142.3,142.6,141.3,142.6,147.3,158.2,165.0,167.8,171.9,173.5,176.5,176.2,178.1,181.7,183.9,204.6,204.9,207.4,209.8,228.7,216.7,221.0,223.8,218.0,223.2,230.9,239.6,243.7,253.0,274.0,273.2,280.9,379.0,391.5,380.9,388.8,400.6]}]},
  },
  {
    slug: "driver-ranking",
    kicker: "Cost drivers ranked by growth, 1981=100 \u00b7 Toronto and Canada, 1981-2026",
    headline: "Construction costs rose the most since 1981 at 4.64x. Union wages were right behind at 4.55x. Materials rose less.",
    deck: "Every driver rebased to 1981=100 and ranked by growth. Toronto construction costs and Toronto union wages sit far above national materials prices. This ranks growth, not causal shares: it shows what moved most, not what caused the move.",
    note: "BCPI and iron/steel are excluded because their series start in 2017 and 2010, so their multiples cannot be compared. Four suspected drivers, development charges, code-compliance costs, productivity, and margins, have no open series and cannot be ranked.",
    source: "Statistics Canada, tables 18-10-0205-01, 18-10-0140-01, 18-10-0266-01, extracted Oct 10, 2026.",
    shareText: "Construction costs rose the most since 1981: 4.64x. Union wages were right behind at 4.55x. Materials rose less.",
    projectName: "Housing Cost Drivers",
    projectUrl: "https://housing-costs.nshipyard.com",
    fr: {
      kicker: "Moteurs des co\u00fbts class\u00e9s par croissance, 1981=100 \u00b7 Toronto et Canada, 1981-2026",
      headline: "Les co\u00fbts de construction ont le plus augment\u00e9 depuis 1981 : 4,64x. Les salaires syndicaux suivaient de pr\u00e8s \u00e0 4,55x. Les mat\u00e9riaux ont moins augment\u00e9.",
      deck: "Chaque moteur est ramen\u00e9 \u00e0 1981=100 et class\u00e9 par croissance. Les co\u00fbts de construction et les salaires syndicaux de Toronto d\u00e9passent largement les prix nationaux des mat\u00e9riaux. Ce classement mesure la croissance, pas les parts causales : il montre ce qui a le plus boug\u00e9, pas ce qui a caus\u00e9 le mouvement.",
      note: "L\u2019IPCC et le fer/acier sont exclus car leurs s\u00e9ries commencent en 2017 et 2010 : leurs multiples ne sont pas comparables. Quatre moteurs soup\u00e7onn\u00e9s, redevances d\u2019am\u00e9nagement, co\u00fbts de conformit\u00e9, productivit\u00e9 et marges, n\u2019ont aucune s\u00e9rie ouverte et ne peuvent \u00eatre class\u00e9s.",
      source: "Statistique Canada, tableaux 18-10-0205-01, 18-10-0140-01, 18-10-0266-01, extraits le 10 oct. 2026.",
      shareText: "Les co\u00fbts de construction ont le plus augment\u00e9 depuis 1981 : 4,64x. Les salaires syndicaux suivaient \u00e0 4,55x. Les mat\u00e9riaux ont moins augment\u00e9.",
    },
    chart: {"kind": "hbars", "unit": "\u00d7 1981 level", "unitFr": "\u00d7 niveau de 1981", "rows": [{"label": "Construction costs · Toronto", "labelFr": "Coûts de construction · Toronto", "value": 4.64, "display": "4.64×", "displayFr": "4,64×", "highlight": true},{"label": "Union wages · Toronto", "labelFr": "Salaires syndicaux · Toronto", "value": 4.55, "display": "4.55×", "displayFr": "4,55×"},{"label": "Fabricated metal · national", "labelFr": "Métal fabriqué · national", "value": 4.01, "display": "4.01×", "displayFr": "4,01×"},{"label": "Ready-mixed concrete · national", "labelFr": "Béton prêt à l’emploi · national", "value": 3.66, "display": "3.66×", "displayFr": "3,66×"},{"label": "All-industry factory prices · national", "labelFr": "Prix à la sortie d’usine, ensemble · national", "value": 3.12, "display": "3.12×", "displayFr": "3,12×"},{"label": "Softwood lumber · national", "labelFr": "Bois d’oeuvre · national", "value": 3.11, "display": "3.11×", "displayFr": "3,11×"}]},
  },
  {
    slug: "wage-chase",
    kicker: "Construction costs minus union wages, index points \u00b7 Toronto CMA, 1981-2026",
    headline: "Construction costs surged ahead of wages twice since 1981: by 77 points in 1990 and 83 in 2017. Wages caught up both times.",
    deck: "The gap between the NHPI house-only index and Toronto union wages swings in waves. Costs ran 77 points ahead in 1990 and 83 ahead in 2017. Wages closed the gap both times, ending 2026 just 9 points behind.",
    note: "Gap in 1981=100 index points, not dollars. Wages are the CUWR Toronto union wage-scale proxy, including pay supplements.",
    source: "Statistics Canada, tables 18-10-0205-01, 18-10-0140-01, extracted Oct 10, 2026.",
    shareText: "Construction costs ran 77 points ahead of wages in 1990 and 83 ahead in 2017. Wages closed the gap both times.",
    projectName: "Housing Cost Drivers",
    projectUrl: "https://housing-costs.nshipyard.com",
    fr: {
      kicker: "Co\u00fbts de construction moins salaires syndicaux, points d\u2019indice \u00b7 RMR de Toronto, 1981-2026",
      headline: "Les co\u00fbts de construction ont devanc\u00e9 les salaires deux fois depuis 1981 : de 77 points en 1990 et de 83 en 2017. Les salaires ont rattrap\u00e9 leur retard les deux fois.",
      deck: "L\u2019\u00e9cart entre l\u2019indice IPLN maison seulement et les salaires syndicaux torontois oscille par vagues. Les co\u00fbts avaient 77 points d\u2019avance en 1990 et 83 en 2017. Les salaires ont referm\u00e9 l\u2019\u00e9cart les deux fois, terminant 2026 \u00e0 9 points.",
      note: "\u00c9cart en points d\u2019indice 1981=100, pas en dollars. Les salaires sont l\u2019indicateur syndical ICSS de Toronto, suppl\u00e9ments inclus.",
      source: "Statistique Canada, tableaux 18-10-0205-01, 18-10-0140-01, extraits le 10 oct. 2026.",
      shareText: "Les co\u00fbts de construction avaient 77 points d\u2019avance sur les salaires en 1990 et 83 en 2017. Les salaires ont referm\u00e9 l\u2019\u00e9cart les deux fois.",
    },
    chart: {"decimals": 0, "kind": "tseries", "variant": "line", "xLabels": ["1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"], "series": [{"name": "Cost-wage gap", "nameFr": "Écart coûts-salaires", "values": [0.0,18.2,-2.6,-15.5,-14.0,-8.1,26.4,47.7,74.7,76.8,8.2,-9.0,-18.5,-26.1,-31.8,-33.9,-36.6,-32.6,-28.7,-26.7,-24.4,-24.7,-17.2,-6.0,1.9,6.0,8.8,19.0,9.1,6.7,10.9,28.0,39.1,37.2,40.4,50.7,82.8,92.9,73.1,58.7,73.7,102.0,95.9,71.0,49.9,9.0]}]},
  },
  {
    slug: "lumber-boom-bust",
    kicker: "Materials input prices, 1981=100 \u00b7 Canada, 1981-2026",
    headline: "Lumber spiked to 6.2x in 2022, then collapsed to 3.1x. Metal and concrete never spiked. They just kept climbing.",
    deck: "Softwood lumber went from 248 in 2020 to 618 in 2022, then fell back to 311 by 2026. Fabricated metal rose steadily to 4.01x and ready-mixed concrete to 3.66x. The spike everyone remembers was not the story. The quiet climbers were.",
    note: "National IPPI factory-gate prices, shown as upstream input-price shocks, not Toronto builder costs.",
    source: "Statistics Canada, table 18-10-0266-01, extracted Oct 10, 2026.",
    shareText: "Lumber spiked to 6.2x in 2022, then collapsed to 3.1x. Metal and concrete never spiked. They just kept climbing.",
    projectName: "Housing Cost Drivers",
    projectUrl: "https://housing-costs.nshipyard.com",
    fr: {
      kicker: "Prix des intrants mat\u00e9riels, 1981=100 \u00b7 Canada, 1981-2026",
      headline: "Le bois d\u2019oeuvre a bondi \u00e0 6,2x en 2022, puis s\u2019est effondr\u00e9 \u00e0 3,1x. Le m\u00e9tal et le b\u00e9ton n\u2019ont jamais bondi. Ils n\u2019ont fait que grimper.",
      deck: "Le bois d\u2019oeuvre est pass\u00e9 de 248 en 2020 \u00e0 618 en 2022, puis est retomb\u00e9 \u00e0 311 en 2026. Le m\u00e9tal fabriqu\u00e9 a grimp\u00e9 r\u00e9guli\u00e8rement \u00e0 4,01x et le b\u00e9ton pr\u00eat \u00e0 l\u2019emploi \u00e0 3,66x. Le pic dont tout le monde se souvient n\u2019\u00e9tait pas l\u2019histoire. Les grimpeurs discrets l\u2019\u00e9taient.",
      note: "Prix IPPI nationaux \u00e0 la sortie d\u2019usine, pr\u00e9sent\u00e9s comme des chocs de prix en amont, pas comme des co\u00fbts torontois.",
      source: "Statistique Canada, tableau 18-10-0266-01, extrait le 10 oct. 2026.",
      shareText: "Le bois d\u2019oeuvre a bondi \u00e0 6,2x en 2022, puis s\u2019est effondr\u00e9 \u00e0 3,1x. Le m\u00e9tal et le b\u00e9ton n\u2019ont jamais bondi. Ils n\u2019ont fait que grimper.",
    },
    chart: {"decimals": 0, "kind": "tseries", "variant": "line", "xLabels": ["1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"], "series": [{"name": "Softwood lumber", "nameFr": "Bois d’oeuvre", "values": [100.0,90.3,110.4,114.1,107.9,113.7,118.9,127.0,121.6,120.3,111.7,125.8,186.3,246.9,217.1,182.6,245.9,210.7,214.4,225.6,166.8,194.8,178.7,180.7,191.6,184.1,171.0,143.9,150.1,150.4,161.8,155.1,197.0,211.2,222.6,223.1,226.3,276.2,235.5,248.1,508.2,617.6,300.7,307.2,354.1,311.4]},{"name": "Fabricated metal", "nameFr": "Métal fabriqué", "values": [100.0,109.6,113.4,116.9,120.8,125.4,128.7,133.9,138.8,142.3,142.6,141.3,142.6,147.3,158.2,165.0,167.8,171.9,173.5,176.5,176.2,178.1,181.7,183.9,204.6,204.9,207.4,209.8,228.7,216.7,221.0,223.8,218.0,223.2,230.9,239.6,243.7,253.0,274.0,273.2,280.9,379.0,391.5,380.9,388.8,400.6]},{"name": "Ready-mixed concrete", "nameFr": "Béton prêt à l’emploi", "values": [100.0,117.4,125.9,119.5,121.4,130.6,135.4,142.5,148.6,155.2,151.2,151.7,149.3,153.0,158.3,160.2,159.9,163.6,163.8,165.7,174.1,176.2,177.8,178.1,186.3,195.0,203.7,216.1,220.3,221.1,222.7,229.3,230.9,238.0,233.2,241.2,246.4,258.8,250.1,263.9,265.2,280.2,327.4,349.3,359.9,366.2]}]},
  },
];
