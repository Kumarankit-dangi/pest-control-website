"use client";

import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { useQuote } from "./QuoteModal";
import { SITE } from "@/lib/site";

export function ServiceCta({ service, compact = false }: { service: string; compact?: boolean }) {
  const { openQuote } = useQuote();

  const waLink = `https://wa.me/919639232701?text=Hi%20Veerpal%20ji%20(NIPC%20SERVICES),%20I%20am%20interested%20in%20${encodeURIComponent(
    service
  )}.%20Please%20provide%20quotation%20and%20earliest%20available%20slot.`;

  if (compact) {
    return (
      <div className="mt-4 space-y-2">
        <button
          onClick={() => openQuote({ service })}
          className="w-full rounded-xl bg-[#0e7c6b] px-5 py-3.5 text-sm font-black text-white hover:bg-[#0b5f53] transition"
        >
          Book Free Inspection Visit
        </button>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-black text-white hover:bg-[#20bd5a] transition"
        >
          <MessageCircle className="h-4 w-4 fill-white" />
          WhatsApp Booking
        </a>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2.5">
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-[15px] font-black text-white hover:bg-[#20bd5a] transition shadow-md"
      >
        <MessageCircle className="h-4.5 w-4.5 fill-white" />
        Book via WhatsApp
      </a>

      <button
        onClick={() => openQuote({ service })}
        className="group flex items-center justify-center gap-2 rounded-xl bg-[#0e7c6b] px-6 py-3.5 text-[15px] font-black text-white hover:bg-[#0b5f53] transition shadow-sm"
      >
        Get Free Inspection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      <a
        href={SITE.phoneHref}
        className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-[15px] font-black text-white hover:bg-white/20 transition"
      >
        <Phone className="h-4 w-4 text-emerald-400" />
        Call {SITE.phone}
      </a>
    </div>
  );
}
