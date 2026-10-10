// PLACEHOLDER PROJECTS: replace with 23D's real work.
// Keep text short and let images speak. For real images, put files in /public/images and set
//   cover: "/images/project-cover.jpg",
//   gallery: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"]
// Without them, generated artwork in the project's colours is shown.
export const projects = [
  { slug: "swara-cafe", title: "Swara Café", client: "Swara Café", year: "2026", category: "Identity",
    services: ["Logo", "Visual Identity", "Signage"], summary: "A warm, music-inspired identity for a neighbourhood café.",
    palette: { bg: "#C8643B", fg: "#FFF4E6", accent: "#2E1A12" }, shape: "circle" },
  { slug: "kaveri-organics", title: "Kaveri Organics", client: "Kaveri Organics", year: "2026", category: "Packaging & CGI",
    services: ["Packaging", "CGI Ads", "Product Visuals"], summary: "Packaging and 3D product films for an organic food range.",
    palette: { bg: "#2F5D50", fg: "#EAF4EC", accent: "#C9E265" }, shape: "blob" },
  { slug: "trimbak-tech", title: "Trimbak Tech", client: "Trimbak Tech", year: "2025", category: "Web",
    services: ["UI/UX", "Website Design", "Development"], summary: "A fast, clear website for an industrial automation company.",
    palette: { bg: "#1F4E79", fg: "#E8F1FA", accent: "#7FC8F8" }, shape: "grid" },
  { slug: "aarna-jewels", title: "Aarna Jewels", client: "Aarna Jewels", year: "2025", category: "Packaging & CGI",
    services: ["CGI", "3D", "Product Visuals"], summary: "Photoreal CGI campaigns for a fine-jewellery label.",
    palette: { bg: "#7A1F3D", fg: "#FCE9EF", accent: "#F2A541" }, shape: "diamond" },
  { slug: "godavari-ayurveda", title: "Godavari Ayurveda", client: "Godavari Ayurveda", year: "2025", category: "Social",
    services: ["Social Strategy", "Content", "Reels"], summary: "A calm, consistent social presence for a wellness brand.",
    palette: { bg: "#F5C542", fg: "#1B2140", accent: "#E4572E" }, shape: "arch" },
  { slug: "vastu-realty", title: "Vastu Realty", client: "Vastu Realty", year: "2024", category: "Print",
    services: ["Brochure", "Profile", "Presentation"], summary: "Brochures and sales material for a residential project.",
    palette: { bg: "#6E56CF", fg: "#F3F0FF", accent: "#FFB4A2" }, shape: "stripe" },
  { slug: "panchavati-interiors", title: "Panchavati Interiors", client: "Panchavati Interiors", year: "2024", category: "Identity",
    services: ["Strategy", "Logo", "Guidelines"], summary: "A refined identity for an interior design practice.",
    palette: { bg: "#E9E2D0", fg: "#3A2E22", accent: "#B5653A" }, shape: "arch" },
  { slug: "nashik-vineyard-co", title: "Nashik Vineyard Co.", client: "Nashik Vineyard Co.", year: "2024", category: "Web",
    services: ["Website Design", "Landing Pages"], summary: "An online home and booking site for vineyard tours.",
    palette: { bg: "#4A1942", fg: "#F7E8F3", accent: "#E8B04B" }, shape: "circle" },
];

export const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
export function getProject(slug) { return projects.find((p) => p.slug === slug); }
