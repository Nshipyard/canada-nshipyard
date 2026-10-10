// A single shareable chart card in the Open Nshipyard editorial style.
// The card is designed at 1080 x 1440 and scales via container query units,
// so it renders identically at any display width and exports pixel-perfect.

import type { ChartDef } from "./chart-data";
import {
  HBars,
  Scatter,
  Histogram,
  HourLine,
  TimeSeries,
  Donut,
  GroupedBars,
  StatFigure,
  fmtTick,
  type Lang,
} from "./chart-svgs";

const TICK_FMTS: Record<string, (v: number, lang: Lang) => string> = {
  "money-k": (v) => `$${v / 1000}k`,
  pct: (v, lang) => `${fmtTick(v, lang)}${lang === "fr" ? " %" : "%"}`,
  num: (v, lang) => fmtTick(v, lang),
  money: (v, lang) => `$${fmtTick(v, lang)}`,
  "money-b": (v, lang) => `$${fmtTick(v, lang)}${lang === "fr" ? " G$" : "B"}`,
};

function tickFmt(name: string | undefined, decimals: number | undefined) {
  if (!name) return undefined;
  const base = TICK_FMTS[name];
  if (name === "num" && decimals !== undefined) return (v: number, lang: Lang) => fmtTick(v, lang, decimals);
  return base;
}

const LEAF_PATH =
  "m-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z";

export function OpenNshipyardMark({
  box = "11cqw",
  leaf = "4.6cqw",
  text = "2.3cqw",
  gap = "0.9cqw",
}: {
  box?: string;
  leaf?: string;
  text?: string;
  gap?: string;
}) {
  return (
    <div
      aria-label="Open Nshipyard"
      style={{
        width: box,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap,
        flexShrink: 0,
      }}
    >
      <svg viewBox="-1860 -2000 3720 4030" style={{ width: leaf, height: leaf }} aria-hidden="true" fill="#d80621">
        <path d={LEAF_PATH} />
      </svg>
      <div
        style={{
          fontFamily: "Archivo, sans-serif",
          fontWeight: 800,
          fontSize: text,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          textAlign: "center",
          color: "#0a0f1e",
        }}
      >
        Open
        <br />
        Nshipyard
      </div>
    </div>
  );
}

export function ChartFigure({ def, lang }: { def: ChartDef; lang: Lang }) {
  const c = def.chart;
  if (c.kind === "hbars") return <HBars rows={c.rows} unit={lang === "fr" ? c.unitFr : c.unit} lang={lang} />;
  if (c.kind === "scatter")
    return (
      <Scatter
        points={c.points}
        xLabel={lang === "fr" ? c.xLabelFr : c.xLabel}
        yLabel={lang === "fr" ? c.yLabelFr : c.yLabel}
        annotation={lang === "fr" ? c.annotationFr : c.annotation}
        lang={lang}
        xDomain={c.xDomain}
        yDomain={c.yDomain}
        xTicks={c.xTicks}
        yTicks={c.yTicks}
        xTickFmt={tickFmt(c.xTickFmt, c.tickDecimals)}
        yTickFmt={tickFmt(c.yTickFmt, c.tickDecimals)}
        trend={c.trend}
        medianX={c.medianX}
        medianY={c.medianY}
        titleOf={c.titleTemplate === "label" ? (p) => p.label : undefined}
      />
    );
  if (c.kind === "histogram")
    return (
      <Histogram
        bars={c.bars}
        marker={c.marker}
        markerNote={lang === "fr" ? c.markerNoteFr : c.markerNote}
        preLabel={lang === "fr" ? c.preLabelFr : c.preLabel}
        postLabel={lang === "fr" ? c.postLabelFr : c.postLabel}
        lang={lang}
      />
    );
  if (c.kind === "tseries")
    return (
      <TimeSeries
        series={c.series}
        bars={c.bars}
        xLabels={c.xLabels}
        xLabelsFr={c.xLabelsFr}
        yPrefix={c.yPrefix}
        ySuffix={c.ySuffix}
        decimals={c.decimals}
        meanLine={c.meanLine}
        lang={lang}
      />
    );
  if (c.kind === "donut")
    return (
      <Donut
        segments={c.segments}
        centerTop={lang === "fr" ? c.centerTopFr : c.centerTop}
        centerBottom={lang === "fr" ? c.centerBottomFr : c.centerBottom}
        lang={lang}
      />
    );
  if (c.kind === "grouped")
    return (
      <GroupedBars
        categories={c.categories}
        categoriesFr={c.categoriesFr}
        series={c.series}
        yPrefix={c.yPrefix}
        ySuffix={c.ySuffix}
        decimals={c.decimals}
        lang={lang}
      />
    );
  if (c.kind === "stat")
    return (
      <StatFigure
        bigValue={lang === "fr" && c.bigValueFr ? c.bigValueFr : c.bigValue}
        bigLabel={lang === "fr" ? c.bigLabelFr : c.bigLabel}
        stats={c.stats.map((s) => ({
          value: lang === "fr" && s.valueFr ? s.valueFr : s.value,
          label: lang === "fr" ? s.labelFr : s.label,
        }))}
        lang={lang}
      />
    );
  return (
    <HourLine
      values={c.values}
      peakIndex={c.peakIndex}
      peakLabel={lang === "fr" ? c.peakLabelFr : c.peakLabel}
      yLabel={lang === "fr" ? c.yLabelFr : c.yLabel}
    />
  );
}

export function ShareCard({ def, lang, id }: { def: ChartDef; lang: Lang; id?: string }) {
  const t = lang === "fr" ? def.fr : def;
  let host = "canada.nshipyard.com";
  try {
    if (def.projectUrl) host = new URL(def.projectUrl).host;
  } catch {
    /* keep default */
  }
  return (
    <article
      id={id}
      data-card={def.slug}
      data-lang={lang}
      style={{
        containerType: "inline-size",
        width: "100%",
        aspectRatio: "3 / 4",
        background: "#ffffff",
        color: "#0a0f1e",
        display: "flex",
        flexDirection: "column",
        padding: "5.9cqw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "4cqw" }}>
        <div>
          <div style={{ width: "5.9cqw", height: "0.75cqw", background: "#d80621", marginBottom: "2.6cqw" }} />
          <h2
            style={{
              fontFamily: "Archivo, sans-serif",
              fontWeight: 900,
              fontSize: "6.6cqw",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {t.headline}
          </h2>
        </div>
        <OpenNshipyardMark />
      </div>

      <p
        style={{
          fontFamily: "Archivo, sans-serif",
          fontWeight: 400,
          fontSize: "3cqw",
          lineHeight: 1.42,
          color: "#232a36",
          margin: "2.8cqw 0 0",
          maxWidth: "92%",
        }}
      >
        {t.deck}
      </p>

      <div style={{ borderTop: "1px solid rgba(10,15,30,0.14)", marginTop: "3.4cqw", paddingTop: "2.2cqw" }}>
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "1.9cqw",
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: "#5b6472",
            margin: 0,
          }}
        >
          {t.kicker}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
          padding: "2.5cqw 0 1cqw",
        }}
      >
        <div className="chart-fig" style={{ width: "100%", height: "100%" }}>
          <ChartFigure def={def} lang={lang} />
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(10,15,30,0.14)",
          paddingTop: "2.2cqw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "3cqw",
        }}
      >
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "1.62cqw",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#5b6472",
            lineHeight: 1.7,
            margin: 0,
            flex: 1,
          }}
        >
          {lang === "fr" ? "Note : " : "Note: "}{t.note}
          <br />
          {lang === "fr" ? "Source : " : "Source: "}{t.source}
        </p>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "1.9cqw",
            letterSpacing: "0.04em",
            color: "#9aa1ad",
            whiteSpace: "nowrap",
          }}
        >
          {host}
        </span>
      </div>
    </article>
  );
}
