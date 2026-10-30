// ─────────────────────────────────────────────────────────────
//  "Our Work" page: projects grouped by service.
//  Images are in /public/images/work (Aditya uses the existing home image).
//  layout: "three" = 3 per row, "two" = 2 per row, "single" = one image
//  slug: add the project's slug (from content/projects.js) to open its page on click;
//        without a slug the image opens large instead.
//  url:  a live website address; the image (and title) then open that website in a new tab.
//  homeImage: optional tall image used in the home page "Our Work" slider instead of `image`.
// ─────────────────────────────────────────────────────────────
export const workIntro =
  "Every project starts with a different challenge. Our work reflects the process of understanding those challenges and translating them into thoughtful design solutions.";

export const workCategories = [
  {
    id: "brand-identity", label: "Brand Identity Design", layout: "three", ratio: "301 / 246",
    items: [
      { title: "Finance & Investment firm", image: "/images/work/brand-sj-finvest.jpg", slug: "sj-finvest" },
      { title: "Architectural Firm", image: "/images/work/brand-design-atelier.jpg" },
      { title: "Construction chemical shop", image: "/images/work-aditya-enterprises.jpg", position: "50% 45%" },
    ],
  },
  {
    id: "web-design", label: "Web Design & Development", layout: "two", ratio: "460 / 245",
    items: [
      { title: "Little Sukis (Clothing Brand)", image: "/images/work/web-little-sukis.jpg", url: "https://littlesukis.com/", homeImage: "/images/work/web-little-sukis-mobile.jpg" },
      { title: "Divyachetna Social Foundation (NGO)", image: "/images/work/web-divyachetna.jpg", url: "https://www.divyachetna.org.in/", homeImage: "/images/work/web-divyachetna-mobile.jpg" },
      { title: "The Design Atelier TDA (Architectural Firm)", image: "/images/work/web-design-atelier.jpg", url: "https://thedesignatelier.co.in/", homeImage: "/images/work/web-design-atelier-mobile.jpg" },
    ],
  },
  {
    id: "social-media", label: "Social Media Marketing", layout: "three", ratio: "301 / 364",
    items: [
      { title: "Interior Firm", image: "/images/work/social-nirmitee.jpg" },
      { title: "Home Decor Firm", image: "/images/work/social-ridhi.jpg" },
      { title: "Interior Firm", image: "/images/work/social-dhiraj-salunkhe.jpg" },
    ],
  },
  {
    id: "packaging", label: "Packaging Design", layout: "single", ratio: "433 / 365",
    items: [{ title: "Blanc Play (kids game box design)", image: "/images/work/packaging-blanc-play.jpg" }],
  },
  {
    id: "brochure", label: "Brochure Designing", layout: "single", ratio: "433 / 365",
    items: [{ title: "Real estate brochure", image: "/images/work/brochure-real-estate.jpg" }],
  },
];