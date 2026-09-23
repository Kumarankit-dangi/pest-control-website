import { NextResponse } from "next/server";
import { db } from "@/db";
import { quoteRequests } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();

    if (name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    if (phone.replace(/\D/g, "").length < 7)
      return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });

    await db.insert(quoteRequests).values({
      name: name.slice(0, 150),
      email: email.slice(0, 255),
      phone: phone.slice(0, 40),
      address: body.address ? String(body.address).slice(0, 300) : null,
      pestType: body.pestType ? String(body.pestType).slice(0, 120) : null,
      serviceType: body.serviceType ? String(body.serviceType).slice(0, 120) : null,
      preferredDate: body.preferredDate ? String(body.preferredDate).slice(0, 60) : null,
      notes: body.notes ? String(body.notes).slice(0, 2000) : null,
      promoCode: body.promoCode ? String(body.promoCode).slice(0, 60) : null,
      cart: body.cart ?? null,
      status: "new",
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("quotes error", e);
    return NextResponse.json({ error: "Could not submit request." }, { status: 500 });
  }
}
