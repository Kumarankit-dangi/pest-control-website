import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { BLOG_SEEDS } from "@/lib/site";

export async function GET() {
  try {
    const rows = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
    const hasNipc = rows.some((r) => r.slug.includes("wardrobes") || r.slug.includes("cockroaches"));

    if (rows.length === 0 || !hasNipc) {
      for (const b of BLOG_SEEDS) {
        await db
          .insert(blogPosts)
          .values({
            title: b.title,
            slug: b.slug,
            excerpt: b.excerpt,
            content: b.content,
            imageUrl: b.imageUrl,
            category: b.category,
            author: b.author,
            readMinutes: b.readMinutes,
            publishedAt: new Date(b.publishedAt),
          })
          .onConflictDoNothing();
      }
      const seeded = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
      return NextResponse.json({ posts: seeded });
    }
    return NextResponse.json({ posts: rows });
  } catch (e) {
    console.error("blog GET error", e);
    return NextResponse.json({
      posts: BLOG_SEEDS.map((b, i) => ({ id: i + 1, ...b, publishedAt: b.publishedAt })),
    });
  }
}
