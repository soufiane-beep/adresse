"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { MenuPdf } from "@/components/MenuPageContent";

interface PdfMenuViewerProps {
  docs: MenuPdf[];
  initialDocIndex?: number;
  onClose: () => void;
}

export default function PdfMenuViewer({ docs, initialDocIndex = 0, onClose }: PdfMenuViewerProps) {
  const [docIndex, setDocIndex] = useState(initialDocIndex);
  const [page, setPage] = useState(1);
  const doc = docs[docIndex];

  useEffect(() => {
    setPage(1);
  }, [docIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setPage((p) => Math.min(p + 1, doc.pageCount));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(p - 1, 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [doc.pageCount, onClose]);

  if (!doc) return null;

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 md:p-8 bg-ink/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {docs.length > 1 && (
        <div className="flex gap-2" onClick={stop}>
          {docs.map((d, i) => (
            <button
              key={d.slug}
              onClick={() => setDocIndex(i)}
              className={`px-4 py-2 text-[10px] font-sans font-semibold tracking-[0.18em] uppercase transition-colors duration-200 ${
                i === docIndex
                  ? "bg-ember text-parchment"
                  : "text-parchment/60 border border-parchment/20 hover:text-parchment"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      )}

      <motion.div
        key={`${doc.slug}-${page}`}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative flex-1 min-h-0 w-full flex items-center justify-center"
        onClick={stop}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/menus/pages/${doc.slug}/page-${page}.png`}
          alt={`${doc.label} — page ${page}`}
          className="max-h-full max-w-full w-auto h-auto object-contain shadow-2xl"
        />
      </motion.div>

      {page > 1 && (
        <button
          onClick={(e) => {
            stop(e);
            setPage((p) => Math.max(p - 1, 1));
          }}
          aria-label="Page précédente"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-ink/60 text-parchment hover:bg-ink transition-colors duration-150"
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {page < doc.pageCount && (
        <button
          onClick={(e) => {
            stop(e);
            setPage((p) => Math.min(p + 1, doc.pageCount));
          }}
          aria-label="Page suivante"
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-ink/60 text-parchment hover:bg-ink transition-colors duration-150"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {doc.pageCount > 1 && (
        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-parchment/80 bg-ink/60 px-3 py-1">
          {page} / {doc.pageCount}
        </span>
      )}

      <a
        href={doc.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={stop}
        className="text-[9px] font-sans tracking-[0.15em] uppercase text-parchment/40 hover:text-parchment/70 transition-colors duration-150"
      >
        Ouvrir le PDF original
      </a>

      <button
        onClick={(e) => {
          stop(e);
          onClose();
        }}
        aria-label="Fermer"
        className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-ink/60 text-parchment hover:bg-ink transition-colors duration-150"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
}
