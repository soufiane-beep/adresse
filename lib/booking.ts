// Restomax Book: floating widget on every page, plus a hosted booking page
// that our "Réserver" buttons link to.
export const BOOKING_URL = "https://book.adresse86.be";
// Tant que book.adresse86.be affiche « Magasin introuvable », les boutons
// ouvrent le widget. Passer à true quand la page Restomax fonctionne.
export const USE_BOOKING_PAGE = false;
export const RESTOMAX_STORE_UID = "74ba7c4e-aa9d-44ec-8581-df63e287d9f3";
export const RESTOMAX_WIDGET_SRC = "https://book.restomax.com/scripts/widget.js";

const TOGGLE_IFRAME = 'iframe[title="restomaxbook-widget-toggle"]';
export const PANEL_IFRAME = 'iframe[title="restomaxbook-widget"]';
export const WIDGET_CONTAINER_ID = "restomaxbook-widget__container";

export function closeBooking() {
  const iframe = document.querySelector<HTMLIFrameElement>(PANEL_IFRAME);
  const close = iframe?.contentDocument?.querySelector<HTMLElement>(
    ".swipeable-drawer__header-actions button:last-of-type",
  );
  close?.click();
}

export function openBooking() {
  const iframe = document.querySelector<HTMLIFrameElement>(TOGGLE_IFRAME);
  const trigger = iframe?.contentDocument?.querySelector<HTMLElement>(
    ".restomax-book-widget__trigger button",
  );
  trigger?.click();
  return !!trigger;
}

// onClick des liens vers BOOKING_URL : ouvre le widget à la place de la page.
export function handleBookingClick(e: { preventDefault(): void }) {
  if (!USE_BOOKING_PAGE && openBooking()) e.preventDefault();
}
