"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import LogoTicker from "./LogoTicker";

const ease = [0.22, 1, 0.36, 1];
const up = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

export default function HeroHome() {
  const { hero } = site;
  return (
    <section className="hero">
      <div className="container hero__inner">
        <motion.p className="hero__kicker" {...up(0.3)}>{site.fullName}</motion.p>
        <motion.h1 className="hero__title" {...up(0.42)}>{hero.title}</motion.h1>
        <motion.p className="hero__lead" {...up(0.55)}>
          {hero.text.before}<span className="accent">{hero.text.highlight}</span>{hero.text.after}
        </motion.p>
        <motion.p className="hero__tags" {...up(0.65)}>{hero.tags.join(" · ")}</motion.p>
      </div>

      <motion.div {...up(0.8)}><LogoTicker clients={site.clients} /></motion.div>

      <motion.div className="hero__actions" {...up(0.95)}>
        <Link href="/work" className="btn btn--orange">Explore Our Work</Link>
        <Link href="/services" className="btn btn--outline">Explore Our Services</Link>
      </motion.div>
    </section>
  );
}
