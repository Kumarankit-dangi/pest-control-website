"use client";

import { useState } from "react";
import { MailOpen, Loader2, CheckCircle2, Send, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { SITE } from "@/lib/site";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined, source: "homepage" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Subscription failed");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <section className="bg-[#0b2e28] py-14 sm:py-16" aria-label="NIPC Newsletter & Offers">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div
            className="grid items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10 lg:grid-cols-2"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0e7c6b]">
                <MailOpen className="h-6 w-6 text-white" />
              </span>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-[28px]">
                Get ₹250 Discount Coupon on Signup
              </h2>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate-300">
                Join 10,000+ Delhi NCR homeowners receiving seasonal insect prevention guides and exclusive festive discounts from NIPC Services.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 text-[12.5px] font-bold text-slate-300">
                {["Termite Swarm Alerts", "Monsoon Dengue Protection", "Instant ₹250 Coupon"].map((t) => (
                  <li key={t} className="rounded-full border border-white/15 px-3 py-1.5">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {status === "done" ? (
                <div className="rounded-2xl bg-white p-7 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#0e7c6b]" />
                  <h3 className="mt-3 text-xl font-black">You are Subscribed!</h3>
                  <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-slate-600">
                    Use coupon code <strong className="text-emerald-700">NIPC25</strong> during booking to claim your instant discount.
                  </p>
                  <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs font-black text-white"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" /> Share on WhatsApp to Book
                  </a>
                </div>
              ) : (
                <form onSubmit={submit} className="rounded-2xl bg-white p-6 sm:p-7" noValidate>
                  <label htmlFor="nl-name" className="mb-1.5 block text-[13px] font-bold text-[#0c141d]">
                    Your Name
                  </label>
                  <input
                    id="nl-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amit Kumar"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0e7c6b]"
                  />

                  <label htmlFor="nl-email" className="mb-1.5 mt-3.5 block text-[13px] font-bold text-[#0c141d]">
                    Email Address *
                  </label>
                  <input
                    id="nl-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amit@gmail.com"
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-[#0e7c6b] ${
                      error ? "border-red-400" : "border-slate-200"
                    }`}
                  />
                  {error && <p className="mt-2 text-xs font-bold text-red-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0e7c6b] px-5 py-3.5 text-sm font-black text-white hover:bg-[#0b5f53] transition disabled:opacity-60"
                  >
                    {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {status === "sending" ? "Claiming..." : "Claim ₹250 Discount Code"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
