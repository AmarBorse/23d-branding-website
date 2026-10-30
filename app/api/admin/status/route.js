import { storageReady, blobReady, kvGet, PROJECTS_KEY } from "@/lib/storage";
import { json } from "../_shared";

export const dynamic = "force-dynamic";

export async function GET() {
  let saved = false;
  if (storageReady) { try { const v = await kvGet(PROJECTS_KEY, { fresh: true }); saved = Array.isArray(v) && v.length > 0; } catch {} }
  return json({ storage: storageReady, images: blobReady, saved });
}
