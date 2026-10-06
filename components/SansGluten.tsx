"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const photos = [
  { src: "/images/sans-gluten-boulet.jpg", alt: "Boulet liégeois façon 86, version sans gluten", objectPosition: "center 30%" },
  { src: "/images/sans-gluten-salades.jpg", alt: "Salade du souk, assortiment de salades marocaines", objectPosition: "center" },
  { src: "/images/sans-gluten-pain-perdu.jpg", alt: "Pain perdu, fruits frais", objectPosition: "center" },
  { src: "/images/sans-gluten-tartine.jpg", alt: "Tartine garnie et œufs", objectPosition: "center 40%" },
];

const items = [
  { name: "Boulet liégeois façon 86", note: "Option sans gluten", price: "+3€" },
  { name: "Burger 86", note: "Option sans gluten", price: "+5€" },
  { name: "Les pâtes du 86", note: "Option sans gluten", price: "+3€" },
  { name: "Salade du souk", note: "Naturellement sans gluten", price: null },
];

export default function SansGluten() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-paper py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75 }}
            className="lg:col-span-2"
          >
            <span className="inline-flex items-center gap-2 font-sans font-black text-xs tracking-[0.35em] uppercase bg-ember text-parchment px-4 py-2.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-parchment" />
              Sans gluten &amp; sans lactose
            </span>
            <h2
              className="font-serif text-ink font-light leading-tight mb-8"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              Un menu pensé<br />pour tous
            </h2>
            <div className="w-10 h-px bg-ember mb-8" />
            <p className="font-sans text-stone text-sm leading-relaxed max-w-xs">
              Plusieurs de nos plats signature peuvent être préparés sans gluten, sur simple demande, pour que chacun profite de L&apos;Adresse 86 sans compromis.
            </p>

            <div className="mt-12 flex flex-col gap-5">
              {items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-baseline justify-between gap-4"
                >
                  <div className="flex items-baseline gap-3">
                    <div className="w-1 h-1 rounded-full bg-ember flex-shrink-0" />
                    <span className="font-sans text-ink text-sm">{item.name}</span>
                    <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-stone">
                      {item.note}
                    </span>
                  </div>
                  {item.price && (
                    <span className="font-serif text-ember text-sm flex-shrink-0">{item.price}</span>
                  )}
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
                href="/menu"
                className="group relative inline-flex items-center gap-4 font-sans text-[11px] tracking-[0.3em] uppercase"
              >
                <span className="relative z-10 bg-ember text-parchment px-10 py-5 group-hover:bg-ember-light transition-colors duration-500">
                  Voir le menu complet
                </span>
                <span className="absolute -bottom-1 -right-1 w-full h-full border border-ink/15 group-hover:border-ember/40 transition-colors duration-500" />
              </a>
            </motion.div>
          </motion.div>

          {/* Photos — 2x2 grid */}
          <div className="lg:col-span-3">
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
