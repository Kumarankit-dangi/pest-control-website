import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 200);
}

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      out.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur.trim());
  return out;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const raw = String(body.data ?? "").trim();
    if (!raw) return NextResponse.json({ error: "Nothing to import." }, { status: 400 });

    type Item = { name: string; category?: string; price: number; description?: string; stock?: number; imageUrl?: string; badge?: string };
    let items: Item[] = [];

    if (raw.startsWith("[")) {
      const arr = JSON.parse(raw) as Array<Record<string, unknown>>;
      if (!Array.isArray(arr)) throw new Error("bad json");
      items = arr.map((o) => ({
        name: String(o.name ?? "").trim(),
        category: String(o.category ?? "General"),
        price: Number(o.price),
        description: String(o.description ?? ""),
        stock: Number(o.stock ?? 25),
        imageUrl: o.imageUrl ? String(o.imageUrl) : undefined,
        badge: o.badge ? String(o.badge) : undefined,
      }));
    } else {
      const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      // skip header if it looks like one
      const startIdx = /^name\s*,/i.test(lines[0] ?? "") ? 1 : 0;
      for (let i = startIdx; i < lines.length; i++) {
        const cols = parseCsvLine(lines[i]);
        if (cols.length < 2) continue;
        const [name, category, priceStr, description, stockStr, imageUrl, badge] = cols;
        items.push({
          name: (name ?? "").trim(),
          category: (category ?? "General").trim() || "General",
          price: Number(priceStr),
          description: (description ?? "").trim(),
          stock: stockStr ? Number(stockStr) : 25,
          imageUrl: imageUrl?.trim() || undefined,
          badge: badge?.trim() || undefined,
        });
      }
    }

    items = items.filter((it) => it.name.length >= 3 && it.price > 0);
    if (items.length === 0) {
      return NextResponse.json(
        { error: "No valid rows found. Each row needs: name (3+ chars), category, price (>0). Example: \"Ant Gel\", \"Baits\", 19.95, \"…\", 40" },
        { status: 400 }
      );
    }
    if (items.length > 100) return NextResponse.json({ error: "Max 100 products per import." }, { status: 400 });

    let imported = 0;
    for (const it of items.slice(0, 100)) {
      const slug = `${slugify(it.name)}-${Date.now().toString(36)}-${imported}`;
      try {
        await db.insert(products).values({
          name: it.name.slice(0, 200),
          slug: slug.slice(0, 220),
          category: (it.category || "General").slice(0, 100),
          description: (it.description || "").slice(0, 2000),
          price: String(it.price),
          imageUrl: it.imageUrl?.slice(0, 2000) ?? null,
          badge: it.badge?.slice(0, 60) ?? null,
          stock: Number.isFinite(it.stock) ? Number(it.stock) : 25,
          rating: "4.8",
          reviewsCount: 0,
          isActive: true,
        });
        imported++;
      } catch {
        // skip duplicates
      }
    }
    return NextResponse.json({ imported });
  } catch (e) {
    console.error("import error", e);
    return NextResponse.json({ error: "Import failed. Check CSV/JSON format and try again." }, { status: 500 });
  }
}
