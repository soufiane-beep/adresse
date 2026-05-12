"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reviews = [
  {
    name: "Safia",
    date: "il y a 4 mois",
    badge: null,
    text: "Superbe endroit, cosy et chaleureux ! L'ambiance est géniale et le personnel est très accueillant, rien à dire. 🤩 C'est déjà la deuxième fois que nous venons et c'est un pur régal. En plus d'être bien présentés, les plats sont excellents.",
  },
  {
    name: "Audrey Jean",
    date: "il y a 4 mois",
    badge: null,
    text: "Au risque de répéter les éloges des autres commentaires, l'Adresse 86 est une très belle découverte ! Plats frais et savoureux, accueil parfait et aux petits soins avec les clients tout en étant discrets. Magnifique décoration : cosy, classe.",
  },
  {
    name: "Aurore Pierre",
    date: "il y a 2 mois",
    badge: "Local Guide",
    text: "Expérience savoureuse ✨ La simplicité et la qualité se marient à la perfection dans cet établissement.",
  },
  {
    name: "Sanae Hamzaoui",
    date: "il y a 4 mois",
    badge: null,
    text: "Super service, lieu familial, ambiance chaleureuse et personnel souriant et accueillant ! Produits de qualité, plats délicieux et magnifique présentation, on reviendra !",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className="w-3 h-3 text-ember" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-28 md:py-40 bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mb-16"
        >
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-ember block mb-4">
            Ce qu&apos;ils disent
          </span>
          <h2
            className="font-serif text-ink font-light leading-tight"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            Avis clients
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-parchment border border-stone/20 p-8 md:p-10 relative"
            >
              {/* Large quote mark */}
              <span
                className="font-serif text-ember/15 absolute top-4 right-6 leading-none select-none pointer-events-none"
                style={{ fontSize: "6rem" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <Stars />

              <blockquote className="font-serif text-ink font-light italic leading-relaxed mt-5 mb-6 relative z-10"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)" }}>
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 border-t border-stone/20 pt-5">
                <div className="w-6 h-px bg-ember" />
                <div>
                  <p className="font-sans text-ink text-sm font-medium">{review.name}</p>
                  {review.badge && (
                    <p className="font-sans text-[9px] tracking-wide text-ember uppercase">{review.badge}</p>
                  )}
                </div>
                <span className="text-stone/40">·</span>
                <p className="font-sans text-stone text-[11px]">{review.date}</p>
                <div className="ml-auto">
                  <svg className="w-4 h-4 text-stone/40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064 5.97 5.97 0 014.126 1.632l2.912-2.912A10.025 10.025 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Google */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <a
            href="https://www.google.com/search?q=L%27Adresse+86+Li%C3%A8ge"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] tracking-[0.22em] uppercase text-stone hover:text-ink transition-colors duration-200 border-b border-stone/30 hover:border-ink pb-0.5"
          >
            Voir tous les avis Google →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
