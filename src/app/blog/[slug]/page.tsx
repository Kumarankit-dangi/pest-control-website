import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, CalendarDays, User, Phone } from "lucide-react";
import { BLOG_SEEDS, SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string | null;
  category: string;
  author: string;
  readMinutes: number;
  publishedAt: string;
};

async function getPost(slug: string): Promise<Post | null> {
  try {
    const { db } = await import("@/db");
    const { blogPosts } = await import("@/db/schema");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    if (rows.length > 0) {
      const p = rows[0];
      return {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt ?? "",
        content: p.content ?? "",
        imageUrl: p.imageUrl,
        category: p.category ?? "Pest Tips",
        author: p.author ?? "ShieldPro Team",
        readMinutes: p.readMinutes ?? 5,
        publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString().slice(0, 10) : "",
      };
    }
  } catch {}
  const seed = BLOG_SEEDS.find((b) => b.slug === slug);
  if (!seed) return null;
  return { ...seed };
}

async function getRelated(exclude: string): Promise<Post[]> {
  try {
    const { db } = await import("@/db");
    const { blogPosts } = await import("@/db/schema");
    const { desc, ne } = await import("drizzle-orm");
    const rows = await db.select().from(blogPosts).where(ne(blogPosts.slug, exclude)).orderBy(desc(blogPosts.publishedAt));
    if (rows.length > 0) {
      return rows.slice(0, 2).map((p) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt ?? "",
        content: p.content ?? "",
        imageUrl: p.imageUrl,
        category: p.category ?? "Pest Tips",
        author: p.author ?? "ShieldPro Team",
        readMinutes: p.readMinutes ?? 5,
        publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString().slice(0, 10) : "",
      }));
    }
  } catch {}
  return BLOG_SEEDS.filter((b) => b.slug !== exclude).slice(0, 2).map((b) => ({ ...b }));
}

function renderContent(content: string) {
  // Minimal markdown-ish: paragraphs + **bold** + numbered items stay as text
  return content.split(/\n\n+/).map((para, i) => {
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="mt-5 text-[16px] leading-[1.75] text-slate-700">
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={j} className="font-extrabold text-[#0c141d]">{part.slice(2, -2)}</strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </p>
    );
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: `${post.title} | ShieldPro Blog`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const related = await getRelated(slug);

  return (
    <>
      <article>
        <section className="bg-[#0c141d] text-white">
          <div className="mx-auto max-w-4xl px-4 pb-8 pt-8 sm:px-6 sm:pb-10">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-300 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-[12.5px] font-bold">
              <span className="rounded-full bg-[#0e7c6b] px-3 py-1 uppercase tracking-wide">{post.category}</span>
              <span className="flex items-center gap-1.5 text-slate-300"><User className="h-3.5 w-3.5" /> {post.author}</span>
              <span className="flex items-center gap-1.5 text-slate-300"><CalendarDays className="h-3.5 w-3.5" /> {post.publishedAt}</span>
              <span className="flex items-center gap-1.5 text-slate-300"><Clock3 className="h-3.5 w-3.5" /> {post.readMinutes} min read</span>
            </div>
            <h1 className="mt-4 text-[clamp(1.7rem,5vw,2.7rem)] font-semibold leading-[1.1] tracking-tight" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
              {post.title}
            </h1>
            <p className="mt-3 text-[15.5px] leading-relaxed text-slate-300">{post.excerpt}</p>
          </div>
        </section>

        {post.imageUrl && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.imageUrl} alt={post.title} className="-mt-0 aspect-[16/8] w-full rounded-b-2xl object-cover sm:rounded-2xl sm:rounded-t-none" />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
          {renderContent(post.content)}

          {/* Inline CTA */}
          <div className="mt-10 rounded-2xl bg-[#0c141d] p-6 text-white sm:p-8">
            <h2 className="text-xl font-extrabold tracking-tight">Dealing with this right now?</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
              Skip the guesswork — get a free inspection and a written plan from a licensed specialist today.
            </p>
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/quote" className="flex items-center justify-center gap-2 rounded-lg bg-[#0e7c6b] px-6 py-3 text-sm font-extrabold transition hover:bg-[#14947f]">
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-extrabold transition hover:bg-white/10">
                <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-extrabold tracking-tight">Keep reading</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg">
                    {r.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.imageUrl} alt={r.title} loading="lazy" className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105" />
                    )}
                    <div className="p-5">
                      <p className="text-[11.5px] font-extrabold uppercase tracking-wide text-[#0e7c6b]">{r.category}</p>
                      <h3 className="mt-1 line-clamp-2 font-extrabold leading-snug">{r.title}</h3>
                      <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-extrabold text-[#0e7c6b]">
                        Read More <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      <div className="h-[76px] md:hidden" aria-hidden />
    </>
  );
}
