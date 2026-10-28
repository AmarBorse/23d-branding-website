"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// Services accordion from the design: a title row with a ⊕ / ⊖ button.
// Opening a row shows the images, the description, what's included and "Ideal for".
// Several rows can be open at once. Links like /services#packaging open that row.
export default function ServiceList({ services, defaultOpen = [0] }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen));

  useEffect(() => {
    const id = window.location.hash.slice(1);
    const i = services.findIndex((s) => s.id === id);
    if (i < 0) return;
    setOpen(new Set([i]));
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
  }, [services]);

  const toggle = (i) => setOpen((prev) => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  return (
    <div className="svc">
      {services.map((s, i) => {
        const isOpen = open.has(i);
        return (
          <motion.div key={s.id} id={s.id} className={`svc__item ${isOpen ? "is-open" : ""}`}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.7, delay: i * 0.06, ease }}>
            <button type="button" className="svc__head" onClick={() => toggle(i)}
              aria-expanded={isOpen} aria-controls={`svc-${s.id}`}>
              <span className="svc__title">{s.title}</span>
              <span className="svc__icon" aria-hidden="true">
                <svg viewBox="0 0 36 36" width="36" height="36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path d="M10.5 18h15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <motion.path d="M18 10.5v15" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                    initial={false} animate={{ scaleY: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
                    style={{ originX: "18px", originY: "18px" }} transition={{ duration: 0.35, ease }} />
                </svg>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`svc-${s.id}`} className="svc__panel"
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ height: { duration: 0.7, ease }, opacity: { duration: 0.4 } }}>
                  <div className="svc__body">
                    <div className={`svc__gallery svc__gallery--${s.layout}`}>
                      {s.gallery.map((src, k) => (
                        <motion.div key={src} className={`svc__img svc__img--${k + 1}`}
                          initial={{ clipPath: "inset(100% 0% 0% 0%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                          transition={{ duration: 1, delay: 0.15 + k * 0.1, ease }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt={`${s.title} work by 23D Branding`} loading="lazy" />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div className="svc__copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.35, ease }}>
                      <p>{s.intro.before}<strong className="accent">{s.intro.highlight}</strong>{s.intro.after}</p>
                      {s.intro2 && <p>{s.intro2}</p>}
                    </motion.div>

                    <div className="svc__rule" />
                    <ul className="svc__list">
                      {s.items.map((item, k) => (
                        <motion.li key={item} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.45 + k * 0.04, ease }}>{item}</motion.li>
                      ))}
                    </ul>
                    <div className="svc__rule" />

                    <motion.div className="svc__ideal" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7, ease }}>
                      <h3>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/ideal-for.png" alt="Ideal for:" width={444} height={76} />
                      </h3>
                      <p>{s.ideal}</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
