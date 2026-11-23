// Restomax Book reservation widget.
// The widget renders its own floating trigger inside a same-origin iframe;
// openBooking() clicks it so our own "Réserver" buttons open the same panel.
export const RESTOMAX_STORE_UID = "74ba7c4e-aa9d-44ec-8581-df63e287d9f3";
export const RESTOMAX_WIDGET_SRC = "https://book.restomax.com/scripts/widget.js";

const TOGGLE_IFRAME = 'iframe[title="restomaxbook-widget-toggle"]';
export const PANEL_IFRAME = 'iframe[title="restomaxbook-widget"]';
export const WIDGET_CONTAINER_ID = "restomaxbook-widget__container";

export function openBooking() {
  const iframe = document.querySelector<HTMLIFrameElement>(TOGGLE_IFRAME);
  const trigger = iframe?.contentDocument?.querySelector<HTMLElement>(
    ".restomax-book-widget__trigger button",
  );
  trigger?.click();
}

export function closeBooking() {
  const iframe = document.querySelector<HTMLIFrameElement>(PANEL_IFRAME);
  const close = iframe?.contentDocument?.querySelector<HTMLElement>(
    ".swipeable-drawer__header-actions button:last-of-type",
  );
  close?.click();
}
