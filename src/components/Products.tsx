"use client";

import { useEffect, useMemo, useState } from "react";
import { ShoppingCart, Plus, Upload, Star, Search, X, Loader2, CheckCircle2, Eye, Minus, MessageCircle } from "lucide-react";
import { PRODUCT_SEEDS, SITE } from "@/lib/site";
import { Reveal, SectionHeading } from "./Reveal";
import { useCart } from "./CartDrawer";

type Product = {
  id?: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  imageUrl?: string | null;
  badge?: string | null;
  rating: number;
  reviewsCount: number;
  stock: number;
};

function toProduct(seeds: typeof PRODUCT_SEEDS): Product[] {
  return seeds.map((s) => ({
    name: s.name,
    slug: s.slug,
    category: s.category,
    description: s.description,
    price: s.price,
    compareAtPrice: s.compareAtPrice ?? null,
    imageUrl: s.imageUrl,
    badge: s.badge ?? null,
    rating: s.rating,
    reviewsCount: s.reviewsCount,
    stock: s.stock,
  }));
}

export function Products() {
  const { add, setOpen: setCartOpen, count } = useCart();
  const [products, setProducts] = useState<Product[]>(() => toProduct(PRODUCT_SEEDS));
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "Baits",
    price: "",
    description: "",
    imageUrl: "",
    badge: "",
    stock: "50",
  });
  const [formError, setFormError] = useState("");
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.products) && data.products.length > 0) {
          setProducts(
            data.products.map((p: Record<string, unknown>) => ({
              id: p.id as number,
              name: String(p.name),
              slug: String(p.slug),
              category: String(p.category ?? "General"),
              description: String(p.description ?? ""),
              price: Number(p.price ?? 0),
              compareAtPrice: p.compareAtPrice != null ? Number(p.compareAtPrice) : null,
              imageUrl: (p.imageUrl as string) ?? null,
              badge: (p.badge as string) ?? null,
              rating: Number(p.rating ?? 4.8),
              reviewsCount: Number(p.reviewsCount ?? 0),
              stock: Number(p.stock ?? 25),
            }))
          );
        }
      }
    } catch {
      /* fallback to seeds */
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (query.trim() === "" ||
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()))
    );
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, query, sort]);

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (form.name.trim().length < 3) return setFormError("Product name must be at least 3 characters.");
    if (!(Number(form.price) > 0)) return setFormError("Enter a valid price greater than ₹0.");
    setSaving(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          category: form.category.trim() || "General",
          price: Number(form.price),
          description: form.description.trim() || "Professional-grade product from NIPC Services.",
          imageUrl: form.imageUrl.trim() || null,
          badge: form.badge.trim() || null,
          stock: Number(form.stock) || 50,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string }).error || "Failed to add product");
      }
      setShowAdd(false);
      setForm({ name: "", category: "Baits", price: "", description: "", imageUrl: "", badge: "", stock: "50" });
      setNotice("Product added to the NIPC shop.");
      await load();
      setTimeout(() => setNotice(""), 3500);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not add product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleImport(e: React.FormEvent) {
    e.preventDefault();
    setImportError("");
    if (importText.trim().length < 10) return setImportError("Paste CSV rows or JSON array first.");
    setSaving(true);
    try {
      const res = await fetch("/api/products/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: importText }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((d as { error?: string }).error || "Import failed");
      setShowImport(false);
      setImportText("");
      setNotice(`${(d as { imported?: number }).imported ?? 0} product(s) imported.`);
      await load();
      setTimeout(() => setNotice(""), 4000);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Import failed.");
    } finally {
      setSaving(false);
    }
  }

  function openQuick(p: Product) {
    setQuickView(p);
    setQty(1);
  }

  return (
    <section id="products" className="bg-white py-14 sm:py-20" aria-label="NIPC Pro-Grade Products Shop">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="NIPC Pro Shop"
              title="Herbal Baits, Traps & Chemicals"
              description="Order pro-grade odorless herbal gels, rat glue boards and termite concentrates used by NIPC technicians with same-day delivery."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-[13px] font-black text-[#0c141d] hover:bg-slate-50 transition"
              >
                <Plus className="h-4 w-4" /> Add Product
              </button>
              <button
                onClick={() => setShowImport(true)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-[13px] font-black text-[#0c141d] hover:bg-slate-50 transition"
              >
                <Upload className="h-4 w-4" /> Import CSV/JSON
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#0c141d] px-4 py-2.5 text-[13px] font-black text-white hover:bg-[#1f3245] transition"
              >
                <ShoppingCart className="h-4 w-4" /> Cart ({count})
              </button>
            </div>
          </Reveal>
        </div>

        {notice && (
          <p className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {notice}
          </p>
        )}

        {/* Toolbar */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search herbal gel, termite chemicals, glue traps…"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium outline-none placeholder:text-slate-400 focus:border-[#0e7c6b]"
            />
          </label>
          <div className="flex gap-2.5">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold outline-none focus:border-[#0e7c6b] sm:flex-none"
              aria-label="Filter by category"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold outline-none focus:border-[#0e7c6b] sm:flex-none"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="aspect-[4/3] bg-slate-100" />
                <div className="space-y-2.5 p-5">
                  <div className="h-4 w-3/4 rounded bg-slate-100" />
                  <div className="h-3 w-full rounded bg-slate-100" />
                  <div className="h-9 w-full rounded-lg bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
            <p className="text-lg font-black">No products found</p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-4 rounded-xl bg-[#0c141d] px-5 py-2.5 text-sm font-bold text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 60}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <button
                    onClick={() => openQuick(p)}
                    className="relative block w-full text-left"
                    aria-label={`View details of ${p.name}`}
                  >
                    <div className="overflow-hidden bg-slate-50">
                      {p.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          loading="lazy"
                          className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex aspect-[16/10] w-full items-center justify-center bg-slate-100 text-sm font-bold text-slate-400">
                          NIPC Product
                        </div>
                      )}
                    </div>

                    {p.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#0c141d] px-2.5 py-1 text-[11px] font-black uppercase text-white">
                        {p.badge}
                      </span>
                    )}

                    {p.compareAtPrice && p.compareAtPrice > p.price && (
                      <span className="absolute right-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-black text-white shadow">
                        Save ₹{p.compareAtPrice - p.price}
                      </span>
                    )}
                  </button>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-black uppercase tracking-wider text-[#0e7c6b]">
                      {p.category}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-[15px] font-black leading-snug text-slate-900">
                      {p.name}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-[12.5px] font-bold text-slate-600">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {p.rating.toFixed(1)}
                      <span className="font-medium text-slate-400">({p.reviewsCount} reviews)</span>
                      <span className="ml-auto font-bold text-emerald-700">In Stock</span>
                    </p>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-950">₹{p.price}</span>
                      {p.compareAtPrice && p.compareAtPrice > p.price && (
                        <span className="text-sm font-semibold text-slate-400 line-through">
                          ₹{p.compareAtPrice}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => add({ slug: p.slug, name: p.name, price: p.price, imageUrl: p.imageUrl })}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0e7c6b] px-3 py-2.5 text-xs font-black text-white hover:bg-[#0b5f53] transition"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
                      </button>

                      <a
                        href={`https://wa.me/919639232701?text=Hi%20NIPC%20Services,%20I%20want%20to%20order%20${encodeURIComponent(
                          p.name
                        )}%20(Price:%20₹${p.price}).%20Please%20deliver.`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1 rounded-xl bg-[#25D366] px-3 py-2.5 text-xs font-black text-white hover:bg-[#20bd5a] transition"
                      >
                        <MessageCircle className="h-3.5 w-3.5 fill-white" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Quick view modal */}
      {quickView && (
        <div
          className="fixed inset-0 z-[85] flex items-end justify-center sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Close"
            onClick={() => setQuickView(null)}
            className="absolute inset-0 bg-[#0c141d]/75 backdrop-blur-sm"
          />
          <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white sm:rounded-3xl p-6">
            <button
              onClick={() => setQuickView(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-hidden rounded-2xl bg-slate-50">
              {quickView.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={quickView.imageUrl} alt={quickView.name} className="h-52 w-full object-cover" />
              )}
            </div>

            <div className="mt-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#0e7c6b]">
                {quickView.category}
              </span>
              <h3 className="text-xl font-black">{quickView.name}</h3>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-950">₹{quickView.price}</span>
                {quickView.compareAtPrice && (
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    ₹{quickView.compareAtPrice}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{quickView.description}</p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1 hover:bg-slate-100 rounded">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-black px-2">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-1 hover:bg-slate-100 rounded">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    add(
                      {
                        slug: quickView.slug,
                        name: quickView.name,
                        price: quickView.price,
                        imageUrl: quickView.imageUrl,
                      },
                      qty
                    );
                    setQuickView(null);
                  }}
                  className="flex-1 rounded-xl bg-[#0e7c6b] py-3 text-sm font-black text-white hover:bg-[#0b5f53]"
                >
                  Add {qty} to Cart • ₹{quickView.price * qty}
                </button>
              </div>

              <a
                href={`https://wa.me/919639232701?text=Hi%20NIPC%20Services,%20I%20want%20to%20order%20${encodeURIComponent(
                  quickView.name
                )}%20(Qty:%20${qty}).`}
                target="_blank"
                rel="noreferrer"
                className="mt-2.5 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-black text-white hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                Quick Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-[85] flex items-end justify-center sm:items-center sm:p-4">
          <button onClick={() => setShowAdd(false)} className="absolute inset-0 bg-[#0c141d]/70 backdrop-blur-sm" />
          <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl">
            <button onClick={() => setShowAdd(false)} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-black">Add Product to NIPC Shop</h3>
            <p className="mt-1 text-xs text-slate-500">Add new herbal baits or pest equipment to your live catalog.</p>

            <form onSubmit={handleAddProduct} className="mt-4 space-y-3" noValidate>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. NIPC Ant Colony Killer Gel"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Baits / Chemicals"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="399"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Application directions and effectiveness..."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                />
              </div>

              {formError && <p className="text-xs font-bold text-red-600">{formError}</p>}

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-[#0c141d] py-3 text-sm font-black text-white hover:bg-[#162636]"
              >
                {saving ? "Adding..." : "Add to Live Shop"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 z-[85] flex items-end justify-center sm:items-center sm:p-4">
          <button onClick={() => setShowImport(false)} className="absolute inset-0 bg-[#0c141d]/70 backdrop-blur-sm" />
          <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl">
            <button onClick={() => setShowImport(false)} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-black">Import Products (CSV / JSON)</h3>
            <p className="mt-1 text-xs text-slate-500">Paste bulk inventory in CSV or JSON format.</p>

            <form onSubmit={handleImport} className="mt-4 space-y-3">
              <textarea
                rows={6}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder={'"NIPC Termite Gel", "Baits", 499, "Odorless formula", 100'}
                className="w-full rounded-xl border border-slate-200 p-3 font-mono text-xs"
              />
              {importError && <p className="text-xs font-bold text-red-600">{importError}</p>}

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-[#0e7c6b] py-3 text-sm font-black text-white hover:bg-[#0b5f53]"
              >
                {saving ? "Importing..." : "Run Import"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
