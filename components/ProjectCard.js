"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Cover from "./Cover";

// Photo card like Sarbat: image + name underneath. On hover the image zooms and a second image fades in.
export default function ProjectCard({ project, ratio = "wide", index = 0 }) {
  return (
    <motion.article className="pcard"
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}>
      <Link href={`/work/${project.slug}`} className="pcard__link">
        <div className={`pcard__media pcard__media--${ratio}`}>
          <div className="pcard__img"><Cover project={project} /></div>
          <div className="pcard__img pcard__img--alt" aria-hidden="true"><Cover project={project} variant={1} /></div>
        </div>
        <h3 className="pcard__title">{project.title}</h3>
      </Link>
    </motion.article>
  );
}
