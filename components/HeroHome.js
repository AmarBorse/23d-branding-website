"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/content/site";
import ImageHeading from "./ImageHeading";
import Magnetic from "./Magnetic";

const ease = [0.22, 1, 0.36, 1];
const up = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

export default function HeroHome() {
  const { hero } = site;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      {/* background: slow zoom on load, drifts down while scrolling */}
      <motion.div className="hero__bg" style={{ y: bgY }} aria-hidden="true">
        <motion.img src="/images/hero-bg.jpg" alt="" initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease }} />
      </motion.div>

      <motion.div className="container hero__inner" style={{ y: contentY, opacity: fade }}>
        <ImageHeading as="h1" onLoad src="/images/brands.png" alt={hero.title} width={1374} height={341}
          className="hero__brands" delay={0.3} />
        <motion.div className="hero__tagline" aria-hidden="true"
          initial={{ opacity: 0, scaleX: 1.35, filter: "blur(6px)" }}
          animate={{ opacity: 1, scaleX: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.75, ease }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/made-to-stand-out.png" alt="" width={764} height={97} />
        </motion.div>

        <motion.p className="hero__lead" {...up(1.05)}>
          {hero.lead.before}<strong className="accent">{hero.lead.highlight}</strong>{hero.lead.after}
        </motion.p>
        <motion.p className="hero__lead hero__lead--2" {...up(1.15)}>{hero.lead2}</motion.p>

        <motion.div className="hero__actions" {...up(1.3)}>
          <Magnetic><Link href="/work" className="btn btn--green btn--lg">{hero.button} <span aria-hidden="true">➔</span></Link></Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
