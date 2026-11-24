"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BOOKING_URL, handleBookingClick } from "@/lib/booking";

// Fin du dernier service du soir de la première édition (heure de Bruxelles)
const LAST_NIGHT_END = new Date("2026-11-28T21:30:00+01:00");
// En mémoire seulement : remis à zéro à chaque ouverture du site ou refresh,
// mais conservé pendant la navigation entre pages.
let shownThisLoad = false;

export default function LastNightPopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Sur l'accueil et le menu du soir, ou quand on bascule le menu sur « Soir » (pas sur le menu brunch)
  useEffect(() => {
    if (Date.now() > LAST_NIGHT_END.getTime()) return;

    let t: ReturnType<typeof setTimeout> | undefined;
    const show = (delay: number) => {
      if (shownThisLoad) return;
      clearTimeout(t);
      t = setTimeout(() => {
        shownThisLoad = true;
        setOpen(true);
      }, delay);
    };
    if (pathname === "/" || pathname.startsWith("/menu/soir")) show(1200);

    const onThemeChange = (e: Event) => {
      if ((e as CustomEvent<"day" | "soir">).detail === "soir") show(600);
    };
    window.addEventListener("menu-theme-change", onThemeChange);
    return () => {
      clearTimeout(t);
      window.removeEventListener("menu-theme-change", onThemeChange);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-[#1A0A05]/75 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="last-night-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-ink border border-ember/40 px-8 py-10 md:px-10 md:py-12 text-center"
          >
            <button
              onClick={close}
              aria-label="Fermer"
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-cream/50 hover:text-cream transition-colors text-xl leading-none"
            >
              ×
            </button>

            <span className="inline-flex items-center gap-2 font-sans font-black text-[10px] tracking-[0.35em] uppercase bg-ember text-parchment px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-parchment animate-pulse-slow" />
              À ne pas rater
            </span>

            <h2
              id="last-night-title"
              className="font-serif text-cream font-light leading-tight mb-5"
              style={{ fontSize: "clamp(1.9rem, 6vw, 2.6rem)" }}
            >
              Dernière soirée<br />ce samedi 28 novembre
            </h2>

            <div className="w-10 h-px bg-ember mx-auto mb-5" />

            <p className="font-sans text-cream/70 text-sm leading-relaxed mb-3">
              De 18h30 à 21h30, c&apos;est le dernier soir de la première édition de nos soirées : kémias, Medina Roll et cocktails maison.
            </p>
            <p className="font-sans text-cream/90 text-sm leading-relaxed mb-8">
              Petite pause ensuite : les soirées reviennent très prochainement.
            </p>
            <p className="font-sans text-cream/50 text-xs leading-relaxed -mt-5 mb-8">
              Le brunch continue comme d&apos;habitude, tous les jours en journée.
            </p>

            <div className="flex flex-col items-center gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  close();
                  handleBookingClick(e);
                }}
                className="w-full bg-ember text-parchment font-sans font-semibold text-[11px] tracking-[0.3em] uppercase px-8 py-4 hover:bg-ember-light transition-colors duration-300"
              >
                Réserver ma table
              </a>
              <button
                onClick={close}
                className="font-sans text-[10px] tracking-[0.25em] uppercase text-cream/45 hover:text-cream/80 transition-colors"
              >
                Continuer vers le site
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
