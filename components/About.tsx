"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";

const pillars = [
  { label: "Fait maison", sub: "Chaque jour" },
  { label: "Café de spécialité", sub: "Artisanal" },
  { label: "Lun–Ven", sub: "9h–17h" },
  { label: "Week-end", sub: "10h–17h" },
  { label: "Soir Ven–Sam", sub: "18h30–21h30" },
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
            <motion.h2
              variants={itemVariants}
              className="font-serif text-ink font-light leading-[1.05] mb-4"
              style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}
            >
              Notre concept
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="font-sans font-black text-ember text-sm sm:text-base tracking-wide uppercase mb-8"
            >
              Un lieu, une pause, une émotion.
            </motion.p>

            <motion.div variants={itemVariants} className="w-8 h-px bg-stone/30 mb-8" />

            <motion.p
              variants={itemVariants}
              className="font-sans text-ink/65 text-base leading-relaxed mb-10 max-w-lg"
            >
              Un lieu chaleureux où l&apos;on vient prendre le temps de savourer. À L&apos;Adresse 86,
              chaque brunch est une parenthèse gourmande, entre produits frais, douceurs faites
              maison et café soigneusement préparé. Un endroit pensé pour se retrouver, partager
              et profiter simplement du moment.
            </motion.p>

            {/* Pillars */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-x-4 gap-y-8 border-t border-stone/20 pt-8"
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
                src="/images/new/A7406875.jpg"
                alt="Douceurs de L'Adresse 86"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

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
