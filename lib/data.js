// ─────────────────────────────────────────────────────────────
//  The one place the website reads projects from.
//  • If the admin panel's storage is connected and has projects -> those are used.
//  • Otherwise -> the projects written in content/projects.js + content/work.js.
// ─────────────────────────────────────────────────────────────
import { storageReady, kvGet, kvSet, PROJECTS_KEY } from "@/lib/storage";
import { buildSeed } from "@/lib/seed";
import { workCategories } from "@/content/work";

export async function getAllProjects({ fresh = false } = {}) {
  if (storageReady) {
    try {
      const saved = await kvGet(PROJECTS_KEY, { fresh });
      if (Array.isArray(saved) && saved.length) return saved;
    } catch (e) {
      console.error("Could not read projects from storage, using the content files.", e);
    }
  }
  return buildSeed();
}

export async function saveAllProjects(list) {
  await kvSet(PROJECTS_KEY, list);
}

export async function getProjectBySlug(slug) {
  const p = (await getAllProjects()).find((x) => x.slug === slug && x.page);
  if (!p) return null;
  return { ...p, name: p.name || p.title, title: p.title || p.name, hero: p.hero || p.cardImage, gallery: p.gallery || [] };
}

export async function getProjectPageSlugs() {
  return (await getAllProjects()).filter((p) => p.page).map((p) => p.slug);
}

// Our Work page: the 5 tabs, each with its projects (same shape the WorkTabs component expects)
export async function getWorkCategories() {
  const all = await getAllProjects();
  return workCategories.map((cat) => ({
    id: cat.id, label: cat.label, layout: cat.layout, ratio: cat.ratio,
    items: all.filter((p) => p.showOnWork !== false && p.category === cat.id).map((p) => ({
      title: p.caption || p.title || p.name,
      image: p.cardImage || p.hero,
      position: p.cardPosition || undefined,
      slug: p.page ? p.slug : undefined,
      url: p.url || undefined,
    })),
  }));
}

// Home page "Our Work" slider: projects with a page first, then the rest; each image only once
export async function getShowcaseItems() {
  const all = (await getAllProjects()).filter((p) => p.showOnHome !== false);
  const ordered = [...all.filter((p) => p.page), ...all.filter((p) => !p.page)];
  const ratioOf = (id) => {
    const [w, h] = String(workCategories.find((c) => c.id === id)?.ratio || "1 / 1").split("/").map(Number);
    return w / h;
  };
  const seen = new Set();
  const items = [];
  ordered.forEach((p) => {
    const image = p.homeImage || (p.page && p.hero) || p.cardImage;
    if (!image || seen.has(image)) return;
    seen.add(image);
    const usingCard = !p.homeImage && !(p.page && p.hero);
    items.push({
      id: p.id || p.slug, title: p.title || p.caption || p.name, image,
      position: usingCard ? p.cardPosition || undefined : undefined,
      fit: usingCard && ratioOf(p.category) > 1.3 ? "contain" : "cover",
      href: p.page ? `/work/${p.slug}` : p.url || `/work#${p.category}`,
      external: !p.page && !!p.url,
    });
  });
  return items;
}
