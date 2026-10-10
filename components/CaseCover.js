"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Cover from "./Cover";

// Case-study image: opens like a window, then zooms gently on scroll.
export default function CaseCover({ project, variant = 0, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  return (
    <motion.div ref={ref} className={`case-cover ${className}`}
      initial={{ clipPath: "inset(12% 12% 12% 12% round 12px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 8px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}>
      <motion.div className="case-cover__inner" style={{ scale }}>
        <Cover project={project} variant={variant} />
      </motion.div>
    </motion.div>
  );
}
