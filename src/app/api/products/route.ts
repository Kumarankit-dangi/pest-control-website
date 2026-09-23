import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { PRODUCT_SEEDS } from "@/lib/site";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 200);
}

export async function GET() {
  try {
    const rows = await db.select().from(products).orderBy(desc(products.createdAt));

    const hasLatest = rows.some((r) => r.slug.includes("lizard") || r.slug.includes("cockroach"));
    if (rows.length === 0 || !hasLatest) {
      for (const s of PRODUCT_SEEDS) {
        await db
          .insert(products)
          .values({
            name: s.name,
            slug: s.slug,
            category: s.category,
            description: s.description,
            price: String(s.price),
            compareAtPrice: s.compareAtPrice ? String(s.compareAtPrice) : null,
            imageUrl: s.imageUrl,
            badge: s.badge ?? null,
            rating: String(s.rating),
            reviewsCount: s.reviewsCount,
            stock: s.stock,
            isActive: true,
          })
          .onConflictDoNothing();
      }
      const seeded = await db.select().from(products).orderBy(desc(products.createdAt));
      return NextResponse.json({ products: seeded });
    }
    return NextResponse.json({ products: rows });
  } catch (e) {
    console.error("products GET error", e);
    return NextResponse.json(
      {
        products: PRODUCT_SEEDS.map((s, i) => ({
          id: i + 1,
          ...s,
          price: String(s.price),
          compareAtPrice: s.compareAtPrice ? String(s.compareAtPrice) : null,
          rating: String(s.rating),
        })),
      },
      { status: 200 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const price = Number(body.price);
    if (name.length < 3) return NextResponse.json({ error: "Name must be at least 3 characters." }, { status: 400 });
    if (!(price > 0)) return NextResponse.json({ error: "Price must be greater than ₹0." }, { status: 400 });

    let slug = slugify(name);
    const existing = await db.select().from(products).where(eq(products.slug, slug));
    if (existing.length > 0) slug = `${slug}-${Date.now().toString(36)}`;

    const [row] = await db
      .insert(products)
      .values({
        name,
        slug,
        category: String(body.category ?? "General").slice(0, 100),
        description: String(body.description ?? "").slice(0, 2000),
        price: String(price),
        imageUrl: body.imageUrl ? String(body.imageUrl).slice(0, 2000) : null,
        badge: body.badge ? String(body.badge).slice(0, 60) : null,
        stock: Number.isFinite(Number(body.stock)) ? Number(body.stock) : 50,
        rating: "4.8",
        reviewsCount: 0,
        isActive: true,
      })
      .returning();
    return NextResponse.json({ product: row }, { status: 201 });
  } catch (e) {
    console.error("products POST error", e);
    return NextResponse.json({ error: "Could not add product." }, { status: 500 });
  }
}
