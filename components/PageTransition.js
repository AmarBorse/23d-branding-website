"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1];
let firstLoad = true; // the intro screen covers the very first page

// New page: a black curtain with a green edge sweeps up, the page rises in behind it.
export default function PageTransition({ children }) {
  const [curtain] = useState(() => !firstLoad);
  useEffect(() => { firstLoad = false; }, []);

  return (
    <>
      {curtain && (
        <motion.div className="curtain" aria-hidden="true"
          initial={{ y: "0%" }} animate={{ y: "-100%" }}
          transition={{ duration: 0.85, ease, delay: 0.05 }}>
          <span className="curtain__edge" />
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: curtain ? 60 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: curtain ? 0.25 : 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}
