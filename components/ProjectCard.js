"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Cover from "./Cover";

const ease = [0.22, 1, 0.36, 1];

// Project photo card:
// - unveils bottom-to-top when scrolled into view
// - drifts with a soft parallax while scrolling
// - on hover: zooms, swaps to a second image, and a "View" badge follows the mouse
export default function ProjectCard({ project, ratio = "wide", index = 0 }) {
  const ref = useRef(null);
  const mediaRef = useRef(null);
  const [hover, setHover] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const bx = useSpring(useMotionValue(0), { stiffness: 400, damping: 30, mass: 0.4 });
  const by = useSpring(useMotionValue(0), { stiffness: 400, damping: 30, mass: 0.4 });
  const onMove = (e) => {
    const r = mediaRef.current.getBoundingClientRect();
    bx.set(e.clientX - r.left);
    by.set(e.clientY - r.top);
  };

  return (
    <motion.article ref={ref} className="pcard"
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      <Link href={`/work/${project.slug}`} className="pcard__link">
        <motion.div
          ref={mediaRef}
          className={`pcard__media pcard__media--${ratio}`}
          variants={{
            hidden: { clipPath: "inset(100% 0% 0% 0%)" },
            show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, delay: (index % 2) * 0.12, ease } },
          }}
          onMouseEnter={(e) => { onMove(e); setHover(true); }}
          onMouseMove={onMove}
          onMouseLeave={() => setHover(false)}
        >
          <motion.div className="pcard__parallax" style={{ y }}>
            <div className="pcard__img"><Cover project={project} /></div>
            <div className="pcard__img pcard__img--alt" aria-hidden="true"><Cover project={project} variant={1} /></div>
          </motion.div>

          <AnimatePresence>
            {hover && (
              <motion.span className="pcard__view" style={{ x: bx, y: by }} aria-hidden="true"
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}>
                View
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.h3 className="pcard__title"
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4 + (index % 2) * 0.12, ease } },
          }}>
          {project.title}
        </motion.h3>
      </Link>
    </motion.article>
  );
}