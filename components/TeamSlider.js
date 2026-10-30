"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];
const spring = { type: "spring", stiffness: 280, damping: 32, mass: 0.8 };

// Team slider: one large photo in the middle, smaller photos on each side.
// Moves on by itself every few seconds (loops forever), pauses on hover.
// Swipe/drag, click a side photo, use the dots, or ← → keys.
export default function TeamSlider({ team, interval = 2000 }) {
  const n = team.length;
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ref = useRef(null);
  const prevOffsets = useRef({});
  const dragged = useRef(false);
  const inView = useInView(ref, { amount: 0.3 });

  const go = useCallback((d) => setActive((a) => (a + d + n) % n), [n]);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  useEffect(() => {
    if (hover || !inView || reduce || n < 2) return;
    const t = setTimeout(() => go(1), interval);
    return () => clearTimeout(t);
  }, [active, hover, inView, reduce, interval, go, n]);

  const offsetOf = (i) => {
    let o = i - active;
    if (o > n / 2) o -= n;
    if (o < -n / 2) o += n;
    return o;
  };
  // distance from the centre, in % of the big photo's width.
  // Equal gaps everywhere: big photo 100%, side photos 65%, gap 12%.
  const X = [0, 94.5, 171.5, 248.5, 325.5];
  const visible = mobile ? 1 : 2; // photos shown on each side
  const place = (o) => {
    const a = Math.min(Math.abs(o), 4), s = Math.sign(o);
    return { x: `${s * X[a]}%`, scale: a === 0 ? 1 : 0.65, opacity: a > visible ? 0 : 1 };
  };
  const current = team[active];

  return (
    <div ref={ref} className="tslider" role="region" aria-roledescription="carousel" aria-label="Our team" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <motion.div className="tslider__stage"
        drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12} dragMomentum={false}
        onDragStart={() => { dragged.current = true; }}
        onDragEnd={(_, { offset, velocity }) => {
          const swipe = offset.x + velocity.x * 0.2;
          if (swipe < -50) go(1); else if (swipe > 50) go(-1);
          setTimeout(() => { dragged.current = false; }, 60);
        }}
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease }}>
        {team.map((m, i) => {
          const o = offsetOf(i);
          const a = Math.abs(o);
          // a photo that wraps round from one end to the other jumps instantly (hidden), instead of flying across
          const prev = prevOffsets.current[i];
          const jump = prev !== undefined && Math.abs(prev - o) > 1;
          prevOffsets.current[i] = o;
          return (
            <motion.button type="button" key={m.photo} className={`tslider__card ${o === 0 ? "is-active" : ""}`}
              style={{ zIndex: 10 - a, pointerEvents: a > visible ? "none" : "auto" }}
              initial={false} animate={place(o)} transition={reduce || jump ? { duration: 0 } : spring}
              tabIndex={-1} aria-hidden={o !== 0}
              onClick={() => { if (!dragged.current && o !== 0) setActive(i); }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.photo} alt={o === 0 ? `${m.name}, ${m.role}` : ""} loading="lazy" draggable="false" />
            </motion.button>
          );
        })}
      </motion.div>

      <div className="tslider__caption" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}>
            <strong>{current.name}</strong>
            <span>{current.role}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="tslider__dots">
        {team.map((m, i) => (
          <button key={m.photo} type="button" className={`tslider__dot ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)} aria-label={`Show ${m.name}`} aria-current={i === active ? "true" : undefined} />
        ))}
      </div>
    </div>
  );
}
