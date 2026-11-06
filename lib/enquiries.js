// Enquiries sent from the Contact page (newest first). Only the admin panel reads them.
import { storageReady, kvGet, kvSet, ENQUIRIES_KEY } from "@/lib/storage";

const MAX = 1000; // oldest ones are dropped after this

export async function getEnquiries() {
  if (!storageReady) return [];
  const list = await kvGet(ENQUIRIES_KEY, { fresh: true });
  return Array.isArray(list) ? list : [];
}

export async function saveEnquiries(list) {
  await kvSet(ENQUIRIES_KEY, list.slice(0, MAX));
}

export async function addEnquiry(e) {
  const list = await getEnquiries();
  await saveEnquiries([e, ...list]);
}
