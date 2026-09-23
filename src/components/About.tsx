"use client";

import Link from "next/link";
import { BadgeCheck, Leaf, FileCheck2, ArrowRight, Phone, MessageCircle, UserCheck } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal, SectionHeading } from "./Reveal";
import { useQuote } from "./QuoteModal";

const POINTS = [
  {
    icon: BadgeCheck,
    title: "Govt. Registered GST: 09FNWPP6204H1ZC",
    text: "Led by Veerpal, NIPC SERVICES is a certified pest control management firm providing commercial and residential treatments with formal GST tax invoices.",
  },
  {
    icon: Leaf,
    title: "100% Odorless Herbal Gels & Pet-Safe Solutions",
    text: "Safe for kids, elderly, pregnant women and pets. Zero chemical smoke, zero bad smell, and no need to empty kitchen cabinets.",
  },
  {
    icon: FileCheck2,
    title: "7 Years Written Warranty on Termite (Deemak)",
    text: "Complete Drill-Fill-Seal chemical barrier backed by an official 7-year warranty card. Free re-service guarantee on all treatments.",
  },
];

export function About() {
  const { openQuote } = useQuote();

  return (
    <section id="about" className="bg-white py-14 sm:py-20" aria-label="About NIPC SERVICES">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        {/* Real photo visual card */}
        <Reveal className="relative order-1">
          <div className="overflow-hidden rounded-3xl shadow-[0_16px_40px_rgba(12,20,29,0.14)] border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/real-pest-technician-kitchen.jpg"
              alt="NIPC Services technician performing safe kitchen drain spraying"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_16px_40px_rgba(12,20,29,0.18)] sm:left-6 sm:right-auto sm:min-w-96">
            <div className="h-12 w-28 shrink-0 flex items-center justify-center rounded-xl bg-slate-50 p-1 border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/nipc-brand-logo.svg"
                alt="NIPC SERVICES Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-black text-[#0c141d]">
                Owner: {SITE.owner}
              </p>
              <p className="text-xs font-bold text-[#0e7c6b]">
                {SITE.shortTagline}
              </p>
              <p className="text-[11px] text-slate-500">
                Direct Contact: {SITE.phoneDisplay}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Copy side */}
        <div className="order-2 pt-6 lg:pt-0">
          <Reveal>
            <SectionHeading
              eyebrow="About NIPC SERVICES"
              title="Safe Environment, Healthy Life • Led by Veerpal"
              description="NIPC SERVICES (Natural Insects Pest Control) was founded by Veerpal with one mission: providing 100% odorless, hassle-free and high-potency pest eradication that families and businesses can trust without evacuating."
            />
          </Reveal>

          <div className="mt-6 space-y-4">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="flex gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef8f5] text-[#0b5f53]">
                    <p.icon className="h-5.5 w-5.5" />
                  </span>
                  <div>
                    <h3 className="text-[15.5px] font-black text-[#0c141d]">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-black text-white hover:bg-[#20bd5a] transition shadow-md"
              >
                <MessageCircle className="h-4.5 w-4.5 fill-white" />
                Chat with Veerpal on WhatsApp
              </a>

              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2 rounded-xl bg-[#0c141d] px-5 py-3.5 text-sm font-black text-white hover:bg-[#162636] transition"
              >
                <Phone className="h-4 w-4 text-emerald-400" />
                Call {SITE.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
