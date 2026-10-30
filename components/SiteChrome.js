"use client";
import { usePathname } from "next/navigation";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import Interactions from "./Interactions";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

// Website frame (menu, footer, effects). The admin panel gets a plain page without it.
export default function SiteChrome({ children }) {
  const pathname = usePathname() || "";
  if (pathname.startsWith("/admin")) return <main id="main" className="admin-root">{children}</main>;
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Preloader />
      <Cursor />
      <Interactions />
      <SmoothScroll>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
      </SmoothScroll>
    </>
  );
}
