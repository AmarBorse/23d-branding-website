import { getEnquiries, saveEnquiries } from "@/lib/enquiries";
import { storageReady } from "@/lib/storage";
import { json } from "../_shared";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const list = await getEnquiries().catch(() => []);
  if (new URL(req.url).searchParams.get("count")) return json({ newCount: list.filter((e) => e.status === "new").length });
  return json({ enquiries: list, storage: storageReady });
}

// change status: { id, status: "new" | "read" | "replied" }  or  { ids, status } for several
export async function PUT(req) {
  const { id, ids, status } = await req.json().catch(() => ({}));
  if (!["new", "read", "replied"].includes(status)) return json({ error: "Unknown status." }, 400);
  const which = new Set(ids || [id]);
  const list = await getEnquiries();
  await saveEnquiries(list.map((e) => (which.has(e.id) ? { ...e, status } : e)));
  return json({ ok: true });
}

export async function DELETE(req) {
  const { id } = await req.json().catch(() => ({}));
  const list = await getEnquiries();
  await saveEnquiries(list.filter((e) => e.id !== id));
  return json({ ok: true });
}
