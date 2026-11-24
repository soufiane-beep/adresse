"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { BOOKING_URL, handleBookingClick } from "@/lib/booking";

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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75 }}
            className="lg:col-span-2"
          >
            <span className="inline-flex items-center gap-2 font-sans font-black text-xs tracking-[0.35em] uppercase bg-ember text-parchment px-4 py-2.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-parchment animate-pulse-slow" />
              Dernière soirée · Sam. 28 nov.
            </span>
            <h2
              className="font-serif text-cream font-light leading-tight mb-8"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              Une dernière nuit,<br />avant de revenir
            </h2>
            <div className="w-10 h-px bg-ember mb-8" />
            <p className="font-sans text-cream/55 text-sm leading-relaxed max-w-xs">
              Ce samedi 28 novembre, de 18h30 à 21h30, on vous sert le dernier soir de la première édition de nos soirées : kémias à partager, Medina Roll doré, formules généreuses et cocktails maison.
            </p>
            <p className="font-sans text-cream/80 text-sm leading-relaxed max-w-xs mt-4">
              Merci d&apos;être venus si nombreux. Les soirées font une courte pause et reviennent très prochainement.
            </p>

            <div className="mt-12 flex flex-col gap-5">
              {pillars.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1 h-1 rounded-full bg-ember flex-shrink-0" />
                  <span className="font-sans text-cream/45 text-[10px] tracking-[0.2em] uppercase">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
              className="mt-12 flex flex-col items-start gap-6"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBookingClick}
                className="group relative inline-flex items-center gap-4 font-sans text-[11px] tracking-[0.3em] uppercase"
              >
                <span className="relative z-10 bg-ember text-parchment px-10 py-5 group-hover:bg-ember-light transition-colors duration-500">
                  Réserver pour samedi
                </span>
                <span className="absolute -bottom-1 -right-1 w-full h-full border border-parchment/20 group-hover:border-ember/40 transition-colors duration-500" />
              </a>
              <a
                href="/menu/soir"
                className="font-sans text-[11px] tracking-[0.3em] uppercase text-cream/70 border-b border-cream/30 pb-1 hover:text-cream hover:border-ember transition-colors duration-300"
              >
                Découvrir le menu du soir
              </a>
            </motion.div>
          </motion.div>

          {/* Photos — 2x2 grid */}
          <div className="lg:col-span-3 w-full">
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
