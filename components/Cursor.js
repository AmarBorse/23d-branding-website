"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// Soft green cursor ring that trails the mouse (desktop only).
// Grows over links and buttons; hides over project and service images (they show their own centred arrow).
const VIEW = ".cflow__link, .stile__link, .wshow__link, .svc__img, .wcard__btn, [data-cursor='view']";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("default"); // default | link | view
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY); setVisible(true);
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest(VIEW)) setMode("view");
      else if (t.closest("a, button, [role='button'], input, textarea, label")) setMode("link");
      else setMode("default");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = mode === "view" ? 46 : mode === "link" ? 54 : 30;

  return (
    <>
      <motion.div className={`cursor cursor--${mode}`} aria-hidden="true"
        style={{ x: rx, y: ry }}
        animate={{ width: size, height: size, opacity: visible && mode !== "view" ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}>
        <AnimatePresence>
          {mode === "view" && (
            <motion.span className="cursor__label" initial={{ opacity: 0, scale: 0.4, rotate: -45 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.4 }}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div className="cursor-dot" aria-hidden="true" style={{ x, y }}
        animate={{ opacity: visible && mode === "default" ? 1 : 0, scale: mode === "default" ? 1 : 0 }} transition={{ duration: 0.2 }} />
    </>
  );
}