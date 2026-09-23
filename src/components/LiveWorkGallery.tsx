"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  Sparkles,
  MapPin,
  Maximize2,
  X,
  FileCheck,
  ShieldCheck,
  Award,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal, SectionHeading } from "./Reveal";

interface PhotoItem {
  id: string;
  category: "site" | "official";
  title: string;
  subtitle: string;
  image: string;
  location: string;
  badge: string;
  highlight?: boolean;
}

const GALLERY_ITEMS: PhotoItem[] = [
  // User on-site operational photos
  {
    id: "kitchen",
    category: "site",
    title: "Commercial Kitchen Drain Spraying",
    subtitle: "High-pressure brass pump treatment targeting cockroaches & drain flies",
    image: "/images/real-pest-technician-kitchen.jpg",
    location: "Restaurant Kitchen, Rudrapur",
    badge: "Live On-Site",
    highlight: true,
  },
  {
    id: "hallway",
    category: "site",
    title: "Corridor & Carpet Pest Treatment",
    subtitle: "Specialized spraying along carpet perimeters for wall lizards and flies",
    image: "/images/real-pest-technician-hallway.jpg",
    location: "Hotel & Banquet Corridor",
    badge: "Odorless Safe",
  },
  {
    id: "cinema",
    category: "site",
    title: "Public Cinema Lobby Disinfection",
    subtitle: "Spraying access and Gap Arrest around glass panels & food counters",
    image: "/images/real-pest-technician-commercial.jpg",
    location: "Cinema / Mall Lobby",
    badge: "FSSAI Grade",
  },
  // Official posters & certified company graphics
  {
    id: "pests-banner",
    category: "official",
    title: "7 Pests Covered: Official NIPC Chart",
    subtitle: "Cockroach, Ant, Mosquito, Termite, Fly, Rodent, Lizard with 7-yr warranty",
    image: "/images/nipc-banner-wide.jpg",
    location: "Official NIPC Services Brand",
    badge: "Safe • Effective • Reliable",
    highlight: true,
  },
  {
    id: "brochure-yellow",
    category: "official",
    title: "Official Registered Brochure & GSTIN",
    subtitle: "Veerpal (Owner) • 9639232701 • GSTIN 09FNWPP6204H1ZC • Rudrapur Office",
    image: "/images/nipc-yellow-brochure.jpg",
    location: "Teen Pani Dam, Rudrapur (U.S. Nagar)",
    badge: "GST Registered",
  },
  {
    id: "poster-green",
    category: "official",
    title: "NIPC Field Service Certificate & Rates",
    subtitle: "Safe Environment, Healthy Life • Pilibhit Office (Jahanabad - 262001)",
    image: "/images/nipc-official-poster-banner.jpg",
    location: "Jatpura, Jahanabad, Pilibhit",
    badge: "Your Safety, Our Priority!",
  },
];

export function LiveWorkGallery() {
  const [activeFilter, setActiveFilter] = useState<"all" | "site" | "official">("all");
  const [lightboxImg, setLightboxImg] = useState<PhotoItem | null>(null);

  const filtered = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  return (
    <section id="live-work" className="bg-[#f2f5f8] py-14 sm:py-20" aria-label="Official Photos & Live Work">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Official Gallery & Live Proof"
              title="Real Technicians at Work • Official Posters & GST Proof"
              description="See our actual NIPC SERVICES team led by Veerpal on-site in commercial kitchens, cinema halls, and verified official posters with GSTIN 09FNWPP6204H1ZC."
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-xl bg-white border border-slate-300 px-3.5 py-2 text-xs font-black text-slate-800 shadow-sm">
                GSTIN: {SITE.gstin}
              </span>
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-1.5 rounded-xl bg-[#0c141d] px-4 py-2.5 text-xs sm:text-sm font-black text-white hover:bg-[#162636] transition shadow-md"
              >
                <Phone className="h-4 w-4 text-emerald-400" />
                Call Veerpal: {SITE.phone}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Filter buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-2">Filter view:</span>
          {[
            { id: "all", label: `All Photos & Posters (${GALLERY_ITEMS.length})` },
            { id: "site", label: "📸 Live On-Site Work (3)" },
            { id: "official", label: "📄 Official Posters & GST (3)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
              className={`rounded-xl px-4 py-2 text-xs sm:text-[13px] font-black transition active:scale-95 ${
                activeFilter === tab.id
                  ? "bg-[#0e7c6b] text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, idx) => (
            <Reveal key={item.id} delay={(idx % 3) * 80}>
              <article
                className={`group flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${
                  item.highlight ? "border-emerald-300/80 ring-1 ring-emerald-400/30" : "border-slate-200"
                }`}
              >
                <div
                  className="relative aspect-[16/11] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setLightboxImg(item)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Category badge */}
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-[#0c141d]/90 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                    {item.badge}
                  </span>

                  {/* Enlarge zoom button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImg(item);
                    }}
                    className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition"
                    aria-label="Enlarge photo"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>

                  {/* Location strip */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 font-bold truncate">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      {item.location}
                    </span>
                    <span className="text-[11px] text-emerald-200 font-black shrink-0">Click to Zoom</span>
                  </div>
                </div>

                {/* Content info */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="text-[15.5px] font-black text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                    <span className="flex items-center gap-1 font-black text-emerald-800">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Verified Work
                    </span>

                    <a
                      href={`https://wa.me/919639232701?text=Hi%20Veerpal%20ji,%20I%20saw%20this%20photo%20(${encodeURIComponent(
                        item.title
                      )}).%20Please%20quote%20for%20my%20place.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-black text-emerald-700 hover:text-emerald-900 hover:underline"
                    >
                      <MessageCircle className="h-3.5 w-3.5 fill-emerald-600" /> Inquire
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Big Official Company Credential Banner */}
        <div className="mt-10 overflow-hidden rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-[#0c2e22] via-[#0b3a2e] to-[#0c141d] p-6 sm:p-10 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-400/50 px-3.5 py-1 text-xs font-black uppercase text-amber-300">
                <Sparkles className="h-3.5 w-3.5" /> Govt. Registered GST: {SITE.gstin}
              </div>

              <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                NIPC SERVICES <span className="text-emerald-300">(Natural Insects Pest Control)</span>
              </h3>

              <p className="mt-1 text-sm sm:text-base font-bold text-amber-300">
                Owner: {SITE.owner} • Direct Helpline: {SITE.phoneDisplay}
              </p>

              <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                Specialized in Cockroach Control, Termite (Deemak) Drill-Fill-Seal (7 Years Warranty), Lizard Control, Flies Control, Mosquito Fogging, Spraying Access & Gap Arrest. Safe for family & environment.
              </p>

              {/* Verified Office Addresses */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                <div className="rounded-2xl bg-white/10 p-3.5 border border-white/15">
                  <span className="block font-black text-emerald-300 uppercase tracking-wider mb-1">
                    🏢 Rudrapur Office:
                  </span>
                  <p className="leading-relaxed">
                    Ward No.01, Teen Pani Dam, Fulsunga, Rudrapur (U.S. Nagar)
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-3.5 border border-white/15">
                  <span className="block font-black text-emerald-300 uppercase tracking-wider mb-1">
                    🏢 Pilibhit Office:
                  </span>
                  <p className="leading-relaxed">
                    Village-Jatpura, Barat Bojh, Near Pole No.-2, Jahanabad, Pilibhit (U.P. - 262001)
                  </p>
                </div>
              </div>

              {/* Action buttons with 9639232701 */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3.5 text-sm font-black transition shadow-lg active:scale-95"
                >
                  <Phone className="h-4.5 w-4.5" /> Call Veerpal ({SITE.phone})
                </a>

                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 text-sm font-black transition shadow-lg active:scale-95"
                >
                  <MessageCircle className="h-4.5 w-4.5 fill-white" /> WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Poster Feature preview with click zoom */}
            <div
              className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black cursor-pointer group"
              onClick={() => setLightboxImg(GALLERY_ITEMS[3])}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/nipc-banner-wide.jpg"
                alt="NIPC SERVICES 7 Pests Official Poster Banner"
                className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 right-3 rounded-lg bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                🔍 Click to View Full Banner
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full Screen Image Zoom */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] overflow-hidden rounded-3xl bg-slate-950 border border-white/20 p-2 sm:p-4 text-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition"
              aria-label="Close image"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image display */}
            <div className="relative flex-1 overflow-auto max-h-[75vh] flex items-center justify-center rounded-2xl bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxImg.image}
                alt={lightboxImg.title}
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            {/* Caption bar */}
            <div className="mt-3 px-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h4 className="text-base font-black text-white">{lightboxImg.title}</h4>
                <p className="text-xs text-slate-300">{lightboxImg.subtitle} • 📍 {lightboxImg.location}</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/919639232701?text=Hi%20Veerpal%20ji,%20I%20am%20inquiring%20about%20${encodeURIComponent(
                    lightboxImg.title
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-black text-white"
                >
                  <MessageCircle className="h-4 w-4 fill-white" /> WhatsApp Veerpal
                </a>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-slate-950"
                >
                  <Phone className="h-4 w-4" /> {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
