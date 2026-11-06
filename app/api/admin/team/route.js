import { storageReady } from "@/lib/storage";
import { getTeam, saveTeam } from "@/lib/data";
import { json, refreshSite } from "../_shared";

export const dynamic = "force-dynamic";

const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const img = (v) => { const s = str(v, 1000); return s.startsWith("/") || s.startsWith("https://") ? s : ""; };

export async function GET() {
  return json({ team: await getTeam({ fresh: true }) });
}

// saves the whole team list (add / edit / delete / re-order all use this)
export async function PUT(req) {
  if (!storageReady) return json({ error: "Storage is not connected yet (see the setup steps)." }, 500);
  const { team } = await req.json().catch(() => ({}));
  if (!Array.isArray(team)) return json({ error: "Nothing to save." }, 400);
  const clean = team.slice(0, 60).map((m, i) => ({
    id: str(m.id, 40) || `m${Date.now().toString(36)}${i}`,
    name: str(m.name, 80), role: str(m.role, 80), photo: img(m.photo),
  }));
  const bad = clean.find((m) => !m.name || !m.photo);
  if (bad) return json({ error: "Every member needs a name and a photo." }, 400);
  await saveTeam(clean);
  refreshSite();
  return json({ team: clean });
}
