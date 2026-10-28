// 23D's portfolio. Images are in /public/images.
//   cover:   main image (portrait 3:4 works best)
//   gallery: extra images shown on the project page, e.g. ["/images/vck-2.jpg", "/images/vck-3.jpg"]
//   year:    optional, shown on the project page when filled in
// To add a project, copy one block and change the details.
export const projects = [
  { slug: "design-harmony", title: "Design Harmony", client: "Design Harmony", year: "", category: "Identity",
    services: ["Logo", "Visual Identity", "Signage"], summary: "Logo and identity for an architecture and interiors studio.",
    cover: "/images/work-design-harmony.jpg", gallery: [], ratio: "tall",
    palette: { bg: "#E9E9E6", fg: "#141414", accent: "#3BB371" }, shape: "arch" },
  { slug: "aditya-enterprises", title: "Aditya Enterprises", client: "Aditya Enterprises", year: "", category: "Identity",
    services: ["Logo", "Visual Identity", "Signage"], summary: "Logo and identity for Aditya Enterprises.",
    cover: "/images/work-aditya-enterprises.jpg", gallery: [], ratio: "tall",
    palette: { bg: "#1F3B66", fg: "#FFFFFF", accent: "#3BB371" }, shape: "grid" },
  { slug: "vck-associates", title: "VCK Associates", client: "VCK Associates", year: "", category: "Identity",
    services: ["Logo", "Visual Identity", "Signage"], summary: "Logo and identity for VCK Associates.",
    cover: "/images/work-vck-associates.jpg", gallery: [], ratio: "tall",
    palette: { bg: "#1A1A1A", fg: "#C9A86A", accent: "#3BB371" }, shape: "stripe" },
];

export const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
export function getProject(slug) { return projects.find((p) => p.slug === slug); }
