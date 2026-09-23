import { MapPin, ShieldCheck, Clock3, BadgeCheck, Phone, CheckCircle2, Award } from "lucide-react";
import { SITE } from "@/lib/site";

export function ServiceAreaStrip() {
  return (
    <div className="border-b border-slate-200 bg-white">
      {/* Top Credentials Row */}
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12.5px] sm:text-[13px] font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-[#0c141d]">
              <BadgeCheck className="h-4 w-4 text-[#0e7c6b]" /> GSTIN: {SITE.gstin}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="h-4 w-4 text-[#0e7c6b]" /> Safe for Family & Environment
            </span>
            <span className="flex items-center gap-1.5 text-amber-700">
              <Award className="h-4 w-4 text-amber-600" /> 7 Years Written Warranty
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <Clock3 className="h-4 w-4 text-[#0e7c6b]" /> 2-Hour Doorstep Arrival
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-[12.5px] font-semibold text-slate-600">
            <p className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#0e7c6b] shrink-0" />
              <span>Rudrapur • Pilibhit • Bareilly • Khatima • Delhi NCR</span>
            </p>
            <span className="hidden sm:inline text-slate-300">|</span>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-1 font-black text-emerald-700 hover:underline"
            >
              <Phone className="h-3 w-3" /> Calling: {SITE.phone} (Veerpal)
            </a>
          </div>
        </div>
      </div>

      {/* 7 Pests Quick Strip matching user's official banner */}
      <div className="bg-[#0c141d] py-2 px-4 border-t border-slate-800">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
          <span className="font-black text-emerald-400 uppercase tracking-wider text-[11px]">
            ⚡ 7 Common Pests Eliminated:
          </span>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 font-bold text-[11.5px]">
            <span>🚫 Cockroach</span>
            <span>🚫 Ant</span>
            <span>🚫 Mosquito</span>
            <span>🚫 Termite (Deemak)</span>
            <span>🚫 Fly</span>
            <span>🚫 Rodent (Rat)</span>
            <span>🚫 Lizard (Chhipkali)</span>
          </div>
          <span className="hidden lg:inline text-amber-300 font-bold text-[11px]">
            SAFE • EFFECTIVE • RELIABLE
          </span>
        </div>
      </div>
    </div>
  );
}
