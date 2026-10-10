// ─────────────────────────────────────────────────────────────
//  Brand details used across the whole site.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: "23D",
  fullName: "23D Branding",
  description:
    "23D Branding is a creative design studio in Nashik creating brands, websites, social, packaging and CGI that help businesses stand out.",

  hero: {
    title: "Brands made to stand out.",
    // The `highlight` part is shown in orange (like Sarbat's "cohesive vision").
    text: { before: "We create brands, digital experiences and visual communication that make businesses ", highlight: "look better", after: " and communicate clearly." },
    tags: ["Branding", "Web", "Social", "Packaging", "CGI"],
  },
  intro: {
    title: "We build brands with clarity, creativity and purpose.",
    text: "From identity to digital presence, we bring the important pieces of your brand together.",
  },
  statement: {
    title: "Your brand is more than a logo.",
    text: "It is how people see you, remember you and choose you.",
  },
  work: {
    title: "Selected Work",
    text: "A selection of identities, websites, campaigns, packaging and visual communication.",
  },
  about: {
    title: "About 23D",
    text: "23D Branding is a creative design studio helping businesses build stronger brands and better digital experiences.",
    // `strong` is shown with extra weight inside the sentence.
    text2: { before: "We combine ", strong: "strategy, design and visual communication", after: " to create work that feels right and works in the real world." },
  },
  cta: { ask: "Have a brand in mind?", line: "Let's make it happen." },
  contact: {
    title: "Let's talk.",
    text: "Have a project, idea or brand that needs a better direction?",
  },

  email: "hello@23dstudio.com",
  location: "Nashik, Maharashtra, India",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  // Client logos in the endless row under the hero.
  // Add real logos: put files in /public/logos and set logo: "/logos/name.svg".
  clients: [
    { name: "Swara Café" }, { name: "KAVERI" }, { name: "trimbak.tech" },
    { name: "Aarna Jewels" }, { name: "GODAVARI" }, { name: "Vastu Realty" }, { name: "Panchavati" },
  ],
  footerServices: ["Brand Identity", "Web", "Social", "Packaging", "CGI", "Print"],
};
