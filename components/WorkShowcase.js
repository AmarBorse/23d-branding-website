"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];
const spring = { type: "spring", stiffness: 170, damping: 28, mass: 1 };

// "Our Work": a curved row of five panels.
// The active project stands in the middle, the others step back on each side and turn towards you.
// Hovering an image tilts only that image towards the cursor.
// Controls: arrows, dots, swipe/drag, ← → keys, click a side panel.

// One panel that tilts towards the cursor while it is hovered.
function TiltCard({ children, disabled }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 16, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 160, damping: 16, mass: 0.5 });
  const rotateY = useTransform(sx, [-1, 1], [-16, 16]);
  const rotateX = useTransform(sy, [-1, 1], [10, -10]);
  const scale = useSpring(1, { stiffness: 200, damping: 20 });
  const onMove = (e) => {
    if (disabled || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  return (
    <motion.div className="cflow__tiltcard"
      style={{ rotateX, rotateY, scale, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerEnter={(e) => { if (!disabled && e.pointerType === "mouse") scale.set(1.04); }}
      onPointerLeave={() => { mx.set(0); my.set(0); scale.set(1); }}>
      {children}
    </motion.div>
  );
}
export default function WorkShowcase({ projects: all, autoplay = 4500 }) {
  const projects = all.filter((p) => p.featured !== false); // featured: false hides a project from the home slider
  const n = projects.length;
  // repeat the projects so there are always enough panels for both sides
  const ring = useMemo(() => {
    if (!n) return [];
    const copies = Math.ceil(7 / n);
    return Array.from({ length: copies * n }, (_, k) => ({ ...projects[k % n], _k: k }));
  }, [projects, n]);
  const L = ring.length;

  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ref = useRef(null);
  const dragged = useRef(false);
  const inView = useInView(ref, { amount: 0.4 });

  const go = useCallback((d) => setActive((a) => (a + d + L) % L), [L]);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (!autoplay || hover || !inView || reduce || n < 2) return;
    const t = setTimeout(() => go(1), autoplay);
    return () => clearTimeout(t);
  }, [active, hover, inView, reduce, autoplay, go, n]);

  if (!n) return null;

  const offsetOf = (i) => {
    let o = i - active;
    if (o > L / 2) o -= L;
    if (o < -L / 2) o += L;
    return o;
  };

  const maxSide = mobile ? 1 : 2;
  // panel positions on the curve: 0 = centre, ±1 = next, ±2 = outer
  const X = mobile ? [0, 96, 175] : [0, 102, 188];      // % of the centre panel width
  const S = [1, 0.86, 0.72];                           // size
  const R = [0, 16, 24];                               // turn towards the viewer (deg)
  const Z = [0, -60, -150];
  const place = (o) => {
    const a = Math.min(Math.abs(o), 3), s = Math.sign(o);
    if (a > maxSide) return { x: `${s * (X[maxSide] + 60)}%`, rotateY: -s * 30, z: -260, scale: 0.6, opacity: 0 };
    return { x: `${s * X[a]}%`, rotateY: -s * R[a], z: Z[a], scale: S[a], opacity: 1 };
  };

  const current = ring[active];
  const realIndex = active % n;

  return (
    <div
      ref={ref}
      className="cflow"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our work"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.div
        className="cflow__stage"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={() => { dragged.current = true; }}
        onDragEnd={(_, { offset, velocity }) => {
          const swipe = offset.x + velocity.x * 0.2;
          if (swipe < -50) go(1);
          else if (swipe > 50) go(-1);
          setTimeout(() => { dragged.current = false; }, 60);
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, ease }}
      >
        <div className="cflow__tilt">
          {ring.map((p, i) => {
            const o = offsetOf(i);
            const a = Math.abs(o);
            const isActive = o === 0;
            const shown = a <= maxSide;
            return (
              <motion.div
                key={p._k}
                className={`cflow__card ${isActive ? "is-active" : ""}`}
                style={{ zIndex: 10 - a, pointerEvents: shown ? "auto" : "none" }}
                initial={false}
                animate={place(o)}
                transition={reduce ? { duration: 0 } : spring}
                aria-hidden={!isActive}
              >
                <TiltCard disabled={reduce || !shown}>
                <Link
                  href={`/work/${p.slug}`}
                  className="cflow__link"
                  tabIndex={isActive ? 0 : -1}
                  draggable={false}
                  onClick={(e) => {
                    if (dragged.current) { e.preventDefault(); return; }
                    if (!isActive) { e.preventDefault(); setActive(i); }
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cover} alt={`${p.title} brand identity`} loading="lazy" draggable={false} />
                  <motion.span className="cflow__shade" aria-hidden="true"
                    initial={false} animate={{ opacity: [0, 0.12, 0.25][Math.min(a, 2)] }} transition={{ duration: 0.6 }} />
                </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="cflow__meta">
        <button type="button" className="cflow__btn" onClick={() => go(-1)} aria-label="Previous project">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M20 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="cflow__dots">
          {projects.map((p, i) => (
            <button key={p.slug} type="button" className={`cflow__dot ${i === realIndex ? "is-active" : ""}`}
              onClick={() => setActive(Math.floor(active / n) * n + i)}
              aria-label={`Show ${p.title}`} aria-current={i === realIndex ? "true" : undefined} />
          ))}
        </div>
        <Link href={`/work/${current.slug}`} className="cflow__open">View project <span aria-hidden="true">➔</span></Link>
        <button type="button" className="cflow__btn" onClick={() => go(1)} aria-label="Next project">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}
