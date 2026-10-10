"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Smooth, eased scrolling (the "glide" feel of Framer sites like sarbat.in).
// Tweak the feel with DURATION: higher = floatier, lower = snappier.
const DURATION = 0.9;
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: reduce ? 0.7 : DURATION,  // gentler glide if the device asks for less motion
      easing: easeOutExpo,
      smoothWheel: true,                  // mouse wheel + trackpad
      wheelMultiplier: 1,
      touchMultiplier: 1.4,               // phones keep their natural swipe feel
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);

    // Pause smooth scroll while the mobile menu (or anything else) locks the page.
    const lockWatcher = new MutationObserver(() => {
      document.body.style.overflow === "hidden" ? lenis.stop() : lenis.start();
    });
    lockWatcher.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    // Links to sections on the same page (href="#about") glide instead of jumping.
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -100 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(id);
      lockWatcher.disconnect();
      document.removeEventListener("click", onClick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // New page: start at the top instantly (the page fade-in handles the transition).
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}