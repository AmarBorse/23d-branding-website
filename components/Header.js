"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/content/site";
import ThemeToggle from "./ThemeToggle";
import s from "./Header.module.css";

// At the top: 23D logo, underlined links + day/night switch, white "Start the Project" pill.
// After scrolling: logo and button slide away and the links float in a dark glass pill.
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setFloating(y > 80);
      // slide the menu away when scrolling down, bring it back when scrolling up
      if (Math.abs(y - last) > 6) { setHidden(y > last && y > 400); last = y; }
    };
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
        className={`${s.header} ${floating && !open ? s.floating : ""} ${hidden && !open ? s.hidden : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <div className={s.inner}>
          <Link href="/" className={`${s.logo} ${s.side}`} aria-label={`${site.fullName} home`} tabIndex={floating ? -1 : 0}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-23d.png" alt="23D Branding Solutions" width={252} height={139} />
          </Link>

          <nav className={s.nav} aria-label="Main">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${s.link} ${isActive(item.href) ? s.active : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                <span className={s.roll} data-text={item.label}><span>{item.label}</span></span>
              </Link>
            ))}
            <span className={s.divider} aria-hidden="true" />
            <ThemeToggle className={s.toggle} />
          </nav>

          <Link href="/contact" className={`${s.cta} ${s.side}`} tabIndex={floating ? -1 : 0}>
            Start the Project<span aria-hidden="true">➔</span>
          </Link>

          <div className={s.mobileActions}>
            <ThemeToggle className={s.mobileToggle} />
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
            <Link href="/contact" className={s.cta}>Start the Project<span aria-hidden="true">➔</span></Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
