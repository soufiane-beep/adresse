"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

function getOpenStatus(): { isOpen: boolean; label: string } {
  const now = new Date();
  const day = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  const isWeekend = day === 0 || day === 6;
  const openH = isWeekend ? 9 : 10;
  const closeH = 18;
  if (h >= openH && h < closeH) return { isOpen: true, label: `Ouvert en ce moment · Ferme à ${closeH}h` };
  if (h < openH) return { isOpen: false, label: `Fermé · Ouvre aujourd'hui à ${openH}h` };
  const dayNames = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
  const nextDay = (day + 1) % 7;
  const nextOpenH = nextDay === 0 || nextDay === 6 ? 9 : 10;
  return { isOpen: false, label: `Fermé · Ouvre ${dayNames[nextDay]} à ${nextOpenH}h` };
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const hours = [
  { day: "Lundi – Vendredi", time: "10h00 – 18h00" },
  { day: "Samedi – Dimanche", time: "09h00 – 18h00" },
];

export default function Info() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [status] = useState(getOpenStatus);

  return (
    <section id="infos" ref={ref} className="py-28 md:py-40 bg-paper">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mb-16"
        >
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-ember block mb-4">
            Venir nous voir
          </span>
          <h2
            className="font-serif text-ink font-light leading-tight"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            Infos pratiques
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Info blocks */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-10"
          >
            {/* Address */}
            <motion.div variants={itemVariants} className="border-t border-stone/20 pt-8">
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-stone mb-3">
                Adresse
              </p>
              <p className="font-serif text-ink text-2xl font-light leading-snug">
                Rue du Parc des Oblats
              </p>
              <p className="font-sans text-stone text-sm mt-1">4020 Liège, Belgique</p>
            </motion.div>

            {/* Hours */}
            <motion.div variants={itemVariants} className="border-t border-stone/20 pt-8">
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-stone mb-4">
                Horaires
              </p>
              <div className="space-y-3">
                {hours.map(({ day, time }) => (
                  <div key={day} className="flex justify-between items-baseline gap-4">
                    <span className="font-sans text-ink/70 text-sm">{day}</span>
                    <span className="flex-1 border-b border-stone/20 mb-1" />
                    <span className="font-serif text-ink text-lg font-medium">{time}</span>
                  </div>
                ))}
                <p className="font-sans text-stone text-[11px] mt-2">
                  Brunch servi jusqu&apos;à 15h
                </p>
                {/* Badge ouvert/fermé */}
                <div className={`inline-flex items-center gap-2 mt-4 px-3 py-1.5 text-[10px] font-sans tracking-wide ${
                  status.isOpen
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-stone/10 text-stone border border-stone/20"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? "bg-green-500 animate-pulse-slow" : "bg-stone/40"}`} />
                  {status.label}
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants} className="border-t border-stone/20 pt-8">
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-stone mb-4">
                Contact
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.instagram.com/ladresse86/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-sans text-sm text-stone hover:text-ember transition-colors duration-200 group"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  @ladresse86
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden border border-stone/20"
            style={{ minHeight: "420px" }}
          >
            {/* Ember corner accent */}
            <div className="absolute top-0 left-0 w-8 h-1 bg-ember z-10" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2516.5!2d5.5714!3d50.6397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDM4JzIyLjkiTiA1wrAzNCcxNy4wIkU!5e0!3m2!1sfr!2sbe!4v1699000000000!5m2!1sfr!2sbe"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="L'Adresse 86 — Parc des Oblats, Liège"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
