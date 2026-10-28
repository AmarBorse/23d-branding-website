"use client";
import { motion } from "framer-motion";
import ImageHeading from "./ImageHeading";

const ease = [0.22, 1, 0.36, 1];
const strips = [1, 2, 3, 4, 5].map((n) => `/images/services/hero-strip-${n}.jpg`);

// Services hero: five dark image strips behind the "What we do" lettering.
// The strips slide in one after another; hovering a strip lights it up.
export default function ServicesHero({ text }) {
  return (
    <section className="shero">
      <div className="shero__strips" aria-hidden="true">
        {strips.map((src, i) => (
          <motion.div key={src} className="shero__strip"
            initial={{ clipPath: i % 2 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.2, delay: 0.1 + i * 0.1, ease }}>
            <motion.img src={src} alt="" initial={{ scale: 1.25 }} animate={{ scale: 1 }}
              transition={{ duration: 1.8, delay: 0.1 + i * 0.1, ease }} />
          </motion.div>
        ))}
      </div>
      <div className="container shero__inner">
        <ImageHeading as="h1" onLoad src="/images/what-we-do.png" alt="What we do" width={1515} height={218}
          className="shero__title" delay={0.6} />
        <motion.p className="shero__text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease }}>{text}</motion.p>
      </div>
    </section>
  );
}
