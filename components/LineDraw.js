"use client";
import { motion } from "framer-motion";

// Divider line that draws itself out from the sketch when it scrolls into view,
// then a soft green light runs once along it.
export default function LineDraw({ className = "", style, origin = "left", delay = 0.2 }) {
  const fromRight = origin === "right";
  return (
    <motion.span className={`linedraw ${className}`} style={style} aria-hidden="true"
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 1 }}>
      <motion.span className="linedraw__line" style={{ transformOrigin: origin }}
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] } } }} />
      <motion.span className="linedraw__glint"
        variants={{
          hidden: { left: fromRight ? "100%" : "-20%", opacity: 0 },
          show: { left: fromRight ? "-20%" : "100%", opacity: [0, 1, 1, 0], transition: { duration: 1.6, delay: delay + 1.2, ease: "easeInOut" } },
        }} />
    </motion.span>
  );
}
