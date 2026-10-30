"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageHeading from "./ImageHeading";

const ease = [0.22, 1, 0.36, 1];

// About hero: green smoke on black with the "About Us" lettering.
export default function AboutHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  return (
    <section className="ahero" ref={ref}>
      <motion.div className="ahero__bg" style={{ y: bgY }} aria-hidden="true">
        <div className="hero__breathe">
          <motion.img src="/images/about/about-hero.jpg" alt="" initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, ease }} />
        </div>
      </motion.div>
      <motion.div className="container ahero__inner" style={{ y: titleY }}>
        <ImageHeading as="h1" onLoad src="/images/about-us.png" alt="About Us" width={1611} height={316} className="ahero__title" delay={0.4} />
      </motion.div>
    </section>
  );
}
