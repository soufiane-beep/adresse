"use client";

import { useEffect } from "react";
import { PANEL_IFRAME, WIDGET_CONTAINER_ID, closeBooking } from "@/lib/booking";

const FONT_HREF = "https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&display=swap";

// Restyles the Restomax panel (fonts inside its iframe) and closes it on
// backdrop click / Escape. Layout and backdrop live in globals.css.
function styleFrame(iframe: HTMLIFrameElement) {
  const doc = iframe.contentDocument;
  if (!doc?.head || doc.getElementById("a86-booking-style")) return;
  const link = doc.createElement("link");
  link.rel = "stylesheet";
  link.href = FONT_HREF;
  const style = doc.createElement("style");
  style.id = "a86-booking-style";
  style.textContent = `* { font-family: "Jost", "Avenir Next", system-ui, sans-serif !important; }`;
  doc.head.append(link, style);
}

export default function BookingWidget() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const iframe = document.querySelector<HTMLIFrameElement>(PANEL_IFRAME);
      if (!iframe) return;
      if (iframe.contentDocument?.readyState === "complete") styleFrame(iframe);
      else iframe.addEventListener("load", () => styleFrame(iframe), { once: true });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.id === WIDGET_CONTAINER_ID) closeBooking();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
