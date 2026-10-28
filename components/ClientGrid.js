"use client";
import { motion } from "framer-motion";

// White logo cards, popping in one after another.
export default function ClientGrid({ clients }) {
  return (
    <motion.ul className="clients__grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}>
      {clients.map((c) => (
        <motion.li key={c.name} className="clients__card"
          variants={{ hidden: { opacity: 0, y: 24, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } } }}>
          {c.logo
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={c.logo} alt={c.name} loading="lazy" />
            : <span className="clients__name">{c.name}</span>}
        </motion.li>
      ))}
    </motion.ul>
  );
}
