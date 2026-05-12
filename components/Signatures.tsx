"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const signatures = [
  {
    name: "Sweet Chicken Waffle",
    description:
      "Gaufre de Bruxelles croustillante, poulet caramélisé, oignons crispy, crumble de cacahuètes & sirop d'érable. Notre bestseller depuis le premier jour.",
    price: "14€",
    badge: "Best Seller",
    image: "IMG_3256 19.15.09.jpg",
    imageLeft: true,
  },
  {
    name: "Salmon Brunch Pancakes",
    description:
      "Pancakes moelleux, saumon fumé, guacamole crémeux, pousses fraîches & herbes. L'équilibre parfait entre douceur et fraîcheur.",
    price: "15€",
    badge: null,
    image: "A7403214.jpg",
    imageLeft: false,
  },
  {
    name: "Burrata Crush",
    description:
      "Pain complet toasté, burrata crémeuse, pesto maison, tomates cerises & roquette fraîche. Simple, généreux, inoubliable.",
    price: "14€",
    badge: null,
    image: "IMG_3455.jpg",
    imageLeft: true,
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
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-ember block mb-4">
            À la une
          </span>
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
              className={`grid grid-cols-1 md:grid-cols-5 border-t border-stone/20 ${
                i === signatures.length - 1 ? "border-b" : ""
              }`}
            >
              {/* Photo */}
              <div
                className={`relative overflow-hidden md:col-span-3 ${
                  item.imageLeft ? "md:order-1" : "md:order-2"
                }`}
                style={{ minHeight: "380px" }}
              >
                <Image
                  src={`/images/${encodeURIComponent(item.image)}`}
                  alt={item.name}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
              </div>

              {/* Text */}
              <div
                className={`md:col-span-2 flex flex-col justify-center px-8 md:px-12 py-12 ${
                  item.imageLeft ? "md:order-2" : "md:order-1"
                }`}
              >
                {item.badge && (
                  <span className="inline-block font-sans text-[8px] tracking-[0.2em] uppercase bg-ember text-parchment px-2.5 py-1 mb-5 self-start">
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
                <div className="flex items-center gap-4">
                  <span className="font-serif text-ember text-3xl font-light">
                    {item.price}
                  </span>
                  <a
                    href="#menu"
                    className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone hover:text-ink transition-colors duration-200 border-b border-stone/30 hover:border-ink pb-0.5"
                  >
                    Voir le menu
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
