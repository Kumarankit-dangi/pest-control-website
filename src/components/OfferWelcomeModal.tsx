"use client";

import { useEffect, useState } from "react";
import { X, Sparkles, Phone, MessageCircle, Check, Copy } from "lucide-react";
import { SITE, OFFERS } from "@/lib/site";
import { useQuote } from "./QuoteModal";

export function OfferWelcomeModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { openQuote } = useQuote();

  useEffect(() => {
    // Show after 1.8 seconds on page load if not closed recently
    const hasSeen = sessionStorage.getItem("nipc_seen_offer_popup");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleClose() {
    setOpen(false);
    sessionStorage.setItem("nipc_seen_offer_popup", "1");
  }

  function handleCopy(code: string) {
    try {
      navigator.clipboard.writeText(code);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Special Offer"
    >
      <div
        className="absolute inset-0 bg-[#0c141d]/75 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border-2 border-emerald-500/30 bg-white shadow-2xl transition-all"
        style={{ animation: "rise-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Top banner */}
        <div className="relative bg-gradient-to-r from-[#0b2e28] via-[#0e7c6b] to-[#07211c] px-5 py-6 text-white text-center">
          <button
            onClick={handleClose}
            className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25 transition"
            aria-label="Close offer"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          <div className="mx-auto flex h-14 w-40 items-center justify-center rounded-2xl bg-white p-2 shadow-lg ring-4 ring-white/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/nipc-brand-logo.svg"
              alt="NIPC SERVICES Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-amber-300 ring-1 ring-amber-400/40">
            <Sparkles className="h-3.5 w-3.5" /> Special Offer • Owner: {SITE.owner}
          </div>

          <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-[26px]">
            Flat 25% Off + Free Visit
          </h3>
          <p className="mt-1 text-xs font-medium text-emerald-100">
            NIPC SERVICES (Natural Insects Pest Control) • GST: {SITE.gstin}
          </p>
        </div>

        {/* Body content */}
        <div className="p-5 sm:p-6 text-center">
          <p className="text-sm leading-relaxed text-slate-700">
            Get instant pest protection with 100% odorless herbal treatments. Direct booking with Veerpal with written warranty!
          </p>

          {/* Coupon box */}
          <div className="mt-4 flex items-center justify-between rounded-xl border-2 border-dashed border-[#0e7c6b] bg-[#eef8f5] px-4 py-3">
            <div className="text-left">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Promo Code
              </span>
              <span className="font-mono text-lg font-black tracking-wider text-[#0b5f53]">
                {OFFERS[0].code}
              </span>
            </div>
            <button
              onClick={() => handleCopy(OFFERS[0].code)}
              className="flex items-center gap-1.5 rounded-lg bg-[#0e7c6b] px-3.5 py-2 text-xs font-black text-white hover:bg-[#0b5f53] transition"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>

          {/* Quick Action buttons */}
          <div className="mt-5 space-y-2.5">
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={handleClose}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-base font-black text-white shadow-md hover:bg-[#20bd5a] active:scale-[0.99] transition"
            >
              <MessageCircle className="h-5 w-5 fill-white" />
              Book on WhatsApp (9639232701)
            </a>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={SITE.phoneHref}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0c141d] px-3.5 py-3 text-sm font-black text-white hover:bg-[#162636] active:scale-[0.99] transition"
              >
                <Phone className="h-4 w-4 text-emerald-400" />
                Call {SITE.phone}
              </a>

              <button
                onClick={() => {
                  handleClose();
                  openQuote({ promo: OFFERS[0].code });
                }}
                className="flex items-center justify-center rounded-xl border border-slate-300 bg-slate-100 px-3.5 py-3 text-sm font-black text-slate-800 hover:bg-slate-200 active:scale-[0.99] transition"
              >
                Get Free Quote
              </button>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-400">
            *Doorstep service across Rudrapur, Pilibhit, Bareilly, Delhi NCR & nearby areas.
          </p>
        </div>
      </div>
    </div>
  );
}
