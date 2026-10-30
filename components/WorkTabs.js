"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// Tabs with the sketch on the left (as in the design). Choosing a tab swaps the projects
// with an animation. Click a project to see it large. Links like /work#packaging open that tab.
export default function WorkTabs({ categories }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    const i = categories.findIndex((c) => c.id === window.location.hash.slice(1));
    if (i >= 0) setActive(i);
  }, [categories]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  const choose = (i) => {
    setActive(i);
    history.replaceState(null, "", `#${categories[i].id}`);
  };
  const cat = categories[active];

  return (
    <div className="wtabs">
      <div className="wtabs__head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/work/illustration-work.png" alt="" className="wtabs__art" />
        <span className="wtabs__rule" aria-hidden="true" />
        <div className="wtabs__list" role="tablist" aria-label="Services">
          {categories.map((c, i) => (
            <button key={c.id} type="button" role="tab" id={`tab-${c.id}`} aria-selected={i === active} aria-controls="work-panel"
              className={`wtabs__tab wtabs__tab--${i} ${i === active ? "is-active" : ""}`} onClick={() => choose(i)}>
              {c.label}
              {i === active && <motion.span layoutId="wtab-dot" className="wtabs__dot" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            </button>
          ))}
        </div>
      </div>

      <div id="work-panel" role="tabpanel" aria-labelledby={`tab-${cat.id}`} className="wtabs__panel">
        <AnimatePresence mode="wait">
          <motion.ul key={cat.id} className={`wgrid wgrid--${cat.layout}`}
            initial="hidden" animate="show" exit="exit"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } }, exit: { transition: { staggerChildren: 0.04 } } }}>
            {cat.items.map((it) => (
              <motion.li key={it.image + it.title} className="wcard"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
                }}>
                <button type="button" className="wcard__btn" onClick={() => setZoom(it)} aria-label={`View ${it.title} larger`}>
                  <motion.span className="wcard__media" style={{ aspectRatio: cat.ratio }}
                    variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.9, ease } } }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.image} alt={`${it.title}, ${cat.label} by 23D Branding`} loading="lazy" style={it.position ? { objectPosition: it.position } : undefined} />
                  </motion.span>
                </button>
                <p className="wcard__title">{it.title}</p>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={zoom.title}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoom(null)}>
            <motion.figure initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.45, ease }} onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={zoom.image} alt={zoom.title} />
              <figcaption>{zoom.title}</figcaption>
            </motion.figure>
            <button type="button" className="lightbox__close" onClick={() => setZoom(null)} aria-label="Close">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
