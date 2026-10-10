"use client";
import { motion } from "framer-motion";

export default function ServiceRows({ services }) {
  return (
    <ul className="srows">
      {services.map((s, i) => (
        <motion.li key={s.title} className="srow"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay: i * 0.05 }}>
          <h3 className="srow__title">{s.title}</h3>
          <p className="srow__text">{s.text}</p>
          <p className="srow__tags">{s.tags.join(" · ")}</p>
        </motion.li>
      ))}
    </ul>
  );
}
