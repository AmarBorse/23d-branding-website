"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// One service photo: opens bottom-to-top, drifts on scroll, zooms on hover.
function Tile({ s, ratio, index = 0, wide = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-2.5%", "2.5%"]);
  return (
    <motion.figure ref={ref} className={`stile ${wide ? "stile--wide" : ""}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      <Link href="/services" className="stile__link" aria-label={s.title}>
        <motion.div className="stile__media" style={{ aspectRatio: ratio }}
          variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, delay: (index % 2) * 0.12, ease } } }}>
          <motion.div className="stile__parallax" style={{ y }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt={`${s.title} by 23D Branding`} loading="lazy" />
          </motion.div>
        </motion.div>
        <motion.figcaption className="stile__cap"
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.45 + (index % 2) * 0.12, ease } } }}>
          {s.title}<span className="stile__arrow" aria-hidden="true">➔</span>
        </motion.figcaption>
      </Link>
    </motion.figure>
  );
}

// "What we do" grid from the design:
// left column: Brand Identity (tall) + Social Media; right column: Web + Packaging; Brochure full width below.
export default function ServiceGallery({ services }) {
  const [brand, web, social, pack, brochure] = services;
  return (
    <div className="sgrid">
      <div className="sgrid__cols">
        <div className="sgrid__col">
          <Tile s={brand} ratio="395 / 584" index={0} />
          <Tile s={social} ratio="395 / 342" index={0} />
        </div>
        <div className="sgrid__col">
          <Tile s={web} ratio="430 / 516" index={1} />
          <Tile s={pack} ratio="430 / 389" index={1} />
        </div>
      </div>
      {brochure && <Tile s={brochure} ratio="861 / 356" wide />}
    </div>
  );
}
