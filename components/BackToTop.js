"use client";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from "framer-motion";

// Round button that appears after scrolling; its ring fills with your scroll progress.
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 700));

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button type="button" className="to-top" onClick={toTop} aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -4 }} whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}>
          <svg className="to-top__ring" viewBox="0 0 52 52" aria-hidden="true">
            <circle cx="26" cy="26" r="24" className="to-top__track" />
            <motion.circle cx="26" cy="26" r="24" className="to-top__fill" style={{ pathLength: progress }} />
          </svg>
          <svg className="to-top__arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
