import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <strong>{site.fullName}</strong>
          <span>{site.footerServices.join(" · ")}</span>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          {site.nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {site.fullName}. All Rights Reserved.</span>
        <Link href="/contact">Contact Us</Link>
      </div>
    </footer>
  );
}
