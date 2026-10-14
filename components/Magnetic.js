"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Wrap a button: it gently leans toward the cursor and springs back.
export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 15, mass: 0.3 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 15, mass: 0.3 });

  const onMove = (e) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} className="magnetic" style={{ x, y }} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </motion.div>
  );
}
