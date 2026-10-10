"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Paragraph that "reads itself": words light up as you scroll.
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }} className="sw__word">{children} </motion.span>;
}

export default function ScrollWords({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={`scroll-words ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}
