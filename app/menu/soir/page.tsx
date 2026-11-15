import type { Metadata } from "next";
import Nav from "@/components/Nav";
import MenuPageContent from "@/components/MenuPageContent";
import Footer from "@/components/Footer";
import { dayVariant, soirVariant } from "@/components/MenuVariants";

export const metadata: Metadata = {
  title: "Menu du soir à Liège",
  alternates: { canonical: "/menu/soir" },
  description:
    "Découvrez notre carte du soir : kémias, Medina Roll, formules L'Espérience 86 & Duo 86, incontournables et douceurs d'Orient.",
  openGraph: {
    title: "Menu du soir — L'Adresse 86 · Liège",
    description: "Notre carte du soir. Cuisine généreuse à partager, entre saveurs marocaines et créations signature 86.",
    url: "/menu/soir",
    siteName: "L'Adresse 86",
    locale: "fr_BE",
    type: "website",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "L'Adresse 86 — Brunch & Coffee à Liège" }],
  },
};

export default function MenuSoirPage() {
  return (
    <>
      <Nav />
      <main>
        <MenuPageContent day={dayVariant} soir={soirVariant} initialTheme="soir" />
      </main>
      <Footer />
    </>
  );
}
