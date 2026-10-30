// ─────────────────────────────────────────────────────────────
//  23D's projects. Each one gets its own page at /work/<slug>.
//
//  slug        web address, e.g. "sj-finvest" -> /work/sj-finvest
//  name        big title on the project page
//  title       short name (cards, home slider)
//  category    which "Our Work" tab it belongs to (see content/work.js)
//  caption     text under the card on the Our Work page
//  description paragraph under the main image
//  hero        main image at the top of the project page
//  cover       portrait image for the home page slider (falls back to hero)
//  gallery     the images below, top to bottom
//  featured    true = also shown in the home page "Our Work" slider
//
//  Later the admin panel will save projects in exactly this shape,
//  so the pages won't need to change (see lib/data.js).
// ─────────────────────────────────────────────────────────────
export const projects = [
  {
    slug: "sj-finvest",
    name: "SJ FINVEST PVT. LTD.",
    title: "SJ Finvest",
    category: "brand-identity",
    caption: "Finance & Investment firm",
    description: "SJ Finvest Private Limited is a finance and investment-focused company committed to presenting financial services through a professional, transparent, and growth-oriented approach.",
    hero: "/images/projects/sj-finvest/sj-finvest-hero.jpg",
    cover: "/images/projects/sj-finvest/sj-finvest-hero.jpg",
    gallery: [
      "/images/projects/sj-finvest/sj-finvest-1.jpg",
      "/images/projects/sj-finvest/sj-finvest-2.jpg",
      "/images/projects/sj-finvest/sj-finvest-3.jpg",
      "/images/projects/sj-finvest/sj-finvest-4.jpg",
      "/images/projects/sj-finvest/sj-finvest-5.jpg",
      "/images/projects/sj-finvest/sj-finvest-6.jpg",
    ],
    featured: true,
  },
  {
    slug: "design-harmony",
    name: "DESIGN HARMONY",
    title: "Design Harmony",
    category: "brand-identity",
    caption: "Architecture & Interiors studio",
    description: "Logo and identity for an architecture and interiors studio.",
    hero: "/images/work-design-harmony.jpg",
    cover: "/images/work-design-harmony.jpg",
    gallery: [],
    featured: true,
  },
  {
    slug: "aditya-enterprises",
    name: "ADITYA ENTERPRISES",
    title: "Aditya Enterprises",
    category: "brand-identity",
    caption: "Construction chemical shop",
    description: "Logo and identity for Aditya Enterprises.",
    hero: "/images/work-aditya-enterprises.jpg",
    cover: "/images/work-aditya-enterprises.jpg",
    gallery: [],
    featured: true,
  },
  {
    slug: "vck-associates",
    name: "VCK ASSOCIATES",
    title: "VCK Associates",
    category: "brand-identity",
    caption: "Real estate",
    description: "Logo and identity for VCK Associates.",
    hero: "/images/work-vck-associates.jpg",
    cover: "/images/work-vck-associates.jpg",
    gallery: [],
    featured: true,
  },
];

export function getProject(slug) { return projects.find((p) => p.slug === slug); }
