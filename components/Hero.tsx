"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-ink">
      {/* Background image — real local photo */}
      <Image
        src="/images/A7403214.jpg"
        alt="L'Adresse 86 — Brunch Liège"
        fill
        priority
        className="object-cover object-center"
        style={{ opacity: 0.45 }}
        sizes="100vw"
      />

      {/* Warm espresso overlays — teinte brune, pas noire */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A05]/85 via-[#2C1A0E]/45 to-[#1A0A05]/88 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A0A05]/50 via-transparent to-transparent z-10" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Giant decorative "86" — outlined, behind content */}
      <div
        className="absolute bottom-0 right-0 z-10 font-serif leading-none select-none pointer-events-none outlined-numeral"
        style={{
          fontSize: "clamp(220px, 38vw, 560px)",
          lineHeight: 0.82,
          paddingRight: "clamp(1rem, 3vw, 3rem)",
          paddingBottom: "0",
          WebkitTextStroke: "1px rgba(245, 236, 216, 0.09)",
          color: "transparent",
        }}
        aria-hidden="true"
      >
        86
      </div>

      {/* Main content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto w-full">
        {/* Location label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-[9px] tracking-[0.4em] uppercase text-stone mb-8"
        >
          Parc des Oblats &nbsp;·&nbsp; Liège, Belgique
        </motion.p>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-cream italic font-light leading-[0.88] tracking-tight mb-6"
          style={{ fontSize: "clamp(4.5rem, 14vw, 11rem)" }}
        >
          L&apos;Adresse
        </motion.h1>

        {/* Divider rule with "86" */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-5 mb-6"
          style={{ transformOrigin: "center" }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-rim/80" />
          <span className="font-serif text-ember italic font-light text-2xl tracking-widest">86</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-rim/80" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.88, ease: "easeOut" }}
          className="font-sans text-stone text-[10px] tracking-[0.32em] uppercase mb-12"
        >
          Brunch &amp; Coffee &nbsp;·&nbsp; Ouvert 7j/7
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#menu"
            className="px-8 py-3.5 bg-ember text-ink font-sans font-semibold text-[10px] tracking-[0.22em] uppercase hover:bg-ember-light transition-all duration-200 min-w-[180px] text-center"
          >
            Voir le menu
          </a>
          <a
            href="#infos"
            className="px-8 py-3.5 border border-rim text-cream-dim font-sans font-medium text-[10px] tracking-[0.22em] uppercase hover:border-stone hover:text-cream transition-all duration-300 min-w-[180px] text-center"
          >
            Nous trouver
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-stone/70 to-transparent"
        />
        <span className="font-sans text-stone/40 text-[8px] tracking-[0.3em] uppercase">Défiler</span>
      </motion.div>
    </section>
  );
}
