"use client";
import { motion } from "framer-motion";

// Line illustrations "draw" themselves in from left to right, then float gently.
// (The outer box is what's watched for scrolling; the inner one is clipped.)
export default function DrawReveal({ src, width, height, className = "", delay = 0 }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      <motion.div
        variants={{
          hidden: { clipPath: "inset(0% 100% 0% 0%)" },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.8, delay, ease: [0.65, 0, 0.35, 1] } },
        }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={width} height={height} loading="lazy" className="float" />
      </motion.div>
    </motion.div>
  );
}
