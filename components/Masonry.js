"use client";
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import ProjectCard from "./ProjectCard";

// Two staggered columns like Sarbat. Each project goes into the shorter column.
const PATTERN = ["tall", "wide", "wide", "wide", "tall", "wide", "tall", "wide"];
const H = { tall: 4 / 3, wide: 3 / 4 };

function columns(list) {
  const cols = [[], []], h = [0, 0];
  list.forEach((p, i) => {
    const ratio = p.ratio || PATTERN[i % PATTERN.length];
    const c = h[0] <= h[1] ? 0 : 1;
    cols[c].push({ p, ratio, i });
    h[c] += H[ratio] + 0.15;
  });
  return cols;
}

export default function Masonry({ projects, categories }) {
  const [active, setActive] = useState("All");
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);
  const cols = columns(list);

  return (
    <LayoutGroup>
      {categories && (
        <div className="filters" role="group" aria-label="Filter projects">
          {categories.map((c) => (
            <button key={c} className={`filter ${active === c ? "is-active" : ""}`} onClick={() => setActive(c)} aria-pressed={active === c}>
              {active === c && <motion.span layoutId="filter-pill" className="filter__pill" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="filter__label">{c}</span>
            </button>
          ))}
        </div>
      )}
      <div className="masonry">
        {cols.map((col, ci) => (
          <div className="masonry__col" key={ci}>
            <AnimatePresence mode="popLayout">
              {col.map(({ p, ratio, i }) => (
                <motion.div key={p.slug} layout
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                  <ProjectCard project={p} ratio={ratio} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </LayoutGroup>
  );
}
