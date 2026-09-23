"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { X, Minus, Plus, ShoppingCart, Trash2, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export type CartItem = { slug: string; name: string; price: number; imageUrl?: string | null; qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
  const [contactError, setContactError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("nipc-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("nipc-cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.slug === item.slug);
      if (found) return prev.map((p) => (p.slug === item.slug ? { ...p, qty: Math.min(99, p.qty + qty) } : p));
      return [...prev, { ...item, qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string) => setItems((prev) => prev.filter((p) => p.slug !== slug)), []);
  const setQty = useCallback((slug: string, qty: number) => {
    if (qty <= 0) return setItems((prev) => prev.filter((p) => p.slug !== slug));
    setItems((prev) => prev.map((p) => (p.slug === slug ? { ...p, qty: Math.min(99, qty) } : p)));
  }, []);
  const clear = useCallback(() => setItems([]), []);

  const { count, subtotal } = useMemo(() => {
    return {
      count: items.reduce((a, b) => a + b.qty, 0),
      subtotal: items.reduce((a, b) => a + b.qty * b.price, 0),
    };
  }, [items]);

  async function checkout() {
    setContactError("");
    if (items.length === 0) return;
    if (contact.name.trim().length < 2) return setContactError("Please enter your name.");
    if (contact.phone.replace(/\D/g, "").length < 10) return setContactError("Enter a valid 10-digit phone number.");
    setCheckoutState("sending");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name.trim(),
          email: contact.email.trim() || `${contact.phone.trim()}@nipcservices.com`,
          phone: contact.phone.trim(),
          address: contact.address.trim(),
          serviceType: "Product Order Delivery",
          notes: `Items: ${items.map((i) => `${i.qty}x ${i.name} (₹${i.price})`).join("; ")} | Total: ₹${subtotal}`,
          cart: items,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setCheckoutState("done");
      setItems([]);
    } catch {
      setCheckoutState("error");
    }
  }

  const whatsappOrderText = encodeURIComponent(
    `Hi Veerpal ji (NIPC SERVICES), I want to order the following products:\n${items
      .map((i) => `• ${i.qty}x ${i.name} - ₹${i.price * i.qty}`)
      .join("\n")}\n\nTotal: ₹${subtotal}\nDeliver to: ${contact.name ? contact.name + ", " : ""}${contact.address || "Rudrapur / Pilibhit / Delhi NCR"}`
  );

  return (
    <CartContext.Provider value={{ items, count, subtotal, isOpen, setOpen, add, remove, setQty, clear }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[78]" role="dialog" aria-modal="true" aria-label="Shopping Cart">
          <button
            aria-label="Close cart"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[#0c141d]/60 backdrop-blur-sm"
          />
          <aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            style={{ animation: "slide-in-right 0.28s ease-out" }}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="flex items-center gap-2 text-lg font-black tracking-tight">
                <ShoppingCart className="h-5 w-5 text-[#0e7c6b]" /> NIPC Cart
                <span className="rounded-full bg-[#0e7c6b] px-2.5 py-0.5 text-xs font-bold text-white">
                  {count}
                </span>
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {checkoutState === "done" ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <CheckCircle2 className="h-16 w-16 text-emerald-500" />
                <h4 className="mt-4 text-2xl font-black">Order Placed with Veerpal!</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Thanks {contact.name.split(" ")[0]}! We will deliver your products with cash on delivery / UPI across Rudrapur, Pilibhit & Delhi NCR.
                </p>

                <a
                  href={`https://wa.me/919639232701?text=${whatsappOrderText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-black text-white hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-4.5 w-4.5 fill-white" /> Confirm on WhatsApp (9639232701)
                </a>

                <button
                  onClick={() => {
                    setOpen(false);
                    setCheckoutState("idle");
                  }}
                  className="mt-3 w-full rounded-xl bg-[#0c141d] px-5 py-3 text-sm font-black text-white"
                >
                  Continue Browsing
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <ShoppingCart className="h-12 w-12 text-slate-300" />
                <h4 className="mt-4 text-lg font-black">Your Cart is Empty</h4>
                <p className="mt-1 text-sm text-slate-500">
                  Add NIPC cockroach herbal gel, termite chemicals or rat glue traps.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-5 rounded-xl bg-[#0e7c6b] px-6 py-3 text-sm font-black text-white hover:bg-[#0b5f53]"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="space-y-3.5">
                    {items.map((item) => (
                      <li key={item.slug} className="flex gap-3.5 rounded-2xl border border-slate-200/80 p-3 bg-slate-50/50">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white border border-slate-200">
                          {item.imageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-black text-slate-900">{item.name}</p>
                          <p className="mt-0.5 text-sm font-black text-[#0e7c6b]">₹{item.price}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setQty(item.slug, item.qty - 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-5 text-center text-xs font-black">{item.qty}</span>
                              <button
                                onClick={() => setQty(item.slug, item.qty + 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => remove(item.slug)}
                              className="text-slate-400 hover:text-red-600 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-200 p-5 bg-white space-y-3">
                  <div className="space-y-2">
                    <input
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      placeholder="Your Name *"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs sm:text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        placeholder="Phone / WhatsApp *"
                        type="tel"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs sm:text-sm"
                      />
                      <input
                        value={contact.address}
                        onChange={(e) => setContact({ ...contact, address: e.target.value })}
                        placeholder="Delivery Address / City"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {contactError && <p className="text-xs font-bold text-red-600">{contactError}</p>}

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-600">Total Amount:</span>
                    <span className="text-xl font-black text-slate-900">₹{subtotal}</span>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Fast delivery across Rudrapur, Pilibhit, Bareilly & Delhi NCR • COD available
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={checkout}
                      disabled={checkoutState === "sending"}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0e7c6b] py-3 text-xs sm:text-sm font-black text-white hover:bg-[#0b5f53] disabled:opacity-60"
                    >
                      {checkoutState === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
                      {checkoutState === "sending" ? "Ordering..." : `Order (₹${subtotal})`}
                    </button>

                    <a
                      href={`https://wa.me/919639232701?text=${whatsappOrderText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-3 text-xs sm:text-sm font-black text-white hover:bg-[#20bd5a]"
                    >
                      <MessageCircle className="h-4 w-4 fill-white" /> WhatsApp
                    </a>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </CartContext.Provider>
  );
}
