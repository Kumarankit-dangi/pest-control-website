"use client";

import { useEffect, useState } from "react";
import { BadgePercent, Copy, Check, Gift, MessageCircle, Phone } from "lucide-react";
import { OFFERS, SITE } from "@/lib/site";
import { Reveal, SectionHeading } from "./Reveal";
import { useQuote } from "./QuoteModal";

function useCountdown() {
  const [left, setLeft] = useState({ d: 1, h: 9, m: 45, s: 20 });
  useEffect(() => {
    const end = Date.now() + 1 * 86400000 + 9 * 3600000 + 45 * 60000;
    const t = setInterval(() => {
      const diff = Math.max(0, end - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return left;
}

export function Offers() {
  const { openQuote } = useQuote();
  const left = useCountdown();
  const [copied, setCopied] = useState<string | null>(null);

  function copy(code: string) {
    try {
      navigator.clipboard.writeText(code);
    } catch {}
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <section id="offers" className="bg-[#faf8f3] py-14 sm:py-20" aria-label="NIPC Offers & Deals">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Special Deals & Discounts"
            title="NIPC Limited-Time Pest Control Offers"
            description="Book today to avail flat discount coupons across Cockroach herbal gel, Termite Drill-Fill-Seal & Bed Bug packages."
            align="center"
          />
        </Reveal>

        {/* Offer countdown ribbon */}
        <Reveal delay={80}>
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-amber-300 bg-amber-50 px-5 py-2.5 shadow-sm text-center">
            <Gift className="h-4 w-4 text-amber-700" />
            <span className="text-[13px] font-black text-slate-900">
              Today’s Flash Discount Ends In:
            </span>
            <span className="flex items-center gap-1 font-mono text-[13px] font-black text-amber-800">
              <span className="rounded bg-white px-2 py-0.5 border border-amber-200">
                {String(left.d).padStart(2, "0")}d
              </span>
              :
              <span className="rounded bg-white px-2 py-0.5 border border-amber-200">
                {String(left.h).padStart(2, "0")}h
              </span>
              :
              <span className="rounded bg-white px-2 py-0.5 border border-amber-200">
                {String(left.m).padStart(2, "0")}m
              </span>
              :
              <span className="rounded bg-white px-2 py-0.5 border border-amber-200">
                {String(left.s).padStart(2, "0")}s
              </span>
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {OFFERS.map((o, i) => (
            <Reveal key={o.code} delay={i * 80}>
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:p-7 ${
                  o.highlight
                    ? "border-[#0c141d] bg-[#0c141d] text-white shadow-[0_16px_40px_rgba(12,20,29,0.25)] ring-2 ring-emerald-400/40"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                {o.highlight && (
                  <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-slate-950">
                    Highest Savings
                  </span>
                )}

                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    o.highlight ? "bg-white/10 text-emerald-400" : "bg-[#eef8f5] text-[#0b5f53]"
                  }`}
                >
                  <BadgePercent className="h-6 w-6" />
                </span>

                <h3
                  className={`mt-4 text-xl font-black tracking-tight ${
                    o.highlight ? "text-white" : "text-[#0c141d]"
                  }`}
                >
                  {o.title}
                </h3>

                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    o.highlight ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {o.description}
                </p>

                {/* Coupon copy block */}
                <button
                  onClick={() => copy(o.code)}
                  className={`mt-4 flex items-center justify-between rounded-xl border-2 border-dashed px-4 py-2.5 font-mono text-sm font-black tracking-widest transition ${
                    o.highlight
                      ? "border-emerald-400/50 bg-white/5 text-emerald-300 hover:bg-white/10"
                      : "border-[#0e7c6b]/50 bg-slate-50 text-[#0c141d] hover:bg-emerald-50"
                  }`}
                  aria-label={`Copy promo code ${o.code}`}
                >
                  <span>Code: {o.code}</span>
                  {copied === o.code ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4 opacity-70" />
                  )}
                </button>

                {copied === o.code && (
                  <p className="mt-1.5 text-xs font-bold text-emerald-400">
                    Coupon copied! Share on WhatsApp to claim.
                  </p>
                )}

                <p
                  className={`mt-2 text-[11.5px] leading-relaxed ${
                    o.highlight ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {o.fine}
                </p>

                {/* CTAs */}
                <div className="mt-5 space-y-2">
                  <a
                    href={`https://wa.me/919639232701?text=Hi%20NIPC%20Services,%20I%20want%20to%20claim%20the%20offer%20${o.code}%20(${encodeURIComponent(
                      o.title
                    )}).%20Please%20share%20details.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-black text-white hover:bg-[#20bd5a] transition"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" />
                    Claim on WhatsApp
                  </a>

                  <button
                    onClick={() => openQuote({ promo: o.code })}
                    className={`w-full rounded-xl px-4 py-2.5 text-xs font-black transition ${
                      o.highlight
                        ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                        : "bg-[#0c141d] text-white hover:bg-[#162636]"
                    }`}
                  >
                    Book Online with this Code
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
