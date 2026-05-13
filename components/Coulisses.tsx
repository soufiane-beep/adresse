"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const pillars = ["Produits frais du marché", "Recettes maison exclusives", "Préparé à la commande"];

export default function Coulisses() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-ink py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75 }}
            className="lg:w-2/5 flex-shrink-0"
          >
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-ember block mb-4">
              Dans nos cuisines
            </span>
            <h2
              className="font-serif text-parchment font-light leading-tight mb-8"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              Fait maison,<br />chaque matin
            </h2>
            <div className="w-10 h-px bg-ember mb-8" />
            <p className="font-sans text-parchment/55 text-sm leading-relaxed max-w-xs">
              Chaque assiette est préparée à la commande, avec des produits frais sélectionnés chaque semaine. Rien n&apos;est préfabriqué — tout naît ici, dans notre cuisine.
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
                  <span className="font-sans text-parchment/45 text-[10px] tracking-[0.2em] uppercase">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Photos — editorial grid */}
          <div className="lg:w-3/5 w-full flex-shrink-0">
            <div className="grid grid-cols-2 gap-2">

              {/* Large top photo — full width */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.1 }}
                className="col-span-2 relative overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src="/images/IMG_3575.jpg"
                  alt="Préparation en cuisine"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>

              {/* Bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.22 }}
                className="relative overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src="/images/IMG_3572.jpg"
                  alt="Finitions à la main"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
              </motion.div>

              {/* Bottom right */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.34 }}
                className="relative overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src="/images/A7403469.jpg"
                  alt="Dans votre assiette"
                  fill
                  className="object-cover object-bottom"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
