// ─────────────────────────────────────────────────────────────
//  The five services.
//  - image:   shown in the "What we do" grid on the home page
//  - layout + gallery: the images on the Services page (in /public/images/services)
//  - intro:   the paragraph; `highlight` is shown in bold green
//  - items:   the list of what's included (read top-to-bottom, column by column)
//  - ideal:   the "Ideal for:" line
// ─────────────────────────────────────────────────────────────
export const services = [
  {
    id: "brand-identity",
    title: "Brand Identity Design",
    image: "/images/service-brand-identity.jpg",
    layout: "single",
    gallery: ["/images/services/brand-identity-1.jpg"],
    intro: { before: "A strong ", highlight: "brand identity", after: " gives your business a clear personality and a consistent visual presence. We develop cohesive brand identity systems that help businesses communicate their values and differentiate themselves in the market." },
    items: [
      "Brand discovery and creative direction", "Brand identity systems and visual elements", "Brand guidelines and usage rules",
      "Logo design and logo variations", "Stationery and corporate identity design", "Marketing collateral and brand applications",
      "Brand colour palette and typography selection", "Business cards, letterheads, and envelopes", "Signage and selected promotional materials",
    ],
    ideal: "New businesses, startups, educational institutions, established companies, and brands looking to refresh or redefine their identity.",
    text: "Creating distinctive identities that people remember.",
    tags: ["Strategy", "Logo", "Visual Identity", "Guidelines"],
  },
  {
    id: "web-design",
    title: "Web Design & Development",
    image: "/images/service-web.jpg",
    layout: "web",
    gallery: ["/images/services/web-1.jpg", "/images/services/web-2.jpg"],
    intro: { before: "Your ", highlight: "website", after: " is often the first place potential customers learn about your business. We create professional, responsive websites that communicate your value, showcase your services, and guide visitors towards taking action." },
    items: [
      "Business and corporate websites", "Landing page design", "Website content structuring",
      "Brand and agency websites", "Website UI/UX design", "Contact forms and enquiry integration",
      "Portfolio and service websites", "Responsive website development", "Basic on-page SEO setup",
    ],
    ideal: "Service providers, consultants, manufacturers, real estate businesses, institutions, and growing brands.",
    text: "Websites that look good, work smoothly and represent your brand.",
    tags: ["UI/UX", "Website Design", "Development", "Landing Pages"],
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    image: "/images/service-social.jpg",
    layout: "social",
    gallery: ["/images/services/social-1.jpg"],
    intro: { before: "", highlight: "Social media", after: " is more than regularly publishing posts. It is an opportunity to build brand awareness, communicate your expertise, engage with customers, and create a consistent digital presence." },
    intro2: "At 23D Branding, we help businesses plan and manage social media content that reflects their brand identity and speaks to their intended audience.",
    items: [
      "Social media account audits", "Reels and short-form video content", "Profile optimisation",
      "Content strategy and monthly planning", "Captions, copywriting, and calls to action", "Campaign and promotional creatives",
      "Post, carousel, and story design", "Content scheduling and publishing", "Paid social media campaign management, where included",
    ],
    ideal: "Local businesses, doctors and clinics, hospitality businesses, real estate companies, educational institutions, retailers, and professional service providers.",
    text: "Turning your social presence into a consistent brand experience.",
    tags: ["Strategy", "Content", "Design", "Reels", "Management"],
  },
  {
    id: "packaging",
    title: "Packaging Design",
    image: "/images/service-packaging.jpg",
    layout: "packaging",
    gallery: ["/images/services/packaging-1.jpg", "/images/services/packaging-2.jpg", "/images/services/packaging-3.jpg", "/images/services/packaging-4.jpg"],
    intro: { before: "", highlight: "Packaging", after: " is an important part of how customers discover, recognise, and experience a product. We create packaging designs that combine brand identity, product information, and visual appeal in a cohesive presentation." },
    items: [
      "Packaging concept development", "Bottle, jar, and container labels", "Print-ready artwork and layout preparation",
      "Product label design", "Product range and variant design systems", "Brand consistency across product lines",
      "Box and carton design", "Packaging mockups and visual presentations",
    ],
    ideal: "Food and beverage brands, cosmetics, personal care products, lifestyle products, retail products, and emerging consumer brands.",
    text: "Making products look as good on screen as they do in hand.",
    tags: ["Packaging", "Product Visuals", "CGI", "3D"],
  },
  {
    id: "brochure",
    title: "Brochure Designing",
    image: "/images/service-brochure.jpg",
    layout: "brochure",
    gallery: ["/images/services/brochure-1.jpg", "/images/services/brochure-2.jpg", "/images/services/brochure-3.jpg"],
    intro: { before: "A well-designed ", highlight: "brochure", after: " makes it easier for potential customers, partners, and stakeholders to understand what your business offers. We organise information into clear, visually engaging layouts that communicate your services, strengths, and brand story." },
    items: [
      "Corporate company profiles", "Real estate project brochures", "Digital PDF brochures",
      "Product and service brochures", "Company presentations and capability profiles", "Print-ready brochure artwork",
      "Institutional and school brochures", "Sales and marketing collateral",
    ],
    ideal: "Corporate businesses, manufacturers, real estate developers, educational institutions, consultants, and service providers.",
    text: "Information designed to communicate, not just fill pages.",
    tags: ["Brochures", "Profiles", "Presentations", "Flyers", "Catalogues"],
  },
];

export const process = [
  { title: "Understand", text: "We learn about your business." },
  { title: "Think", text: "We find the right creative direction." },
  { title: "Create", text: "We turn the idea into design." },
  { title: "Refine", text: "We make the details right." },
  { title: "Deliver", text: "You get everything ready to use." },
];
