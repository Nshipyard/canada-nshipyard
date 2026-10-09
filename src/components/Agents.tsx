"use client";

import { useState } from "react";
import { useLang } from "@/i18n";
import McpConnectAll from "./McpConnectAll";

const restSample = `GET https://canada.nshipyard.com/api/v1/geo/neighbourhood?hood_140=42

{
  "hood_140": 42,
  "hood_158": [43, 44],
  "name_158": ["West Humber-Clairville", "…"],
  "ward_25": 1,
  "cma": 535
}`;

const mcpSample = `POST https://canada.nshipyard.com/mcp
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "licences.naics_for_category",
    "arguments": { "category": "Eating Establishment" }
  }
}`;

export default function Agents() {
  const { t } = useLang();
  const [tab, setTab] = useState<"rest" | "mcp">("rest");

  return (
    <section id="developers" className="mx-auto max-w-[1392px] scroll-mt-20 px-6 py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">
            {t.agents.kicker}
          </p>
          <h2 className="display text-[clamp(34px,4.5vw,56px)]">{t.agents.title}</h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-ink/65">
            {t.agents.body}
          </p>
          <ul className="mt-8 space-y-4 text-[16px]">
            {t.agents.points.map((p) => (
              <li key={p.n} className="flex gap-3">
                <span className="font-mono text-canada">{p.n}</span>
                <span>
                  <strong className="font-semibold">{p.head}</strong> {p.body}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-[40px] bg-ink text-white">
          <div className="flex gap-2 border-b border-white/10 p-4">
            {(["rest", "mcp"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`rounded-full px-4 py-2 font-mono text-[14px] ${
                  tab === k ? "bg-white text-ink" : "text-white/60 hover:text-white"
                }`}
              >
                {k === "rest" ? t.agents.rest : t.agents.mcp}
              </button>
            ))}
          </div>
          <div className="p-6 md:p-8">
            <p className="mb-4 text-[14px] text-white/55">
              {tab === "rest" ? t.agents.restLabel : t.agents.mcpLabel}
            </p>
            <pre className="overflow-x-auto font-mono text-[13.5px] leading-relaxed text-white/85">
              {tab === "rest" ? restSample : mcpSample}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-[40px] bg-ink px-6 py-10 text-white md:px-10 md:py-14">
        <McpConnectAll />
      </div>
    </section>
  );
}
