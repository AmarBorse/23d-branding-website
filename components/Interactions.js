"use client";
import { useEffect } from "react";

// Site-wide hover effects (desktop mouse only, off for "reduce motion"):
//  • project & service images tilt in 3D towards the cursor
//  • buttons are "magnetic": they lean towards the cursor and spring back
const TILT = ".wcard__media, .stile__media, .svc__img, [data-tilt]";
const MAGNET = ".btn, .cflow__btn, .footer__chat, .lightbox__close, [data-magnetic]";

export default function Interactions() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tiltEl = null;
    let magnetEl = null;

    const reset = (el) => { if (el) el.style.transform = ""; };

    const onMove = (e) => {
      const t = e.target instanceof Element ? e.target : null;

      // 3D tilt
      const tilt = t?.closest(TILT) || null;
      if (tilt !== tiltEl) { reset(tiltEl); if (tilt) tilt.classList.add("is-tilting"); tiltEl?.classList.remove("is-tilting"); tiltEl = tilt; }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg)`;
      }

      // magnetic buttons (the ones already wrapped in <Magnetic> are skipped)
      const mag = t?.closest(MAGNET) || null;
      const magnet = mag && !mag.closest(".magnetic") ? mag : null;
      if (magnet !== magnetEl) { reset(magnetEl); magnetEl = magnet; }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        magnet.style.transform = `translate(${(dx * 0.25).toFixed(1)}px, ${(dy * 0.35).toFixed(1)}px)`;
      }
    };

    const onLeave = () => { reset(tiltEl); tiltEl?.classList.remove("is-tilting"); reset(magnetEl); tiltEl = magnetEl = null; };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      onLeave();
    };
  }, []);

  return null;
}
