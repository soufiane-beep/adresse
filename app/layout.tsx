import type { Metadata } from "next";
import { Cinzel, Jost } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "L'Adresse 86 — Brunch & Coffee · Liège",
  description:
    "Un lieu de vie chaleureux à Liège. Brunch fait maison, café de spécialité. Lun–Ven 9h–17h · Week-end 10h–17h.",
  keywords: ["brunch liège", "coffee liège", "café spécialité", "ladresse86"],
  authors: [{ name: "L'Adresse 86" }],
  openGraph: {
    title: "L'Adresse 86 — Brunch & Coffee · Liège",
    description:
      "Un lieu de vie chaleureux à Liège. Brunch fait maison, café de spécialité.",
    url: "https://ladresse86.be",
    siteName: "L'Adresse 86",
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Adresse 86 — Brunch & Coffee · Liège",
    description: "Un lieu de vie chaleureux à Liège. Brunch fait maison, café de spécialité.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${cinzel.variable} ${jost.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
