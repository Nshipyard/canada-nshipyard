"use client";

import type { ChartSpec } from "@/showcase-stories";

const RED = "#d80621";
const INK = "#0a0f1e";

function Bars({ rows, footnote }: { rows: { label: string; value: number; display: string }[]; footnote: string }) {
  const W = 680;
  const labelW = 250;
  const rowH = 40;
  const top = 8;
  const H = top + rows.length * rowH + 30;
  const max = Math.max(...rows.map((r) => r.value));
  const barW = W - labelW - 110;
  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={footnote}>
        {rows.map((r, i) => {
          const y = top + i * rowH;
          const w = Math.max(3, (r.value / max) * barW);
          return (
            <g key={r.label}>
              <text x={0} y={y + 15} fontSize={12.5} fill={INK} opacity={0.75}>
                {r.label.length > 34 ? r.label.slice(0, 33) + "…" : r.label}
              </text>
              <rect x={labelW} y={y} width={w} height={20} rx={4} fill={RED} opacity={i === rows.length - 1 ? 1 : 0.82} />
              <text x={labelW + w + 8} y={y + 15} fontSize={12.5} fontWeight={600} fill={INK}>
                {r.display}
              </text>
            </g>
          );
        })}
        <text x={0} y={H - 6} fontSize={11.5} fill={INK} opacity={0.5}>
          {footnote}
        </text>
      </svg>
    </figure>
  );
}

function Scatter311({ spec }: { spec: Extract<ChartSpec, { kind: "scatter" }> }) {
  const W = 680;
  const H = 400;
  const padL = 64;
  const padR = 16;
  const padT = 20;
  const padB = 56;
  const xMin = 60000;
  const xMax = 110000;
  const yMin = 0.06;
  const yMax = 0.13;
  const sx = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const sy = (pct: string) => {
    const v = parseFloat(pct) / 100;
    return padT + (1 - (v - yMin) / (yMax - yMin)) * (H - padT - padB);
  };
  const meanY = sy("9.16%");
  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={spec.note}>
        {[0.06, 0.08, 0.1, 0.12].map((v) => (
          <g key={v}>
            <line
              x1={padL}
              x2={W - padR}
              y1={sy((v * 100).toFixed(0) + "%")}
              y2={sy((v * 100).toFixed(0) + "%")}
              stroke={INK}
              strokeOpacity={0.12}
            />
            <text x={padL - 8} y={sy((v * 100).toFixed(0) + "%") + 4} fontSize={11} fill={INK} opacity={0.55} textAnchor="end">
              {(v * 100).toFixed(0)}%
            </text>
          </g>
        ))}
        {[70000, 80000, 90000, 100000].map((v) => (
          <text key={v} x={sx(v)} y={H - padB + 20} fontSize={11} fill={INK} opacity={0.55} textAnchor="middle">
            ${(v / 1000).toFixed(0)}k
          </text>
        ))}
        <text x={(padL + W - padR) / 2} y={H - 8} fontSize={12} fill={INK} opacity={0.65} textAnchor="middle">
          {spec.xLabel}
        </text>
        <line x1={padL} x2={W - padR} y1={meanY} y2={meanY} stroke={RED} strokeWidth={1.5} strokeDasharray="6 4" />
        <text x={W - padR} y={meanY - 8} fontSize={12} fontWeight={600} fill={RED} textAnchor="end">
          r = 0.18
        </text>
        {spec.points.map((p) => (
          <g key={p.label}>
            <circle cx={sx(p.x)} cy={sy(p.y)} r={7} fill={RED} opacity={0.7} />
            <text x={sx(p.x)} y={sy(p.y) + 3.5} fontSize={8.5} fontWeight={700} fill="#fff" textAnchor="middle">
              {p.label}
            </text>
          </g>
        ))}
        <text x={padL} y={padT - 6} fontSize={11.5} fill={INK} opacity={0.5}>
          {spec.note}
        </text>
      </svg>
      <figcaption className="mt-1 text-[12px] text-ink/50">{spec.yLabel}: share of 2022-2024 requests still open.</figcaption>
    </figure>
  );
}

function HourBars({ values, note }: { values: number[]; note: string }) {
  const W = 680;
  const H = 220;
  const padB = 30;
  const max = Math.max(...values);
  const bw = W / 24;
  const peak = values.indexOf(max);
  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={note}>
        {values.map((v, i) => {
          const h = (v / max) * (H - padB - 24);
          return (
            <g key={i}>
              <rect
                x={i * bw + 2}
                y={H - padB - h}
                width={bw - 4}
                height={h}
                rx={2}
                fill={RED}
                opacity={i === peak ? 1 : 0.55}
              />
              {i % 4 === 0 && (
                <text x={i * bw + bw / 2} y={H - 10} fontSize={11} fill={INK} opacity={0.55} textAnchor="middle">
                  {i}h
                </text>
              )}
            </g>
          );
        })}
        <text x={peak * bw + bw / 2} y={H - padB - (max / max) * (H - padB - 24) - 10} fontSize={12} fontWeight={700} fill={RED} textAnchor="middle">
          peak: 11h
        </text>
        <text x={4} y={H - padB + 44} fontSize={11.5} fill={INK} opacity={0.5}>
          {note}
        </text>
      </svg>
    </figure>
  );
}

function Flow({ steps, note }: { steps: { n: string; label: string }[]; note: string }) {
  return (
    <figure className="w-full">
      <div className="flex items-stretch justify-center gap-1 sm:gap-3">
        {steps.map((s, i) => (
          <div key={s.n} className="flex min-w-0 flex-1 items-stretch gap-1 sm:gap-3">
            <div className="min-w-0 flex-1 rounded-[20px] border border-line bg-paper-warm px-2 py-4 text-center sm:px-6 sm:py-6">
              <p className="display text-[clamp(24px,7vw,52px)] text-canada">{s.n}</p>
              <p className="mt-2 text-[11px] leading-snug text-ink/60 sm:text-[13px]">{s.label}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center text-[16px] font-bold text-canada sm:text-[20px]" aria-hidden="true">
                →
              </div>
            )}
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-[12px] text-ink/50">{note}</figcaption>
    </figure>
  );
}

function BeforeAfter({ items }: { items: { before: string; beforeSub: string; after: string; afterSub: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((it) => (
        <div key={it.before} className="overflow-hidden rounded-[24px] border border-line">
          <div className="bg-paper-warm px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/45">Before</p>
            <p className="display mt-1 text-[30px]">{it.before}</p>
            <p className="mt-1 text-[12px] text-ink/55">{it.beforeSub}</p>
          </div>
          <div className="bg-ink px-5 py-5 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">After</p>
            <p className="mt-1 text-[17px] font-semibold leading-snug">{it.after}</p>
            <p className="mt-1 text-[12px] text-white/60">{it.afterSub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StoryChart({ spec }: { spec: ChartSpec }) {
  switch (spec.kind) {
    case "bars":
      return <Bars rows={spec.rows} footnote={spec.footnote} />;
    case "scatter":
      return <Scatter311 spec={spec} />;
    case "hourbars":
      return <HourBars values={spec.values} note={spec.note} />;
    case "flow":
      return <Flow steps={spec.steps} note={spec.note} />;
    case "beforeafter":
      return <BeforeAfter items={spec.items} />;
  }
}
