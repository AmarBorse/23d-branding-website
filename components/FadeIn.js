"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// Fades content up into view.
// Headings (h1, h2, h3) with plain text get a word-by-word "slide up from a mask" reveal instead.
export default function FadeIn({ children, delay = 0, y = 30, className = "", as = "div" }) {
  const Tag = motion[as];

  if (/^h[1-3]$/.test(as) && typeof children === "string") {
    const words = children.split(" ");
    const isPageTitle = as === "h1";
    return (
      <Tag
        className={className}
        aria-label={children}
        initial="hidden"
        {...(isPageTitle ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.5 } })}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay + (isPageTitle ? 0.2 : 0) } } }}
      >
        {words.map((w, i) => (
          <span className="mask" key={i} aria-hidden="true">
            <motion.span
              className="mask__inner"
              variants={{ hidden: { y: "110%", rotate: 3 }, show: { y: "0%", rotate: 0, transition: { duration: 0.85, ease } } }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </Tag>
  );
}