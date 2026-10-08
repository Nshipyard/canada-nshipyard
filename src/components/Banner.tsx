"use client";

import { useLang } from "@/i18n";

export default function Banner() {
  const { t } = useLang();
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1392px] items-center justify-center gap-3 px-6 py-2.5 text-[13px] leading-snug">
        <span className="rounded-full border border-white/30 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide">
          {t.banner.badge}
        </span>
        <p className="text-white/85">{t.banner.line}</p>
      </div>
    </div>
  );
}
