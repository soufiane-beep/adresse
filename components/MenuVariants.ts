import { menu } from "@/components/MenuData";
import { menuSoir } from "@/components/MenuSoirData";
import type { MenuVariant } from "@/components/MenuPageContent";
import menuPdfManifest from "@/data/menuPdfManifest.json";

export const dayVariant: MenuVariant = {
  data: menu,
  imageDir: "",
  heroImage: "/images/A7403469.jpg",
  eyebrow: "Notre carte",
  title: "Le Menu",
  tagline: "Brunch & Coffee · Liège",
  description: "Produits frais, locaux & de saison — chaque assiette préparée avec soin.",
  pdfs: [
    {
      label: "Menu Brunch",
      href: "/menus/menu-brunch.pdf",
      slug: "brunch",
      pageCount: menuPdfManifest.brunch,
    },
  ],
};

export const soirVariant: MenuVariant = {
  data: menuSoir,
  imageDir: "soir",
  heroImage: "/images/soir/A7407068.jpg",
  heroObjectPosition: "center 35%",
  eyebrow: "Service du soir",
  title: "Le Soir",
  tagline: "Cuisine du soir · Liège",
  description: "Une cuisine généreuse à partager, entre saveurs marocaines et créations signature 86.",
  pdfs: [
    {
      label: "Menu du Soir",
      href: "/menus/menu-soir.pdf",
      slug: "soir",
      pageCount: menuPdfManifest.soir,
    },
    {
      label: "Carte des Boissons",
      href: "/menus/menu-boissons-soir.pdf",
      slug: "boissons-soir",
      pageCount: menuPdfManifest["boissons-soir"],
    },
  ],
};
