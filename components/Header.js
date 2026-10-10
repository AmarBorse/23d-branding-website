"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/content/site";
import s from "./Header.module.css";

// At the top: logo + nav pill + "Start a Project".
// After scrolling: logo and button slide away, only the white nav pill floats (like sarbat.in).
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [floating, setFloating] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <motion.header
        className={`${s.header} ${floating && !open ? s.floating : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <div className={s.inner}>
          <Link href="/" className={`${s.logo} ${s.side}`} aria-label={`${site.fullName} home`} tabIndex={floating ? -1 : 0}>
            <span className={s.badge} aria-hidden="true">{site.name}</span>
          </Link>

          <nav className={s.nav} aria-label="Main">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${s.link} ${isActive(item.href) ? s.active : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/contact" className={`${s.cta} ${s.side}`} tabIndex={floating ? -1 : 0}>
            Start a Project
          </Link>

          <button
            className={`${s.burger} ${open ? s.open : ""}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span /><span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className={s.menu}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <nav className={s.menuNav} aria-label="Mobile">
              {site.nav.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}>
                  <Link href={item.href} className={`${s.menuLink} ${isActive(item.href) ? s.active : ""}`}>{item.label}</Link>
                </motion.div>
              ))}
            </nav>
            <Link href="/contact" className={s.cta}>Start a Project</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}