"use client";
import { motion } from "framer-motion";
import ImageHeading from "./ImageHeading";

const ease = [0.22, 1, 0.36, 1];
// tile positions from the design (PDF points; the hero is 1024 × 535)
const tiles = [
  [239, 0, 506, 190], [744, 0, 1024, 190], [0, 190, 238, 535],
  [506, 190, 744, 347], [239, 347, 506, 534], [744, 347, 1024, 535],
];

// Our Work hero: a dark collage of project images behind the green lettering.
export default function WorkHero({ text }) {
  return (
    <section className="whero">
      <div className="whero__tiles" aria-hidden="true">
        {tiles.map(([x0, y0, x1, y1], i) => (
          <motion.div key={i} className="whero__tile"
            style={{ left: `${(x0 / 1024) * 100}%`, top: `${(y0 / 535) * 100}%`, width: `${((x1 - x0) / 1024) * 100}%`, height: `${((y1 - y0) / 535) * 100}%` }}
            initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.1 + i * 0.08, ease }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/work/hero-tile-${i + 1}.jpg`} alt="" />
          </motion.div>
        ))}
      </div>
      <div className="container whero__inner">
        <ImageHeading as="h1" onLoad src="/images/our-work.png" alt="Our Work" width={1208} height={216} className="whero__title" delay={0.5} />
        <motion.p className="whero__text" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease }}>{text}</motion.p>
      </div>
    </section>
  );
}
