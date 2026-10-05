"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const signatures = [
  {
    name: "Moroccan Breakfast",
    description:
      "Msemen accompagné de miel, fromage frais, 2 œufs au plat, pain, smoothie & boisson chaude (thé marocain ou café au lait).",
    price: "15",
    badge: "Best Seller",
    image: "IMG_4213.JPG",
    objectPosition: "center 85%",
    imageLeft: true,
  },
  {
    name: "Sweet Chicken Waffle",
    description:
      "Gaufre de Bruxelles, poulet caramélisé, crudités, oignons crispy, crumble de cacahuètes & sirop d'érable. Le mariage sucré-salé signature 86.",
    price: "14",
    badge: null,
    image: "IMG_3256 19.15.09.jpg",
    objectPosition: "center 40%",
    imageAspect: "aspect-[4/5]",
    imageLeft: false,
  },
];

export default function Signatures() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 md:py-40 bg-parchment overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mb-20"
        >
          <h2
            className="font-serif text-ink font-light leading-tight"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            Nos signatures
          </h2>
        </motion.div>

        {/* Items */}
        <div className="flex flex-col gap-0">
          {signatures.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 md:grid-cols-5 border-t border-stone/20 md:min-h-[460px] ${
                i === signatures.length - 1 ? "border-b" : ""
              }`}
            >
              {/* Photo */}
              <div
                className={`relative overflow-hidden md:col-span-3 ${
                  "imageAspect" in item && item.imageAspect ? item.imageAspect : "aspect-[4/3] md:aspect-auto"
                } ${item.imageLeft ? "md:order-1" : "md:order-2"}`}
              >
                <Image
                  src={`/images/${encodeURIComponent(item.image)}`}
                  alt={item.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ objectPosition: item.objectPosition }}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
              </div>

              {/* Text */}
              <div
                className={`md:col-span-2 flex flex-col justify-center px-5 sm:px-8 md:px-12 py-10 md:py-12 ${
                  item.imageLeft ? "md:order-2" : "md:order-1"
                }`}
              >
                {item.badge && (
                  <span className="inline-flex items-center gap-2 font-sans font-black text-xs tracking-[0.35em] uppercase bg-ember text-parchment px-4 py-2.5 mb-6 self-start">
                    <span className="w-2 h-2 rounded-full bg-parchment" />
                    {item.badge}
                  </span>
                )}
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-stone mb-3">
                  N°{i + 1} &nbsp;—&nbsp; Signature
                </p>
                <h3
                  className="font-serif text-ink font-light leading-tight mb-6"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
                >
                  {item.name}
                </h3>
                <p className="font-sans text-stone text-sm leading-relaxed mb-8">
                  {item.description}
                </p>
                <span className="font-serif text-ember text-3xl font-light">
                  {item.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
