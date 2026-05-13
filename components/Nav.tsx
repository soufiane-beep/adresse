"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Concept", href: "#concept" },
  { label: "Menu", href: "#menu" },
  { label: "Infos", href: "#infos" },
];

function getOpenStatus(): { isOpen: boolean; label: string } {
  const now = new Date();
  const day = now.getDay(); // 0=dim, 1=lun, …, 6=sam
  const h = now.getHours() + now.getMinutes() / 60;
  const isWeekend = day === 0 || day === 6;
  const openH = isWeekend ? 9 : 10;
  const closeH = 18;

  if (h >= openH && h < closeH) {
    return { isOpen: true, label: `Ouvert · Ferme à ${closeH}h` };
  }
  if (h < openH) {
    return { isOpen: false, label: `Fermé · Ouvre à ${openH}h` };
  }
  const dayNames = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
  const nextDay = (day + 1) % 7;
  const nextOpenH = nextDay === 0 || nextDay === 6 ? 9 : 10;
  return { isOpen: false, label: `Fermé · Ouvre ${dayNames[nextDay]} à ${nextOpenH}h` };
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status] = useState(getOpenStatus);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-parchment/96 backdrop-blur-md border-b border-stone/15 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#"
          className={`font-serif text-xl md:text-2xl font-light italic tracking-wide hover:text-ember transition-colors duration-300 ${
            scrolled ? "text-ink" : "text-cream"
          }`}
        >
          L&apos;Adresse{" "}
          <span className="not-italic font-semibold text-ember">86</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[10px] font-sans font-medium tracking-[0.22em] uppercase transition-colors duration-300 relative group ${
                scrolled ? "text-stone hover:text-ink" : "text-cream/70 hover:text-cream"
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-ember group-hover:w-full transition-all duration-500" />
            </a>
          ))}

          {/* Badge ouvert/fermé — visible quand scrollé */}
          {scrolled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse-slow ${
                  status.isOpen ? "bg-green-500" : "bg-stone/50"
                }`}
              />
              <span className="font-sans text-[9px] tracking-[0.15em] text-stone">
                {status.label}
              </span>
            </motion.div>
          )}

          <a
            href="https://www.instagram.com/ladresse86/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase bg-ember text-parchment hover:bg-ember-light transition-colors duration-200"
          >
            Instagram
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden flex flex-col gap-[5px] p-2 ${
            scrolled ? "text-ink" : "text-cream"
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          <span className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-parchment border-b border-stone/15"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {/* Status mobile */}
              <div className="flex items-center gap-2 pb-2 border-b border-stone/15">
                <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? "bg-green-500" : "bg-stone/40"}`} />
                <span className="font-sans text-[9px] tracking-[0.15em] text-stone">{status.label}</span>
              </div>
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[10px] font-sans tracking-[0.25em] uppercase text-stone hover:text-ink transition-colors py-1 border-b border-stone/15"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://www.instagram.com/ladresse86/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-5 py-3 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase bg-ember text-parchment text-center"
              >
                Instagram
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
