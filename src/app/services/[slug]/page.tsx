import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone, ArrowLeft, Clock3, BadgeDollarSign, ShieldCheck, MessageCircle } from "lucide-react";
import { SERVICES, SITE } from "@/lib/site";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Reveal } from "@/components/Reveal";
import { ServiceCta } from "@/components/ServiceCta";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.name} — ${SITE.fullName} | Call Veerpal ${SITE.phone}`,
    description: s.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Breadcrumb hero */}
      <section className="bg-[#0c141d] text-white">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10">
          <Link
            href="/#services"
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>

          <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0e7c6b] px-3.5 py-1.5 text-[12px] font-black uppercase tracking-wider">
                <ServiceIcon icon={service.icon} className="h-4 w-4" /> {service.name}
              </span>
              <h1
                className="mt-4 text-[clamp(1.9rem,5.5vw,3rem)] font-black leading-[1.06] tracking-tight"
                style={{ fontFamily: "Fraunces, Georgia, serif" }}
              >
                {service.name}
              </h1>
              <p className="mt-3 max-w-xl text-[15.5px] font-bold text-emerald-300">{service.short}</p>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate-300">
                {service.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <span className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-[13px] font-bold">
                  <BadgeDollarSign className="h-4 w-4 text-emerald-400" /> Starts ₹{service.priceFrom}
                </span>
                <span className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-[13px] font-bold">
                  <Clock3 className="h-4 w-4 text-emerald-400" /> {service.duration}
                </span>
                <span className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-[13px] font-bold">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" /> Written Warranty
                </span>
              </div>

              <ServiceCta service={service.name} />
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={service.image} alt={service.name} className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div>
              <h2 className="text-2xl font-black tracking-tight">How NIPC SERVICES Treats This Infestation</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">{service.longDescription}</p>

              <h3 className="mt-8 text-lg font-black">Treatment Highlights</h3>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 rounded-xl bg-slate-50 px-3.5 py-3 text-sm font-bold text-[#0c141d]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#0e7c6b]" /> {f}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-lg font-black">Targeted Insects / Pests</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.pests.map((p) => (
                  <span
                    key={p}
                    className="rounded-full bg-[#eef8f5] px-3.5 py-1.5 text-[13px] font-bold text-[#0b5f53]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <aside className="h-fit rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-black">Book {service.name}</h3>
              <p className="mt-1 text-xs text-slate-600">
                Starting at ₹{service.priceFrom} • Free Site Inspection by Veerpal
              </p>

              <ServiceCta service={service.name} compact />

              <a
                href={SITE.phoneHref}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black transition hover:bg-slate-50"
              >
                <Phone className="h-4 w-4 text-[#0e7c6b]" /> Call Veerpal: {SITE.phone}
              </a>

              <ul className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-600">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0e7c6b]" /> Technician arrives in 2 hours
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0e7c6b]" /> 100% Odorless herbal chemical
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0e7c6b]" /> Written warranty card provided
                </li>
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-[#f2f5f8] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">Other Specialized Treatments</h2>
            <Link
              href="/#services"
              className="text-sm font-black text-[#0e7c6b] hover:underline"
            >
              View all services →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={o.image}
                    alt={o.name}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[12px] font-black uppercase text-[#0e7c6b]">Starts ₹{o.priceFrom}</p>
                  <h3 className="mt-1 font-black">{o.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-600">{o.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="h-[76px] bg-[#f2f5f8] md:hidden" aria-hidden />
    </>
  );
}
