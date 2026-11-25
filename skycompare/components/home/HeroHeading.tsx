"use client";

import { motion } from "framer-motion";

export function HeroHeading() {
  return (
    <div className="max-w-3xl">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
      >
        Find the best flight deals. Compare before you fly.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
        className="mt-4 max-w-2xl text-base text-navy-100 sm:text-lg"
      >
        Compare flights from multiple airlines and booking platforms in one place.
      </motion.p>
    </div>
  );
}
