"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";

const pillars = [
  { label: "Fait maison", sub: "Chaque jour" },
  { label: "Café de spécialité", sub: "Artisanal" },
  { label: "7j/7", sub: "Dès 10h" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="concept" ref={ref} className="py-28 md:py-40 bg-parchment overflow-hidden relative">
      {/* Watermark numeral */}
      <div
        className="absolute top-0 left-0 font-serif select-none pointer-events-none"
        style={{
          fontSize: "clamp(180px, 30vw, 420px)",
          lineHeight: 0.8,
          WebkitTextStroke: "1px rgba(44, 26, 14, 0.06)",
          color: "transparent",
        }}
        aria-hidden="true"
      >
        86
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Text side */}
          <div className="order-2 lg:order-1">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-ember">
                Notre concept
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-serif text-ink font-light leading-[1.05] mb-8"
              style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}
            >
              Un matin comme
              <br />
              <em className="italic text-ember">on les aime</em>
            </motion.h2>

            <motion.div variants={itemVariants} className="w-8 h-px bg-stone/30 mb-8" />

            <motion.p
              variants={itemVariants}
              className="font-sans text-ink/65 text-base leading-relaxed mb-10 max-w-lg"
            >
              Un lieu de vie chaleureux au cœur du Parc des Oblats. Chez L&apos;Adresse 86,
              chaque brunch est une invitation à ralentir, savourer, et profiter des choses
              simples — pain frais, œufs parfaits, café de spécialité.
            </motion.p>

            {/* Pillars */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-stone/20 pt-8"
            >
              {pillars.map((p) => (
                <div key={p.label}>
                  <p className="font-serif text-ink font-medium text-base sm:text-xl mb-1">{p.label}</p>
                  <p className="font-sans text-stone text-[10px] tracking-wide uppercase">{p.sub}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image side */}
          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 relative"
          >
            {/* Main image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/A7403289.jpg"
                alt="Douceurs de L'Adresse 86"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Overlapping secondary image — hidden on mobile to avoid overflow */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="hidden sm:block absolute -bottom-8 -left-8 w-44 h-52 md:w-52 md:h-64 overflow-hidden border-4 border-parchment shadow-2xl"
            >
              <Image
                src="/images/A7400225.jpg"
                alt="Café de spécialité L'Adresse 86"
                fill
                className="object-cover object-center"
                sizes="220px"
              />
            </motion.div>

            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-6 -right-4 bg-ember px-4 py-3 shadow-lg"
            >
              <p className="font-serif text-parchment text-2xl font-semibold leading-none">86</p>
              <p className="font-sans text-parchment/70 text-[9px] tracking-[0.15em] uppercase mt-0.5">
                Liège
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
