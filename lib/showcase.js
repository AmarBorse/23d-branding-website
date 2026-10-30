// Builds the list for the home page "Our Work" slider:
// featured projects + every image from the Our Work page, each image only once.
import { projects } from "@/content/projects";
import { workCategories } from "@/content/work";

export function getShowcaseItems() {
  const items = [];
  const seenImages = new Set();
  const seenSlugs = new Set();
  const add = (item) => {
    if (seenImages.has(item.image) || (item.slug && seenSlugs.has(item.slug))) return;
    seenImages.add(item.image);
    if (item.slug) seenSlugs.add(item.slug);
    items.push(item);
  };

  // 1. projects that have their own page
  projects.filter((p) => p.featured !== false).forEach((p) => add({
    id: `p-${p.slug}`, slug: p.slug, title: p.title, image: p.cover || p.hero, href: `/work/${p.slug}`,
  }));

  // 2. everything shown on the Our Work page
  workCategories.forEach((cat) => {
    // wide images (e.g. website screenshots) are shown whole inside the tall cards
    const [w, h] = String(cat.ratio || "1 / 1").split("/").map(Number);
    const wide = w / h > 1.3;
    cat.items.forEach((it, i) => add({
    id: `w-${cat.id}-${i}`, slug: it.slug, title: it.title, image: it.image, position: it.position, fit: wide ? "contain" : "cover",
    href: it.slug ? `/work/${it.slug}` : it.url || `/work#${cat.id}`,
    external: !it.slug && !!it.url,
  }));
  });

  return items;
}