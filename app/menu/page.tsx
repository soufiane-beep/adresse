import type { Metadata } from "next";
import Nav from "@/components/Nav";
import MenuPageContent from "@/components/MenuPageContent";
import Footer from "@/components/Footer";
import { dayVariant, soirVariant } from "@/components/MenuVariants";

export const metadata: Metadata = {
  title: "Menu brunch & coffee à Liège",
  alternates: { canonical: "/menu" },
  description:
    "Découvrez notre carte brunch & coffee : signatures, pains rustiques, douceurs, matchas et mocktails. Produits frais, locaux, faits maison.",
  openGraph: {
    title: "Menu brunch & coffee — L'Adresse 86 · Liège",
    description: "Découvrez notre carte brunch & coffee. Produits frais, locaux, faits maison.",
    url: "/menu",
    siteName: "L'Adresse 86",
    locale: "fr_BE",
    type: "website",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "L'Adresse 86 — Brunch & Coffee à Liège" }],
  },
};

export default function MenuPage() {
  return (
    <>
      <Nav />
      <main>
        <MenuPageContent day={dayVariant} soir={soirVariant} initialTheme="day" />
      </main>
      <Footer />
    </>
  );
}
