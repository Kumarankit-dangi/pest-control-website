"use client";

import Image from "next/image";
import { Phone, MessageCircle, Star, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { SITE, OFFERS } from "@/lib/site";
import { useQuote } from "./QuoteModal";

export function Hero() {
  const { openQuote } = useQuote();

  return (
    <section className="relative overflow-hidden bg-[#0c141d]" id="top" aria-label="Hero">
      {/* Background with pest control visual */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.pexels.com/photos/4176541/pexels-photo-4176541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
          alt="NIPC Services technician performing safe herbal pest control"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(12,20,29,0.95) 0%, rgba(12,20,29,0.85) 50%, rgba(12,20,29,0.65) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c141d] to-transparent" />
      </div>

      <div className="hero-grain relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="max-w-2xl">
          {/* Brand Emblem Pill */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
              <div className="relative h-5 w-5 overflow-hidden rounded-full bg-white p-0.5">
                <Image
                  src="/images/nipc-logo.png"
                  alt="NIPC"
                  width={20}
                  height={20}
                  className="h-full w-full object-contain"
                />
              </div>
              NIPC SERVICES • Govt. Approved
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1.5 text-[12px] font-black text-slate-950">
              <Sparkles className="h-3.5 w-3.5" /> 25% Off Today
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[12px] font-black text-[#0c141d]">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {SITE.rating} ({SITE.reviewsCount}+ reviews)
            </span>
          </div>

          <h1
            className="mt-5 text-balance text-[clamp(2.1rem,7vw,3.7rem)] font-black leading-[1.05] tracking-tight text-white"
            style={{ fontFamily: "Fraunces, Georgia, serif" }}
          >
            NIPC Services: <span className="text-emerald-400">100% Odorless & Safe</span> Pest Control.
          </h1>

          <p className="mt-3 text-sm sm:text-base font-bold text-emerald-200">
            Natural Insects Pest Control — Safe • Effective • Reliable
          </p>

          <p className="mt-3 max-w-xl text-[15px] sm:text-[16.5px] leading-relaxed text-slate-200">
            Say goodbye to Cockroaches, Deemak (Termites), Khatmal (Bed Bugs), Rats & Mosquitoes. Advanced herbal gel & odorless treatments with written warranty. No need to empty your kitchen.
          </p>

          <ul className="mt-5 grid max-w-lg grid-cols-1 gap-2 text-[14px] font-semibold text-slate-100 sm:grid-cols-2">
            {[
              "100% Odorless & Herbal Gel",
              "Govt. Approved Safe Chemicals",
              "Up to 7 Years Written Warranty",
              "Technician at doorstep in 2 hrs",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-emerald-400" /> {t}
              </li>
            ))}
          </ul>

          {/* Primary High-Impact CTAs with WhatsApp & Call */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* WhatsApp CTA */}
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-4 text-[16px] font-black text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition hover:bg-[#20bd5a] active:scale-[0.99] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 fill-white" />
              Book on WhatsApp (Instant)
            </a>

            {/* Direct Calling System */}
            <a
              href={SITE.phoneHref}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0e7c6b] px-6 py-4 text-[16px] font-black text-white shadow-lg transition hover:bg-[#0b5f53] active:scale-[0.99] sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              Call: {SITE.phone}
            </a>

            {/* Free Quote trigger */}
            <button
              onClick={() => openQuote({ promo: OFFERS[0].code })}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-4 text-[15px] font-black text-white backdrop-blur transition hover:bg-white/20 active:scale-[0.99] sm:w-auto"
            >
              Get Free Quote
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 text-[12.5px] font-semibold text-amber-300">
            ⚡ Special Offer: Flat 25% Off on Full Home treatment today! Call / WhatsApp on {SITE.phone}
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-3xl">
          {[
            { v: `${SITE.yearsInBusiness}+ Yrs`, l: "Trusted Experience" },
            { v: "50,000+", l: "Homes Protected" },
            { v: "4.9 ★", l: "Customer Rating" },
            { v: "2 Hours", l: "Doorstep Arrival" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-xl border border-white/12 bg-white/8 px-4 py-3.5 backdrop-blur"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <p className="text-xl font-black text-white sm:text-2xl">{s.v}</p>
              <p className="mt-0.5 text-[11.5px] font-bold uppercase tracking-wider text-slate-300">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
