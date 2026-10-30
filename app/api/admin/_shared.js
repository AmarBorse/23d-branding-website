import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/seed";

export const json = (data, status = 200) => NextResponse.json(data, { status });

// refresh every page that shows projects
export function refreshSite() { revalidateTag("projects"); revalidatePath("/", "layout"); }

const str = (v, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const img = (v) => { const s = str(v, 1000); return s.startsWith("/") || s.startsWith("https://") ? s : ""; };
const link = (v) => { const s = str(v, 500); return /^https?:\/\//i.test(s) ? s : ""; };

// keep only known fields, with safe values
export function cleanProject(input, existing = []) {
  const p = {
    name: str(input.name, 120), title: str(input.title, 120), caption: str(input.caption, 160),
    category: str(input.category, 40), cardImage: img(input.cardImage), cardPosition: str(input.cardPosition, 20),
    homeImage: img(input.homeImage), url: link(input.url),
    page: !!input.page, hero: img(input.hero), description: str(input.description, 3000),
    gallery: Array.isArray(input.gallery) ? input.gallery.map(img).filter(Boolean).slice(0, 40) : [],
    showOnWork: input.showOnWork !== false, showOnHome: input.showOnHome !== false,
  };
  if (!p.title) p.title = p.name || p.caption;
  if (!p.name) p.name = p.title;
  if (!p.caption) p.caption = p.title;
  let base = slugify(str(input.slug, 80) || p.name || p.caption);
  let slug = base, n = 2;
  while (existing.some((x) => x.slug === slug && x.id !== input.id)) slug = `${base}-${n++}`;
  p.slug = slug;
  return p;
}

export function validate(p) {
  if (!p.name && !p.caption) return "Please enter a project name.";
  if (!p.cardImage && !p.hero) return "Please add at least one image.";
  if (p.page && !p.hero && !p.gallery.length) return "A project page needs a main image or gallery images.";
  return "";
}
