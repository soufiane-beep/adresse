"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const photos = [
  { src: "/images/soir/A7407031.jpg", alt: "Table dressée pour le service du soir", objectPosition: "center 35%" },
  { src: "/images/soir/A7407019.jpg", alt: "Kémias et plats à partager, ambiance tamisée", objectPosition: "center" },
  { src: "/images/soir/A7406961.jpg", alt: "Cocktail maison et Medina Roll", objectPosition: "center" },
  { src: "/images/soir/A7407015.jpg", alt: "Burger signature du soir", objectPosition: "center 30%" },
];

const pillars = ["Kémias à partager", "Cocktails maison", "Ambiance tamisée"];

export default function Nouveaute() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-ink py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75 }}
            className="lg:w-2/5 flex-shrink-0"
          >
            <span className="inline-flex items-center gap-2 font-sans text-[9px] tracking-[0.35em] uppercase bg-ember text-parchment px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-parchment animate-pulse-slow" />
              C&apos;est nouveau
            </span>
            <h2
              className="font-serif text-parchment font-light leading-tight mb-8"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              Après le jour,<br />place à la nuit
            </h2>
            <div className="w-10 h-px bg-ember mb-8" />
            <p className="font-sans text-parchment/55 text-sm leading-relaxed max-w-xs">
              L&apos;Adresse 86 se réinvente à la tombée du jour : kémias à partager, Medina Roll doré, formules généreuses et cocktails maison, entre saveurs marocaines et créations signature.
            </p>

            <div className="mt-12 flex flex-col gap-5">
              {pillars.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1 h-1 rounded-full bg-ember flex-shrink-0" />
                  <span className="font-sans text-parchment/45 text-[10px] tracking-[0.2em] uppercase">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
              className="mt-12"
            >
              <a
                href="/menu/soir"
                className="group relative inline-flex items-center gap-4 font-sans text-[11px] tracking-[0.3em] uppercase"
              >
                <span className="relative z-10 bg-ember text-ink px-10 py-5 group-hover:bg-ember-light transition-colors duration-500">
                  Découvrir le menu du soir
                </span>
                <span className="absolute -bottom-1 -right-1 w-full h-full border border-parchment/20 group-hover:border-ember/40 transition-colors duration-500" />
              </a>
            </motion.div>
          </motion.div>

          {/* Photos — 2x2 grid */}
          <div className="lg:w-3/5 w-full flex-shrink-0">
            <div className="grid grid-cols-2 gap-2">
              {photos.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.75, delay: 0.1 + i * 0.12 }}
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ objectPosition: photo.objectPosition }}
                    sizes="(max-width: 1024px) 50vw, 30vw"
                  />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
