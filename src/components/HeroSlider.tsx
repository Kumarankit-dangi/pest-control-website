"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  UserCheck,
  Award,
} from "lucide-react";
import { SITE, OFFERS } from "@/lib/site";
import { useQuote } from "./QuoteModal";

interface SlideData {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  image: string;
  badgeText: string;
  offerPill: string;
  tag: string;
}

const SLIDES: SlideData[] = [
  {
    eyebrow: "VEERPAL • NATURAL INSECTS PEST CONTROL",
    titleLine1: "Your home.",
    titleLine2: "Not theirs.",
    description:
      "Protect your family and property from cockroaches, termites, lizards, flies and rats with NIPC SERVICES. Led by Veerpal—professional, safe and just one call away.",
    image: "/images/real-pest-technician-kitchen.jpg",
    badgeText: "Safe Treatments • 100% Odorless",
    offerPill: "⚡ Flat 25% Off Today • Call Veerpal: 9639232701",
    tag: "Kitchen & Drain Specialist",
  },
  {
    eyebrow: "HOTELS, RESIDENTIAL & BANQUET HALLS",
    titleLine1: "Safe Environment,",
    titleLine2: "Healthy Life.",
    description:
      "Specialized corridor, carpet and ceiling spraying for lizards, flies and cockroaches. Govt. registered GST (09FNWPP6204H1ZC) with certified safety gear.",
    image: "/images/real-pest-technician-hallway.jpg",
    badgeText: "GST Registered • 09FNWPP6204H1ZC",
    offerPill: "🛡️ On-Time Doorstep Service • 9639232701",
    tag: "Commercial & Societies",
  },
  {
    eyebrow: "CINEMAS, RESTAURANTS & COMMERCIAL IPM",
    titleLine1: "Your Safety,",
    titleLine2: "Our Priority!",
    description:
      "Advanced spraying access & Gap Arrest sealing. Wipes out drain flies, cockroaches and rodents from commercial dining halls, kitchens and public spaces.",
    image: "/images/real-pest-technician-commercial.jpg",
    badgeText: "FSSAI & Commercial Audit Ready",
    offerPill: "🔥 Free Site Inspection by Veerpal",
    tag: "Commercial IPM",
  },
  {
    eyebrow: "TERMITE (DEEMAK) DRILL-FILL-SEAL SPECIALIST",
    titleLine1: "Stop Deemak",
    titleLine2: "Before Wood Damage.",
    description:
      "High-pressure chemical injection for wooden wardrobes, door frames and building foundations. 100% eradication with 7-year written warranty card.",
    image:
      "https://images.pexels.com/photos/18021337/pexels-photo-18021337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=1400",
    badgeText: "7 Years Written Warranty Card",
    offerPill: "✨ Termite Package: Instant ₹500 Off",
    tag: "Deemak Guarantee",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const { openQuote } = useQuote();

  const total = SLIDES.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  // Autoplay timer with 5.5s interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = SLIDES[current];

  return (
    <section
      className="relative overflow-hidden bg-[#0c141d] text-white select-none"
      id="top"
      aria-label="NIPC Hero Banner Slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides with crossfade */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ transitionProperty: "opacity, transform" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt={s.titleLine1 + " " + s.titleLine2}
              className="h-full w-full object-cover object-center"
              loading={idx === 0 ? "eager" : "lazy"}
            />
            {/* Dark gradient overlay matching reference screenshot */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(8,24,20,0.94) 0%, rgba(8,28,24,0.88) 45%, rgba(8,28,24,0.65) 75%, rgba(8,28,24,0.5) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0c141d] to-transparent" />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="max-w-2xl min-h-[440px] sm:min-h-[460px] flex flex-col justify-between">
          <div>
            {/* Eyebrow badge matching screenshot with green bullet & Owner Name */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/60 px-3.5 py-1.5 text-[11px] sm:text-[12px] font-black uppercase tracking-[0.16em] text-emerald-200 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {slide.eyebrow}
            </div>

            {/* Giant Heading matching reference screenshot: "Your home. Not theirs." */}
            <h1
              key={`title-${current}`}
              className="mt-5 text-balance text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold leading-[1.0] tracking-tight text-white animate-fade-in"
              style={{ fontFamily: "'Manrope', 'Fraunces', sans-serif" }}
            >
              <span className="block">{slide.titleLine1}</span>
              <span className="block text-emerald-300">{slide.titleLine2}</span>
            </h1>

            {/* Description Paragraph */}
            <p
              key={`desc-${current}`}
              className="mt-4 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-slate-200 animate-fade-in"
            >
              {slide.description}
            </p>

            {/* Highlighted offer pill with 9639232701 */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-400/20 border border-amber-400/50 px-3.5 py-1.5 text-xs sm:text-sm font-black text-amber-200">
              <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
              <span>{slide.offerPill}</span>
            </div>

            {/* CTAs matching reference screenshot */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {/* Primary Light Button: "Get a Free Quote ->" */}
              <button
                onClick={() => openQuote({ promo: OFFERS[0].code })}
                className="group flex items-center justify-center gap-2 rounded-xl bg-[#c5e1d4] hover:bg-[#b0d8c4] text-[#0c2e22] px-7 py-4 text-[15px] font-black shadow-lg transition active:scale-[0.98]"
              >
                Get a Free Quote
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary Bright Green WhatsApp Button: "WhatsApp Us" (9639232701) */}
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white px-7 py-4 text-[15px] font-black shadow-lg transition active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5 fill-white" />
                WhatsApp 9639232701
              </a>
            </div>

            {/* Bottom Call Strip inside hero matching screenshot: "CALL NIPC SERVICES 96392 32701" */}
            <div className="mt-7 flex flex-wrap items-center gap-4 pt-3 border-t border-white/10">
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-3 group"
                aria-label={`Call ${SITE.phoneDisplay}`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-emerald-400 group-hover:bg-[#0e7c6b] group-hover:text-white transition">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Call Veerpal (NIPC Services)
                  </span>
                  <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-amber-300 transition">
                    {SITE.phoneDisplay}
                  </span>
                </div>
              </a>

              <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>{slide.badgeText}</span>
              </div>
            </div>
          </div>

          {/* Slider Controls Bar (Prev/Next buttons + Dots + Progress) */}
          <div className="mt-8 flex items-center justify-between gap-4">
            {/* Slide counter & tag */}
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-sm font-black text-emerald-300">
                0{current + 1}
              </span>
              <span className="text-slate-500">/</span>
              <span className="font-mono text-xs font-bold text-slate-400">
                0{total}
              </span>
              <span className="hidden sm:inline-block rounded-md bg-white/10 px-2 py-0.5 text-[10.5px] font-bold text-slate-300">
                {slide.tag}
              </span>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === current ? "w-8 bg-emerald-400" : "w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/25 active:scale-95 transition"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/25 active:scale-95 transition"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative vertical right side text */}
      <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
        <span
          className="block text-[10px] font-black uppercase tracking-[0.35em] text-white/30 rotate-90 origin-right"
        >
          VEERPAL • NATURAL INSECTS PEST CONTROL
        </span>
      </div>
    </section>
  );
}
