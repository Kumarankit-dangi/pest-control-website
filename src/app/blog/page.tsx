import Link from "next/link";
import { ArrowRight, Clock3, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pest Control Blog — Tips & Guides | ShieldPro Pest Control",
  description: "Practical pest identification, prevention and treatment guides from licensed ShieldPro specialists.",
};

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  imageUrl?: string | null;
  category: string;
  author: string;
  readMinutes: number;
  publishedAt: string;
};

async function getPosts(): Promise<Post[]> {
  try {
    const { db } = await import("@/db");
    const { blogPosts } = await import("@/db/schema");
    const { desc } = await import("drizzle-orm");
    const rows = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
    if (rows.length > 0) {
      return rows.map((p) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt ?? "",
        imageUrl: p.imageUrl,
        category: p.category ?? "Pest Tips",
        author: p.author ?? "ShieldPro Team",
        readMinutes: p.readMinutes ?? 5,
        publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString().slice(0, 10) : "",
      }));
    }
  } catch {}
  const { BLOG_SEEDS } = await import("@/lib/site");
  return BLOG_SEEDS.map((b) => ({
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    imageUrl: b.imageUrl,
    category: b.category,
    author: b.author,
    readMinutes: b.readMinutes,
    publishedAt: b.publishedAt,
  }));
}

export default async function BlogIndex() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="bg-[#0c141d] text-white">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-14">
          <Link href="/#blog" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-300 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-teal-300">My Blog · Pest library</p>
          <h1 className="mt-2 max-w-2xl text-[clamp(1.9rem,5.5vw,3rem)] font-semibold leading-[1.06] tracking-tight" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
            Pest guides worth bookmarking
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
            Written by licensed specialists and reviewed by our staff entomologist. No scare tactics — just what works.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-[0_16px_40px_rgba(12,20,29,0.12)] md:grid-cols-2"
            >
              <div className="overflow-hidden">
                {featured.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featured.imageUrl} alt={featured.title} className="aspect-[16/10] h-full w-full object-cover transition duration-500 group-hover:scale-105 md:aspect-auto md:min-h-72" />
                )}
              </div>
              <div className="p-6 sm:p-8">
                <span className="rounded-full bg-[#eef8f5] px-3 py-1 text-[11.5px] font-extrabold uppercase tracking-wide text-[#0b5f53]">
                  Featured · {featured.category}
                </span>
                <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight transition group-hover:text-[#0e7c6b] sm:text-[28px]">
                  {featured.title}
                </h2>
                <p className="mt-2.5 line-clamp-3 text-[15px] leading-relaxed text-slate-600">{featured.excerpt}</p>
                <p className="mt-4 flex items-center gap-2 text-[13px] font-bold text-slate-500">
                  {featured.author} · {featured.publishedAt} · <Clock3 className="h-3.5 w-3.5" /> {featured.readMinutes} min
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#0e7c6b]">
                  Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(12,20,29,0.12)]"
              >
                <div className="relative overflow-hidden">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageUrl} alt={p.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="aspect-[16/10] w-full bg-slate-200" />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11.5px] font-extrabold uppercase tracking-wide text-[#0b5f53] shadow-sm">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="line-clamp-2 text-[17px] font-extrabold leading-snug transition group-hover:text-[#0e7c6b]">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-[12.5px] font-bold text-slate-500">
                    <span>{p.author}</span>
                    <span className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> {p.readMinutes} min</span>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-extrabold text-[#0e7c6b]">
                    Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="h-[76px] md:hidden" aria-hidden />
    </>
  );
}
