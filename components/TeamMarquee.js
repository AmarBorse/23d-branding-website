"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";

const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };

// All team members in one endless sliding row.
// Slows down on hover, can be dragged, and the photo you point at lifts up.
export default function TeamMarquee({ team, speed = 2.2 }) {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const hover = useRef(false);
  const dragging = useRef(false);
  const rate = useRef(1);
  const trackRef = useRef(null);
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useAnimationFrame((_, delta) => {
    if (still || dragging.current) return;
    rate.current += ((hover.current ? 0.15 : 1) - rate.current) * 0.05;
    baseX.set(baseX.get() - speed * (delta / 1000) * rate.current);
  });

  // dragging moves the row by the same distance as the pointer
  const onPan = (_, info) => {
    const w = trackRef.current?.offsetWidth || 1;
    baseX.set(baseX.get() + (info.delta.x / w) * 100);
  };

  const card = (m, i, copy) => (
    <figure className="tcard" key={`${copy}-${i}`} aria-hidden={copy ? "true" : undefined}>
      <div className="tcard__photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={m.photo} alt={copy ? "" : `${m.name}, ${m.role}`} loading="lazy" draggable="false" />
      </div>
      <figcaption>
        <strong>{m.name}</strong>
        <span>{m.role}</span>
      </figcaption>
    </figure>
  );

  return (
    <motion.div className="team-marquee" onPan={onPan}
      onPanStart={() => (dragging.current = true)} onPanEnd={() => (dragging.current = false)}
      onMouseEnter={() => (hover.current = true)} onMouseLeave={() => (hover.current = false)}
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
      <motion.div className="team-marquee__track" ref={trackRef} style={{ x: still ? 0 : x }}>
        {team.map((m, i) => card(m, i, 0))}
        {team.map((m, i) => card(m, i, 1))}
      </motion.div>
    </motion.div>
  );
}
