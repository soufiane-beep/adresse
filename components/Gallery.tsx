"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const photos = [
  { src: "/images/A7403397.jpg", alt: "Gaufre de Liège", caption: "Gaufre de Liège", size: "col-span-2 row-span-2" },
  { src: "/images/A7400225.jpg", alt: "Cloud Pistachio Latte", caption: "Pistachio Latte", size: "col-span-1 row-span-1" },
  { src: "/images/A7403452.jpg", alt: "Pink Coco Pitaya", caption: "Pink Coco Pitaya", size: "col-span-1 row-span-1" },
  { src: "/images/A7403289.jpg", alt: "Tentation aux Fruits Rouges", caption: "Fruits Rouges", size: "col-span-1 row-span-1" },
  { src: "/images/A7403335.jpg", alt: "Peanut Caramel Pancakes", caption: "Peanut Caramel", size: "col-span-1 row-span-1" },
  { src: "/images/A7403481.jpg", alt: "Smoothie Bowl", caption: "Smoothie Bowl", size: "col-span-1 row-span-1" },
  { src: "/images/A7400245.jpg", alt: "Salted Maple Matcha", caption: "Maple Matcha", size: "col-span-1 row-span-1" },
  { src: "/images/A7403252.jpg", alt: "Mojito Classique", caption: "Mojito Classique", size: "col-span-2 row-span-1" },
  { src: "/images/A7400153.jpg", alt: "Matcha Red Velvet", caption: "Matcha Red Velvet", size: "col-span-1 row-span-1" },
  { src: "/images/A7403418.jpg", alt: "Avocado Eggs Toast", caption: "Avocado Eggs Toast", size: "col-span-1 row-span-1" },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, prev, next]);

  return (
    <section id="galerie" ref={ref} className="py-28 md:py-40 bg-parchment overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-ember block mb-4">
              L&apos;atmosphère
            </span>
            <h2
              className="font-serif text-ink font-light leading-tight"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            >
              Galerie
            </h2>
          </div>
          <a
            href="https://www.instagram.com/ladresse86/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.2em] uppercase text-stone hover:text-ink transition-colors duration-300 group"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span>@ladresse86</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3"
          style={{ gridAutoRows: "clamp(140px, 20vw, 220px)" }}
        >
          {photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden group cursor-pointer text-left ${photo.size}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Voir ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/45 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <div className="w-5 h-px bg-ember mb-2" />
                <p className="font-serif text-cream text-base font-medium leading-tight">{photo.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-sm flex items-center justify-center"
            onClick={close}
          >
            {/* Image */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[85vh] mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ maxHeight: "80vh", aspectRatio: "4/3" }}>
                <Image
                  src={photos[activeIndex].src}
                  alt={photos[activeIndex].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>

              {/* Caption */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="w-5 h-px bg-ember mb-2" />
                  <p className="font-serif text-cream text-xl">{photos[activeIndex].caption}</p>
                </div>
                <p className="font-sans text-stone text-[10px] tracking-[0.2em] uppercase">
                  {activeIndex + 1} / {photos.length}
                </p>
              </div>
            </motion.div>

            {/* Prev / Next */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-cream/60 hover:text-cream transition-colors duration-200"
              aria-label="Photo précédente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-cream/60 hover:text-cream transition-colors duration-200"
              aria-label="Photo suivante"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Close */}
            <button
              onClick={close}
              className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors duration-200"
              aria-label="Fermer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
