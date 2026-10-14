"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// Cards rise in one after another; an orange line draws across the top of each.
export default function Process({ steps }) {
  return (
    <ol className="process">
      {steps.map((s, i) => (
        <motion.li key={s.title} className="process__step"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, delay: i * 0.12, ease }}>
          <motion.span className="process__line" aria-hidden="true"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease }} />
          <span className="process__num">{String(i + 1).padStart(2, "0")}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}