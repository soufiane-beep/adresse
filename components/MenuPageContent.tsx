"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { MenuCategory } from "@/components/MenuData";

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ─── Card components ──────────────────────────────────────────────────────────

function FormuleCard({
  name,
  description,
  price,
  components,
  timeSlot,
}: {
  name: string;
  description?: string;
  price: string;
  components: string[];
  timeSlot?: string;
}) {
  return (
    <div className="bg-ink p-5 md:p-8 flex flex-col md:flex-row gap-5 md:gap-16 items-start md:items-center">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-[8px] font-sans font-semibold tracking-[0.18em] uppercase px-2.5 py-1 bg-ember text-parchment">
            Formule
          </span>
          {timeSlot && (
            <span className="text-[8px] font-sans font-semibold tracking-[0.18em] uppercase px-2.5 py-1 border border-parchment/20 text-parchment/50">
              {timeSlot}
            </span>
          )}
        </div>
        <h3
          className="font-serif text-parchment font-light leading-tight mb-3"
          style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)" }}
        >
          {name}
        </h3>
        <span className="font-sans font-semibold text-ember text-xl">{price}</span>
        {description && (
          <p className="font-sans text-parchment/50 text-[10px] leading-relaxed mt-2">{description}</p>
        )}
      </div>
      <div className="flex flex-row flex-wrap md:flex-col gap-2 md:gap-3 md:items-end">
        {components.map((comp, i) => (
          <div key={comp} className="flex flex-row md:flex-col md:items-end gap-2 md:gap-3">
            <span className="text-[8px] md:text-[9px] font-sans font-semibold tracking-[0.18em] md:tracking-[0.22em] uppercase px-3 py-1.5 border border-parchment/20 text-parchment/70">
              {comp}
            </span>
            {i < components.length - 1 && (
              <span className="text-ember font-sans font-semibold text-xs tracking-widest self-center md:self-end px-1">
                +
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuCard({
  name,
  description,
  price,
  badge,
  image,
  imageDir,
  objectPosition = "center",
  onImageClick,
}: {
  name: string;
  description: string;
  price: string;
  badge: string | null;
  image: string;
  imageDir: string;
  objectPosition?: string;
  onImageClick?: (src: string, name: string) => void;
}) {
  const fullSrc = `/images/${imageDir ? imageDir + "/" : ""}${encodeURIComponent(image)}`;

  return (
    <div
      className="group relative aspect-square sm:aspect-[4/5] overflow-hidden cursor-zoom-in"
      onClick={() => onImageClick?.(fullSrc, name)}
    >
      <Image
        src={fullSrc}
        alt={name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        style={{ objectPosition }}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      {badge && (
        <span className="absolute top-2 left-2 md:top-3 md:left-3 text-[7px] md:text-[8px] font-sans font-semibold tracking-[0.15em] md:tracking-[0.18em] uppercase px-2 py-0.5 bg-ember text-parchment z-10">
          {badge}
        </span>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 z-10">
        <div className="flex items-end justify-between gap-1.5 md:gap-2">
          <h3 className="font-serif text-parchment text-[0.85rem] md:text-[1.05rem] font-medium leading-snug flex-1">
            {name}
          </h3>
          <span className="font-sans font-semibold text-ember text-[0.75rem] md:text-sm flex-shrink-0 mb-0.5">
            {price}
          </span>
        </div>
        <p className="font-sans text-parchment/65 text-[9px] md:text-[10px] leading-relaxed mt-1.5 line-clamp-2 md:line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}

function TextRow({
  name,
  description,
  price,
  badge,
  dark = false,
}: {
  name: string;
  description: string;
  price: string;
  badge: string | null;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 py-4 md:py-5 border-b last:border-0 ${
        dark ? "border-cream-dim/15" : "border-stone/15"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className={`font-serif text-base font-light leading-snug ${dark ? "text-cream" : "text-ink"}`}>
            {name}
          </span>
          {badge && (
            <span className="text-[8px] font-sans font-semibold tracking-[0.15em] uppercase px-2 py-0.5 bg-ember text-parchment flex-shrink-0">
              {badge}
            </span>
          )}
        </div>
        <p className={`font-sans text-[11px] leading-relaxed ${dark ? "text-cream-dim" : "text-stone"}`}>
          {description}
        </p>
      </div>
      <span className="font-sans font-semibold text-ember text-sm flex-shrink-0 mt-0.5">
        {price}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export interface MenuVariant {
  data: MenuCategory[];
  imageDir: string;
  heroImage: string;
  heroObjectPosition?: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
}

interface MenuPageContentProps {
  day: MenuVariant;
  soir: MenuVariant;
  initialTheme: "day" | "soir";
}

export default function MenuPageContent({ day, soir, initialTheme }: MenuPageContentProps) {
  const [theme, setTheme] = useState<"day" | "soir">(initialTheme);
  const dark = theme === "soir";
  const variant = theme === "day" ? day : soir;
  const {
    data,
    imageDir,
    heroImage,
    heroObjectPosition = "55% 78%",
    eyebrow,
    title,
    tagline,
    description,
  } = variant;

  const switchTheme = (t: "day" | "soir") => {
    if (t === theme) return;
    setTheme(t);
    window.history.replaceState(null, "", t === "day" ? "/menu" : "/menu/soir");
    window.dispatchEvent(new CustomEvent("menu-theme-change", { detail: t }));
  };

  const [activeSlug, setActiveSlug] = useState(toSlug(data[0].category));
  const [zoomImage, setZoomImage] = useState<{ src: string; name: string } | null>(null);
  const pillBarRef = useRef<HTMLDivElement>(null);

  const categorySlugs = data.map((cat) => ({
    label: cat.category,
    slug: toSlug(cat.category),
  }));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomImage(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Switching menus swaps the categories in place — resync the active slug
  // and the scroll-spy observer to the newly rendered sections.
  useEffect(() => {
    setActiveSlug(toSlug(data[0].category));
  }, [theme]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id^='section-']")
    );
    if (sections.length === 0) return;

    // Reference line near the top of the viewport — the active section is
    // whichever one's top has most recently crossed above it. Comparing
    // positions directly (rather than watching intersection bands) keeps
    // this correct even for short sections that an IntersectionObserver
    // band can skip over entirely.
    const offset = window.innerHeight * 0.25;
    let ticking = false;

    const updateActiveSection = () => {
      ticking = false;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) {
          current = section;
        }
      }
      setActiveSlug(current.id.replace("section-", ""));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [theme]);

  useEffect(() => {
    if (!pillBarRef.current) return;
    const activeBtn = pillBarRef.current.querySelector(
      `[data-slug="${activeSlug}"]`
    ) as HTMLElement | null;
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeSlug]);

  const scrollToSection = (slug: string) => {
    const el = document.getElementById(`section-${slug}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Hero éditorial ── */}
      <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative min-h-[420px] md:min-h-[600px] bg-ink flex items-end overflow-hidden pt-16 md:pt-20"
      >
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover"
          style={{ opacity: 0.75, objectPosition: heroObjectPosition }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/10 to-transparent" />

        <div
          className="absolute top-0 right-0 z-10 font-serif leading-none select-none pointer-events-none"
          style={{
            fontSize: "clamp(120px, 26vw, 420px)",
            lineHeight: 0.82,
            paddingRight: "clamp(0.5rem, 2vw, 3rem)",
            paddingTop: "0.2em",
            WebkitTextStroke: "1px rgba(245, 236, 216, 0.07)",
            color: "transparent",
          }}
          aria-hidden="true"
        >
          86
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pb-10 md:pb-20 w-full">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-[9px] tracking-[0.4em] uppercase text-ember block mb-4 md:mb-5"
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-cream italic font-light leading-[0.9] mb-4 md:mb-5"
            style={{ fontSize: "clamp(3rem, 10vw, 7.5rem)" }}
          >
            {title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-5 md:mb-6"
            style={{ transformOrigin: "left" }}
          >
            <div className="h-px w-12 md:w-16 bg-ember/60" />
            <span className="font-sans text-stone text-[8px] tracking-[0.35em] uppercase">
              {tagline}
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="font-sans text-stone/70 text-[11px] leading-relaxed max-w-xs"
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
      </AnimatePresence>

      {/* ── Sticky Jour/Soir toggle + mobile pill bar ── */}
      <div
        className={`sticky top-16 md:top-20 z-30 border-b transition-colors duration-300 ${
          dark ? "bg-ink border-cream-dim/15" : "bg-parchment border-stone/15"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 md:py-4 flex items-center gap-3">
          <button
            onClick={() => switchTheme("day")}
            aria-pressed={theme === "day"}
            className={`px-4 py-2 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase transition-colors duration-200 ${
              theme === "day"
                ? "bg-ember text-parchment"
                : dark
                  ? "text-cream-dim hover:text-cream border border-cream-dim/20"
                  : "text-stone hover:text-ink border border-stone/20"
            }`}
          >
            Menu du Jour
          </button>
          <button
            onClick={() => switchTheme("soir")}
            aria-pressed={theme === "soir"}
            className={`px-4 py-2 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase transition-colors duration-200 ${
              theme === "soir"
                ? "bg-ember text-parchment"
                : dark
                  ? "text-cream-dim hover:text-cream border border-cream-dim/20"
                  : "text-stone hover:text-ink border border-stone/20"
            }`}
          >
            Menu du Soir
          </button>
        </div>

        {/* Mobile pill bar — sticky et overflow-x-auto séparés — évite le blocage scroll iOS Safari */}
        <div className={`md:hidden border-t ${dark ? "border-cream-dim/15" : "border-stone/15"}`}>
          <div
            ref={pillBarRef}
            className="overflow-x-scroll [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", touchAction: "pan-x" } as React.CSSProperties}
          >
            <div className="flex gap-0 px-3">
              {categorySlugs.map(({ label, slug }) => (
                <button
                  key={slug}
                  data-slug={slug}
                  onClick={() => scrollToSection(slug)}
                  className={`relative px-3.5 py-3 text-[10px] font-sans font-semibold tracking-[0.15em] uppercase flex-shrink-0 transition-colors duration-200 min-h-[44px] ${
                    activeSlug === slug
                      ? dark
                        ? "text-cream"
                        : "text-ink"
                      : dark
                        ? "text-cream/45"
                        : "text-ink/45"
                  }`}
                >
                  {label}
                  {activeSlug === slug && (
                    <motion.div
                      layoutId={`mobile-pill-indicator-${theme}`}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-ember"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={dark ? "bg-ink" : "bg-parchment"}
      >
        {/* ── Main layout ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-20">
          <div className="flex gap-0 md:gap-16 items-start">

            {/* ── Sidebar (desktop) ── */}
            <aside className="hidden md:flex flex-col w-48 flex-shrink-0 sticky top-44 self-start">
              <span className="font-sans text-[8px] tracking-[0.35em] uppercase text-ember mb-6 block">
                La carte
              </span>
              <nav className="flex flex-col gap-0">
                {categorySlugs.map(({ label, slug }) => (
                  <button
                    key={slug}
                    onClick={() => scrollToSection(slug)}
                    className={`relative text-left py-3 text-[10px] font-sans tracking-[0.15em] uppercase transition-colors duration-200 border-b last:border-0 ${
                      dark ? "border-cream-dim/15" : "border-stone/15"
                    } ${
                      activeSlug === slug
                        ? dark
                          ? "text-cream"
                          : "text-ink"
                        : dark
                          ? "text-cream-dim hover:text-cream"
                          : "text-stone hover:text-ink"
                    }`}
                  >
                    {activeSlug === slug && (
                      <motion.span
                        layoutId={`sidebar-indicator-${theme}`}
                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-ember"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="pl-4">{label}</span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* ── Category sections ── */}
            <div className="flex-1 min-w-0">
              {data.map((cat, catIndex) => {
                const slug = toSlug(cat.category);
                const isListLayout = cat.category === "Cafés & Thés";
                const formuleItems = cat.items.filter((item) => item.components);
                const regularItems = cat.items.filter((item) => !item.components);
                const imageItems = regularItems.filter((item) => item.image);
                const noImageItems = regularItems.filter((item) => !item.image);

                return (
                  <section
                    key={cat.category}
                    id={`section-${slug}`}
                    className={`pb-12 md:pb-20 scroll-mt-[10rem] md:scroll-mt-[9rem] ${
                      catIndex > 0 ? `pt-12 md:pt-20 border-t ${dark ? "border-cream-dim/15" : "border-stone/15"}` : "pt-2"
                    }`}
                  >
                    <div className="mb-7 md:mb-10">
                      <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-ember block mb-2.5 md:mb-3">
                        {String(catIndex + 1).padStart(2, "0")} — Catégorie
                      </span>
                      <h2
                        className={`font-serif font-light leading-tight ${dark ? "text-cream" : "text-ink"}`}
                        style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
                      >
                        {cat.category}
                      </h2>
                    </div>

                    {/* Formule (full width) */}
                    {formuleItems.map((item) => (
                      <div key={item.name} className="mb-5 md:mb-6">
                        <FormuleCard
                          name={item.name}
                          description={item.description}
                          price={item.price}
                          components={item.components!}
                          timeSlot={item.timeSlot}
                        />
                      </div>
                    ))}

                    {isListLayout ? (
                      <div className={`border-t ${dark ? "border-cream-dim/15" : "border-stone/15"}`}>
                        {regularItems.map((item) => (
                          <TextRow
                            key={item.name}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            badge={item.badge}
                            dark={dark}
                          />
                        ))}
                      </div>
                    ) : (
                      <>
                        {imageItems.length > 0 && (
                          <div
                            className={`grid ${imageItems.length >= 2 ? "grid-cols-2" : "grid-cols-1"} sm:grid-cols-2 gap-2.5 md:gap-4 ${
                              imageItems.length >= 3 ? "lg:grid-cols-3" : ""
                            } ${noImageItems.length > 0 ? "mb-2.5 md:mb-4" : ""}`}
                          >
                            {imageItems.map((item) => (
                              <MenuCard
                                key={item.name}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                badge={item.badge}
                                image={item.image!}
                                imageDir={imageDir}
                                objectPosition={item.objectPosition}
                                onImageClick={(src, name) => setZoomImage({ src, name })}
                              />
                            ))}
                          </div>
                        )}

                        {noImageItems.length > 0 && (
                          <div
                            className={`border-t ${dark ? "border-cream-dim/15" : "border-stone/15"} ${
                              imageItems.length > 0 ? "mt-5 md:mt-6" : ""
                            }`}
                          >
                            {noImageItems.map((item) => (
                              <TextRow
                                key={item.name}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                badge={item.badge}
                                dark={dark}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </section>
                );
              })}

              <p
                className={`font-sans text-[10px] mt-2 tracking-wide border-t pt-6 md:pt-8 pb-4 ${
                  dark ? "text-cream-dim/50 border-cream-dim/15" : "text-stone/50 border-stone/15"
                }`}
              >
                Menu pouvant varier selon les arrivages &nbsp;·&nbsp; Prix TTC service inclus
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      </AnimatePresence>

      {/* ── Image zoom modal ── */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-ink/70 backdrop-blur-sm"
            onClick={() => setZoomImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={zoomImage.src}
                alt={zoomImage.name}
                decoding="async"
                className="w-full h-auto block"
              />
              <button
                onClick={() => setZoomImage(null)}
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-ink/60 text-parchment hover:bg-ink transition-colors duration-150 text-lg leading-none"
                aria-label="Fermer"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
