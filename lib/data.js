// ─────────────────────────────────────────────────────────────
//  One place where the site reads projects from.
//  Today: the content/projects.js file.
//  When the admin panel is ready, only these functions change
//  (e.g. to read from a database / API) — the pages stay the same.
// ─────────────────────────────────────────────────────────────
import { projects } from "@/content/projects";

export async function getAllProjects() {
  return projects;
}

export async function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export async function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}
