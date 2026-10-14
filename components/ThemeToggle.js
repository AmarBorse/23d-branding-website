"use client";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import s from "./ThemeToggle.module.css";

// Day / night switch. The new theme spreads out in a circle from the button.
// Remembers the visitor's choice; until they choose, follows their device setting.
export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setDark(root.dataset.theme === "dark");

    // Follow the device setting live, unless the visitor picked a theme themselves.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = (e) => {
      let saved = null;
      try { saved = localStorage.getItem("theme"); } catch {}
      if (saved) return;
      root.dataset.theme = e.matches ? "dark" : "light";
      setDark(e.matches);
    };
    mq.addEventListener("change", onSystem);
    return () => mq.removeEventListener("change", onSystem);
  }, []);

  const toggle = (e) => {
    const next = dark ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch {}
      setDark(next === "dark");
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) { apply(); return; }

    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => flushSync(apply));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  return (
    <button type="button" className={`${s.toggle} ${className}`} onClick={toggle}
      aria-label={dark ? "Switch to day mode" : "Switch to night mode"} title={dark ? "Day mode" : "Night mode"}>
      {/* sun: shown in night mode */}
      <svg className={`${s.icon} ${s.sun}`} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <g strokeLinecap="round">
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </g>
      </svg>
      {/* moon: shown in day mode */}
      <svg className={`${s.icon} ${s.moon}`} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
      </svg>
    </button>
  );
}
