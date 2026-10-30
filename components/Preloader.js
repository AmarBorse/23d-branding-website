"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.76, 0, 0.24, 1];

// Intro screen on the first visit of a session:
// the 23D logo rises in, a green line fills, then the black curtain lifts away.
export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("intro-seen") === "1"; } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) { setShow(false); return; }
    try { sessionStorage.setItem("intro-seen", "1"); } catch {}
    document.documentElement.classList.add("is-loading");
    const t = setTimeout(() => setShow(false), 1250);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => document.documentElement.classList.remove("is-loading")}>
      {show && (
        <motion.div className="preloader" aria-hidden="true"
          exit={{ y: "-100%", transition: { duration: 0.9, ease } }}>
          <motion.div className="preloader__inner" exit={{ y: -60, opacity: 0, transition: { duration: 0.5, ease } }}>
            <div className="preloader__mask">
              <motion.img src="/images/logo-23d.png" alt="" className="preloader__logo"
                initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
            </div>
            <div className="preloader__bar">
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }} />
            </div>
          </motion.div>
          <span className="preloader__edge" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
