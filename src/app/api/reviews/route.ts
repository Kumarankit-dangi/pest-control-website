import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { desc } from "drizzle-orm";
import { TESTIMONIALS } from "@/lib/site";

export async function GET() {
  try {
    const rows = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
    if (rows.length === 0) {
      // Seed default authentic reviews
      for (const t of TESTIMONIALS) {
        await db
          .insert(reviews)
          .values({
            name: t.name,
            location: t.location,
            service: t.service,
            rating: t.rating,
            review: t.quote,
            verified: true,
            dateStr: t.dateStr || "Verified Client",
            avatarBg: t.avatarBg || "#0e7c6b",
          })
          .onConflictDoNothing();
      }
      const seeded = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
      return NextResponse.json({ reviews: seeded });
    }
    return NextResponse.json({ reviews: rows });
  } catch (e) {
    console.error("reviews GET error", e);
    return NextResponse.json({
      reviews: TESTIMONIALS.map((t, idx) => ({
        id: idx + 1,
        name: t.name,
        location: t.location,
        service: t.service,
        rating: t.rating,
        review: t.quote,
        verified: true,
        dateStr: t.dateStr || "Verified Client",
        avatarBg: t.avatarBg || "#0e7c6b",
      })),
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const location = String(body.location ?? "").trim();
    const service = String(body.service ?? "").trim();
    const reviewText = String(body.review ?? "").trim();
    const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));

    if (name.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (location.length < 2) {
      return NextResponse.json({ error: "Please enter your city/locality (e.g. Rohini, Delhi)." }, { status: 400 });
    }
    if (reviewText.length < 10) {
      return NextResponse.json({ error: "Please write at least 10 characters in review." }, { status: 400 });
    }

    const colors = ["#0e7c6b", "#164e87", "#c98a1b", "#8b2fc9", "#c93b1b", "#0d5060"];
    const avatarBg = colors[Math.floor(Math.random() * colors.length)];

    const [inserted] = await db
      .insert(reviews)
      .values({
        name: name.slice(0, 150),
        location: location.slice(0, 150),
        service: (service || "General Pest Control").slice(0, 150),
        rating,
        review: reviewText.slice(0, 2000),
        verified: true,
        dateStr: "Just now",
        avatarBg,
      })
      .returning();

    return NextResponse.json({ ok: true, review: inserted }, { status: 201 });
  } catch (e) {
    console.error("reviews POST error", e);
    return NextResponse.json({ error: "Could not submit review." }, { status: 500 });
  }
}
