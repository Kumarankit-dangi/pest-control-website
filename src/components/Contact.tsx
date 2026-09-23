"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle2, MessageCircle, UserCheck } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal, SectionHeading } from "./Reveal";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Cockroach / Deemak Service",
    message: "",
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim() || `${form.phone.trim()}@nipcservices.com`,
          phone: form.phone.trim(),
          subject: form.subject,
          message: form.message.trim() || "Pest control service required",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Send failed");
      setStatus("done");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : `Could not send. Please call Veerpal directly on ${SITE.phone}.`);
      setStatus("idle");
    }
  }

  const inputCls = (bad?: string) =>
    `w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition placeholder:text-slate-400 focus:border-[#0e7c6b] focus:ring-2 focus:ring-[#0e7c6b]/15 ${
      bad ? "border-red-400" : "border-slate-200 bg-white"
    }`;

  return (
    <section id="contact" className="bg-white py-14 sm:py-20" aria-label="Contact NIPC SERVICES">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Direct Helpline & Booking"
            title="Connect with Veerpal (Owner, NIPC SERVICES)"
            description="Got an emergency pest outbreak? Reach our direct calling helpline or chat on WhatsApp. A trained technician arrives within 2 hours."
          />
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact action cards */}
          <Reveal>
            <div className="flex h-full flex-col gap-3.5">
              {/* WhatsApp direct card */}
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl bg-[#25D366] p-5 text-white transition hover:bg-[#20bd5a] shadow-lg"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <MessageCircle className="h-6 w-6 fill-white" />
                </span>
                <div>
                  <span className="block text-[11px] font-black uppercase tracking-wider text-emerald-100">
                    Instant WhatsApp Chat with Veerpal
                  </span>
                  <span className="text-xl font-black">+91 {SITE.phone}</span>
                </div>
              </a>

              {/* Calling card */}
              <a
                href={SITE.phoneHref}
                className="group flex items-center gap-4 rounded-2xl bg-[#0c141d] p-5 text-white transition hover:bg-[#162636] shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0e7c6b]">
                  <Phone className="h-5.5 w-5.5 text-white" />
                </span>
                <div>
                  <span className="block text-[11px] font-black uppercase tracking-wider text-emerald-400">
                    Direct Calling Helpline (Veerpal)
                  </span>
                  <span className="text-xl font-black">{SITE.phone}</span>
                </div>
              </a>

              {/* Email & GST info */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={`mailto:${SITE.email}`}
                  className="rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
                >
                  <Mail className="h-5 w-5 text-[#0e7c6b]" />
                  <p className="mt-2 text-[12px] font-black uppercase tracking-wide text-slate-500">Official Email</p>
                  <p className="text-xs sm:text-sm font-bold text-[#0c141d] truncate">{SITE.email}</p>
                </a>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <UserCheck className="h-5 w-5 text-[#0e7c6b]" />
                  <p className="mt-2 text-[12px] font-black uppercase tracking-wide text-slate-500">GST Registration</p>
                  <p className="text-xs sm:text-sm font-bold text-[#0c141d]">{SITE.gstin}</p>
                </div>
              </div>

              {/* Verified Office Addresses */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-3">
                <p className="flex items-center gap-2 text-[13px] font-black uppercase tracking-wide text-slate-700">
                  <MapPin className="h-4 w-4 text-[#0e7c6b]" /> Registered Branch Offices
                </p>

                <div className="rounded-xl bg-white p-3 border border-slate-200 text-xs">
                  <span className="font-black text-emerald-800 uppercase block">Rudrapur (U.S. Nagar):</span>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    Ward No.01, Teen Pani Dam, Fulsunga, Rudrapur (U.S. Nagar)
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 border border-slate-200 text-xs">
                  <span className="font-black text-emerald-800 uppercase block">Pilibhit (Uttar Pradesh):</span>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    Village-Jatpura, Barat Bojh, Near Pole No.-2, Jahanabad, Pilibhit - 262001
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={100}>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              {status === "done" ? (
                <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-14 w-14 text-emerald-500" />
                  <h3 className="mt-4 text-2xl font-black tracking-tight">Booking Request Sent to Veerpal!</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                    Thank you {form.name.split(" ")[0]}! Veerpal ji or a senior NIPC technician will call your number{" "}
                    <strong>{form.phone}</strong> shortly.
                  </p>
                  <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-black text-white hover:bg-[#20bd5a]"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" /> Open in WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="mb-1.5 block text-[13px] font-bold text-slate-800">
                        Full Name *
                      </label>
                      <input
                        id="c-name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className={inputCls(errors.name)}
                      />
                      {errors.name && <p className="mt-1 text-xs font-bold text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="c-phone" className="mb-1.5 block text-[13px] font-bold text-slate-800">
                        Phone / WhatsApp No *
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. 96392XXXXX"
                        className={inputCls(errors.phone)}
                      />
                      {errors.phone && <p className="mt-1 text-xs font-bold text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-email" className="mb-1.5 block text-[13px] font-bold text-slate-800">
                        Email Address (Optional)
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ramesh@gmail.com"
                        className={inputCls()}
                      />
                    </div>

                    <div>
                      <label htmlFor="c-subject" className="mb-1.5 block text-[13px] font-bold text-slate-800">
                        Service Needed
                      </label>
                      <select
                        id="c-subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={inputCls()}
                      >
                        <option>Cockroach Herbal Gel Service</option>
                        <option>Termite (Deemak) Drill-Fill-Seal</option>
                        <option>Lizard (Chhipkali) Control</option>
                        <option>Flies & Drain Pest Spraying</option>
                        <option>Mosquito & Society Fogging</option>
                        <option>Rodent Control & Gap Arrest</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-3.5">
                    <label htmlFor="c-msg" className="mb-1.5 block text-[13px] font-bold text-slate-800">
                      Address / Problem Details
                    </label>
                    <textarea
                      id="c-msg"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="e.g. Wardrobe me deemak lag gayi hai ya kitchen me cockroaches..."
                      className={inputCls()}
                    />
                  </div>

                  {serverError && <p className="mt-3 text-sm font-bold text-red-600">{serverError}</p>}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0e7c6b] px-5 py-4 text-base font-black text-white hover:bg-[#0b5f53] transition active:scale-[0.99] disabled:opacity-60 shadow-md"
                  >
                    {status === "sending" && <Loader2 className="h-5 w-5 animate-spin" />}
                    {status === "sending" ? "Booking with Veerpal…" : "Book Inspection with Veerpal"}
                  </button>

                  <p className="mt-2.5 text-center text-xs text-slate-500">
                    Prefer direct calling? Dial{" "}
                    <a href={SITE.phoneHref} className="font-black text-[#0c141d] underline">
                      {SITE.phoneDisplay}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
