"use client";
import { motion } from "framer-motion";

// Thin divider line that draws itself from left to right when it comes into view.
export default function Rule({ className = "", delay = 0, origin = "left" }) {
  return (
    <motion.div className={`rule ${className}`} style={{ transformOrigin: origin }}
      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.3, delay, ease: [0.65, 0, 0.35, 1] }} />
  );
}
