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
};

const CARDS: Record<string, { en: Card[]; fr: Card[] }> = {
  procurement: {
    en: [
      {
        id: "procurement-vendors",
        kicker: "Toronto",
        name: "procurement",
        question: "Where did $21.5 billion in city spending actually go?",
        body: "Toronto publishes every award, but vendor names arrive as 6,117 inconsistent spellings of the same companies. This project normalizes them into 4,082 real vendors across $21.5B in awards from 2012 to 2026, so the top vendors and the long tail are finally countable. Every award keeps its source row, and the merge rules are documented.",
        stat: "$21.5B",
        statLabel: "in city awards 2012-2026, traced to 4,082 real vendors after collapsing 6,117 raw name spellings",
        url: "https://procurement.canada.nshipyard.com",
        shareText: "Toronto spent $21.5B across 2012-2026. 6,117 raw vendor spellings collapse into 4,082 real vendors.",
      },
    ],
    fr: [
      {
        id: "procurement-vendors",
        kicker: "Toronto",
        name: "procurement",
        question: "Où sont vraiment allés les 21,5 milliards de dépenses de la ville ?",
        body: "Toronto publie chaque adjudication, mais les noms de fournisseurs arrivent sous 6 117 orthographes incohérentes des mêmes entreprises. Ce projet les normalise en 4 082 vrais fournisseurs, pour 21,5 G$ d'adjudications de 2012 à 2026, afin que les principaux fournisseurs et la longue traîne deviennent enfin comptables. Chaque adjudication garde sa ligne source, et les règles de fusion sont documentées.",
        stat: "21,5 G$",
        statLabel: "d'adjudications municipales 2012-2026, attribués à 4 082 vrais fournisseurs après réduction de 6 117 orthographes brutes",
        url: "https://procurement.canada.nshipyard.com",
        shareText: "Toronto a dépensé 21,5 G$ entre 2012 et 2026. 6 117 orthographes brutes de fournisseurs se réduisent à 4 082 vrais fournisseurs.",
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
