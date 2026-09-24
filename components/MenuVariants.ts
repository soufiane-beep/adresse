import { menu } from "@/components/MenuData";
import { menuSoir } from "@/components/MenuSoirData";
import type { MenuVariant } from "@/components/MenuPageContent";

export const dayVariant: MenuVariant = {
  data: menu,
  imageDir: "",
  heroImage: "/images/A7403469.jpg",
  eyebrow: "Notre carte",
  title: "Le Menu",
  tagline: "Brunch & Coffee · Liège",
  description: "Produits frais, locaux & de saison — chaque assiette préparée avec soin.",
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
};
