import { storageReady } from "@/lib/storage";
import { buildSeed } from "@/lib/seed";
import { saveAllProjects } from "@/lib/data";
import { json, refreshSite } from "../_shared";

// copies the projects currently on the website into the admin storage (first-time setup)
export async function POST() {
  if (!storageReady) return json({ error: "Storage is not connected yet (see the setup steps)." }, 500);
  const list = buildSeed();
  await saveAllProjects(list);
  refreshSite();
  return json({ ok: true, count: list.length });
}
