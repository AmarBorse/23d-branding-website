// ─────────────────────────────────────────────────────────────
//  Brand details used across the whole site.
//  Edit text, links and client logos here.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: "23D",
  fullName: "23D Branding",
  description:
    "23D Branding is a creative design studio in Nashik. We bring strategy, design and digital creativity together to help businesses build a distinctive identity.",

  // Home hero ("Brands / MADE TO STAND OUT" are images in /public/images)
  hero: {
    title: "Brands made to stand out",
    // `highlight` is shown in green and bold.
    lead: { before: "We bring strategy, design, and digital creativity together to ", highlight: "help businesses", after: " build a distinctive identity and connect with the right audience." },
    lead2: "From your first brand idea to your complete digital presence, we create meaningful design experiences that help your business stand out.",
    button: "Explore our work",
  },

  approach: {
    title: "Our approach",
    text: "Good branding is more than a logo. It is how people recognise your business, understand what you offer, and remember the experience you create.",
    text2: "At 23D Branding, we combine thoughtful design with practical digital solutions to help businesses communicate with clarity, build trust, and create a consistent presence across platforms.",
  },

  servicesIntro: "From identity to digital presence, we bring the important pieces of your brand together.",

  clientsTagline: "Built on Collaboration. Driven by Creativity.",

  cta: { ask: "Have brand in mind?", line: "Let’s make it happen.", button: "Start the Project" },

  footer: {
    tagline: { before: "We bring strategy, design, & digital creativity together to ", highlight: "help businesses" },
    credit: "Website design & managed by 23D Branding",
    bookCall: "Book a Call",
  },

  // Used on the inner pages
  intro: {
    title: "We build brands with clarity, creativity and purpose.",
    text: "From identity to digital presence, we bring the important pieces of your brand together.",
  },
  work: {
    title: "Our Work",
    text: "A selection of identities, websites, campaigns, packaging and visual communication.",
  },
  about: {
    title: "About 23D",
    text: "23D Branding is a creative design studio helping businesses build stronger brands and better digital experiences.",
    text2: { before: "We combine ", strong: "strategy, design and visual communication", after: " to create work that feels right and works in the real world." },
  },
  contact: {
    title: "Let’s talk.",
    text: "Have a project, idea or brand that needs a better direction?",
  },

  email: "info@23dstudio.com",
  location: "Nashik, Maharashtra, India",
  // Green chat button in the footer. Put your WhatsApp link here, e.g. "https://wa.me/919800000000".
  // Leave empty to send visitors to the contact page.
  whatsapp: "",
  // Replace the links with the real profiles.
  socials: [
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/23d.branding/" },
    { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/people/23DBranding/61591582718572/" },
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/23-d-branding/" },
  ],
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About us", href: "/about" },
    { label: "Contact us", href: "/contact" },
  ],

  // Client logo cards ("Our clients"). Files are in /public/logos.
  clients: [
    { name: "The Design Atelier", logo: "/logos/the-design-atelier.png" },
    { name: "Nirmitee Associate", logo: "/logos/nirmitee-associate.png" },
    { name: "Design Harmony", logo: "/logos/design-harmony.png" },
    { name: "Ganesh Yeole Builders and Developers", logo: "/logos/ganesh-yeole.png" },
    { name: "Blanc Space", logo: "/logos/blanc-space.png" },
    { name: "Sanjivani Builders & Developers", logo: "/logos/sanjivani.png" },
    { name: "Aditya Enterprises", logo: "/logos/aditya-enterprises.png" },
    { name: "Mahajan Group", logo: "/logos/mahajan-group.png" },
    { name: "Pravasthi Developers", logo: "/logos/pravasthi-developers.png" },
    { name: "VCK Associates", logo: "/logos/vck-associates.png" },
    { name: "Dhiraj Salunkhe & Associates", logo: "/logos/dhiraj-salunkhe.png" },
    { name: "Divyachetna Social Foundation", logo: "/logos/divyachetna.png" },
    { name: "Ananta Reality", logo: "/logos/ananta-reality.png" },
    { name: "Wani International Trade Organisation", logo: "/logos/wito.png" },
    { name: "SJ Finvest", logo: "/logos/sj-finvest.png" },
    { name: "Jayant Rubber Products", logo: "/logos/jrp.png" },
    { name: "Vision Corporate Services", logo: "/logos/vision-corporate-services.png" },
    { name: "Utkarsh Buildcon & Resources", logo: "/logos/utkarsh.png" },
    { name: "Ujjwaldeep Constructions", logo: "/logos/ujjwaldeep.png" },
    { name: "RiDHi Corporation", logo: "/logos/ridhi-corporation.png" },
  ],
};