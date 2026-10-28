"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/content/site";

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // the giant "BRANDING 23D" words slide towards each other as the footer comes into view
  const leftX = useTransform(scrollYProgress, [0, 1], ["-8%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["12%", "0%"]);
  const chat = site.whatsapp || "/contact";
  const chatExternal = chat.startsWith("http");

  return (
    <footer className="footer" ref={ref}>
      <div className="footer__wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" aria-label={`${site.fullName} home`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-23d.png" alt="23D Branding Solutions" width={252} height={139} className="footer__logo" />
            </Link>
            <p className="footer__tagline">
              {site.footer.tagline.before}<strong className="accent">{site.footer.tagline.highlight}</strong>
            </p>
            <p className="footer__copy">© {new Date().getFullYear()} {site.fullName}. All Rights Reserved.</p>
          </div>

          <nav className="footer__col" aria-label="Footer">
            {site.footerNav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          </nav>

          <div className="footer__col">
            {site.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}
          </div>

          <div className="footer__actions">
            <Link href="/contact" className="btn btn--white-green">{site.footer.bookCall} <span aria-hidden="true">➔</span></Link>
            <a href={chat} className="footer__chat" aria-label="Chat with us"
              {...(chatExternal ? { target: "_blank", rel: "noreferrer" } : {})}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path fill="currentColor" d="M3 5.5A2.5 2.5 0 0 1 5.5 3h8A2.5 2.5 0 0 1 16 5.5v5a2.5 2.5 0 0 1-2.5 2.5H8.2L5 15.6V13h.5A2.5 2.5 0 0 1 3 10.5v-5Z" />
                <path fill="currentColor" d="M17.5 8H18a2.5 2.5 0 0 1 2.5 2.5v5A2.5 2.5 0 0 1 18 18h-.5v2.6L14.3 18H10a2.5 2.5 0 0 1-2.3-1.5h6.1a3.7 3.7 0 0 0 3.7-3.7V8Z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer__rule" />
      </div>

      <div className="footer__giant" aria-hidden="true">
        <motion.img src="/images/footer-branding.png" alt="" className="footer__giant-l" style={{ x: leftX }} loading="lazy" />
        <motion.img src="/images/footer-23d.png" alt="" className="footer__giant-r" style={{ x: rightX }} loading="lazy" />
      </div>
      <p className="footer__credit">{site.footer.credit}</p>
    </footer>
  );
}
