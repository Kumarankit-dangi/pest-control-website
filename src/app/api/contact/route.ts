import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = body.phone ? String(body.phone).trim().slice(0, 40) : null;
    const subject = body.subject ? String(body.subject).slice(0, 200) : "General question";
    const message = String(body.message ?? "").trim();

    if (name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    if (message.length < 10)
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });

    await db.insert(contactMessages).values({ name: name.slice(0, 150), email: email.slice(0, 255), phone, subject, message });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact error", e);
    return NextResponse.json({ error: "Could not send message. Please call us instead." }, { status: 500 });
  }
}
