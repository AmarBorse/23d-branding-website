"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { site } from "@/content/site";
import ImageHeading from "./ImageHeading";
import Magnetic from "./Magnetic";
import FluidBg from "./FluidBg";

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

  // mouse parallax: the smoke drifts one way, the lettering the other
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const bgMx = useTransform(mx, (v) => v * -22);
  const bgMy = useTransform(my, (v) => v * -16);
  const fgMx = useTransform(mx, (v) => v * 14);
  const fgMy = useTransform(my, (v) => v * 10);
  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section className="hero" ref={ref} onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0); }}>
      {/* background: slow zoom on load, drifts down while scrolling */}
      <motion.div className="hero__bg" style={{ y: bgY }} aria-hidden="true">
        <motion.div className="hero__bg-move" style={{ x: bgMx, y: bgMy }}>
          <div className="hero__breathe">
            <motion.img src="/images/hero-bg.jpg" alt="" initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.2, ease }} />
          </div>
        </motion.div>
        {/* live flowing smoke on top of the photo */}
        <FluidBg className="hero__fluid" />
      </motion.div>

      <motion.div className="container hero__inner" style={{ y: contentY, opacity: fade }}>
        <motion.div style={{ x: fgMx, y: fgMy }} className="hero__float">
        <ImageHeading as="h1" onLoad src="/images/brands.png" alt={hero.title} width={1374} height={341}
          className="hero__brands" delay={0.3} />
        <motion.div className="hero__tagline" aria-hidden="true"
          initial={{ opacity: 0, scaleX: 1.35, filter: "blur(6px)" }}
          animate={{ opacity: 1, scaleX: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.75, ease }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/made-to-stand-out.png" alt="" width={764} height={97} />
        </motion.div>
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
