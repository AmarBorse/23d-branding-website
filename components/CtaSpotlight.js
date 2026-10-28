"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/content/site";
import ImageHeading from "./ImageHeading";
import Magnetic from "./Magnetic";

const ease = [0.22, 1, 0.36, 1];

// "Have brand in mind?" banner: the spotlight switches on and swings slightly as you scroll.
export default function CtaSpotlight() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const swing = useTransform(scrollYProgress, [0, 1], [-7, 7]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="ctab" ref={ref}>
      <motion.div className="ctab__bg" style={{ y: bgY }} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/cta-bg.jpg" alt="" loading="lazy" />
      </motion.div>
      <motion.div className="ctab__light" style={{ rotate: swing }} aria-hidden="true">
        <motion.img src="/images/spotlight.png" alt="" loading="lazy"
          initial={{ opacity: 0 }} whileInView={{ opacity: [0, 0.9, 0.2, 1, 0.6, 1] }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.4, times: [0, 0.15, 0.25, 0.45, 0.55, 1] }} />
      </motion.div>

      <div className="container ctab__inner">
        <ImageHeading src="/images/have-brand-in-mind.png" alt={site.cta.ask} width={2258} height={202} className="ctab__title" delay={0.3} />
        <motion.p className="ctab__line" initial={{ opacity: 0, scaleX: 1.3 }} whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.6, ease }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/lets-make-it-happen.png" alt={site.cta.line} width={607} height={62} />
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8, ease }}>
          <Magnetic><Link href="/contact" className="btn btn--green">{site.cta.button}<span aria-hidden="true">➔</span></Link></Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
