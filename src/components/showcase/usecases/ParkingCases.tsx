"use client";

import { useEffect, useMemo, useState } from "react";
import { HOUR_VALUES } from "@/showcase-stories";
import StoryChart from "../charts";
import UseCaseCard, { type UseCase } from "../UseCaseCard";
import type { CiteLabels } from "../CiteShare";

const RED = "#d80621";
const INK = "#0a0f1e";

// City-wide distributions, 2023-2025, from
// toronto-parking-tickets-geocoded/data/temporal.json
// by_dow keys are Python weekday(): Monday=0 .. Sunday=6
const DOW_VALUES = [807142, 915039, 901142, 860245, 896518, 684609, 541788];
const MONTH_VALUES = [434439, 412232, 477631, 484595, 508800, 488107, 457940, 466991, 482361, 494457, 471370, 427560];

interface StreetRow {
  name: string;
  total: number;
  matrix: number[][]; // [dow Monday=0..Sunday=6][hour 0..23]
}

const L = {
  en: {
    streetLabel: "Street",
    loading: "Loading ticket data…",
    worst: "Worst time to park",
    quietest: "Quietest",
    tapHint: "Tap any cell to inspect that hour.",
    tickets: "tickets",
    darker: "Darker = more tickets.",
    cityKicker: "Parking Tickets",
    dowShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dowFull: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    hourNote: "Tickets by hour of day, 2023-2025.",
    dowNote: "Tickets by day of week, 2023-2025.",
    monthNote: "Tickets by month, 2023-2025.",
  },
  fr: {
    streetLabel: "Rue",
    loading: "Chargement des contraventions…",
    worst: "Pire moment pour se garer",
    quietest: "Le plus calme",
    tapHint: "Touchez une case pour inspecter cette heure.",
    tickets: "contraventions",
    darker: "Plus foncé = plus de contraventions.",
    cityKicker: "Contraventions",
    dowShort: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    dowFull: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
    months: ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
    hourNote: "Contraventions par heure du jour, 2023-2025.",
    dowNote: "Contraventions par jour de semaine, 2023-2025.",
    monthNote: "Contraventions par mois, 2023-2025.",
  },
};

function displayName(s: string) {
  return s
    .split(" ")
    .map((w) => (w ? w[0] + w.slice(1).toLowerCase() : w))
    .join(" ");
}

function fmt(n: number, lang: "en" | "fr") {
  return n.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA");
}

function Heatmap({
  row,
  lang,
  cell,
  setCell,
}: {
  row: StreetRow;
  lang: "en" | "fr";
  cell: { dow: number; hour: number } | null;
  setCell: (c: { dow: number; hour: number } | null) => void;
}) {
  const t = L[lang];
  const W = 720;
  const gutter = 46;
  const top = 26;
  const rowH = 36;
  const colW = (W - gutter - 8) / 24;
  const H = top + 7 * rowH + 10;
  const max = Math.max(...row.matrix.flat());
  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t.tapHint}>
        {Array.from({ length: 24 }, (_, h) =>
          h % 3 === 0 ? (
            <text key={h} x={gutter + h * colW + colW / 2} y={14} fontSize={11} fill={INK} opacity={0.55} textAnchor="middle">
              {h}h
            </text>
          ) : null
        )}
        {row.matrix.map((dayVals, d) => (
          <g key={d}>
            <text x={gutter - 8} y={top + d * rowH + rowH / 2 + 4} fontSize={11.5} fill={INK} opacity={0.65} textAnchor="end">
              {t.dowShort[d]}
            </text>
            {dayVals.map((v, h) => {
              const sel = cell !== null && cell.dow === d && cell.hour === h;
              return (
                <rect
                  key={h}
                  x={gutter + h * colW + 1.5}
                  y={top + d * rowH + 2}
                  width={colW - 3}
                  height={rowH - 4}
                  rx={4}
                  fill={v === 0 ? INK : RED}
                  opacity={v === 0 ? 0.06 : 0.12 + 0.88 * Math.sqrt(v / max)}
                  stroke={sel ? INK : "none"}
                  strokeWidth={sel ? 2.5 : 0}
                  onClick={() => setCell(sel ? null : { dow: d, hour: h })}
                  style={{ cursor: "pointer" }}
                >
                  <title>{`${t.dowFull[d]} ${h}:00, ${fmt(v, lang)} ${t.tickets}`}</title>
                </rect>
              );
            })}
          </g>
        ))}
      </svg>
      <figcaption className="mt-1 text-[12px] text-ink/50">{t.darker} {t.tapHint}</figcaption>
    </figure>
  );
}

function DistBars({ values, labels, note }: { values: number[]; labels: string[]; note: string }) {
  const W = 680;
  const H = 190;
  const padB = 30;
  const max = Math.max(...values);
  const bw = W / values.length;
  const peak = values.indexOf(max);
  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={note}>
        {values.map((v, i) => {
          const h = (v / max) * (H - padB - 16);
          return (
            <g key={i}>
              <rect
                x={i * bw + 2}
                y={H - padB - h}
                width={Math.max(2, bw - 4)}
                height={h}
                rx={2}
                fill={RED}
                opacity={i === peak ? 1 : 0.55}
              />
              <text x={i * bw + bw / 2} y={H - 10} fontSize={10.5} fill={INK} opacity={0.55} textAnchor="middle">
                {labels[i]}
              </text>
            </g>
          );
        })}
        <text x={4} y={H - padB + 42} fontSize={11.5} fill={INK} opacity={0.5}>
          {note}
        </text>
      </svg>
    </figure>
  );
}

export default function ParkingCases({ labels, lang }: { labels: CiteLabels & { howWeKnow: string }; lang: "en" | "fr" }) {
  const t = L[lang];
  const [streets, setStreets] = useState<StreetRow[] | null>(null);
  const [street, setStreet] = useState("YONGE ST");
  const [cell, setCell] = useState<{ dow: number; hour: number } | null>(null);

  useEffect(() => {
    fetch("/data/parking-street-temporal.json")
      .then((r) => r.json())
      .then((j) => setStreets(j.streets))
      .catch(() => setStreets([]));
  }, []);

  const row = useMemo(() => streets?.find((s) => s.name === street) ?? null, [streets, street]);

  const worst = useMemo(() => {
    if (!row) return null;
    let best = { dow: 0, hour: 0, v: -1 };
    row.matrix.forEach((dayVals, d) =>
      dayVals.forEach((v, h) => {
        if (v > best.v) best = { dow: d, hour: h, v };
      })
    );
    return best;
  }, [row]);

  const quietest = useMemo(() => {
    if (!row) return null;
    let q = { dow: 0, hour: 0, v: Infinity };
    row.matrix.forEach((dayVals, d) =>
      dayVals.forEach((v, h) => {
        if (v < q.v) q = { dow: d, hour: h, v };
      })
    );
    return q;
  }, [row]);

  const name = displayName(street);
  const uc1: UseCase = {
    id: "worst-time-to-park",
    kicker: t.cityKicker,
    question:
      lang === "fr"
        ? `Quel est le pire moment pour se garer sur ${name} ?`
        : `When is the worst time to park on ${name}?`,
    stat: worst ? `${t.dowFull[worst.dow]} ${worst.hour}:00` : "…",
    statLabel: worst
      ? lang === "fr"
        ? `la pire heure sur ${name} : ${fmt(worst.v, lang)} contraventions émises en 2023-2025`
        : `the single worst hour on ${name}: ${fmt(worst.v, lang)} tickets issued in 2023-2025`
      : "",
    mechanism:
      lang === "fr"
        ? [
            "Les heures des contraventions suivent les rondes des agents, pas seulement les mauvais stationnements : le pic de 11h correspond au dégagement de l'heure de pointe du matin et à la tournée des parcomètres.",
            "Le motif reste utile au conducteur : là où la carte est foncée, le risque de contravention est le plus élevé.",
          ]
        : [
            "Ticket timestamps track when officers walk their beats, not just when drivers park badly: the 11am peak lines up with morning rush-hour clearing and the midday meter round.",
            "The pattern still tells a driver what matters: where the map is darkest, the ticket risk is highest.",
          ],
    howWeKnow:
      lang === "fr"
        ? "Ville de Toronto, Contraventions de stationnement, fichiers mensuels 2023-2025. Rue tirée de l'adresse de la contravention, appariée aux points d'adresse de la Ville; heure tirée de l'horodatage, jour de la date d'infraction."
        : "City of Toronto Parking Tickets, monthly files 2023-2025. Street from the ticket address, matched to the City's Address Points; hour from the infraction timestamp, weekday from the infraction date.",
    shareText:
      lang === "fr"
        ? `Le pire moment pour se garer sur ${name} à Toronto : ${worst ? `${t.dowFull[worst.dow]} à ${worst.hour}h` : ""}, selon les contraventions 2023-2025.`
        : `The worst time to park on ${name} in Toronto is ${worst ? `${t.dowFull[worst.dow]} at ${worst.hour}:00` : ""}, by parking tickets issued 2023-2025.`,
    projectUrl: "https://toronto-parking-tickets-geocoded.vercel.app",
    projectName: lang === "fr" ? "Contraventions" : "Parking Tickets",
  };

  const uc2: UseCase = {
    id: "when-tickets-happen",
    kicker: t.cityKicker,
    question: lang === "fr" ? "Quand les Torontois reçoivent-ils leurs contraventions ?" : "When do Torontonians usually get tickets?",
    stat: lang === "fr" ? "11h" : "11am",
    statLabel:
      lang === "fr"
        ? "l'heure de pointe des contraventions dans toute la ville; le dimanche est le jour le plus calme"
        : "the peak ticket hour city-wide; Sunday is the quietest day",
    mechanism:
      lang === "fr"
        ? [
            "Les contraventions culminent à 11h et en mai; le dimanche est le jour le plus calme avec 541 788 contraventions contre environ 900 000 un jour de semaine.",
            "La forme est celle de l'application des règlements : les contraventions se concentrent aux heures où les agents sont dans la rue. Lisez-la comme une intensité d'application, pas comme un comportement des conducteurs.",
          ]
        : [
            "Tickets peak at 11am and in May; Sunday is the quietest day at 541,788 tickets against roughly 900,000 on a weekday.",
            "The shape is enforcement-shaped: tickets cluster in the hours officers work the curb. Read it as enforcement intensity, not driver behavior.",
          ],
    howWeKnow:
      lang === "fr"
        ? "Ville de Toronto, Contraventions de stationnement, 2023-2025 : 6 454 695 contraventions, dont 5 606 483 géocodées (86,9 %)."
        : "City of Toronto Parking Tickets, 2023-2025: 6,454,695 tickets, 5,606,483 geocoded (86.9%).",
    shareText:
      lang === "fr"
        ? "Les contraventions de stationnement à Toronto culminent à 11h et en mai. Le dimanche est le jour le plus calme."
        : "Toronto parking tickets peak at 11am and in May. Sunday is the quietest day.",
    projectUrl: "https://toronto-parking-tickets-geocoded.vercel.app",
    projectName: lang === "fr" ? "Contraventions" : "Parking Tickets",
  };

  return (
    <>
      {row && worst && quietest ? (
        <UseCaseCard usecase={uc1} labels={labels} lang={lang}>
          <div className="rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
            <label className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.15em] text-ink/50">
              {t.streetLabel}
            </label>
            <select
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
                setCell(null);
              }}
              className="w-full max-w-[420px] rounded-2xl border border-line bg-paper px-4 py-3 text-[16px] font-medium text-ink"
            >
              {streets!.map((s) => (
                <option key={s.name} value={s.name}>
                  {displayName(s.name)} ({fmt(s.total, lang)})
                </option>
              ))}
            </select>
            <div className="mt-6">
              <Heatmap row={row} lang={lang} cell={cell} setCell={setCell} />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-ink px-5 py-4 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/55">{t.worst}</p>
                <p className="display mt-1 text-[24px]">
                  {t.dowFull[worst.dow]} {worst.hour}:00
                </p>
                <p className="mt-1 text-[13px] text-white/65">
                  {fmt(worst.v, lang)} {t.tickets}
                </p>
              </div>
              <div className="rounded-2xl border border-line px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/50">{t.quietest}</p>
                <p className="display mt-1 text-[24px]">
                  {t.dowFull[quietest.dow]} {quietest.hour}:00
                </p>
                <p className="mt-1 text-[13px] text-ink/60">
                  {fmt(quietest.v, lang)} {t.tickets}
                </p>
              </div>
            </div>
            {cell && (
              <p className="mt-4 text-[14px] font-medium text-ink/75" aria-live="polite">
                {t.dowFull[cell.dow]} {cell.hour}:00: {fmt(row.matrix[cell.dow][cell.hour], lang)} {t.tickets} {lang === "fr" ? "sur" : "on"} {name}
              </p>
            )}
          </div>
        </UseCaseCard>
      ) : (
        <div className="mx-auto max-w-[880px] py-16 text-center text-[15px] text-ink/55">{t.loading}</div>
      )}

      <UseCaseCard usecase={uc2} labels={labels} lang={lang}>
        <div className="space-y-6 rounded-[28px] border border-line bg-paper-warm px-5 py-6 sm:px-8">
          <StoryChart spec={{ kind: "hourbars", values: HOUR_VALUES, note: t.hourNote }} />
          <div className="border-t border-line pt-6">
            <DistBars values={DOW_VALUES} labels={t.dowShort} note={t.dowNote} />
          </div>
          <div className="border-t border-line pt-6">
            <DistBars values={MONTH_VALUES} labels={t.months} note={t.monthNote} />
          </div>
        </div>
      </UseCaseCard>
    </>
  );
}
