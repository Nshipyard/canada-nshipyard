"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/i18n";

const EMBED_URL = "https://tkfuel.com/embed/nshipyard-bfcf6";
const PAGE_URL = "https://tkfuel.com/p/nshipyard-bfcf6";

export default function FuelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDone(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== "https://tkfuel.com") return;
      if (e.data && e.data.type === "tokenfuel:contribution-complete") setDone(true);
    };
    window.addEventListener("message", onMsg);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMsg);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/55 p-0 backdrop-blur-[4px] sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.fuel}
    >
      <div
        className="flex max-h-[94vh] w-full max-w-[520px] flex-col overflow-hidden rounded-t-3xl bg-paper shadow-[0_32px_80px_rgba(10,15,30,0.35)] sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <span className="display text-[21px] font-semibold">{t.nav.fuel}</span>
          <button
            onClick={onClose}
            aria-label={t.nav.close}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-[15px] text-ink/60 transition hover:border-ink hover:text-ink"
          >
            ✕
          </button>
        </div>
        {done ? (
          <div className="px-6 py-12 text-center">
            <p className="display text-[28px] font-semibold">{t.nav.fuelThanks}</p>
            <p className="mt-3 text-[15px] text-ink/60">{t.nav.fuelReceipt}</p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-ink px-8 py-3 text-[15px] font-medium text-white transition hover:bg-canada"
            >
              {t.nav.close}
            </button>
          </div>
        ) : (
          <>
            <iframe
              src={EMBED_URL}
              title={t.nav.fuel}
              allow="payment"
              className="h-[70vh] w-full border-0 sm:h-[600px]"
            />
            <p className="border-t border-line px-6 py-3 text-center text-[13px] text-ink/55">
              {t.nav.fuelSecureNote}{" "}
              <a href={PAGE_URL} target="_blank" rel="noreferrer" className="underline hover:text-ink">
                {t.nav.fuelOpenTab}
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
