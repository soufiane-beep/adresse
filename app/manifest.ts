import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "L'Adresse 86 — Brunch & Coffee · Liège",
    short_name: "L'Adresse 86",
    start_url: "/",
    display: "standalone",
    background_color: "#F2E8D4",
    theme_color: "#2C1A0E",
    lang: "fr-BE",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
