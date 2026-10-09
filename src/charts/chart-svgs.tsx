// Hand-rolled SVG charts in the Open Nshipyard editorial style.
// All charts use viewBox width 1000 and scale to their container.

import type { BarDatum, TSeriesDatum, DonutSegment, GroupedSeries } from "./chart-data";

export type Lang = "en" | "fr";

export const INK = "#0a0f1e";
export const RED = "#d80621";
export const BAR = "#aeb6c2";
export const BAR_DARK = "#5b6472";
export const GRID = "#e4e7ed";
export const LABEL = "#3d4451";
export const FAINT = "#7c8494";

const SERIES_PALETTE = [RED, INK, BAR_DARK, "#8b94a3", BAR, "#d5dae1"];

export function fmtTick(v: number, lang: Lang, decimals = 0): string {
  return v.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

function wrapLabel(label: string, max = 26): string[] {
  if (label.length <= max) return [label];
  const words = label.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur += " " + w;
    }
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines.slice(0, 2);
}

export function HBars({ rows, unit, lang }: { rows: BarDatum[]; unit: string; lang: Lang }) {
  const W = 1000;
  const labelW = 330;
  const gap = 24;
  const rowH = 76;
  const top = 8;
  const H = top + rows.length * rowH + 40;
  const max = Math.max(...rows.map((r) => r.value));
  const barArea = W - labelW - gap - 190; // room for value labels
  const barX = labelW + gap;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Bar chart, ${unit}`}>
      {rows.map((r, i) => {
        const y = top + i * rowH;
        const bw = Math.max(6, (r.value / max) * barArea);
        const lines = wrapLabel(lang === "fr" ? r.labelFr : r.label);
        const color = r.highlight ? RED : BAR;
        const display = (lang === "fr" && r.displayFr ? r.displayFr : r.display) ?? fmtTick(r.value, lang);
        return (
          <g key={i}>
            {lines.map((ln, li) => (
              <text
                key={li}
                x={labelW - 12}
                y={y + 30 + li * 30 - (lines.length - 1) * 15}
                textAnchor="end"
                fontSize="27"
                fill={LABEL}
                fontFamily="Archivo, sans-serif"
              >
                {ln}
              </text>
            ))}
            <rect x={barX} y={y + 8} width={bw} height={40} fill={color} rx={3} />
            <text
              x={barX + bw + 14}
              y={y + 40}
              fontSize="30"
              fontWeight={r.highlight ? 800 : 600}
              fill={r.highlight ? RED : INK}
              fontFamily="Archivo, sans-serif"
            >
              {display}
            </text>
            <line x1={barX} y1={y + rowH - 6} x2={W} y2={y + rowH - 6} stroke={GRID} strokeWidth={1.5} />
          </g>
        );
      })}
    </svg>
  );
}

export interface ScatterPoint {
  x: number;
  y: number;
  label: string;
  tag?: string;
  tagFr?: string;
}

export function Scatter({
  points,
  xLabel,
  yLabel,
  annotation,
  lang,
  xDomain,
  yDomain,
  xTicks,
  yTicks,
  xTickFmt,
  yTickFmt,
  trend,
  titleOf: titleOfProp,
}: {
  points: ScatterPoint[];
  xLabel: string;
  yLabel: string;
  annotation: string;
  lang: Lang;
  xDomain?: [number, number];
  yDomain?: [number, number];
  xTicks?: number[];
  yTicks?: number[];
  xTickFmt?: (v: number, lang: Lang) => string;
  yTickFmt?: (v: number, lang: Lang) => string;
  trend?: { a: number; b: number; x0: number };
  titleOf?: (p: ScatterPoint) => string;
}) {
  const W = 1000;
  const H = 620;
  const m = { t: 30, r: 40, b: 110, l: 110 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  // Defaults preserve the original 311-equity card.
  const [x0, x1] = xDomain ?? [60000, 110000];
  const [y0, y1] = yDomain ?? [6, 12.5];
  const X = (v: number) => m.l + ((v - x0) / (x1 - x0)) * iw;
  const Y = (v: number) => m.t + ih - ((v - y0) / (y1 - y0)) * ih;
  const xt = xTicks ?? [60000, 70000, 80000, 90000, 100000, 110000];
  const yt = yTicks ?? [6, 8, 10, 12];
  const xf = xTickFmt ?? ((v) => `$${v / 1000}k`);
  const yf = yTickFmt ?? ((v) => `${v}%`);
  const yAt = trend ? (x: number) => trend.a + trend.b * (x - trend.x0) : null;
  // Preserves the original 311-equity tooltip wording.
  const titleOf = titleOfProp ?? ((p: ScatterPoint) => `Ward ${p.label}: $${p.x.toLocaleString()}, ${p.y}% backlog`);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Scatter plot">
      {yt.map((t) => (
        <g key={t}>
          <line x1={m.l} y1={Y(t)} x2={W - m.r} y2={Y(t)} stroke={GRID} strokeWidth={1.5} />
          <text x={m.l - 16} y={Y(t) + 9} textAnchor="end" fontSize="26" fill={FAINT} fontFamily="'IBM Plex Mono', monospace">
            {yf(t, lang)}
          </text>
        </g>
      ))}
      {xt.map((t) => (
        <text
          key={t}
          x={X(t)}
          y={H - m.b + 44}
          textAnchor="middle"
          fontSize="26"
          fill={FAINT}
          fontFamily="'IBM Plex Mono', monospace"
        >
          {xf(t, lang)}
        </text>
      ))}
      {yAt && (
        <line
          x1={X(x0)}
          y1={Y(yAt(x0))}
          x2={X(x1)}
          y2={Y(yAt(x1))}
          stroke={RED}
          strokeWidth={3.5}
          strokeDasharray="10 8"
        />
      )}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={X(p.x)} cy={Y(p.y)} r={13} fill={BAR_DARK} opacity={0.82}>
            <title>{titleOf(p)}</title>
          </circle>
          {p.tag && (
            <text
              x={X(p.x) + 20}
              y={Y(p.y) - 16}
              fontSize="24"
              fontWeight={700}
              fill={LABEL}
              fontFamily="Archivo, sans-serif"
            >
              {lang === "fr" && p.tagFr ? p.tagFr : p.tag}
            </text>
          )}
        </g>
      ))}
      <text x={m.l} y={H - 14} fontSize="26" fill={LABEL} fontFamily="Archivo, sans-serif">
        {xLabel}
      </text>
      <text
        x={34}
        y={m.t + ih / 2}
        fontSize="26"
        fill={LABEL}
        fontFamily="Archivo, sans-serif"
        transform={`rotate(-90 34 ${m.t + ih / 2})`}
        textAnchor="middle"
      >
        {yLabel}
      </text>
      <text x={W - m.r} y={m.t + 44} textAnchor="end" fontSize="26" fontStyle="italic" fill={RED} fontFamily="Archivo, sans-serif">
        {annotation}
      </text>
    </svg>
  );
}

export function Histogram({
  bars,
  marker,
  markerNote,
  preLabel,
  postLabel,
  lang,
}: {
  bars: { label: string; labelFr: string; value: number; era: "pre" | "post" }[];
  marker: string;
  markerNote: string;
  preLabel: string;
  postLabel: string;
  lang: Lang;
}) {
  const W = 1000;
  const H = 560;
  const m = { t: 70, r: 30, b: 90, l: 90 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const max = Math.max(...bars.map((b) => b.value));
  const n = bars.length;
  const slot = iw / n;
  const bw = slot * 0.72;
  const Y = (v: number) => m.t + ih - (v / max) * ih;
  // 1955 sits halfway through the 1950s bar (index 8)
  const markerX = m.l + slot * 8.5;
  const yTicks = [0, 2500, 5000, 7500];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Histogram">
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={m.l} y1={Y(t)} x2={W - m.r} y2={Y(t)} stroke={GRID} strokeWidth={1.5} />
          <text x={m.l - 14} y={Y(t) + 9} textAnchor="end" fontSize="24" fill={FAINT} fontFamily="'IBM Plex Mono', monospace">
            {t === 0 ? "0" : `${t / 1000}k`}
          </text>
        </g>
      ))}
      {bars.map((b, i) => {
        const x = m.l + slot * i + (slot - bw) / 2;
        return (
          <g key={i}>
            <rect
              x={x}
              y={Y(b.value)}
              width={bw}
              height={m.t + ih - Y(b.value)}
              fill={b.era === "pre" ? RED : BAR}
              rx={3}
            >
              <title>{`${b.label}: ${b.value.toLocaleString()} segments`}</title>
            </rect>
            {(i === 0 || i === n - 1 || i % 3 === 0) && (
              <text
                x={x + bw / 2}
                y={H - m.b + 42}
                textAnchor="middle"
                fontSize="24"
                fill={FAINT}
                fontFamily="'IBM Plex Mono', monospace"
              >
                {lang === "fr" ? b.labelFr : b.label}
              </text>
            )}
          </g>
        );
      })}
      <line x1={markerX} y1={m.t - 20} x2={markerX} y2={m.t + ih} stroke={INK} strokeWidth={3} strokeDasharray="9 7" />
      <text x={m.l + slot * 9.2} y={m.t + 2} fontSize="30" fontWeight={800} fill={INK} fontFamily="Archivo, sans-serif">
        {marker}
      </text>
      <text x={m.l + slot * 9.2} y={m.t + 42} fontSize="24" fill={LABEL} fontFamily="Archivo, sans-serif">
        {markerNote}
      </text>
      <g>
        <rect x={m.l} y={H - 34} width={26} height={18} fill={RED} />
        <text x={m.l + 36} y={H - 19} fontSize="24" fill={LABEL} fontFamily="Archivo, sans-serif">
          {preLabel}
        </text>
        <rect x={m.l + 330} y={H - 34} width={26} height={18} fill={BAR} />
        <text x={m.l + 366} y={H - 19} fontSize="24" fill={LABEL} fontFamily="Archivo, sans-serif">
          {postLabel}
        </text>
      </g>
    </svg>
  );
}

export function TimeSeries({
  series,
  bars,
  xLabels,
  xLabelsFr,
  yPrefix,
  ySuffix,
  decimals,
  meanLine,
  lang,
}: {
  series?: TSeriesDatum[];
  bars?: { label: string; labelFr: string; value: number; highlight?: boolean }[];
  xLabels: string[];
  xLabelsFr?: string[];
  yPrefix?: string;
  ySuffix?: string;
  decimals?: number;
  meanLine?: { value: number; label: string; labelFr: string };
  lang: Lang;
}) {
  const W = 1000;
  const H = 620;
  const m = { t: 64, r: 36, b: 104, l: 168 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const dec = decimals ?? 0;
  const yf = (v: number) => `${yPrefix ?? ""}${fmtTick(v, lang, dec)}${ySuffix ? (lang === "fr" && ySuffix === "%" ? " %" : ySuffix) : ""}`;
  if (bars) {
    const n = bars.length;
    const max = Math.max(...bars.map((b) => b.value)) * 1.06;
    const slot = iw / n;
    const bw = Math.max(3, slot * 0.78);
    const Y = (v: number) => m.t + ih - (v / max) * ih;
    const yTicks = [0, max / 3, (2 * max) / 3, max].map((v) => Math.round(v));
    const every = Math.max(1, Math.ceil(n / 8));
    const xl = lang === "fr" && xLabelsFr ? xLabelsFr : xLabels;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Bar time series">
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={m.l} y1={Y(t)} x2={W - m.r} y2={Y(t)} stroke={GRID} strokeWidth={1.5} />
            <text x={m.l - 14} y={Y(t) + 9} textAnchor="end" fontSize="24" fill={FAINT} fontFamily="'IBM Plex Mono', monospace">
              {yf(t)}
            </text>
          </g>
        ))}
        {bars.map((b, i) => {
          const x = m.l + slot * i + (slot - bw) / 2;
          return (
            <g key={i}>
              <rect x={x} y={Y(b.value)} width={bw} height={m.t + ih - Y(b.value)} fill={b.highlight ? RED : BAR} rx={2}>
                <title>{`${lang === "fr" ? b.labelFr : b.label}: ${yf(b.value)}`}</title>
              </rect>
              {i % every === 0 && (
                <text x={x + bw / 2} y={H - m.b + 42} textAnchor="middle" fontSize="24" fill={FAINT} fontFamily="'IBM Plex Mono', monospace">
                  {xl[i]}
                </text>
              )}
            </g>
          );
        })}
        {meanLine && (
          <g>
            <line x1={m.l} y1={Y(meanLine.value)} x2={W - m.r} y2={Y(meanLine.value)} stroke={INK} strokeWidth={3} strokeDasharray="10 8" />
            <text x={W - m.r} y={Y(meanLine.value) - 14} textAnchor="end" fontSize="24" fontStyle="italic" fill={INK} fontFamily="Archivo, sans-serif">
              {lang === "fr" ? meanLine.labelFr : meanLine.label}
            </text>
          </g>
        )}
      </svg>
    );
  }
  const sers = series ?? [];
  const all = sers.flatMap((s) => s.values);
  const lo = Math.min(...all);
  const hi = Math.max(...all);
  const pad = (hi - lo) * 0.12 || 1;
  const y0raw = Math.min(lo - pad * 0.6, meanLine ? meanLine.value : Infinity);
  const y0 = lo >= 0 ? Math.max(0, y0raw) : y0raw;
  const y1 = hi + pad;
  const n = Math.max(...sers.map((s) => s.values.length));
  const X = (i: number) => m.l + (i / (n - 1)) * iw;
  const Y = (v: number) => m.t + ih - ((v - y0) / (y1 - y0)) * ih;
  const yTicks = [0, 1, 2, 3, 4].map((k) => y0 + ((y1 - y0) * k) / 4);
  const every = Math.max(1, Math.ceil(n / 8));
  const xl = lang === "fr" && xLabelsFr ? xLabelsFr : xLabels;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Time series chart">
      <g>
        {(() => {
          let lx = m.l;
          return sers.map((s, si) => {
            const nm = lang === "fr" ? s.nameFr : s.name;
            const w = nm.length * 14 + 80;
            const el = (
              <g key={si}>
                <line x1={lx} y1={30} x2={lx + 44} y2={30} stroke={s.color ?? SERIES_PALETTE[si % SERIES_PALETTE.length]} strokeWidth={6} strokeDasharray={s.dashed ? "10 7" : undefined} />
                <text x={lx + 56} y={38} fontSize="24" fill={LABEL} fontFamily="Archivo, sans-serif">
                  {nm}
                </text>
              </g>
            );
            lx += w;
            return el;
          });
        })()}
      </g>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={m.l} y1={Y(t)} x2={W - m.r} y2={Y(t)} stroke={GRID} strokeWidth={1.5} />
          <text x={m.l - 14} y={Y(t) + 9} textAnchor="end" fontSize="24" fill={FAINT} fontFamily="'IBM Plex Mono', monospace">
            {yf(t)}
          </text>
        </g>
      ))}
      {Array.from({ length: n }, (_, i) => i)
        .filter((i) => i % every === 0)
        .map((i) => (
          <text key={i} x={X(i)} y={H - m.b + 42} textAnchor="middle" fontSize="24" fill={FAINT} fontFamily="'IBM Plex Mono', monospace">
            {xl[i]}
          </text>
        ))}
      {meanLine && (
        <g>
          <line x1={m.l} y1={Y(meanLine.value)} x2={W - m.r} y2={Y(meanLine.value)} stroke={INK} strokeWidth={3} strokeDasharray="10 8" />
          <text x={W - m.r} y={Y(meanLine.value) - 14} textAnchor="end" fontSize="24" fontStyle="italic" fill={INK} fontFamily="Archivo, sans-serif">
            {lang === "fr" ? meanLine.labelFr : meanLine.label}
          </text>
        </g>
      )}
      {sers.map((s, si) => {
        const pts = s.values.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
        const li = s.values.length - 1;
        return (
          <g key={si}>
            <polyline points={pts} fill="none" stroke={s.color ?? SERIES_PALETTE[si % SERIES_PALETTE.length]} strokeWidth={si === 0 ? 6 : 4.5} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={s.dashed ? "12 8" : undefined} />
            <circle cx={X(li)} cy={Y(s.values[li])} r={10} fill={s.color ?? SERIES_PALETTE[si % SERIES_PALETTE.length]} stroke="#ffffff" strokeWidth={4} />
          </g>
        );
      })}
    </svg>
  );
}

const DONUT_COLORS = [RED, INK, BAR_DARK, "#8b94a3", BAR, "#d5dae1", "#eef0f3"];

export function Donut({ segments, centerTop, centerBottom, lang }: { segments: DonutSegment[]; centerTop: string; centerBottom: string; lang: Lang }) {
  const W = 1000;
  const H = 480;
  const cx = 300;
  const cy = 240;
  const r = 148;
  const C = 2 * Math.PI * r;
  const total = segments.reduce((a, s) => a + s.value, 0);
  let acc = 0;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Donut chart">
      {segments.map((s, i) => {
        const frac = s.value / total;
        const len = Math.max(0, frac * C - (segments.length > 1 ? 5 : 0));
        const off = -acc * C + C * 0.25;
        acc += frac;
        const share = (frac * 100).toLocaleString(lang === "fr" ? "fr-CA" : "en-CA", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
              strokeWidth={64}
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={off}
              transform={`rotate(-90 ${cx} ${cy})`}
            >
              <title>{`${lang === "fr" ? s.labelFr : s.label}: ${share}%`}</title>
            </circle>
          </g>
        );
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="62" fontWeight={900} fill={INK} fontFamily="Archivo, sans-serif">
        {centerTop}
      </text>
      <text x={cx} y={cy + 42} textAnchor="middle" fontSize="21" fill={LABEL} fontFamily="Archivo, sans-serif">
        {centerBottom}
      </text>
      {segments.map((s, i) => {
        const frac = s.value / total;
        const share = (frac * 100).toLocaleString(lang === "fr" ? "fr-CA" : "en-CA", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
        const y = 96 + i * 62;
        return (
          <g key={i}>
            <rect x={540} y={y - 20} width={30} height={22} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
            <text x={584} y={y} fontSize="26" fill={LABEL} fontFamily="Archivo, sans-serif">
              {lang === "fr" ? s.labelFr : s.label}
            </text>
            <text x={952} y={y} textAnchor="end" fontSize="26" fontWeight={700} fill={INK} fontFamily="'IBM Plex Mono', monospace">
              {lang === "fr" ? share.replace(".", ",") + " %" : share + "%"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function GroupedBars({
  categories,
  categoriesFr,
  series,
  yPrefix,
  ySuffix,
  decimals,
  lang,
}: {
  categories: string[];
  categoriesFr?: string[];
  series: GroupedSeries[];
  yPrefix?: string;
  ySuffix?: string;
  decimals?: number;
  lang: Lang;
}) {
  const W = 1000;
  const H = 640;
  const m = { t: 76, r: 30, b: 120, l: 168 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const dec = decimals ?? 0;
  const yf = (v: number) => `${yPrefix ?? ""}${fmtTick(v, lang, dec)}${ySuffix ? (lang === "fr" && ySuffix === "%" ? " %" : ySuffix) : ""}`;
  const max = Math.max(...series.flatMap((s) => s.values)) * 1.14;
  const n = categories.length;
  const k = series.length;
  const slot = iw / n;
  const bw = Math.min(120, (slot * 0.72) / k);
  const Y = (v: number) => m.t + ih - (v / max) * ih;
  const yTicks = [0, max / 2, max].map((v) => Math.round(v * 10) / 10);
  const cats = lang === "fr" && categoriesFr ? categoriesFr : categories;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Grouped bar chart">
      {(() => {
        let lx = m.l;
        return series.map((s, si) => {
          const nm = lang === "fr" ? s.nameFr : s.name;
          const w = nm.length * 14 + 80;
          const el = (
            <g key={si}>
              <rect x={lx} y={28} width={34} height={24} fill={s.color ?? SERIES_PALETTE[si % SERIES_PALETTE.length]} />
              <text x={lx + 46} y={50} fontSize="25" fill={LABEL} fontFamily="Archivo, sans-serif">
                {nm}
              </text>
            </g>
          );
          lx += w;
          return el;
        });
      })()}
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={m.l} y1={Y(t)} x2={W - m.r} y2={Y(t)} stroke={GRID} strokeWidth={1.5} />
          <text x={m.l - 14} y={Y(t) + 9} textAnchor="end" fontSize="24" fill={FAINT} fontFamily="'IBM Plex Mono', monospace">
            {yf(t)}
          </text>
        </g>
      ))}
      {categories.map((c, i) => {
        const gx = m.l + slot * i;
        return (
          <g key={i}>
            {series.map((s, si) => {
              const v = s.values[i];
              const x = gx + (slot - bw * k) / 2 + si * bw;
              return (
                <g key={si}>
                  <rect x={x} y={Y(v)} width={bw} height={m.t + ih - Y(v)} fill={s.color ?? SERIES_PALETTE[si % SERIES_PALETTE.length]} rx={3}>
                    <title>{`${cats[i]} · ${lang === "fr" ? s.nameFr : s.name}: ${yf(v)}`}</title>
                  </rect>
                  {n <= 8 &&
                    (() => {
                      const lbl = yf(v);
                      const fits = lbl.length * 13 < bw;
                      return (
                        <text
                          x={fits ? x + bw / 2 : si === 0 ? x + bw - 4 : x + 4}
                          y={Y(v) - 12}
                          textAnchor={fits ? "middle" : si === 0 ? "end" : "start"}
                          fontSize="22"
                          fontWeight={700}
                          fill={LABEL}
                          fontFamily="'IBM Plex Mono', monospace"
                        >
                          {lbl}
                        </text>
                      );
                    })()}
                </g>
              );
            })}
            {wrapLabel(cats[i], 22).map((ln, li) => (
              <text key={li} x={gx + slot / 2} y={H - m.b + 40 + li * 30} textAnchor="middle" fontSize="24" fill={FAINT} fontFamily="Archivo, sans-serif">
                {ln}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function StatFigure({
  bigValue,
  bigLabel,
  stats,
  lang,
}: {
  bigValue: string;
  bigLabel: string;
  stats: { value: string; label: string }[];
  lang: Lang;
}) {
  return (
    <div style={{ width: "100%", padding: "2cqw 0" }}>
      <div
        style={{
          fontFamily: "Archivo, sans-serif",
          fontWeight: 900,
          fontSize: "13cqw",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: RED,
        }}
      >
        {bigValue}
      </div>
      <div
        style={{
          fontFamily: "Archivo, sans-serif",
          fontWeight: 700,
          fontSize: "3.1cqw",
          lineHeight: 1.3,
          color: INK,
          marginTop: "1.6cqw",
          maxWidth: "90%",
        }}
      >
        {bigLabel}
      </div>
      <div style={{ marginTop: "3.4cqw", borderTop: `1px solid ${GRID}` }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "3cqw",
              padding: "1.9cqw 0",
              borderBottom: `1px solid ${GRID}`,
            }}
          >
            <span style={{ fontFamily: "Archivo, sans-serif", fontSize: "2.7cqw", color: LABEL, lineHeight: 1.35 }}>
              {s.label}
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "2.9cqw",
                fontWeight: 700,
                color: INK,
                whiteSpace: "nowrap",
              }}
            >
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HourLine({
  values,
  peakIndex,
  peakLabel,
  yLabel,
}: {
  values: number[];
  peakIndex: number;
  peakLabel: string;
  yLabel: string;
}) {
  const W = 1000;
  const H = 560;
  const m = { t: 80, r: 40, b: 100, l: 110 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const max = Math.max(...values) * 1.12;
  const X = (i: number) => m.l + (i / (values.length - 1)) * iw;
  const Y = (v: number) => m.t + ih - (v / max) * ih;
  const pts = values.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
  const area = `${m.l},${m.t + ih} ${pts} ${X(values.length - 1)},${m.t + ih}`;
  const yTicks = [0, 100000, 200000, 300000, 400000];
  const hourLabel = (h: number) => {
    if (h === 0) return "12a";
    if (h < 12) return `${h}a`;
    if (h === 12) return "12p";
    return `${h - 12}p`;
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Line chart">
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={m.l} y1={Y(t)} x2={W - m.r} y2={Y(t)} stroke={GRID} strokeWidth={1.5} />
          <text x={m.l - 14} y={Y(t) + 9} textAnchor="end" fontSize="24" fill={FAINT} fontFamily="'IBM Plex Mono', monospace">
            {t === 0 ? "0" : `${t / 1000}k`}
          </text>
        </g>
      ))}
      {[0, 6, 12, 18, 23].map((h) => (
        <text
          key={h}
          x={X(h)}
          y={H - m.b + 44}
          textAnchor="middle"
          fontSize="26"
          fill={FAINT}
          fontFamily="'IBM Plex Mono', monospace"
        >
          {hourLabel(h)}
        </text>
      ))}
      <polygon points={area} fill={RED} opacity={0.1} />
      <polyline points={pts} fill="none" stroke={INK} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={X(peakIndex)} cy={Y(values[peakIndex])} r={14} fill={RED} stroke="#ffffff" strokeWidth={5} />
      <text
        x={Math.min(X(peakIndex) + 24, W - m.r - 300)}
        y={Y(values[peakIndex]) - 34}
        fontSize="30"
        fontWeight={800}
        fill={RED}
        fontFamily="Archivo, sans-serif"
      >
        {peakLabel}
      </text>
      <text x={m.l} y={H - 16} fontSize="26" fill={LABEL} fontFamily="Archivo, sans-serif">
        {yLabel} · hour of day
      </text>
    </svg>
  );
}
