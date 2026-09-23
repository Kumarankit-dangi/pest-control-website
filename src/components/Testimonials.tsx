"use client";

import { useEffect, useState } from "react";
import {
  Star,
  Quote,
  CheckCircle2,
  ThumbsUp,
  MessageSquarePlus,
  ShieldCheck,
  X,
  Loader2,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TESTIMONIALS, SITE } from "@/lib/site";
import { Reveal, SectionHeading } from "./Reveal";

type ReviewItem = {
  id?: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  review: string;
  verified?: boolean;
  dateStr?: string;
  avatarBg?: string;
};

export function Testimonials() {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(() =>
    TESTIMONIALS.map((t, idx) => ({
      id: idx + 1,
      name: t.name,
      location: t.location,
      service: t.service,
      rating: t.rating,
      review: t.quote,
      verified: true,
      dateStr: t.dateStr || "Verified Client",
      avatarBg: t.avatarBg || "#0e7c6b",
    }))
  );

  const [activeTab, setActiveTab] = useState<"all" | "termite" | "cockroach" | "bedbug">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState({
    name: "",
    location: "",
    service: "Cockroach Herbal Gel",
    rating: 5,
    review: "",
  });

  // Fetch reviews from API
  useEffect(() => {
    fetch("/api/reviews", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviewsList(
            data.reviews.map((r: Record<string, unknown>) => ({
              id: Number(r.id),
              name: String(r.name),
              location: String(r.location),
              service: String(r.service),
              rating: Number(r.rating) || 5,
              review: String(r.review),
              verified: Boolean(r.verified ?? true),
              dateStr: String(r.dateStr || "Verified Client"),
              avatarBg: String(r.avatarBg || "#0e7c6b"),
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const filteredReviews = reviewsList.filter((r) => {
    if (activeTab === "all") return true;
    if (activeTab === "termite") return r.service.toLowerCase().includes("termite") || r.service.toLowerCase().includes("deemak");
    if (activeTab === "cockroach") return r.service.toLowerCase().includes("cockroach") || r.service.toLowerCase().includes("kitchen");
    if (activeTab === "bedbug") return r.service.toLowerCase().includes("bed bug") || r.service.toLowerCase().includes("khatmal");
    return true;
  });

  async function handleAddReview(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (form.name.trim().length < 2) return setFormError("Kripya apna naam enter karein.");
    if (form.location.trim().length < 2) return setFormError("Kripya apna area / city enter karein (e.g. Rohini, Delhi).");
    if (form.review.trim().length < 10) return setFormError("Kripya kam se kam 10 akshar ka review likhein.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Review submit nahi ho paya.");

      if (data.review) {
        setReviewsList((prev) => [
          {
            id: data.review.id,
            name: data.review.name,
            location: data.review.location,
            service: data.review.service,
            rating: Number(data.review.rating),
            review: data.review.review,
            verified: true,
            dateStr: "Just now",
            avatarBg: data.review.avatarBg || "#0e7c6b",
          },
          ...prev,
        ]);
      }
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowAddModal(false);
        setForm({
          name: "",
          location: "",
          service: "Cockroach Herbal Gel",
          rating: 5,
          review: "",
        });
      }, 2000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Kuch gadbad hui. Kripya punah prayas karein.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="reviews" className="bg-[#faf8f3] py-14 sm:py-20" aria-label="Customer Reviews">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header with overall rating summary */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Verified Client Reviews"
              title="What Delhi NCR Families Say About NIPC Services"
              description="Real feedback from homeowners, builders and business owners who got pest-free living with our odorless herbal treatments."
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-wrap items-center gap-3">
              {/* Google/Star Trust Badge */}
              <div className="flex items-center gap-2.5 rounded-2xl bg-white border border-slate-200/80 px-4 py-2.5 shadow-sm">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs">
                  <span className="font-black text-slate-900">{SITE.rating} / 5.0</span>
                  <span className="text-slate-500"> ({SITE.reviewsCount.toLocaleString()}+ Reviews)</span>
                </div>
              </div>

              {/* Add Review Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 rounded-2xl bg-[#0c141d] px-4 py-2.5 text-xs sm:text-sm font-black text-white hover:bg-[#162636] transition shadow-md active:scale-95"
              >
                <MessageSquarePlus className="h-4 w-4 text-emerald-400" />
                Write a Review
              </button>
            </div>
          </Reveal>
        </div>

        {/* Category Filters for Reviews */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-3">
          <span className="text-xs font-bold text-slate-500 mr-1">Filter by service:</span>
          {[
            { id: "all", label: `All Reviews (${reviewsList.length})` },
            { id: "cockroach", label: "Cockroach Herbal Gel" },
            { id: "termite", label: "Termite (Deemak)" },
            { id: "bedbug", label: "Bed Bug (Khatmal)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-black transition ${
                activeTab === tab.id
                  ? "bg-[#0e7c6b] text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((item, idx) => (
            <Reveal key={item.id || idx} delay={(idx % 3) * 70}>
              <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300">
                <div>
                  {/* Top: Avatar, Name, Rating & Verified Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white font-black text-base shadow-sm"
                        style={{ backgroundColor: item.avatarBg || "#0e7c6b" }}
                      >
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-black text-sm text-slate-900 leading-tight">
                            {item.name}
                          </h4>
                          {item.verified && (
                            <span
                              className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-700"
                              title="Verified Customer"
                            >
                              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="flex items-center gap-1 text-[11.5px] font-bold text-slate-500 mt-0.5">
                          <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                          <span>{item.location}</span>
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    {item.dateStr && (
                      <span className="text-[11px] font-medium text-slate-400">
                        {item.dateStr}
                      </span>
                    )}
                  </div>

                  {/* Stars + Service tag */}
                  <div className="mt-3.5 flex items-center justify-between gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: item.rating }).map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <span className="rounded-lg bg-emerald-50/80 px-2.5 py-1 text-[11px] font-black text-[#0b5f53] border border-emerald-100 truncate max-w-[170px]">
                      {item.service}
                    </span>
                  </div>

                  {/* Review Text */}
                  <div className="mt-3.5 relative">
                    <Quote className="h-5 w-5 text-slate-300 absolute -top-1 -left-1 opacity-40 pointer-events-none" />
                    <p className="text-[13.5px] leading-relaxed text-slate-700 pl-3 italic">
                      “{item.review}”
                    </p>
                  </div>
                </div>

                {/* Bottom Trust Stamp */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11.5px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Warranty Honored
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <ThumbsUp className="h-3 w-3" /> Recommended
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Quick Review Prompt CTA */}
        <div className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-base sm:text-lg font-black text-emerald-950">
              Have you used NIPC Services recently?
            </h4>
            <p className="text-xs sm:text-sm text-emerald-800 mt-1">
              Your honest review helps your neighbors in Delhi NCR choose safe, odorless pest control.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="shrink-0 rounded-xl bg-[#0e7c6b] hover:bg-[#0b5f53] text-white px-5 py-3 text-xs sm:text-sm font-black transition shadow-sm"
          >
            Share Your Experience
          </button>
        </div>
      </div>

      {/* Write a Review Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-[88] flex items-end justify-center sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Add a Review"
        >
          <button
            onClick={() => setShowAddModal(false)}
            className="absolute inset-0 bg-[#0c141d]/75 backdrop-blur-sm"
          />

          <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {submitSuccess ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500 animate-bounce" />
                <h3 className="mt-3 text-xl font-black text-slate-900">Dhanyawad! Review Posted</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Aapka review NIPC Services website par live ho gaya hai.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#0b5f53]">
                    <MessageSquarePlus className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Write a Client Review</h3>
                    <p className="text-xs text-slate-500">NIPC SERVICES (Natural Insects Pest Control)</p>
                  </div>
                </div>

                <form onSubmit={handleAddReview} className="mt-5 space-y-3.5" noValidate>
                  {/* Rating Stars Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Aapka Experience kaisa raha? (Rating) *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setForm({ ...form, rating: star })}
                          className="p-1 transition hover:scale-110"
                        >
                          <Star
                            className={`h-7 w-7 ${
                              star <= form.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs font-black text-amber-600">
                        {form.rating === 5 ? "Excellent (5/5)" : `${form.rating} Stars`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Aapka Naam *
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#0e7c6b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City / Society *
                      </label>
                      <input
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="e.g. Sector 62, Noida"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#0e7c6b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Konsi Service karwayi thi?
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#0e7c6b]"
                    >
                      <option>Cockroach Herbal Gel</option>
                      <option>Termite (Deemak) Drill-Fill-Seal</option>
                      <option>Bed Bug (Khatmal) Control</option>
                      <option>Rodent / Rat Proofing</option>
                      <option>Full Home Pest Control</option>
                      <option>Society / Lawn Fogging</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Aapka Review *
                    </label>
                    <textarea
                      rows={4}
                      value={form.review}
                      onChange={(e) => setForm({ ...form, review: e.target.value })}
                      placeholder="e.g. NIPC team ne bohot safai se herbal gel lagaya. 3 din me sare cockroaches khatam ho gaye aur koi smell bhi nahi thi..."
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-[#0e7c6b]"
                    />
                  </div>

                  {formError && <p className="text-xs font-bold text-red-600">{formError}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0e7c6b] hover:bg-[#0b5f53] text-white py-3.5 text-sm font-black transition disabled:opacity-60 shadow-md"
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {submitting ? "Posting Review..." : "Submit Review"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
