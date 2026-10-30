import { cookies } from "next/headers";
import { COOKIE } from "@/lib/auth";
import { json } from "../_shared";

export async function POST() {
  cookies().delete(COOKIE);
  return json({ ok: true });
}
