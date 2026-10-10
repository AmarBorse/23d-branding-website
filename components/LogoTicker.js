"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll, useVelocity, useSpring, useAnimationFrame } from "framer-motion";

const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };

// Endless row of client logos (like Sarbat). Speeds up while scrolling, slows on hover.
export default function LogoTicker({ clients, speed = 3 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [4, 0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const hover = useRef(false);
  const rate = useRef(1);
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useAnimationFrame((_, delta) => {
    if (still) return;
    rate.current += ((hover.current ? 0.2 : 1) - rate.current) * 0.06;
    baseX.set(baseX.get() - speed * (delta / 1000) * rate.current * (1 + Math.abs(boost.get())));
  });

  const set = (
    <div className="logos__set">
      {clients.map((c, i) =>
        c.logo
          // eslint-disable-next-line @next/next/no-img-element
          ? <img key={c.name} src={c.logo} alt={c.name} className="logos__img" />
          : <span key={c.name} className={`logos__word logos__word--${i % 4}`}>{c.name}</span>
      )}
    </div>
  );

  return (
    <div className="logos" aria-label="Clients" onMouseEnter={() => (hover.current = true)} onMouseLeave={() => (hover.current = false)}>
      <motion.div className="logos__track" style={{ x: still ? 0 : x }}>
        {set}
        <div aria-hidden="true">{set}</div>
      </motion.div>
    </div>
  );
}
