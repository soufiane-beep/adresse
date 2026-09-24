"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const allPhotos = [
  { src: "/images/A7403397.jpg", alt: "Gaufre de Liège", caption: "Gaufre de Liège", objectPosition: "center 60%" },
  { src: "/images/A7401922.jpg", alt: "", caption: "", objectPosition: "center 55%" },
  { src: "/images/A7400225.jpg", alt: "Cloud Pistachio Latte", caption: "Pistachio Latte", objectPosition: "center" },
  { src: "/images/A7403278.jpg", alt: "", caption: "", objectPosition: "center 70%" },
  { src: "/images/A7403452.jpg", alt: "Pink Coco Pitaya", caption: "Pink Coco Pitaya", objectPosition: "center" },
  { src: "/images/A7401947.jpg", alt: "", caption: "", objectPosition: "center 60%" },
  { src: "/images/A7403289.jpg", alt: "Tentation aux Fruits Rouges", caption: "Fruits Rouges", objectPosition: "center 65%" },
  { src: "/images/A7403282.jpg", alt: "", caption: "", objectPosition: "center 70%" },
  { src: "/images/A7403335.jpg", alt: "Peanut Caramel Pancakes", caption: "Peanut Caramel", objectPosition: "center 60%" },
  { src: "/images/A7403293.jpg", alt: "", caption: "", objectPosition: "center 70%" },
  { src: "/images/A7403481.jpg", alt: "Smoothie Bowl", caption: "Smoothie Bowl", objectPosition: "center" },
  { src: "/images/A7403304.jpg", alt: "", caption: "", objectPosition: "center 65%" },
  { src: "/images/A7400245.jpg", alt: "Salted Maple Matcha", caption: "Maple Matcha", objectPosition: "center" },
  { src: "/images/A7403252.jpg", alt: "Mojito Classique", caption: "Mojito Classique", objectPosition: "center" },
  { src: "/images/A7403316.jpg", alt: "", caption: "", objectPosition: "center 40%" },
  { src: "/images/A7400153.jpg", alt: "Matcha Red Velvet", caption: "Matcha Red Velvet", objectPosition: "center" },
  { src: "/images/A7403331.jpg", alt: "", caption: "", objectPosition: "center 80%" },
  { src: "/images/A7403418.jpg", alt: "Avocado Eggs Toast", caption: "Avocado Eggs Toast", objectPosition: "center 70%" },
  { src: "/images/A7403334.jpg", alt: "", caption: "", objectPosition: "center 55%" },
  { src: "/images/A7403337.jpg", alt: "", caption: "", objectPosition: "center 60%" },
  { src: "/images/A7403345.jpg", alt: "", caption: "", objectPosition: "center 55%" },
  { src: "/images/A7403348.jpg", alt: "", caption: "", objectPosition: "center 70%" },
  { src: "/images/A7403355.jpg", alt: "", caption: "", objectPosition: "center 55%" },
  { src: "/images/A7403365.jpg", alt: "", caption: "", objectPosition: "center 65%" },
  { src: "/images/A7403369.jpg", alt: "", caption: "", objectPosition: "center 60%" },
  { src: "/images/A7403402.jpg", alt: "", caption: "", objectPosition: "center 70%" },
];

const row1 = allPhotos.slice(0, 13);
const row2 = allPhotos.slice(13);

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 80,
    scale: 0.96,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: -dir * 80,
    scale: 0.96,
  }),
};

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
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ objectPosition: photo.objectPosition ?? "center" }}
                sizes="240px"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-all duration-400" />
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-4 h-px bg-ember mb-1.5" />
                  <p className="font-serif text-cream text-sm leading-tight">{photo.caption}</p>
                </div>
              )}
              {/* expand icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-cream/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PhotoStrip() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const directionRef = useRef(0);
  const [renderDir, setRenderDir] = useState(0);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    directionRef.current = -1;
    setRenderDir(-1);
    setActiveIndex((i) => (i === null ? null : (i - 1 + allPhotos.length) % allPhotos.length));
  }, []);

  const next = useCallback(() => {
    directionRef.current = 1;
    setRenderDir(1);
    setActiveIndex((i) => (i === null ? null : (i + 1) % allPhotos.length));
  }, []);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      if (info.offset.x < -60) next();
      else if (info.offset.x > 60) prev();
    },
    [next, prev]
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

  const photo = activeIndex !== null ? allPhotos[activeIndex] : null;

  return (
    <>
      <section id="galerie" className="bg-surface py-10 overflow-hidden flex flex-col gap-2">
        <Strip photos={row1} direction="left" onClickPhoto={setActiveIndex} startIndex={0} />
        <Strip photos={row2} direction="right" onClickPhoto={setActiveIndex} startIndex={13} />
      </section>

      <AnimatePresence>
        {activeIndex !== null && photo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: "rgba(26, 10, 5, 0.97)" }}
            onClick={close}
          >
            {/* Subtle grain overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Swipeable photo container */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              className="relative flex flex-col items-center w-full px-4 md:px-20"
              style={{ maxWidth: "1000px", cursor: "grab" }}
              whileDrag={{ cursor: "grabbing" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo with directional slide */}
              <AnimatePresence mode="wait" custom={renderDir}>
                <motion.div
                  key={activeIndex}
                  custom={renderDir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full"
                  style={{ height: "68vh" }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={photo.src}
                      alt={photo.alt || "Photo"}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 90vw"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Counter */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="mt-4 font-sans text-stone/40 text-[10px] tracking-[0.28em] uppercase tabular-nums self-end"
              >
                {String(activeIndex + 1).padStart(2, "0")} / {String(allPhotos.length).padStart(2, "0")}
              </motion.p>

              {/* Mobile swipe hint — fades out */}
              <motion.p
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 1.8, duration: 1.2 }}
                className="md:hidden mt-3 font-sans text-stone/30 text-[9px] tracking-[0.22em] uppercase select-none"
              >
                ← glisser pour naviguer →
              </motion.p>
            </motion.div>

            {/* Prev arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 group"
              aria-label="Photo précédente"
            >
              <div className="w-9 h-9 md:w-11 md:h-11 border border-cream/10 flex items-center justify-center group-hover:border-ember/50 group-hover:bg-ember/8 transition-all duration-300">
                <svg className="w-3.5 h-3.5 text-cream/35 group-hover:text-cream/80 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </button>

            {/* Next arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 group"
              aria-label="Photo suivante"
            >
              <div className="w-9 h-9 md:w-11 md:h-11 border border-cream/10 flex items-center justify-center group-hover:border-ember/50 group-hover:bg-ember/8 transition-all duration-300">
                <svg className="w-3.5 h-3.5 text-cream/35 group-hover:text-cream/80 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Close */}
            <button
              onClick={(e) => { e.stopPropagation(); close(); }}
              className="absolute top-4 right-4 group"
              aria-label="Fermer"
            >
              <div className="w-8 h-8 border border-cream/10 flex items-center justify-center group-hover:border-cream/30 transition-all duration-300">
                <svg className="w-3 h-3 text-cream/35 group-hover:text-cream/70 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
