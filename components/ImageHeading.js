"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// A heading drawn as an image (the 23D display lettering from the design).
// It rises out of a mask when it scrolls into view. `onLoad` = animate right away (hero).
export default function ImageHeading({ as = "h2", src, alt, width, height, className = "", delay = 0, onLoad = false }) {
  const Tag = motion[as];
  const trigger = onLoad ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.6 } };
  return (
    <Tag className={`img-heading ${className}`} initial="hidden" {...trigger}>
      <motion.img
        src={src} alt={alt} width={width} height={height} draggable="false"
        variants={{
          hidden: { clipPath: "inset(100% 0% -20% 0%)", y: "35%" },
          show: { clipPath: "inset(-20% 0% -20% 0%)", y: "0%", transition: { duration: 1.1, delay, ease } },
        }}
      />
    </Tag>
  );
}
