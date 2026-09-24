import type { Metadata } from "next";
import Nav from "@/components/Nav";
import MenuPageContent from "@/components/MenuPageContent";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { dayVariant, soirVariant } from "@/components/MenuVariants";

export const metadata: Metadata = {
  title: "Menu — L'Adresse 86 · Liège",
  description:
    "Découvrez notre carte brunch & coffee : signatures, pains rustiques, douceurs, matchas et mocktails. Produits frais, locaux, faits maison.",
  openGraph: {
    title: "Menu — L'Adresse 86 · Liège",
    description: "Découvrez notre carte brunch & coffee. Produits frais, locaux, faits maison.",
    url: "https://ladresse86.be/menu",
    siteName: "L'Adresse 86",
    locale: "fr_BE",
    type: "website",
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
      <WhatsAppButton />
    </>
  );
}
