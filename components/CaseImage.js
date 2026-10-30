"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// Project page image: opens from the bottom and settles from a slight zoom when it scrolls into view.
export default function CaseImage({ src, alt = "", eager = false }) {
  return (
    <motion.figure className="case2__img" initial="hidden" {...(eager ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.15 } })}>
      <motion.div
        variants={{ hidden: { clipPath: "inset(12% 0% 12% 0%)", opacity: 0 }, show: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, transition: { duration: 1.1, ease } } }}>
        <motion.img src={src} alt={alt} loading={eager ? "eager" : "lazy"}
          variants={{ hidden: { scale: 1.12 }, show: { scale: 1, transition: { duration: 1.4, ease } } }} />
      </motion.div>
    </motion.figure>
  );
}
