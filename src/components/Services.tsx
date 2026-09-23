"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { SERVICES, SITE } from "@/lib/site";
import { Reveal, SectionHeading } from "./Reveal";
import { ServiceIcon } from "./ServiceIcon";
import { useQuote } from "./QuoteModal";

export function Services() {
  const { openQuote } = useQuote();

  return (
    <section id="services" className="bg-[#f2f5f8] py-14 sm:py-20" aria-label="NIPC Pest Control Services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Specialized Treatments"
              title="Targeted Herbal & Odorless Pest Solutions"
              description="From single room cockroach herbal baiting to full-building 7-year termite protection, NIPC Services delivers guaranteed results."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="flex items-center gap-2">
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-black text-white hover:bg-[#20bd5a] transition shadow-md"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                WhatsApp {SITE.phone}
              </a>
              <button
                onClick={() => openQuote()}
                className="flex items-center gap-1.5 rounded-xl bg-[#0c141d] px-5 py-3 text-sm font-black text-white transition hover:bg-[#1f3245]"
              >
                Book Inspection <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-black text-[#0c141d] shadow-sm backdrop-blur">
                    <ServiceIcon icon={s.icon} className="h-4 w-4 text-[#0e7c6b]" />
                    Starts ₹{s.priceFrom}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-[17px] font-black tracking-tight text-[#0c141d]">{s.name}</h3>
                  <p className="mt-1 text-[13.5px] font-bold text-[#0e7c6b]">{s.short}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {s.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.pests.slice(0, 3).map((p) => (
                      <span
                        key={p}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-[11.5px] font-bold text-slate-700"
                      >
                        {p}
                      </span>
                    ))}
                    {s.pests.length > 3 && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11.5px] font-bold text-slate-500">
                        +{s.pests.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                    <button
                      onClick={() => openQuote({ service: s.name })}
                      className="rounded-xl bg-[#0e7c6b] py-2.5 text-xs sm:text-[13px] font-black text-white hover:bg-[#0b5f53] transition text-center"
                    >
                      Book ₹{s.priceFrom}
                    </button>

                    <a
                      href={`https://wa.me/919639232701?text=Hi%20NIPC%20Services,%20I%20am%20interested%20in%20${encodeURIComponent(
                        s.name
                      )}%20(Starting%20at%20₹${s.priceFrom}).%20Please%20provide%20quotation.`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1 rounded-xl bg-[#25D366] py-2.5 text-xs sm:text-[13px] font-black text-white hover:bg-[#20bd5a] transition"
                    >
                      <MessageCircle className="h-3.5 w-3.5 fill-white" /> WhatsApp
                    </a>
                  </div>

                  <Link
                    href={`/services/${s.slug}`}
                    className="mt-2 text-center text-xs font-bold text-slate-500 hover:text-[#0e7c6b] transition"
                  >
                    View treatment protocol details →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
