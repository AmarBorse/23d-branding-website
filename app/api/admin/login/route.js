import { cookies } from "next/headers";
import { COOKIE, checkPassword, sessionToken } from "@/lib/auth";
import { json } from "../_shared";

export async function POST(req) {
  if (!process.env.ADMIN_PASSWORD) return json({ error: "ADMIN_PASSWORD is not set yet (see the setup steps)." }, 500);
  const { password = "" } = await req.json().catch(() => ({}));
  await new Promise((r) => setTimeout(r, 400)); // slows down password guessing
  if (!(await checkPassword(String(password)))) return json({ error: "Wrong password." }, 401);
  cookies().set(COOKIE, await sessionToken(), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7,
  });
  return json({ ok: true });
}
