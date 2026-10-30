import { getAllProjects, saveAllProjects } from "@/lib/data";
import { storageReady } from "@/lib/storage";
import { json, cleanProject, validate, refreshSite } from "../_shared";

export const dynamic = "force-dynamic";

export async function GET() {
  return json({ projects: await getAllProjects({ fresh: true }) });
}

// new project (added at the end of its tab)
export async function POST(req) {
  if (!storageReady) return json({ error: "Storage is not connected yet (see the setup steps)." }, 500);
  const body = await req.json().catch(() => ({}));
  const list = await getAllProjects({ fresh: true });
  const p = cleanProject(body, list);
  const err = validate(p);
  if (err) return json({ error: err }, 400);
  const project = { ...p, id: `${p.slug}-${Date.now().toString(36)}` };
  await saveAllProjects([...list, project]);
  refreshSite();
  return json({ project });
}

// save the whole list (used for re-ordering)
export async function PUT(req) {
  if (!storageReady) return json({ error: "Storage is not connected yet." }, 500);
  const { order } = await req.json().catch(() => ({}));
  if (!Array.isArray(order)) return json({ error: "Nothing to save." }, 400);
  const list = await getAllProjects({ fresh: true });
  const byId = new Map(list.map((p) => [p.id, p]));
  const next = order.map((id) => byId.get(id)).filter(Boolean);
  list.forEach((p) => { if (!order.includes(p.id)) next.push(p); });
  await saveAllProjects(next);
  refreshSite();
  return json({ ok: true });
}
