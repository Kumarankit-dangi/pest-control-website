"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { BLOG_SEEDS } from "@/lib/site";
import { Reveal, SectionHeading } from "./Reveal";

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

export function BlogSection() {
  const [posts, setPosts] = useState<Post[]>(
    BLOG_SEEDS.slice(0, 3).map((b) => ({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      imageUrl: b.imageUrl,
      category: b.category,
      author: b.author,
      readMinutes: b.readMinutes,
      publishedAt: b.publishedAt,
    }))
  );

  useEffect(() => {
    fetch("/api/blog", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && Array.isArray(d.posts) && d.posts.length > 0) {
          setPosts(
            d.posts.slice(0, 3).map((p: Record<string, unknown>) => ({
              title: String(p.title),
              slug: String(p.slug),
              excerpt: String(p.excerpt ?? ""),
              imageUrl: (p.imageUrl as string) ?? null,
              category: String(p.category ?? "Pest Tips"),
              author: String(p.author ?? "ShieldPro Team"),
              readMinutes: Number(p.readMinutes ?? 5),
              publishedAt: String(p.publishedAt ?? "").slice(0, 10),
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="blog" className="bg-[#f2f5f8] py-14 sm:py-20" aria-label="Pest control blog">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="My Blog · Pest library"
              title="Practical advice from licensed pros"
              description="Identification guides, prevention checklists and honest treatment explainers — written by the team that does the work."
            />
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/blog"
              className="group flex w-fit items-center gap-2 rounded-lg border border-[#0c141d] px-5 py-3 text-sm font-extrabold text-[#0c141d] transition hover:bg-[#0c141d] hover:text-white"
            >
              View all articles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(12,20,29,0.12)]"
              >
                <div className="relative overflow-hidden">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageUrl} alt={p.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
                  ) : (
                    <div className="aspect-[16/10] w-full bg-slate-200" />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11.5px] font-extrabold uppercase tracking-wide text-[#0b5f53] shadow-sm">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="line-clamp-2 text-[17px] font-extrabold leading-snug tracking-tight transition group-hover:text-[#0e7c6b]">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-[12.5px] font-bold text-slate-500">
                    <span>{p.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5" /> {p.readMinutes} min read
                    </span>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-extrabold text-[#0e7c6b]">
                    Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
