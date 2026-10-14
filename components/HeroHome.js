"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import LogoTicker from "./LogoTicker";
import Magnetic from "./Magnetic";

const ease = [0.22, 1, 0.36, 1];
const up = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

export default function HeroHome() {
  const { hero } = site;
  const words = hero.title.split(" ");

  return (
    <section className="hero">
      <div className="container hero__inner">
        <motion.p className="hero__kicker" {...up(0.25)}>{site.fullName}</motion.p>

        {/* title: each word rises from behind a mask */}
        <motion.h1 className="hero__title" aria-label={hero.title}
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } } }}>
          {words.map((w, i) => (
            <span className="mask" key={i} aria-hidden="true">
              <motion.span className="mask__inner"
                variants={{ hidden: { y: "110%", rotate: 4 }, show: { y: "0%", rotate: 0, transition: { duration: 1, ease } } }}>
                {w}
              </motion.span>
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </motion.h1>

        <motion.p className="hero__lead" {...up(0.8)}>
          {hero.text.before}
          <span className="accent accent--draw">{hero.text.highlight}</span>
          {hero.text.after}
        </motion.p>

        {/* service tags pop in one by one */}
        <p className="hero__tags" aria-label={hero.tags.join(", ")}>
          {hero.tags.map((t, i) => (
            <motion.span key={t} aria-hidden="true" className="hero__tag"
              initial={{ opacity: 0, y: 12, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: 1 + i * 0.08 }}>
              {t}{i < hero.tags.length - 1 && <span className="hero__dot">·</span>}
            </motion.span>
          ))}
        </p>
      </div>

      <motion.div {...up(1.2)}><LogoTicker clients={site.clients} /></motion.div>

      <motion.div className="hero__actions" {...up(1.35)}>
        <Magnetic><Link href="/work" className="btn btn--orange">Explore Our Work</Link></Magnetic>
        <Magnetic><Link href="/services" className="btn btn--outline">Explore Our Services</Link></Magnetic>
      </motion.div>
    </section>
  );
}