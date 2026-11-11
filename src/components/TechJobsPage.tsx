"use client";

import { useLang } from "@/i18n";

const REPORT_URL = "https://techjobs.canada.nshipyard.com";
const PDF_URL =
  "https://techjobs.canada.nshipyard.com/The-State-of-the-tech-job-market-in-Canada-Late-2026-final-v7.pdf";

export default function TechJobsPage() {
  const { t } = useLang();
  const p = t.techJobs;
  return (
    <main className="bg-paper">
      {/* Full-viewport red cover hero, matching the PDF cover */}
      <section className="flex min-h-[100svh] flex-col items-center justify-center bg-canada px-6 py-16 text-center text-white">
        <div className="mx-auto w-full max-w-[900px]">
          <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.2em]">{p.kicker}</p>
          <h1 className="display text-[clamp(44px,7vw,88px)] leading-[1.02] tracking-[-0.03em]">
            {p.title}
          </h1>
          <hr className="mx-auto my-7 h-[5px] w-[120px] border-0 bg-white" />
          <p className="display mx-auto max-w-[860px] text-[clamp(22px,2.6vw,30px)] leading-[1.35] text-[#ffebec]">
            {p.sub}
          </p>
          <p className="mx-auto mt-11 max-w-[860px] border-t border-white/55 pt-5 text-[16px]">
            {p.byline}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={REPORT_URL}
              className="rounded-full bg-white px-6 py-[15px] text-[15px] font-bold text-canada"
            >
              {p.readReport} →
            </a>
            <a
              href={PDF_URL}
              className="rounded-full border-[1.5px] border-white/80 px-6 py-[15px] text-[15px] font-bold text-white"
            >
              {p.downloadPdf} →
            </a>
          </div>
        </div>
      </section>

      {/* White part: the seven takeaways */}
      <div className="mx-auto max-w-[1392px] px-6 py-16 md:py-24">
        <div className="max-w-[720px]">
          <h2 className="display text-[28px]">{p.takeawaysTitle}</h2>
          <ol className="mt-6 list-decimal space-y-3 pl-6 text-[16px] leading-relaxed text-ink/70">
            {p.takeaways.map((tw) => (
              <li key={tw}>{tw}</li>
            ))}
          </ol>
          <p className="mt-10 text-[14px] leading-relaxed text-ink/50">{p.sources}</p>
        </div>
      </div>
    </main>
  );
}
