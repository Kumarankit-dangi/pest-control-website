"use client";

import { MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function FloatingContactButtons() {
  return (
    <div className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-[58] flex flex-col items-end gap-2.5">
      {/* "Call now" pill button dialing 9639232701 */}
      <a
        href={SITE.phoneHref}
        aria-label={`Call Veerpal at ${SITE.phoneDisplay}`}
        className="group flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-slate-800 shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-slate-200/80 transition-all hover:scale-105 hover:bg-slate-50"
      >
        <Phone className="h-4 w-4 text-emerald-700" />
        <span className="text-[13px] font-black text-slate-900 tracking-tight">Call Veerpal</span>
      </a>

      {/* "WhatsApp" bright green pill button with 9639232701 */}
      <a
        href={SITE.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Veerpal on WhatsApp (9639232701)"
        className="group flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-all hover:scale-105 hover:bg-[#20bd5a]"
      >
        <MessageCircle className="h-5 w-5 fill-white" />
        <span className="text-[13px] font-black tracking-tight">WhatsApp</span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
      </a>
    </div>
  );
}
