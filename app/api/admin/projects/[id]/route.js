import { getAllProjects, saveAllProjects } from "@/lib/data";
import { storageReady } from "@/lib/storage";
import { json, cleanProject, validate, refreshSite } from "../../_shared";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  if (!storageReady) return json({ error: "Storage is not connected yet (see the setup steps)." }, 500);
  const list = await getAllProjects({ fresh: true });
  const i = list.findIndex((p) => p.id === params.id);
  if (i < 0) return json({ error: "Project not found." }, 404);
  const body = await req.json().catch(() => ({}));
  const p = cleanProject({ ...body, id: params.id }, list);
  const err = validate(p);
  if (err) return json({ error: err }, 400);
  list[i] = { ...p, id: params.id };
  await saveAllProjects(list);
  refreshSite();
  return json({ project: list[i] });
}

export async function DELETE(req, { params }) {
  if (!storageReady) return json({ error: "Storage is not connected yet." }, 500);
  const list = await getAllProjects({ fresh: true });
  const next = list.filter((p) => p.id !== params.id);
  if (next.length === list.length) return json({ error: "Project not found." }, 404);
  await saveAllProjects(next);
  refreshSite();
  return json({ ok: true });
}
