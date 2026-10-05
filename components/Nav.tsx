"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { label: "Concept", href: "/#concept" },
  { label: "Menu", href: "/menu" },
  { label: "Infos", href: "/#infos" },
];

// parchment rgb(242, 232, 212) — used for nav bg interpolation
const PARCHMENT_RGB = [242, 232, 212] as const;
// surface-2 rgb(61, 40, 18) — dark-theme counterpart, used on /menu/soir
const SURFACE_RGB = [61, 40, 18] as const;
// cream #D4C2AC → ink #2C1A0E — used for hamburger color interpolation
const CREAM = [212, 194, 172] as const;
const INK = [44, 26, 14] as const;

function lerp(from: readonly number[], to: readonly number[], t: number) {
  return `rgb(${Math.round(from[0] + (to[0] - from[0]) * t)}, ${Math.round(from[1] + (to[1] - from[1]) * t)}, ${Math.round(from[2] + (to[2] - from[2]) * t)})`;
}

function getOpenStatus(): { isOpen: boolean; label: string } {
  const now = new Date();
  const day = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  const isWeekend = day === 0 || day === 6;
  const openH = isWeekend ? 10 : 9;
  const closeH = 17;
  if (h >= openH && h < closeH) return { isOpen: true, label: `Ouvert · Ferme à ${closeH}h` };
  if (h < openH) return { isOpen: false, label: `Fermé · Ouvre à ${openH}h` };
  const dayNames = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
  const nextDay = (day + 1) % 7;
  const nextOpenH = nextDay === 0 || nextDay === 6 ? 10 : 9;
  return { isOpen: false, label: `Fermé · Ouvre ${dayNames[nextDay]} à ${nextOpenH}h` };
}

export default function Nav() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status] = useState(getOpenStatus);
  const pathname = usePathname();
  const [darkOverride, setDarkOverride] = useState<boolean | null>(null);
  const dark = darkOverride ?? pathname.startsWith("/menu/soir");

  // Reset the in-page toggle override on real navigation, so a fresh page load
  // falls back to the path-based check above.
  useEffect(() => {
    setDarkOverride(null);
  }, [pathname]);

  useEffect(() => {
    const onThemeChange = (e: Event) => {
      const detail = (e as CustomEvent<"day" | "soir">).detail;
      setDarkOverride(detail === "soir");
    };
    window.addEventListener("menu-theme-change", onThemeChange);
    return () => window.removeEventListener("menu-theme-change", onThemeChange);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 0 → 1 over the first 80px of scroll
  const p = Math.min(scrollY / 80, 1);
  const scrolled = scrollY > 60;
  // The logo art is a solid beige silhouette; on light backgrounds it reads
  // too close to the parchment bg, so it's flipped to a dark ink silhouette.
  const logoOnLight = scrolled && !dark;

  const hamburgerColor = lerp(CREAM, dark ? CREAM : INK, p);
  const navBgStyle = {
    backgroundColor: `rgba(${(dark ? SURFACE_RGB : PARCHMENT_RGB).join(",")}, ${Math.min(p * 1.1, 0.97)})`,
    backdropFilter: p > 0.1 ? `blur(${Math.min(p * 14, 14)}px)` : undefined,
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 border-b ${
        scrolled ? `${dark ? "border-cream-dim/15" : "border-stone/15"} shadow-sm` : "border-transparent"
      }`}
      style={navBgStyle}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between gap-6">
        <Link href="/" className="transition-opacity duration-150 hover:opacity-80">
          <Image
            src="/logo-beige-a86.png"
            alt="L'Adresse 86"
            width={1000}
            height={83}
            priority
            className="h-5 md:h-6 w-auto transition-[filter] duration-300"
            style={
              logoOnLight
                ? { filter: "brightness(0) opacity(0.85)" }
                : { filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.35))" }
            }
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {links.map((l) => {
            const isActive = l.href === "/menu" && pathname.startsWith("/menu");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[10px] font-sans font-medium tracking-[0.22em] uppercase transition-colors duration-300 relative group ${
                  scrolled
                    ? dark
                      ? "text-cream-dim hover:text-cream"
                      : "text-stone hover:text-ink"
                    : "text-cream/70 hover:text-cream"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-ember transition-all duration-500 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}

          <div className="hidden xl:flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse-slow ${
                status.isOpen ? "bg-green-500" : "bg-stone/50"
              }`}
            />
            <span
              className={`font-sans text-[9px] tracking-[0.15em] transition-colors duration-300 ${
                scrolled ? (dark ? "text-cream-dim" : "text-stone") : "text-cream/70"
              }`}
            >
              {status.label}
            </span>
          </div>

          <a
            href="https://www.instagram.com/ladresse86/"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden xl:inline-block ml-2 text-[10px] font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
              scrolled
                ? dark
                  ? "text-cream-dim hover:text-cream"
                  : "text-stone hover:text-ink"
                : "text-cream/70 hover:text-cream"
            }`}
          >
            Instagram
          </a>

          <button
            type="button"
            className="px-5 py-2 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase bg-ember text-parchment hover:bg-ember-light transition-colors duration-200"
          >
            Réserver une table
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          style={{ color: hamburgerColor }}
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
            className={`md:hidden overflow-hidden border-b ${
              dark ? "bg-ink border-cream-dim/15" : "bg-parchment border-stone/15"
            }`}
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              <div className={`flex items-center gap-2 pb-2 border-b ${dark ? "border-cream-dim/15" : "border-stone/15"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? "bg-green-500" : "bg-stone/40"}`} />
                <span className={`font-sans text-[9px] tracking-[0.15em] ${dark ? "text-cream-dim" : "text-stone"}`}>
                  {status.label}
                </span>
              </div>
              {links.map((l) => {
                const isActive = l.href === "/menu" && pathname.startsWith("/menu");
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-[10px] font-sans tracking-[0.25em] uppercase transition-colors py-1 border-b ${
                      dark ? "border-cream-dim/15" : "border-stone/15"
                    } ${
                      isActive
                        ? dark
                          ? "text-cream"
                          : "text-ink"
                        : dark
                          ? "text-cream-dim hover:text-cream"
                          : "text-stone hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-5 py-3 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase bg-ember text-parchment text-center"
              >
                Réserver une table
              </button>
              <a
                href="https://www.instagram.com/ladresse86/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className={`text-[10px] font-sans tracking-[0.25em] uppercase text-center py-1 ${
                  dark ? "text-cream-dim hover:text-cream" : "text-stone hover:text-ink"
                }`}
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
