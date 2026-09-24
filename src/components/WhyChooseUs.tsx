"use client";

import { ShieldCheck, Clock3, Leaf, BadgeDollarSign, FileImage, Headset, Phone, MessageCircle } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useQuote } from "./QuoteModal";
import { SITE } from "@/lib/site";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Govt. Licensed & Certified",
    text: "Fully authorized pest management service across Delhi NCR with certified technicians and safe chemical compliance.",
    stat: "100%",
    statLabel: "Approved",
  },
  {
    icon: Clock3,
    title: "2-Hour Doorstep Arrival",
    text: "Fast technician dispatch across Noida, Greater Noida, Delhi, Gurugram, Ghaziabad & Faridabad.",
    stat: "2 Hr",
    statLabel: "Fast Dispatch",
  },
  {
    icon: Leaf,
    title: "100% Odorless Herbal Gels",
    text: "No chemical smell, no need to leave your house or pack kitchen utensils. Completely safe for kids and pets.",
    stat: "0%",
    statLabel: "Bad Smell",
  },
  {
    icon: BadgeDollarSign,
    title: "Fixed Honest Pricing",
    text: "Clear transparent quotation before work begins. Flat 25% discount available with coupon code NIPC25.",
    stat: "₹0",
    statLabel: "Hidden Charges",
  },
  {
    icon: FileImage,
    title: "Up to 7 Years Written Warranty",
    text: "Termite & Deemak treatment backed by an official 7-year warranty card. Free re-service if pests return.",
    stat: "7 Yrs",
    statLabel: "Warranty Card",
  },
  {
    icon: Headset,
    title: `Direct Calling Helpline: ${SITE.phone}`,
    text: "Speak directly with senior pest specialists without waiting in automated queues. Instant WhatsApp support.",
    stat: "24/7",
    statLabel: "Support Line",
  },
];

const STEPS = [
  { n: "01", t: "Call or WhatsApp", d: `Dial ${SITE.phone} or send a message for instant quote & slot.` },
  { n: "02", t: "Free Site Inspection", d: "Technician inspects pest breeding spots, cracks & moisture tracks." },
  { n: "03", t: "Odorless Treatment", d: "Targeted herbal gel application, drill-fill-seal barrier & misting." },
  { n: "04", t: "Warranty & Follow-up", d: "Official warranty certificate with free re-visit guarantee." },
];

export function WhyChooseUs() {
  const { openQuote } = useQuote();

  return (
    <section id="why-us" className="bg-[#0c141d] py-14 text-white sm:py-20" aria-label="Why Natural Insects Pest Control">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            dark
            eyebrow="Why Natural Insects Pest Control"
            title="Professional, Safe & Odorless Pest Control You Can Trust"
            description="Unlike unlicensed local operators, NIPC SERVICES (Natural Insects Pest Control) guarantees complete eradication with eco-friendly herbal formulations and up to 7 years written warranty."
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 80}>
              <div
                className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-emerald-400/40 hover:bg-white/[0.07]"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0e7c6b]">
                    <item.icon className="h-5.5 w-5.5 text-white" />
                  </span>
                  <span className="text-right leading-none">
                    <span className="block text-xl font-black text-emerald-400">{item.stat}</span>
                    <span className="mt-1 block text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                      {item.statLabel}
                    </span>
                  </span>
                </div>
                <h3 className="mt-4 text-[16px] font-black">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Process workflow */}
        <Reveal delay={120}>
          <div className="mt-8 rounded-3xl bg-white p-6 text-[#0c141d] sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-black tracking-tight sm:text-xl">
                  Simple 4-Step Eradication Process
                </h3>
                <p className="text-xs text-slate-500">From call to pest-free home in under 2 hours.</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2.5 text-xs sm:text-sm font-black text-white hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-4 w-4 fill-white" /> WhatsApp
                </a>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-1.5 rounded-xl bg-[#0c141d] px-4 py-2.5 text-xs sm:text-sm font-black text-white"
                >
                  <Phone className="h-4 w-4 text-emerald-400" /> Call {SITE.phone}
                </a>
              </div>
            </div>

            <ol className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <li key={s.n} className="relative border-t-2 border-[#0e7c6b]/30 pt-4">
                  <span className="text-[12px] font-black tracking-widest text-[#0e7c6b]">{s.n}</span>
                  <p className="mt-1 text-[15px] font-black">{s.t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
