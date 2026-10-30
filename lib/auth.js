// Admin login: one password (env ADMIN_PASSWORD). After logging in, a signed cookie keeps you in.
// Works in middleware (Edge) and in API routes (Node) — uses the Web Crypto API.
export const COOKIE = "23d_admin";

async function hmac(message) {
  const secret = (process.env.ADMIN_SECRET || "") + (process.env.ADMIN_PASSWORD || "");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a = "", b = "") {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function sessionToken() { return hmac("23d-admin-session-v1"); }

export async function isValidSession(value) {
  if (!process.env.ADMIN_PASSWORD || !value) return false;
  return safeEqual(value, await sessionToken());
}

export async function checkPassword(input) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  return safeEqual(await hmac(`pw:${input}`), await hmac(`pw:${real}`));
}
