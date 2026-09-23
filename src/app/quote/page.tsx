"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2, Phone, ShieldCheck, MessageCircle, Sparkles } from "lucide-react";
import { SITE, SERVICES, OFFERS } from "@/lib/site";

export default function QuotePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    pestType: "",
    preferredDate: "",
    promoCode: "NIPC25",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [serverError, setServerError] = useState("");

  function validate() {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid 10-digit mobile number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim() || `${form.phone.trim()}@nipcservices.com`,
          phone: form.phone.trim(),
          address: form.address.trim(),
          serviceType: form.serviceType,
          pestType: form.pestType.trim(),
          preferredDate: form.preferredDate,
          promoCode: form.promoCode.trim().toUpperCase(),
          notes: form.notes.trim(),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError(`Something went wrong. Please call Veerpal directly on ${SITE.phone}`);
      setStatus("idle");
    }
  }

  const cls = (bad?: string) =>
    `w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition placeholder:text-slate-400 focus:border-[#0e7c6b] focus:ring-2 focus:ring-[#0e7c6b]/15 ${
      bad ? "border-red-400" : "border-slate-200 bg-white"
    }`;

  return (
    <>
      <section className="bg-[#0c141d] text-white">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-12 w-36 shrink-0 flex items-center justify-center rounded-xl bg-white p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/nipc-brand-logo.svg"
                alt="NIPC SERVICES"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" /> Owner: {SITE.owner} • GSTIN: {SITE.gstin}
              </span>
              <h1
                className="text-[clamp(1.8rem,5vw,2.8rem)] font-black leading-[1.08] tracking-tight"
                style={{ fontFamily: "Fraunces, Georgia, serif" }}
              >
                Book Doorstep Pest Inspection
              </h1>
            </div>
          </div>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
            Govt. registered Natural Insects Pest Control. Technician arrives in under 2 hours across Rudrapur, Pilibhit, Bareilly & Delhi NCR.
          </p>
        </div>
      </section>

      <section className="bg-[#f2f5f8] py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            {status === "done" ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
                <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">Inspection Booked!</h2>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
                  Thank you {form.name.split(" ")[0]}! Veerpal ji or a senior NIPC technician will call your phone{" "}
                  <strong>{form.phone}</strong> in a few minutes to confirm arrival.
                </p>

                <div className="mx-auto mt-6 flex max-w-sm flex-col gap-2.5">
                  <a
                    href={`https://wa.me/919639232701?text=Hi%20Veerpal%20ji,%20I%20just%20booked%20an%20inspection%20for%20${encodeURIComponent(
                      form.name
                    )}%20(${encodeURIComponent(form.phone)}).%20Please%20confirm%20my%20slot.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-black text-white hover:bg-[#20bd5a]"
                  >
                    <MessageCircle className="h-4.5 w-4.5 fill-white" /> Connect on WhatsApp
                  </a>

                  <Link
                    href="/"
                    className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 hover:bg-slate-50"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="qp-name" className="mb-1.5 block text-[13px] font-bold">
                      Full Name *
                    </label>
                    <input
                      id="qp-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Deepak Joshi"
                      className={cls(errors.name)}
                    />
                    {errors.name && <p className="mt-1 text-xs font-bold text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="qp-phone" className="mb-1.5 block text-[13px] font-bold">
                      Mobile / WhatsApp No *
                    </label>
                    <input
                      id="qp-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 9639232701"
                      className={cls(errors.phone)}
                    />
                    {errors.phone && <p className="mt-1 text-xs font-bold text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="qp-email" className="mb-1.5 block text-[13px] font-bold">
                      Email Address (Optional)
                    </label>
                    <input
                      id="qp-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="deepak@gmail.com"
                      className={cls()}
                    />
                  </div>

                  <div>
                    <label htmlFor="qp-addr" className="mb-1.5 block text-[13px] font-bold">
                      Address / City
                    </label>
                    <input
                      id="qp-addr"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="e.g. Rudrapur / Pilibhit / Delhi"
                      className={cls()}
                    />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="qp-service" className="mb-1.5 block text-[13px] font-bold">
                      Service
                    </label>
                    <select
                      id="qp-service"
                      value={form.serviceType}
                      onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                      className={cls()}
                    >
                      <option value="">Advise me on call</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.name}>
                          {s.name} (from ₹{s.priceFrom})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="qp-date" className="mb-1.5 block text-[13px] font-bold">
                      Timing
                    </label>
                    <select
                      id="qp-date"
                      value={form.preferredDate}
                      onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                      className={cls()}
                    >
                      <option value="Today (Within 2 Hours)">Today (Within 2 Hours)</option>
                      <option>Tomorrow Morning</option>
                      <option>Tomorrow Evening</option>
                      <option>Weekend Slot</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="qp-promo" className="mb-1.5 block text-[13px] font-bold">
                      Promo Code
                    </label>
                    <input
                      id="qp-promo"
                      value={form.promoCode}
                      onChange={(e) => setForm({ ...form, promoCode: e.target.value })}
                      placeholder="NIPC25"
                      className={cls()}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="qp-notes" className="mb-1.5 block text-[13px] font-bold">
                    Pest Infestation Details
                  </label>
                  <textarea
                    id="qp-notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Cockroaches in modular kitchen, Deemak in wooden door frame, Lizards, Flies..."
                    className={cls()}
                  />
                </div>

                {serverError && <p className="mt-3 text-sm font-bold text-red-600">{serverError}</p>}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0e7c6b] px-5 py-4 text-base font-black text-white hover:bg-[#0b5f53] transition disabled:opacity-60 shadow-md"
                >
                  {status === "sending" && <Loader2 className="h-5 w-5 animate-spin" />}
                  {status === "sending" ? "Booking with Veerpal…" : "Confirm Free Inspection Visit"}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-[#25D366] p-5 text-white shadow-md hover:bg-[#20bd5a] transition"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <MessageCircle className="h-6 w-6 fill-white" />
              </span>
              <div>
                <span className="block text-[11px] font-black uppercase text-emerald-100">
                  Instant Booking via Chat
                </span>
                <span className="text-xl font-black">WhatsApp (+91 9639232701)</span>
              </div>
            </a>

            <a
              href={SITE.phoneHref}
              className="flex items-center gap-4 rounded-2xl bg-[#0c141d] p-5 text-white"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0e7c6b]">
                <Phone className="h-5 w-5 text-white" />
              </span>
              <div>
                <span className="block text-[11px] font-black uppercase text-emerald-400">
                  Direct Helpline (Veerpal)
                </span>
                <span className="text-xl font-black">{SITE.phone}</span>
              </div>
            </a>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="flex items-center gap-2 text-sm font-black text-slate-900">
                <ShieldCheck className="h-4 w-4 text-[#0e7c6b]" /> Active Discount Coupons
              </p>
              <ul className="mt-3 space-y-2">
                {OFFERS.map((o) => (
                  <li
                    key={o.code}
                    className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 p-2.5 text-xs"
                  >
                    <span className="font-bold text-slate-800">{o.title}</span>
                    <button
                      onClick={() => setForm({ ...form, promoCode: o.code })}
                      className="rounded-lg bg-[#0c141d] px-2.5 py-1 font-mono text-[11px] font-black text-white"
                    >
                      {o.code}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <div className="h-[76px] bg-[#f2f5f8] md:hidden" aria-hidden />
    </>
  );
}
