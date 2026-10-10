import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: { default: `${site.fullName} | Brands made to stand out`, template: `%s | ${site.fullName}` },
  description: site.description,
  openGraph: { title: site.fullName, description: site.description, type: "website" },
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#FAFAFA" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
