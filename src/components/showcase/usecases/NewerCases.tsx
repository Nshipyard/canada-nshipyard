"use client";

import CiteShare, { type CiteLabels } from "../CiteShare";

type Card = {
  id: string;
  kicker: string;
  name: string;
  question: string;
  body: string;
  stat: string;
  statLabel: string;
  url: string;
  shareText: string;
  live?: boolean;
};

const CARDS: Record<string, { en: Card[]; fr: Card[] }> = {
  procurement: {
    en: [
      {
        id: "procurement-vendors",
        kicker: "Toronto",
        name: "procurement",
        question: "Where did $21.5 billion in city spending actually go?",
        body: "Toronto publishes every award, but vendor names arrive as 4,240 inconsistent spellings of the same companies. This project normalizes them into 4,082 real vendors across $21.5B in awards from 2012 to 2026, so the top vendors and the long tail are finally countable. Every award keeps its source row, and the merge rules are documented.",
        stat: "$21.5B",
        statLabel: "in city awards 2012-2026, traced to 4,082 real vendors after collapsing 4,240 raw name spellings",
        url: "https://procurement.canada.nshipyard.com",
        shareText: "Toronto spent $21.5B across 2012-2026. 4,240 raw vendor spellings collapse into 4,082 real vendors.",
      },
    ],
    fr: [
      {
        id: "procurement-vendors",
        kicker: "Toronto",
        name: "procurement",
        question: "Où sont vraiment allés les 21,5 milliards de dépenses de la ville ?",
        body: "Toronto publie chaque adjudication, mais les noms de fournisseurs arrivent sous 4 240 orthographes incohérentes des mêmes entreprises. Ce projet les normalise en 4 082 vrais fournisseurs, pour 21,5 G$ d'adjudications de 2012 à 2026, afin que les principaux fournisseurs et la longue traîne deviennent enfin comptables. Chaque adjudication garde sa ligne source, et les règles de fusion sont documentées.",
        stat: "21,5 G$",
        statLabel: "d'adjudications municipales 2012-2026, attribués à 4 082 vrais fournisseurs après réduction de 4 240 orthographes brutes",
        url: "https://procurement.canada.nshipyard.com",
        shareText: "Toronto a dépensé 21,5 G$ entre 2012 et 2026. 4 240 orthographes brutes de fournisseurs se réduisent à 4 082 vrais fournisseurs.",
      },
    ],
  },
  supply: {
    en: [
      {
        id: "supply-stations",
        kicker: "Toronto",
        name: "supply",
        question: "What got built next to the new subway stations?",
        body: "Twenty-nine published studies measured what new rail stations do to nearby housing prices. Almost nobody measured what got built next to them. This project draws an 800-metre zone around each of Toronto's 125 rail stations and counts the housing supply inside, split by whether the application arrived before or after the station opened. Finch West went from 0 nearby projects to 4 (3,593 homes) after the December 2017 extension opened; 441,649 pipeline homes already cluster around stations that have not opened yet.",
        stat: "41.1%",
        statLabel: "of Toronto's development pipeline, 365,770 of 890,247 homes, sits within 800 metres of an open rail station",
        url: "https://supply.canada.nshipyard.com",
        shareText: "41.1% of Toronto's housing pipeline sits within 800 m of an open rail station. Finch West went 0 to 4 projects after the 2017 extension opened.",
      },
    ],
    fr: [
      {
        id: "supply-stations",
        kicker: "Toronto",
        name: "supply",
        question: "Qu'a-t-on construit près des nouvelles stations de métro ?",
        body: "Vingt-neuf études publiées ont mesuré l'effet des nouvelles stations sur les prix des logements à proximité. Presque personne n'a mesuré ce qui s'y est construit. Ce projet trace une zone de 800 mètres autour de chacune des 125 stations ferroviaires de Toronto et y compte l'offre de logements, selon que la demande est arrivée avant ou après l'ouverture de la station. Finch West est passée de 0 projet à proximité à 4 (3 593 logements) après l'ouverture du prolongement en décembre 2017 ; 441 649 logements en pipeline se concentrent déjà autour de stations pas encore ouvertes.",
        stat: "41,1 %",
        statLabel: "du pipeline de développement de Toronto, soit 365 770 logements sur 890 247, se trouve à moins de 800 mètres d'une station ouverte",
        url: "https://supply.canada.nshipyard.com",
        shareText: "41,1 % du pipeline de logements de Toronto se trouve à moins de 800 m d'une station ouverte. Finch West est passée de 0 à 4 projets après l'ouverture du prolongement de 2017.",
      },
    ],
  },
  flood: {
    en: [
      {
        id: "flood-history",
        kicker: "Canada",
        name: "flood",
        question: "Where does Canada actually flood?",
        body: "21,983 news-reported flood events from 2000 to 2026, aggregated by province, year, and month and mapped against live precipitation radar and official weather alerts. Regions in the top quarter of historical floods get attention when heavy rain or an alert lands on them: a documented watch rule, not a forecast. BC's open flood-protection inventory (1,109 km of dikes) is included; no other province publishes an equivalent.",
        stat: "21,983",
        statLabel: "news-reported flood events in Canada, 2000-2026, mapped against live radar and BC's 1,109 km of dikes",
        url: "https://flood.canada.nshipyard.com",
        shareText: "21,983 flood events reported in Canada 2000-2026, mapped against live radar. Only BC publishes an open flood-protection inventory.",
      },
    ],
    fr: [
      {
        id: "flood-history",
        kicker: "Canada",
        name: "flood",
        question: "Où le Canada inonde-t-il vraiment ?",
        body: "21 983 inondations signalées par les médias de 2000 à 2026, agrégées par province, année et mois, et cartographiées avec le radar de précipitations en direct et les alertes météo officielles. Les régions du quartile supérieur des inondations historiques retiennent l'attention quand de fortes pluies ou une alerte s'y abattent : une règle de vigilance documentée, pas une prévision. L'inventaire ouvert de protection contre les inondations de la C.-B. (1 109 km de digues) est inclus ; aucune autre province n'en publie d'équivalent.",
        stat: "21 983",
        statLabel: "inondations signalées par les médias au Canada, 2000-2026, cartographiées avec le radar en direct et les 1 109 km de digues de la C.-B.",
        url: "https://flood.canada.nshipyard.com",
        shareText: "21 983 inondations signalées au Canada entre 2000 et 2026, cartographiées avec le radar en direct. Seule la C.-B. publie un inventaire ouvert de protection contre les inondations.",
      },
    ],
  },
  fire: {
    en: [
      {
        id: "fire-watch",
        kicker: "Canada",
        name: "fire",
        question: "What are today's fire conditions, honestly measured?",
        body: "Live satellite hotspots and active fire perimeters from the Canadian Wildland Fire Information System, plus an explainable 0-100 watch index built from 1,961 fire-weather station observations: hot plus dry plus windy, with the formula published in the methodology. It describes observed conditions; it does not predict ignition or spread. Every view shows its data timestamp.",
        stat: "1,961",
        statLabel: "fire-weather station observations feeding an explainable 0-100 watch index, formula published",
        url: "https://fire.canada.nshipyard.com",
        shareText: "Canada's fire conditions from 1,961 weather stations, distilled into an explainable 0-100 watch index. Honest about what it does not predict.",
      },
    ],
    fr: [
      {
        id: "fire-watch",
        kicker: "Canada",
        name: "fire",
        question: "Quelles sont les conditions de feu d'aujourd'hui, mesurées honnêtement ?",
        body: "Points chauds satellitaires en direct et périmètres de feux actifs du Système canadien d'information sur les feux de végétation, plus un indice de vigilance explicable de 0 à 100 construit à partir de 1 961 observations de stations météo-incendie : chaud plus sec plus venteux, avec la formule publiée dans la méthodologie. Il décrit les conditions observées ; il ne prédit ni l'allumage ni la propagation. Chaque vue affiche l'horodatage de ses données.",
        stat: "1 961",
        statLabel: "observations de stations météo-incendie alimentant un indice de vigilance explicable de 0 à 100, formule publiée",
        url: "https://fire.canada.nshipyard.com",
        shareText: "Les conditions de feu au Canada à partir de 1 961 stations météo, résumées en un indice de vigilance explicable de 0 à 100. Honnête sur ce qu'il ne prédit pas.",
      },
    ],
  },
  livable: {
    en: [
      {
        id: "livable-isochrone",
        kicker: "Toronto",
        name: "livable",
        question: "How much of Toronto is within 30 minutes?",
        body: "Real isochrones from Union Station: 82.5 km² reachable in 30 minutes by transit versus 339.5 km² by car at rush hour, a 4.1x gap. Proposed transit lines are then ranked by how much 30-minute land each billion dollars buys. GO Expansion leads at 1.31 km² per billion (+17.7 km² on a C$13.5B budget); the Ontario Line, Scarborough, and Eglinton West additions are honest nulls.",
        stat: "82.5 km²",
        statLabel: "reachable in 30 minutes by transit from Union Station, versus 339.5 km² by car at rush hour",
        url: "https://livable.canada.nshipyard.com",
        shareText: "82.5 km² of Toronto is within 30 minutes by transit vs 339.5 by car. GO Expansion buys the most 30-minute land per dollar.",
      },
    ],
    fr: [
      {
        id: "livable-isochrone",
        kicker: "Toronto",
        name: "livable",
        question: "Quelle part de Toronto est à 30 minutes ?",
        body: "De vraies isochrones depuis la gare Union : 82,5 km² accessibles en 30 minutes en transport en commun contre 339,5 km² en voiture à l'heure de pointe, un écart de 4,1 fois. Les lignes de transport proposées sont ensuite classées selon le territoire à 30 minutes que chaque milliard de dollars achète. L'expansion GO mène à 1,31 km² par milliard (+17,7 km² pour un budget de 13,5 G$) ; les ajouts de la ligne Ontario, de Scarborough et d'Eglinton Ouest sont des nuls honnêtes.",
        stat: "82,5 km²",
        statLabel: "accessibles en 30 minutes en transport en commun depuis la gare Union, contre 339,5 km² en voiture à l'heure de pointe",
        url: "https://livable.canada.nshipyard.com",
        shareText: "82,5 km² de Toronto sont à 30 minutes en transport en commun contre 339,5 en voiture. L'expansion GO achète le plus de territoire à 30 minutes par dollar.",
      },
    ],
  },
  contagion: {
    en: [
      {
        id: "contagion-ripple",
        kicker: "Canada",
        name: "contagion",
        question: "Did Toronto's unaffordability ripple outward?",
        body: "The Patient Zero thesis, tested: Toronto's unaffordability ripples outward along the corridor. Against 45 years of new-housing prices across seven corridor cities, Kitchener-Waterloo is the epicentre: new-home prices rose 46.7% from 2017 to 2026 against Toronto's 2.9%, peaking at 1.54x the 2017 index in 2022. By 2026 the corridor index sat at 1.43x Toronto's.",
        stat: "+46.7%",
        statLabel: "Kitchener-Waterloo new-home prices 2017-2026, versus +2.9% in Toronto; the corridor index hit 1.43x Toronto's",
        url: "https://contagion.canada.nshipyard.com",
        shareText: "Kitchener-Waterloo new-home prices rose 46.7% since 2017 vs 2.9% in Toronto. The unaffordability wave is measurable.",
      },
    ],
    fr: [
      {
        id: "contagion-ripple",
        kicker: "Canada",
        name: "contagion",
        question: "L'inabordabilité de Toronto s'est-elle propagée ?",
        body: "La thèse du patient zéro, testée : l'inabordabilité de Toronto se propage le long du corridor. Sur 45 ans de prix des maisons neuves dans sept villes du corridor, Kitchener-Waterloo est l'épicentre : les prix des maisons neuves y ont augmenté de 46,7 % de 2017 à 2026 contre 2,9 % à Toronto, culminant à 1,54 fois l'indice de 2017 en 2022. En 2026, l'indice du corridor atteignait 1,43 fois celui de Toronto.",
        stat: "+46,7 %",
        statLabel: "prix des maisons neuves de Kitchener-Waterloo 2017-2026, contre +2,9 % à Toronto ; l'indice du corridor a atteint 1,43 fois celui de Toronto",
        url: "https://contagion.canada.nshipyard.com",
        shareText: "Les prix des maisons neuves de Kitchener-Waterloo ont augmenté de 46,7 % depuis 2017 contre 2,9 % à Toronto. La vague d'inabordabilité est mesurable.",
      },
    ],
  },
  "my-street": {
    en: [
      {
        id: "my-street-live",
        kicker: "Toronto",
        name: "my-street",
        question: "What's happening on my street right now?",
        body: "Type any Toronto street and see the city's live road-restrictions feed within 500 metres, re-fetched every 6 hours, alongside 200,000+ active building permits matched by street name and re-queried hourly. The permit feed has no coordinates, so results are honestly labeled by street, not by distance.",
        stat: "200k+",
        statLabel: "live building-permit records matched by street name, plus the city's live road-restrictions feed within 500 m",
        url: "https://my-street.canada.nshipyard.com",
        shareText: "What's happening on your Toronto street right now: live road restrictions plus 200k+ building permits by street name.",
      },
    ],
    fr: [
      {
        id: "my-street-live",
        kicker: "Toronto",
        name: "my-street",
        question: "Que se passe-t-il dans ma rue en ce moment ?",
        body: "Tapez n'importe quelle rue de Toronto pour voir le fil en direct des restrictions routières de la ville dans un rayon de 500 mètres, actualisé toutes les 6 heures, ainsi que plus de 200 000 permis de construire actifs appariés par nom de rue et réinterrogés chaque heure. Le fil des permis n'a pas de coordonnées, donc les résultats sont honnêtement étiquetés par rue, pas par distance.",
        stat: "200 k+",
        statLabel: "dossiers de permis de construire en direct appariés par nom de rue, plus le fil en direct des restrictions routières dans 500 m",
        url: "https://my-street.canada.nshipyard.com",
        shareText: "Ce qui se passe dans votre rue à Toronto en ce moment : restrictions routières en direct plus 200 000 permis de construire par nom de rue.",
      },
    ],
  },
  geo: {
    en: [
      {
        id: "geo-crosswalk",
        kicker: "Toronto",
        name: "geo",
        question: "Which 2021 neighbourhood was my 2016 neighbourhood?",
        body: "Toronto re-cut its social-planning neighbourhoods from 140 to 158 for the 2021 census round: 16 high-growth neighbourhoods were split into 34, and 124 stayed unchanged. The city publishes both boundary vintages but no official crosswalk, so every longitudinal analysis spanning the 2016 and 2021 censuses hits the same wall. This project computes every overlap between the two vintages, plus ward concordances, so the mapping is derived once and reused.",
        stat: "140 → 158",
        statLabel: "neighbourhoods: 16 high-growth areas split into 34 for the 2021 census; every cross-vintage overlap computed",
        url: "https://geo.canada.nshipyard.com",
        shareText: "Toronto went from 140 to 158 neighbourhoods in 2021 with no official crosswalk. Now every overlap is computed.",
      },
    ],
    fr: [
      {
        id: "geo-crosswalk",
        kicker: "Toronto",
        name: "geo",
        question: "Quel quartier de 2021 était mon quartier de 2016 ?",
        body: "Toronto a redécoupé ses quartiers de planification sociale de 140 à 158 pour le recensement de 2021 : 16 quartiers à forte croissance ont été divisés en 34, et 124 sont restés inchangés. La ville publie les deux millésimes de limites mais aucune correspondance officielle, de sorte que chaque analyse longitudinale couvrant les recensements de 2016 et 2021 bute sur le même mur. Ce projet calcule chaque chevauchement entre les deux millésimes, plus les concordances de quartiers électoraux, pour que la correspondance soit établie une fois et réutilisée.",
        stat: "140 → 158",
        statLabel: "quartiers : 16 zones à forte croissance divisées en 34 pour le recensement de 2021 ; chaque chevauchement entre millésimes calculé",
        url: "https://geo.canada.nshipyard.com",
        shareText: "Toronto est passée de 140 à 158 quartiers en 2021 sans correspondance officielle. Désormais chaque chevauchement est calculé.",
      },
    ],
  },
  cameras: {
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
        shareText:
          "The Camera Post-Mortem: every Toronto traffic camera ranked. $424.1M in implied red-light fines since 2007; Parkside Dr's speed camera issued 70,243 tickets.",
        live: true,
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
        shareText:
          "Le bilan des caméras : chaque caméra de Toronto classée. 424,1 M$ d'amendes implicites aux feux rouges depuis 2007 ; 70 243 contraventions pour la caméra de Parkside Dr.",
        live: true,
      },
    ],
  },
  rentals: {
    en: [
      {
        id: "landlord-index",
        kicker: "Toronto",
        name: "The Landlord Operator Index",
        question: "Which management companies run Toronto's worst-rated rental buildings?",
        body: "RentSafeTO audited every large rental building in Toronto, and the scores are now ranked by the company behind the building: 831 property-management companies, 3,593 buildings. 34 buildings rate red, 557 yellow. Greenwin Corp., the largest operator with 104 buildings, has zero red and averages 92.2. The ranking covers management companies, never legal owners.",
        stat: "831 companies",
        statLabel: "ranked from RentSafeTO's own audits; 34 buildings rate red, 557 yellow",
        url: "https://landlord.canada.nshipyard.com",
        shareText:
          "The Landlord Operator Index: 831 Toronto property-management companies ranked by RentSafeTO scores. 34 buildings rate red.",
        live: true,
      },
    ],
    fr: [
      {
        id: "landlord-index",
        kicker: "Toronto",
        name: "L'indice des gestionnaires d'immeubles",
        question: "Quelles sociétés de gestion gèrent les immeubles locatifs les moins bien notés de Toronto ?",
        body: "RentSafeTO a audité chaque grand immeuble locatif de Toronto, et les scores sont désormais classés par société de gestion : 831 sociétés, 3 593 immeubles. 34 immeubles au rouge, 557 au jaune. Greenwin Corp., le plus grand exploitant avec 104 immeubles, n'a aucun rouge et affiche 92,2 de moyenne. Le classement porte sur les sociétés de gestion, jamais sur les propriétaires légaux.",
        stat: "831 sociétés",
        statLabel: "classées à partir des audits de RentSafeTO ; 34 immeubles au rouge, 557 au jaune",
        url: "https://landlord.canada.nshipyard.com",
        shareText:
          "L'indice des gestionnaires d'immeubles : 831 sociétés de gestion torontoises classées par scores RentSafeTO. 34 immeubles au rouge.",
        live: true,
      },
    ],
  },
  foodsafety: {
    en: [
      {
        id: "dinesafe-chains",
        kicker: "Toronto",
        name: "DineSafe Chain Report Card",
        question: "Which restaurant chains fail food-safety inspections most?",
        body: "84 chains ranked by infraction rate per inspection, from Toronto Public Health's own DineSafe records. bb.q Chicken sits at the bottom with a 19.4% conditional-pass rate across 10 locations, against 6.7% citywide; Tim Hortons sits at 2.0% across 351 locations. A conditional pass means the infraction was corrected within 48 hours, not an ongoing hazard.",
        stat: "19.4% vs 2.0%",
        statLabel: "conditional-pass rate: bb.q Chicken (10 locations) vs Tim Hortons (351 locations); 6.7% citywide",
        url: "https://dinesafe.canada.nshipyard.com",
        shareText:
          "DineSafe Chain Report Card: 84 restaurant chains ranked by food-safety infraction rates. bb.q Chicken 19.4%, Tim Hortons 2.0%.",
        live: false,
      },
    ],
    fr: [
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
        shareText:
          "Bulletin DineSafe des chaînes : 84 chaînes de restaurants classées par taux d'infractions. bb.q Chicken 19,4 %, Tim Hortons 2,0 %.",
        live: false,
      },
    ],
  },
  aiadoption: {
    en: [
      {
        id: "adoption-inversion",
        kicker: "Canada",
        name: "The Adoption Inversion",
        question: "Is Canada actually behind the US in AI adoption?",
        body: "No. On the one survey question both countries asked in nearly identical words, Canadian businesses were ahead in 2025: 12.2% vs 10.0% in the US. The American reading jumped to 17.3% in November 2025, but that came from the Census changing the question, not from real adoption. The 'Canada lags' narrative was built on mismatched numbers.",
        stat: "12.2% vs 10.0%",
        statLabel: "Canadian vs US businesses using AI in 2025, on the identically worded survey question",
        url: "https://adoption.canada.nshipyard.com",
        shareText:
          "The Adoption Inversion: on the one AI question both countries asked identically, Canada was ahead, 12.2% to 10.0%.",
        live: true,
      },
    ],
    fr: [
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
        shareText:
          "L'inversion de l'adoption : sur la seule question IA posée à l'identique, le Canada devançait, 12,2 % contre 10,0 %.",
        live: true,
      },
    ],
  },
  gpuprices: {
    en: [
      {
        id: "gpu-premium",
        kicker: "Canada",
        name: "The Montreal Premium",
        question: "How much more does the same GPU cost in Canada?",
        body: "18 GPU SKUs priced in US and Canadian cloud regions on the same day: the Canada premium runs 11.0% to 23.1%. An Azure H100 80GB costs $8.59/hr in Canada Central against $6.98/hr in US East, a 23.1% premium. The two-thirds AI Compute Access Fund subsidy flips that premium into a roughly 59% discount against US list for funded SMEs.",
        stat: "+23.1%",
        statLabel: "Canada premium on Azure H100 80GB ($8.59/hr CA vs $6.98/hr US); 11.0-23.1% across 18 SKUs",
        url: "https://gpu.canada.nshipyard.com",
        shareText:
          "The Montreal Premium: the same GPU costs 11-23% more in a Canadian cloud region. Azure H100 80GB: $8.59/hr CA vs $6.98/hr US.",
        live: false,
      },
    ],
    fr: [
      {
        id: "gpu-premium",
        kicker: "Canada",
        name: "La prime de Montréal",
        question: "Combien le même GPU coûte-t-il de plus au Canada ?",
        body: "18 configurations GPU tarifées le même jour dans des régions infonuagiques américaines et canadiennes : la prime canadienne va de 11,0 % à 23,1 %. Un Azure H100 80 Go coûte 8,59 $/h dans Canada Central contre 6,98 $/h dans US East, soit 23,1 % de plus. La subvention des deux tiers du Fonds d'accès au calcul pour l'IA transforme cette prime en un rabais d'environ 59 % par rapport au tarif américain pour les PME admissibles.",
        stat: "+23,1 %",
        statLabel: "prime canadienne sur Azure H100 80 Go (8,59 $/h CA contre 6,98 $/h US) ; 11,0 à 23,1 % sur 18 configurations",
        url: "https://gpu.canada.nshipyard.com",
        shareText:
          "La prime de Montréal : le même GPU coûte 11 à 23 % plus cher dans une région infonuagique canadienne. Azure H100 80 Go : 8,59 $/h CA contre 6,98 $/h US.",
        live: false,
      },
    ],
  },
  aispending: {
    en: [
      {
        id: "ai-receipt",
        kicker: "Canada",
        name: "The $800M Receipt",
        question: "Where did Ottawa's AI spending actually go?",
        body: "42 contracts, 39 vendors, $655.3M tracked from order papers and procurement records. 97.4% went to Canadian-owned vendors ($638.5M); the largest foreign vendor is Thales of France at $10.3M. The $240M Cohere investment is reported separately. This is a verifiable floor, not a census: small purchases like ChatGPT subscriptions were never compiled, and CSE, CSIS, and RCMP spending is missing.",
        stat: "$655.3M",
        statLabel: "tracked across 42 contracts and 39 vendors; 97.4% Canadian-owned",
        url: "https://aispend.canada.nshipyard.com",
        shareText:
          "The $800M Receipt: $655.3M in Ottawa AI spending tracked across 42 contracts. 97.4% went to Canadian-owned vendors.",
        live: false,
      },
    ],
    fr: [
      {
        id: "ai-receipt",
        kicker: "Canada",
        name: "Le reçu de 800 M$",
        question: "Où sont vraiment allés les fonds fédéraux pour l'IA ?",
        body: "42 contrats, 39 fournisseurs, 655,3 M$ retracés à partir des documents parlementaires et des dossiers d'approvisionnement. 97,4 % sont allés à des fournisseurs à propriété canadienne (638,5 M$) ; le plus grand fournisseur étranger est Thales (France) avec 10,3 M$. L'investissement de 240 M$ dans Cohere est présenté séparément. Il s'agit d'un plancher vérifiable, pas d'un recensement : les petits achats comme les abonnements ChatGPT n'ont jamais été compilés, et les dépenses du CST, du SCRS et de la GRC manquent.",
        stat: "655,3 M$",
        statLabel: "retracés sur 42 contrats et 39 fournisseurs ; 97,4 % à propriété canadienne",
        url: "https://aispend.canada.nshipyard.com",
        shareText:
          "Le reçu de 800 M$ : 655,3 M$ de dépenses fédérales en IA retracés sur 42 contrats. 97,4 % vers des fournisseurs canadiens.",
        live: false,
      },
    ],
  },
};

export default function NewerCases({
  dataset,
  labels,
  lang,
}: {
  dataset: string;
  labels: CiteLabels & { howWeKnow: string };
  lang: "en" | "fr";
}) {
  const cards = CARDS[dataset]?.[lang] ?? [];
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

            {c.live !== false ? (
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
