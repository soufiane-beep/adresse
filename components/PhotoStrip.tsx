"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const allPhotos = [
  { src: "/images/A7403397.jpg", alt: "Gaufre de Liège", caption: "Gaufre de Liège" },
  { src: "/images/A7401922.jpg", alt: "", caption: "" },
  { src: "/images/A7400225.jpg", alt: "Cloud Pistachio Latte", caption: "Pistachio Latte" },
  { src: "/images/A7403278.jpg", alt: "", caption: "" },
  { src: "/images/A7403452.jpg", alt: "Pink Coco Pitaya", caption: "Pink Coco Pitaya" },
  { src: "/images/A7401947.jpg", alt: "", caption: "" },
  { src: "/images/A7403289.jpg", alt: "Tentation aux Fruits Rouges", caption: "Fruits Rouges" },
  { src: "/images/A7403282.jpg", alt: "", caption: "" },
  { src: "/images/A7403335.jpg", alt: "Peanut Caramel Pancakes", caption: "Peanut Caramel" },
  { src: "/images/A7403293.jpg", alt: "", caption: "" },
  { src: "/images/A7403481.jpg", alt: "Smoothie Bowl", caption: "Smoothie Bowl" },
  { src: "/images/A7403304.jpg", alt: "", caption: "" },
  { src: "/images/A7400245.jpg", alt: "Salted Maple Matcha", caption: "Maple Matcha" },
  { src: "/images/A7403252.jpg", alt: "Mojito Classique", caption: "Mojito Classique" },
  { src: "/images/A7403316.jpg", alt: "", caption: "" },
  { src: "/images/A7400153.jpg", alt: "Matcha Red Velvet", caption: "Matcha Red Velvet" },
  { src: "/images/A7403331.jpg", alt: "", caption: "" },
  { src: "/images/A7403418.jpg", alt: "Avocado Eggs Toast", caption: "Avocado Eggs Toast" },
  { src: "/images/A7403334.jpg", alt: "", caption: "" },
  { src: "/images/A7403337.jpg", alt: "", caption: "" },
  { src: "/images/A7403345.jpg", alt: "", caption: "" },
  { src: "/images/A7403348.jpg", alt: "", caption: "" },
  { src: "/images/A7403355.jpg", alt: "", caption: "" },
  { src: "/images/A7403365.jpg", alt: "", caption: "" },
  { src: "/images/A7403369.jpg", alt: "", caption: "" },
  { src: "/images/A7403402.jpg", alt: "", caption: "" },
];

const row1 = allPhotos.slice(0, 13);
const row2 = allPhotos.slice(13);

function Strip({
  photos,
  direction,
  onClickPhoto,
  startIndex,
}: {
  photos: typeof allPhotos;
  direction: "left" | "right";
  onClickPhoto: (globalIndex: number) => void;
  startIndex: number;
}) {
  const doubled = [...photos, ...photos];
  return (
    <div className="overflow-hidden">
      <div
        className={direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}
        style={{ display: "flex", width: "max-content" }}
      >
        {doubled.map((photo, i) => {
          const originalIndex = i % photos.length;
          return (
            <button
              key={`${photo.src}-${i}`}
              className="relative flex-shrink-0 overflow-hidden group cursor-pointer"
              style={{ width: "240px", height: "240px", marginRight: "8px" }}
              onClick={() => onClickPhoto(startIndex + originalIndex)}
              aria-label={photo.caption ? `Voir ${photo.caption}` : "Voir la photo"}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                sizes="240px"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-all duration-400" />
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-4 h-px bg-ember mb-1.5" />
                  <p className="font-serif text-cream text-sm leading-tight">{photo.caption}</p>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PhotoStrip() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + allPhotos.length) % allPhotos.length)),
    []
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % allPhotos.length)),
    []
  );

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
    <>
      <section className="bg-surface py-10 overflow-hidden flex flex-col gap-2">
        <Strip photos={row1} direction="left" onClickPhoto={setActiveIndex} startIndex={0} />
        <Strip photos={row2} direction="right" onClickPhoto={setActiveIndex} startIndex={13} />
      </section>

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
                  src={allPhotos[activeIndex].src}
                  alt={allPhotos[activeIndex].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  {allPhotos[activeIndex].caption && (
                    <>
                      <div className="w-5 h-px bg-ember mb-2" />
                      <p className="font-serif text-cream text-xl">{allPhotos[activeIndex].caption}</p>
                    </>
                  )}
                </div>
                <p className="font-sans text-stone text-[10px] tracking-[0.2em] uppercase">
                  {activeIndex + 1} / {allPhotos.length}
                </p>
              </div>
            </motion.div>

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
    </>
  );
}
