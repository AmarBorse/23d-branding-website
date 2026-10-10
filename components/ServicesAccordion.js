"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ServicesAccordion({ services }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="acc">
      {services.map((s, i) => {
        const isOpen = open === i;
        return (
          <motion.div key={s.title} className={`acc__item ${isOpen ? "is-open" : ""}`}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}>
            <button className="acc__head" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`acc-${i}`}>
              <span className="acc__title">{s.title}</span>
              <motion.span className="acc__icon" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} aria-hidden="true">+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`acc-${i}`} className="acc__body"
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="acc__content">
                    <p>{s.text}</p>
                    <ul className="tags">
                      {s.tags.map((d, j) => (
                        <motion.li key={d} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + j * 0.05 }}>{d}</motion.li>
                      ))}
                    </ul>
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
