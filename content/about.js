// ─────────────────────────────────────────────────────────────
//  About page text, core values and team.
//  Team photos are in /public/images/about/team.
// ─────────────────────────────────────────────────────────────
export const about = {
  who: [
    { before: "At ", highlight: "23D Branding", after: ", we believe every business has a story worth telling." },
    { text: "Our role is to help businesses express that story through thoughtful branding, purposeful design, and effective digital communication." },
    { text: "We are a creative branding and digital solutions agency focused on helping businesses build a strong identity and present themselves confidently across digital and physical platforms." },
  ],
  vision: "To become a trusted creative partner for businesses looking to build meaningful brands through thoughtful design, modern technology, and strategic digital communication.",
  mission: "To make professional branding and digital creativity accessible, practical, and valuable for businesses of different sizes and industries.",
  valuesTagline: "The Principles Behind Our Work",
  values: [
    { title: "Purposeful Creativity", icon: "/images/about/value-purposeful.png",
      text: "We begin with the objective behind the project and create solutions that serve a clear communication or business need." },
    { title: "Individuality", icon: "/images/about/value-individuality.png",
      text: "Every business has its own story. We work to develop creative directions that reflect the identity and character of each brand." },
    { title: "Collaboration", icon: "/images/about/value-collaboration.png",
      text: "We value open communication, constructive feedback, and client involvement throughout the creative process." },
    { title: "Consistency", icon: "/images/about/value-consistency.png",
      text: "We focus on creating connected brand experiences across websites, social media, packaging, print, and advertising." },
    { title: "Continuous Learning", icon: "/images/about/value-learning.png",
      text: "We remain open to new ideas, creative tools, and evolving technologies to keep our approach relevant and effective." },
  ],
};

// To add someone: copy a line, change the name/role and add their photo to /public/images/about/team.
export const team = [
  { name: "Gaurav Duse", role: "Founder", photo: "/images/about/team/gaurav-duse.jpg" },
  { name: "Yash Duse", role: "Social Marketing", photo: "/images/about/team/yash-duse.jpg" },
  { name: "Vickey Yadav", role: "Graphic Design", photo: "/images/about/team/vickey-yadav.jpg" },
  { name: "Rushikesh Patkar", role: "Editing", photo: "/images/about/team/rushikesh-patkar.jpg" },
  { name: "Amar Borse", role: "Web Developer", photo: "/images/about/team/amar-patil.jpg" },
  { name: "Dhanjay Pawar", role: "Web Developer", photo: "/images/about/team/dhanjay-pawar.jpg" },
  // NOTE: the PDF also names this person "Yash Duse – Social Marketing". Change it if that's a mistake.
  { name: "Yash Duse", role: "Social Marketing", photo: "/images/about/team/yash-duse-2.jpg" },
  { name: "Yash Godbole", role: "Account", photo: "/images/about/team/yash-godbole.jpg" },
];
