import "./globals.css";
import { site } from "@/content/site";
import SiteChrome from "@/components/SiteChrome";

export const metadata = {
  title: { default: `${site.fullName} | Brands made to stand out`, template: `%s | ${site.fullName}` },
  description: site.description,
  openGraph: { title: site.fullName, description: site.description, type: "website", images: ["/images/hero-bg.jpg"] },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

// Runs before the page paints, so there's no white flash for night-mode visitors.
// Day mode is the default (the design); night mode only if the visitor picked it.
const themeScript = `(function(){try{var s=localStorage.getItem('theme');document.documentElement.dataset.theme=s||'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preload" href="/fonts/figtree-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/images/hero-bg.jpg" as="image" />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
