"use client";

import { useState } from "react";
import { useLang } from "@/i18n";

// Powered by Dispatch (dispatch.nshipyard.com): posts from the visitor's
// browser to Dispatch's public subscribe endpoint, which always uses
// double opt-in. The publication id is public by design (it ships in the
// embed snippet), so it is hardcoded here; rotate it in Dispatch if needed.
const PUBLICATION_ID = "cmv6rzyze0000jx4i3v5n5552";
const SUBSCRIBE_URL = "https://dispatch.nshipyard.com/api/subscribe";

export default function Newsletter() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicationId: PUBLICATION_ID, email }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="mx-auto max-w-[1392px] px-6 pb-24 md:pb-32">
      <div className="mx-auto max-w-[720px] rounded-3xl border border-line bg-white px-6 py-12 text-center md:px-12 md:py-16">
        <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">
          {t.newsletter.kicker}
        </p>
        <h2 className="display text-[clamp(30px,4.5vw,48px)] leading-tight">{t.newsletter.title}</h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-relaxed text-ink/65">
          {t.newsletter.body}
        </p>
        {state === "done" ? (
          <p className="mx-auto mt-8 max-w-[520px] text-[16px] font-medium text-ink">
            {t.newsletter.confirm}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-[520px]">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                {t.newsletter.emailLabel}
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.placeholder}
                className="w-full flex-1 rounded-full border border-ink/20 bg-paper px-6 py-4 text-[16px] text-ink placeholder:text-ink/40 focus:border-canada focus:outline-none"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="rounded-full bg-canada px-8 py-4 text-[16px] font-medium text-white transition hover:bg-canada-dark disabled:opacity-60"
              >
                {t.newsletter.cta}
              </button>
            </div>
            {state === "error" && (
              <p className="mt-4 text-[14px] text-red-700">
                {t.newsletter.error}
              </p>
            )}
            <p className="mt-4 text-[13px] text-ink/50">{t.newsletter.note}</p>
          </form>
        )}
      </div>
    </section>
  );
}
