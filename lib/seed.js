// Turns the projects written in content/projects.js + content/work.js into the
// single list format the admin panel uses. Used until the admin panel has saved its own list
// (and by the "Import current projects" button).
import { projects as pageProjects } from "@/content/projects";
import { workCategories } from "@/content/work";

export function slugify(s = "") {
  return s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "project";
}

export function blankProject() {
  return {
    id: "", slug: "", name: "", title: "", caption: "", category: workCategories[0].id,
    cardImage: "", cardPosition: "", homeImage: "", url: "",
    page: false, hero: "", description: "", gallery: [],
    showOnWork: true, showOnHome: true,
  };
}

export function buildSeed() {
  const list = [];
  const used = new Set();
  const uniqueSlug = (base) => { let s = slugify(base), n = 2; while (used.has(s)) s = `${slugify(base)}-${n++}`; used.add(s); return s; };

  // 1. everything on the Our Work page, in its order
  workCategories.forEach((cat) => (cat.items || []).forEach((it) => {
    const linked = pageProjects.find((p) => p.slug === it.slug || p.hero === it.image || p.cover === it.image);
    const slug = uniqueSlug(linked?.slug || it.title);
    list.push({
      ...blankProject(), id: slug, slug,
      name: linked?.name || it.title, title: linked?.title || it.title, caption: it.title, category: cat.id,
      cardImage: it.image, cardPosition: it.position || "", homeImage: it.homeImage || (linked ? linked.cover || linked.hero : ""),
      url: it.url || "",
      page: !!linked, hero: linked?.hero || "", description: linked?.description || "", gallery: linked?.gallery || [],
      showOnWork: true, showOnHome: linked ? linked.featured !== false : true,
    });
  }));

  // 2. project pages that are not on the Our Work page (home slider only)
  pageProjects.forEach((p) => {
    if (list.some((x) => x.slug === p.slug || x.hero === p.hero)) return;
    const slug = uniqueSlug(p.slug);
    list.push({
      ...blankProject(), id: slug, slug, name: p.name || p.title, title: p.title, caption: p.caption || p.title,
      category: p.category || workCategories[0].id, cardImage: p.cover || p.hero, homeImage: p.cover || p.hero,
      page: true, hero: p.hero || p.cover, description: p.description || "", gallery: p.gallery || [],
      showOnWork: false, showOnHome: p.featured !== false,
    });
  });
  return list;
}
