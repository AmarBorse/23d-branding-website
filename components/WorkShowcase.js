"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// "Our Work": three portrait images side by side. Hover zooms and shows the project name.
export default function WorkShowcase({ projects }) {
  return (
    <div className="wshow">
      {projects.map((p, i) => (
        <motion.article key={p.slug} className="wshow__item"
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1, delay: i * 0.12, ease }}>
          <Link href={`/work/${p.slug}`} className="wshow__link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.cover} alt={`${p.title} brand identity`} loading="lazy" />
            <span className="wshow__label"><span>{p.title}</span><span aria-hidden="true">➔</span></span>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
