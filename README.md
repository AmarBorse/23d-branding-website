# 23D Branding website (Next.js + Framer Motion)

Styled after sarbat.in: clean white layout, Inter font, one orange accent, endless client-logo row,
two-column staggered photo grid, minimal copy.

Pages: Home, Work (filterable), project pages, Services, About, Contact.

## Run it
```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```
Deploy free on Vercel: push to GitHub, import the repo at vercel.com, Deploy.

## Make it real (in this order)
1. **Project photos** (most important, the design depends on them):
   put images in `public/images/` and in `content/projects.js` add
   `cover: "/images/swara-cover.jpg"` (main photo, ideally with the client logo on it, like Sarbat)
   and `gallery: ["/images/swara-hover.jpg", "/images/2.jpg", "/images/3.jpg"]`.
   The first gallery image is the one that appears on hover.
   Optional `ratio: "tall"` or `ratio: "wide"` controls the shape in the grid.
2. **Client logos**: put SVG/PNG files in `public/logos/` and set `logo: "/logos/name.svg"` in the
   `clients` list in `content/site.js`. Black logos on transparent background look best.
3. **Text**: everything is in `content/site.js` and `content/services.js`.
4. **Colours**: top of `app/globals.css` (`--orange` is the accent).

## Animations
Text fades/slides in on load, endless client-logo row (speeds up while scrolling, slows on hover),
project photos zoom and swap to a second image on hover, sections and cards reveal on scroll,
statement text lights up as you scroll, filter animation on the Work page, smooth scrolling,
animated contact form and mobile menu. Motion is reduced for visitors who prefer less motion.

## Contact form
Opens the visitor's email app pre-filled. For direct submissions, create a free form at
formspree.io or web3forms.com and replace the `mailto` line in `components/ContactForm.js`.
