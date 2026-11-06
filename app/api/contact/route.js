import { NextResponse } from "next/server";
import { storageReady } from "@/lib/storage";
import { addEnquiry } from "@/lib/enquiries";

// Receives the Contact page form and saves it for the admin panel ("Enquiries" tab).
const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const recent = new Map(); // simple flood protection (per server instance)

export async function POST(req) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // bots: the hidden "website" field is filled, or the form was sent impossibly fast
  if (str(body.website, 200) || (Number(body.elapsed) || 0) < 2500) return NextResponse.json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (hits.length >= 5) return NextResponse.json({ error: "Too many messages. Please try again a little later or email us directly." }, { status: 429 });
  recent.set(ip, [...hits, now]);

  const e = {
    id: `e${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    name: str(body.name, 100),
    email: str(body.email, 150),
    phone: str(body.phone, 30),
    company: str(body.company, 120),
    needs: Array.isArray(body.needs) ? body.needs.map((n) => str(n, 40)).filter(Boolean).slice(0, 10) : [],
    message: str(body.message, 5000),
    createdAt: new Date(now).toISOString(),
    status: "new",
  };
  if (!e.name || !/^\S+@\S+\.\S+$/.test(e.email) || e.message.length < 10) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a short message." }, { status: 400 });
  }
  if (!storageReady) return NextResponse.json({ fallback: true }, { status: 503 });
  try {
    await addEnquiry(e);
  } catch (err) {
    console.error("Could not save enquiry", err);
    return NextResponse.json({ fallback: true }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
