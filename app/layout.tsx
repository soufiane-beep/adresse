import type { Metadata } from "next";
import { Cormorant_Garamond, Syne } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "L'Adresse 86 — Brunch & Coffee · Liège",
  description:
    "Un lieu de vie chaleureux au cœur du Parc des Oblats à Liège. Brunch fait maison, café de spécialité, ouvert 7j/7.",
  keywords: ["brunch liège", "coffee liège", "café spécialité", "parc des oblats", "ladresse86"],
  authors: [{ name: "L'Adresse 86" }],
  openGraph: {
    title: "L'Adresse 86 — Brunch & Coffee · Liège",
    description:
      "Un lieu de vie chaleureux au cœur du Parc des Oblats. Brunch fait maison, café de spécialité.",
    url: "https://ladresse86.be",
    siteName: "L'Adresse 86",
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Adresse 86 — Brunch & Coffee · Liège",
    description: "Un lieu de vie chaleureux au cœur du Parc des Oblats. Brunch fait maison, café de spécialité.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
