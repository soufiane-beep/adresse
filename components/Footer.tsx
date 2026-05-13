"use client";

const navLinks = [
  { label: "Concept", href: "#concept" },
  { label: "Menu", href: "#menu" },
  { label: "Avis clients", href: "#avis" },
  { label: "Infos", href: "#infos" },
];

const hours = [
  { days: "Lundi – Vendredi", time: "10h – 18h" },
  { days: "Samedi – Dimanche", time: "9h – 18h" },
];

const InstagramIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-rim">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Brand header */}
        <div className="py-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-rim">
          <div>
            <a
              href="#"
              className="font-serif text-cream text-3xl font-light italic hover:text-ember transition-colors duration-300 block"
            >
              L&apos;Adresse{" "}
              <span className="not-italic font-semibold text-ember">86</span>
            </a>
            <p className="font-sans text-stone text-[10px] tracking-[0.3em] uppercase mt-2">
              Brunch &amp; Specialty Coffee · Liège
            </p>
          </div>
          <a
            href="https://www.instagram.com/ladresse86/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-rim text-stone hover:border-ember hover:text-ember transition-colors duration-300 self-start sm:self-auto"
          >
            <InstagramIcon />
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase">@ladresse86</span>
          </a>
        </div>

        {/* 3-column grid */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-3 gap-12">

          {/* Navigation */}
          <div>
            <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-ember mb-6">
              Navigation
            </p>
            <nav className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-sans text-[11px] tracking-[0.18em] uppercase text-stone hover:text-cream transition-colors duration-200"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Horaires */}
          <div>
            <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-ember mb-6">
              Horaires
            </p>
            <div className="flex flex-col gap-4">
              {hours.map(({ days, time }) => (
                <div key={days}>
                  <p className="font-sans text-stone text-[11px] tracking-wide">{days}</p>
                  <p className="font-serif text-cream text-base font-light mt-0.5">{time}</p>
                </div>
              ))}
              <p className="font-sans text-stone/55 text-[10px] tracking-wide mt-1">
                Brunch servi jusqu&apos;à 15h
              </p>
            </div>
          </div>

          {/* Adresse */}
          <div>
            <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-ember mb-6">
              Nous trouver
            </p>
            <address className="not-italic flex flex-col gap-1">
              <p className="font-serif text-cream text-base font-light leading-snug">
                Rue du Parc des Oblats
              </p>
              <p className="font-sans text-stone text-[11px] tracking-wide">
                4020 Liège, Belgique
              </p>
            </address>
            <a
              href="#infos"
              className="inline-flex items-center gap-2 mt-5 font-sans text-[10px] tracking-[0.18em] uppercase text-stone hover:text-ember transition-colors duration-200 group"
            >
              <span className="w-4 h-px bg-ember group-hover:w-6 transition-all duration-300" />
              Voir sur la carte
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-rim flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-stone/40 text-[10px] tracking-wide">
            © 2026 L&apos;Adresse 86 — Tous droits réservés
          </p>
          <div className="w-6 h-px bg-ember/50" />
        </div>

      </div>
    </footer>
  );
}
