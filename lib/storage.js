// Where the admin panel saves things.
//  • Project data   -> Upstash Redis  (env: KV_REST_API_URL + KV_REST_API_TOKEN,
//                                      or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
//  • Uploaded images -> Vercel Blob   (env: BLOB_READ_WRITE_TOKEN)
// Both are added from the Vercel dashboard (Storage tab); Vercel fills in the env values.
// Without them the site simply shows the projects from the content/ files.
const url = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").replace(/\/$/, "");
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const storageReady = !!(url && token);
export const blobReady = !!process.env.BLOB_READ_WRITE_TOKEN;
export const PROJECTS_KEY = "23d:projects";
export const PROJECTS_TAG = "projects";

// Read a saved value. Website pages keep it cached (cleared whenever the admin saves);
// the admin panel always asks for the latest (`fresh`).
export async function kvGet(key, { fresh = false } = {}) {
  if (!storageReady) return null;
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
    ...(fresh ? { cache: "no-store" } : { next: { tags: [PROJECTS_TAG], revalidate: 600 } }),
  });
  if (!res.ok) throw new Error(`Storage read failed (${res.status})`);
  const { result } = await res.json();
  if (result == null) return null;
  try { return JSON.parse(result); } catch { return null; }
}

export async function kvSet(key, value) {
  if (!storageReady) throw new Error("Storage is not connected.");
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["SET", key, JSON.stringify(value)]),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Storage save failed (${res.status})`);
}
