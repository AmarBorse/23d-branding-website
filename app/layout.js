import "./globals.css";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";

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
        <a href="#main" className="skip">Skip to content</a>
        <Preloader />
        <Cursor />
        <SmoothScroll>
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
