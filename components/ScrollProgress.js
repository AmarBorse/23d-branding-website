"use client";
import { motion, useScroll, useSpring } from "framer-motion";

// Thin green line at the top that fills as you scroll down the page.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
