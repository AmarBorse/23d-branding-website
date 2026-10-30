"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll, useVelocity, useSpring, useAnimationFrame } from "framer-motion";
import { site } from "@/content/site";

const rise = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };

export default function Footer() {
  const chat = site.whatsapp || "/contact";
  const chatExternal = chat.startsWith("http");

  return (
    <footer className="footer">
      <div className="footer__wrap">
        <motion.div className="footer__top" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>
          <motion.div className="footer__brand" variants={rise}>
            <Link href="/" aria-label={`${site.fullName} home`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-23d.png" alt="23D Branding Solutions" width={252} height={139} className="footer__logo" />
            </Link>
            <p className="footer__tagline">
              {site.footer.tagline.before}<strong className="accent">{site.footer.tagline.highlight}</strong>
            </p>
            <p className="footer__copy">© {new Date().getFullYear()} {site.fullName}. All Rights Reserved.</p>
          </motion.div>

          <motion.nav className="footer__col" aria-label="Footer" variants={rise}>
            {site.footerNav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          </motion.nav>

          <motion.div className="footer__col" variants={rise}>
            {site.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}
          </motion.div>

          <motion.div className="footer__actions" variants={rise}>
            <Link href="/contact" className="btn btn--white-green">{site.footer.bookCall} <span aria-hidden="true">➔</span></Link>
            <a href={chat} className="footer__chat" aria-label="Chat with us"
              {...(chatExternal ? { target: "_blank", rel: "noreferrer" } : {})}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path fill="currentColor" d="M3 5.5A2.5 2.5 0 0 1 5.5 3h8A2.5 2.5 0 0 1 16 5.5v5a2.5 2.5 0 0 1-2.5 2.5H8.2L5 15.6V13h.5A2.5 2.5 0 0 1 3 10.5v-5Z" />
                <path fill="currentColor" d="M17.5 8H18a2.5 2.5 0 0 1 2.5 2.5v5A2.5 2.5 0 0 1 18 18h-.5v2.6L14.3 18H10a2.5 2.5 0 0 1-2.3-1.5h6.1a3.7 3.7 0 0 0 3.7-3.7V8Z" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
        <div className="footer__rule" />
      </div>

      <Marquee />
      <p className="footer__credit">{site.footer.credit}</p>
    </footer>
  );
}

const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };

// Giant "BRANDING 23D" sliding endlessly. Speeds up while you scroll, slows down on hover.
function Marquee({ speed = 2.2 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [5, 0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const hover = useRef(false);
  const rate = useRef(1);
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useAnimationFrame((_, delta) => {
    if (still) return;
    rate.current += ((hover.current ? 0.25 : 1) - rate.current) * 0.06;
    baseX.set(baseX.get() - speed * (delta / 1000) * rate.current * (1 + Math.abs(boost.get())));
  });

  const set = (
    <div className="marquee__set">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/footer-branding.png" alt="" className="marquee__word" loading="lazy" draggable="false" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/footer-23d.png" alt="" className="marquee__word" loading="lazy" draggable="false" />
    </div>
  );

  return (
    <div className="footer__giant marquee" aria-hidden="true"
      onMouseEnter={() => (hover.current = true)} onMouseLeave={() => (hover.current = false)}>
      <motion.div className="marquee__track" style={{ x: still ? 0 : x }}>
        {set}{set}
      </motion.div>
    </div>
  );
}
