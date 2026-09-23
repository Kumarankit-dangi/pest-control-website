"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  ShoppingBag,
  MapPin,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site";
import { useQuote } from "./QuoteModal";
import { useCart } from "./CartDrawer";

function BrandLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-2"
      aria-label="NIPC SERVICES home"
    >
      <div className="relative h-10 w-32 sm:h-12 sm:w-40 flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/nipc-brand-logo.svg"
          alt="NIPC SERVICES (Natural Insects Pest Control)"
          className="h-full w-full object-contain object-left"
        />
      </div>
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { openQuote } = useQuote();
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ensure body scroll is unlocked when menu is closed
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen]);

  // Robust cross-page and on-page smooth navigation for mobile drawer
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);

      if (href.startsWith("/#")) {
        const targetId = href.replace("/#", "");

        if (pathname === "/") {
          // Already on homepage: unlock scroll immediately and scroll into view smoothly
          document.body.style.overflow = "";
          document.body.style.touchAction = "";

          // Delay slightly so the drawer closure animation starts without blocking
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
              // Also update browser URL hash without full reload
              window.history.pushState(null, "", `#${targetId}`);
            }
          }, 80);
        } else {
          // On another page (e.g. /quote or /blog): navigate to homepage anchor
          router.push(href);
        }
      } else {
        router.push(href);
      }
    },
    [pathname, router]
  );

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#0b333a] text-slate-100 text-[11.5px] sm:text-[12.5px] border-b border-teal-950/40">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-3 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-semibold text-slate-200">
              Safe Environment, Healthy Life • Owner: <strong>{SITE.owner}</strong>
            </span>
            <span className="hidden md:inline text-teal-400/60">•</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="h-3 w-3 text-teal-400" /> Rudrapur • Pilibhit • Delhi NCR
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* WhatsApp with 9639232701 */}
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-bold text-slate-100 hover:text-emerald-300 transition"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400" />
              <span>WhatsApp {SITE.phone}</span>
            </a>

            {/* Direct Calling 9639232701 */}
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-1.5 font-bold text-amber-300 hover:text-white transition"
            >
              <Phone className="h-3 w-3" />
              <span>{SITE.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-[60] border-b bg-white transition-all ${
          scrolled
            ? "border-slate-200 shadow-[0_4px_20px_rgba(12,20,29,0.08)] py-2"
            : "border-slate-100 py-2.5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 sm:px-6">
          <BrandLogo />

          {/* Desktop Links */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="cursor-pointer rounded-lg px-3 py-2 text-[14px] font-bold text-slate-700 transition hover:bg-slate-100 hover:text-[#0b333a]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Actions on the right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
              aria-label={`Open shopping cart (${count} items)`}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0e7c6b] px-1 text-[11px] font-black text-white">
                  {count}
                </span>
              )}
            </button>

            {/* "Get a Free Quote ->" Button */}
            <button
              onClick={() => openQuote()}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#0d5060] hover:bg-[#0a4250] text-white px-5 py-2.5 text-[14px] font-black shadow-sm transition active:scale-[0.98]"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Call button */}
            <a
              href={SITE.phoneHref}
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 text-[13.5px] font-black shadow-sm transition"
            >
              <Phone className="h-4 w-4" />
              <span>{SITE.phone}</span>
            </a>

            {/* Hamburger Menu button (Three Line Button) */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border-2 border-slate-300 text-[#0c141d] bg-slate-50 hover:bg-slate-100 active:scale-95 transition"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over menu for mobile (Three Line Drawer) */}
      {menuOpen && (
        <div className="fixed inset-0 z-[95]" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            className="fixed right-0 top-0 bottom-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl z-10"
            style={{ animation: "slide-in-right 0.25s ease-out" }}
          >
            {/* Header in Drawer */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <BrandLogo onClick={() => setMenuOpen(false)} />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 transition"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Contact Bar in menu with Veerpal & 9639232701 */}
            <div className="bg-emerald-50/90 p-3.5 border-b border-emerald-100 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-black text-emerald-950 uppercase">
                <span>Owner: {SITE.owner}</span>
                <span className="text-emerald-700">GST: {SITE.gstin}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={SITE.phoneHref}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0c141d] py-2.5 text-xs font-black text-white active:scale-95 transition"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  {SITE.phone}
                </a>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2.5 text-xs font-black text-white active:scale-95 transition"
                >
                  <MessageCircle className="h-3.5 w-3.5 fill-white" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Navigation links with immediate scrolling and drawer close */}
            <nav className="flex-1 overflow-y-auto px-4 py-3 divide-y divide-slate-100" aria-label="Mobile">
              <div className="space-y-1 pb-3">
                {NAV_LINKS.map((l, i) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3.5 text-[15.5px] font-black text-[#0c141d] transition active:bg-emerald-50 hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-black text-[#0e7c6b]">
                        0{i + 1}
                      </span>
                      {l.label}
                    </span>
                    <span className="text-slate-400 text-sm">→</span>
                  </a>
                ))}
              </div>

              {/* Extra direct links */}
              <div className="pt-3 space-y-1.5">
                <a
                  href="/#live-work"
                  onClick={(e) => handleNavClick(e, "/#live-work")}
                  className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-emerald-800 bg-emerald-50/60 hover:bg-emerald-100 transition"
                >
                  <span>📸 Real On-Site Work Photos</span>
                  <span>→</span>
                </a>
                <a
                  href="/quote"
                  onClick={(e) => handleNavClick(e, "/quote")}
                  className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  <span>Book Free Inspection Visit</span>
                  <span>→</span>
                </a>
                <a
                  href="/blog"
                  onClick={(e) => handleNavClick(e, "/blog")}
                  className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  <span>Pest Control Blog & Tips</span>
                  <span>→</span>
                </a>
              </div>
            </nav>

            {/* Bottom Drawer CTA */}
            <div className="space-y-2 border-t border-slate-100 bg-slate-50 p-4">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openQuote();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0d5060] hover:bg-[#0a4250] py-3.5 text-[15px] font-black text-white shadow-md active:scale-95 transition"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center text-[11px] font-semibold text-slate-500">
                Direct Helpline (Veerpal): {SITE.phoneDisplay}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
