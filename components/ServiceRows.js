"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServiceRows({ services }) {
  return (
    <ul className="srows">
      {services.map((s, i) => (
        <motion.li key={s.title}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay: i * 0.06 }}>
          <Link href="/services" className="srow">
            <span className="srow__fill" aria-hidden="true" />
            <h3 className="srow__title">{s.title}</h3>
            <p className="srow__text">{s.text}</p>
            <p className="srow__tags">{s.tags.join(" · ")}</p>
            <span className="srow__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}