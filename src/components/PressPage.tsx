"use client";

import Image from "next/image";
import { useLang } from "@/i18n";

const SIZES = [1024, 512, 256, 128, 64, 32];

export default function PressPage() {
  const { t } = useLang();
  const p = t.press;
  return (
    <main className="bg-paper">
      <div className="mx-auto max-w-[1392px] px-6 py-16 md:py-24">
        <div className="max-w-[720px]">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-canada">
            {p.kicker}
          </p>
          <h1 className="display text-[clamp(36px,5vw,64px)] leading-[1.05]">{p.title}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/65">{p.sub}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[24px] border border-line bg-white p-10 shadow-[0_12px_32px_rgba(10,15,30,0.08)]">
            <Image
              src="/logo-keyhole.png"
              alt={p.previewAlt}
              width={512}
              height={512}
              className="mx-auto w-full max-w-[320px] rounded-[22%]"
              priority
            />
          </div>

          <div>
            <h2 className="display text-[28px]">{p.sizesTitle}</h2>
            <p className="mt-2 text-[15px] text-ink/60">{p.sizesSub}</p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {SIZES.map((s) => (
                <li key={s}>
                  <a
                    href={`/press/open-nshipyard/open-nshipyard-logo-${s}.png`}
                    download
                    className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3.5 text-[15px] font-medium transition hover:border-canada hover:text-canada"
                  >
                    <span className="font-mono">{s} px</span>
                    <span aria-hidden="true">↓</span>
                  </a>
                </li>
              ))}
            </ul>
            <span className="sr-only">{p.download}</span>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-[24px] bg-ink p-8 text-white md:p-10">
            <h2 className="display text-[24px]">{p.guidelinesTitle}</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-white/75">
              {p.guidelines.map((g) => (
                <li key={g} className="flex items-start gap-2.5">
                  <span className="mt-0.5 font-mono text-canada">—</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-line bg-white p-8 md:p-10">
            <h2 className="display text-[24px]">{p.contactTitle}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink/65">{p.contactBody}</p>
            <a
              href="mailto:press@nshipyard.com"
              className="mt-4 inline-block font-mono text-[16px] font-medium text-canada hover:underline"
            >
              press@nshipyard.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
