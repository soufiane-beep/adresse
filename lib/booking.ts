// Restomax Book: floating widget on every page, plus a hosted booking page
// that our "Réserver" buttons link to.
export const BOOKING_URL = "https://book.adresse86.be";
export const RESTOMAX_STORE_UID = "74ba7c4e-aa9d-44ec-8581-df63e287d9f3";
export const RESTOMAX_WIDGET_SRC = "https://book.restomax.com/scripts/widget.js";

export const PANEL_IFRAME = 'iframe[title="restomaxbook-widget"]';
export const WIDGET_CONTAINER_ID = "restomaxbook-widget__container";

export function closeBooking() {
  const iframe = document.querySelector<HTMLIFrameElement>(PANEL_IFRAME);
  const close = iframe?.contentDocument?.querySelector<HTMLElement>(
    ".swipeable-drawer__header-actions button:last-of-type",
  );
  close?.click();
}
