"use client";
import { motion } from "framer-motion";

export default function Process({ steps }) {
  return (
    <ol className="process">
      {steps.map((s, i) => (
        <motion.li key={s.title} className="process__step"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: i * 0.08 }}>
          <span className="process__num">{String(i + 1).padStart(2, "0")}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}
