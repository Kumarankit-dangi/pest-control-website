"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { X, Phone, CheckCircle2, Loader2, MessageCircle, Sparkles } from "lucide-react";
import { SITE, SERVICES } from "@/lib/site";

type QuoteContextValue = {
  openQuote: (opts?: { service?: string; promo?: string }) => void;
};

const QuoteContext = createContext<QuoteContextValue>({ openQuote: () => {} });
export const useQuote = () => useContext(QuoteContext);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");
  const [promo, setPromo] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pestType: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const openQuote = useCallback((opts?: { service?: string; promo?: string }) => {
    if (opts?.service) setService(opts.service);
    if (opts?.promo) setPromo(opts.promo);
    setOpen(true);
    setStatus("idle");
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid 10-digit phone number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
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
          pestType: form.pestType || service,
          serviceType: service,
          notes: form.notes.trim(),
          promoCode: promo,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <QuoteContext.Provider value={{ openQuote }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[85] flex items-end justify-center sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Get a free inspection quote"
        >
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[#0c141d]/75 backdrop-blur-sm"
          />
          <div className="relative max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-7">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              aria-label="Close quote form"
            >
              <X className="h-5 w-5" />
            </button>

            {status === "done" ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
                <h3 className="mt-4 text-2xl font-black tracking-tight">Booking Received by Veerpal!</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                  Thanks {form.name.split(" ")[0]} — an NIPC specialist will call your number{" "}
                  <strong>{form.phone}</strong> within 15 minutes.
                </p>

                <div className="mt-5 space-y-2.5">
                  <a
                    href={`https://wa.me/919639232701?text=Hi%20Veerpal%20ji,%20I%20just%20submitted%20a%20booking%20for%20${encodeURIComponent(
                      form.name
                    )}%20(${encodeURIComponent(form.phone)}).%20Please%20confirm%20my%20slot.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-black text-white hover:bg-[#20bd5a] transition shadow-md"
                  >
                    <MessageCircle className="h-5 w-5 fill-white" />
                    Open in WhatsApp for Instant Slot
                  </a>

                  <button
                    onClick={() => setOpen(false)}
                    className="w-full rounded-xl bg-[#0c141d] px-5 py-3 text-sm font-black text-white transition hover:bg-[#162636]"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="h-11 w-32 shrink-0 flex items-center justify-center rounded-xl bg-slate-50 p-1 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/nipc-brand-logo.svg"
                      alt="NIPC SERVICES"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-black uppercase text-[#0b5f53]">
                      <Sparkles className="h-3 w-3" /> Owner: {SITE.owner}
                    </span>
                    <h3 className="text-xl font-black text-[#0c141d]">
                      Book Inspection Visit
                    </h3>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-100 p-2.5 text-xs font-bold text-slate-700">
                  <span>Fastest Connect:</span>
                  <a
                    href={SITE.phoneHref}
                    className="flex items-center gap-1 text-[#0c141d] font-black hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-600" /> {SITE.phone}
                  </a>
                  <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#25D366] font-black hover:underline"
                  >
                    <MessageCircle className="h-3.5 w-3.5 fill-[#25D366]" /> WhatsApp
                  </a>
                </div>

                <form onSubmit={submit} className="mt-4 space-y-3" noValidate>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="q-name" className="mb-1 block text-[13px] font-bold">
                        Full Name *
                      </label>
                      <input
                        id="q-name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0e7c6b] focus:ring-2 focus:ring-[#0e7c6b]/15 ${
                          errors.name ? "border-red-400" : "border-slate-200"
                        }`}
                      />
                      {errors.name && <p className="mt-1 text-xs font-bold text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="q-phone" className="mb-1 block text-[13px] font-bold">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="q-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. 9639232701"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0e7c6b] focus:ring-2 focus:ring-[#0e7c6b]/15 ${
                          errors.phone ? "border-red-400" : "border-slate-200"
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-xs font-bold text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="q-service" className="mb-1 block text-[13px] font-bold">
                        Service Needed
                      </label>
                      <select
                        id="q-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#0e7c6b]"
                      >
                        <option value="">General Pest Advice</option>
                        {SERVICES.map((s) => (
                          <option key={s.slug} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="q-addr" className="mb-1 block text-[13px] font-bold">
                        Location / Colony
                      </label>
                      <input
                        id="q-addr"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="e.g. Rudrapur / Pilibhit / Delhi"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0e7c6b]"
                      />
                    </div>
                  </div>

                  {promo && (
                    <div className="rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 border border-emerald-200">
                      🎉 Coupon applied: <strong>{promo}</strong> (25% Discount will be credited on your invoice)
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0e7c6b] px-5 py-3.5 text-sm font-black text-white hover:bg-[#0b5f53] transition disabled:opacity-60 shadow-md"
                  >
                    {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                    {status === "sending" ? "Booking Technician…" : "Confirm Free Inspection Visit"}
                  </button>

                  {status === "error" && (
                    <p className="text-center text-xs font-bold text-red-600">
                      Booking failed. Please call Veerpal directly at {SITE.phoneDisplay} or use WhatsApp.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </QuoteContext.Provider>
  );
}
