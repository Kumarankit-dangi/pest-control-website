"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Globe,
  AtSign,
  Share2,
  MessageCircle,
} from "lucide-react";
import { SITE, NAV_LINKS, SERVICES } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0c141d] text-slate-300" id="footer">
      {/* High-conversion banner */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#07211c] via-[#0e3a33] to-[#0c141d]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Owner: {SITE.owner} • GSTIN: {SITE.gstin}
            </div>
            <p className="mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">
              Cockroaches, Deemak, Lizards or Flies? Permanent Safe Treatment.
            </p>
            <p className="text-xs text-slate-300">
              Natural Insects Pest Control • 100% Odorless • On-Time Doorstep Service
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-black text-white hover:bg-[#20bd5a] transition shadow-lg"
            >
              <MessageCircle className="h-4.5 w-4.5 fill-white" />
              WhatsApp {SITE.phone}
            </a>
            <a
              href={SITE.phoneHref}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white hover:bg-white/20 transition"
            >
              <Phone className="h-4 w-4 text-emerald-400" />
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-36 flex items-center bg-white rounded-lg p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/nipc-brand-logo.svg"
                alt="NIPC SERVICES Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {SITE.fullName} is led by <strong>{SITE.owner}</strong>. Govt. registered pest management company with {SITE.yearsInBusiness}+ years of trusted expertise. GSTIN: {SITE.gstin}.
          </p>

          <p className="mt-3 flex items-center gap-1.5 text-sm font-bold text-amber-300">
            <Star className="h-4 w-4 fill-amber-300" /> {SITE.rating} rating · {SITE.reviewsCount.toLocaleString()}+ satisfied clients
          </p>

          <div className="mt-4 flex gap-2">
            {[
              { icon: Globe, label: "Website", href: "/" },
              { icon: MessageCircle, label: "WhatsApp", href: SITE.whatsappHref },
              { icon: AtSign, label: "Social", href: "#" },
              { icon: Share2, label: "Share", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-slate-300 transition hover:bg-[#0e7c6b] hover:text-white"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <nav aria-label="Services">
          <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-white">
            Specialized Treatments
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-slate-400 transition hover:text-white"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#live-work" className="text-slate-400 transition hover:text-white font-bold text-emerald-400">
                • View Live Technician Work
              </Link>
            </li>
          </ul>
        </nav>

        {/* Company & Areas */}
        <nav aria-label="Company">
          <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-white">
            Registered Offices
          </h3>
          <div className="mt-3 space-y-3 text-xs text-slate-300">
            {SITE.offices.map((off, idx) => (
              <div key={idx} className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                <p className="font-black text-emerald-300">{off.city}:</p>
                <p className="text-slate-400 mt-0.5 leading-relaxed">{off.address}</p>
              </div>
            ))}
          </div>
        </nav>

        {/* Contact info */}
        <div>
          <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-white">
            Call & WhatsApp (Veerpal)
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={SITE.phoneHref}
                className="flex items-start gap-2.5 font-black text-amber-300 hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Calling: {SITE.phoneDisplay}
              </a>
              <span className="block text-xs text-slate-400 ml-6">
                Owner: Veerpal • Direct Contact
              </span>
            </li>
            <li>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 font-bold text-emerald-400 hover:underline"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 fill-emerald-400" /> WhatsApp: +91 9639232701
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-start gap-2.5 text-slate-300 hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {SITE.email}
              </a>
            </li>
            <li className="rounded-lg bg-white/5 p-3">
              <p className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wider text-slate-300">
                <Clock className="h-3.5 w-3.5 text-emerald-400" /> Timings & Emergency
              </p>
              <ul className="mt-2 space-y-1 text-[13px] text-slate-400">
                {SITE.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-2">
                    <span>{h.day}</span>
                    <span className="font-bold text-slate-200">{h.time}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-[12.5px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {year} {SITE.fullName}. Owner: {SITE.owner}. GSTIN: {SITE.gstin}.</p>
          <div className="flex gap-4">
            <Link href="/#contact" className="hover:text-slate-300">Safe for Family & Environment</Link>
            <Link href="/#contact" className="hover:text-slate-300">GST Invoice Provided</Link>
            <Link href="/#contact" className="hover:text-slate-300">Govt. Registered</Link>
          </div>
        </div>
      </div>

      {/* Sticky mobile bottom bar with 1-tap WhatsApp + Direct Call */}
      <div className="fixed inset-x-0 bottom-0 z-[55] border-t border-slate-200 bg-white/97 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-8px_30px_rgba(12,20,29,0.15)] backdrop-blur-md md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={SITE.phoneHref}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0c141d] px-3 py-3.5 text-[14px] font-black text-white active:scale-[0.98]"
          >
            <Phone className="h-4.5 w-4.5 text-emerald-400" /> Call {SITE.phone}
          </a>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-3.5 text-[14px] font-black text-white shadow active:scale-[0.98]"
          >
            <MessageCircle className="h-4.5 w-4.5 fill-white" /> WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
