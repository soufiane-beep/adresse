"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const menu = [
  {
    category: "Signatures",
    items: [
      {
        name: "Brunch Signature 86",
        description: "Création salée + dessert signature + limonade maison — formule complète (10h–15h)",
        price: "25€",
        badge: "Formule",
        image: null,
      },
      {
        name: "Sweet Chicken Waffle",
        description: "Gaufre de Bruxelles, poulet caramélisé, crudités, oignons crispy, crumble de cacahuètes & sirop d'érable · +oeuf +3€ · +avocat +3€",
        price: "14€",
        badge: "Best Seller",
        image: "IMG_3256 19.15.09.jpg",
      },
      {
        name: "Burrata Crush",
        description: "Pain complet, burrata crémeuse, pesto, tomates cerises, roquette fraîche",
        price: "14€",
        badge: null,
        image: "IMG_3455.jpg",
      },
      {
        name: "Cheesy Toast",
        description: "Pain toasté, fromages fondants, tomate, pesto & huile d'olive citronnée · +oeuf +3€ · +poulet +4€",
        price: "13€",
        badge: null,
        image: "A7400119 18.44.33.jpg",
      },
    ],
  },
  {
    category: "Brunch Salé",
    items: [
      {
        name: "Salmon Brunch Pancakes",
        description: "Pancakes, saumon fumé, guacamole crémeux, pousses fraîches & herbes · +oeuf +3€ · +saumon +4€",
        price: "15€",
        badge: null,
        image: "A7403214.jpg",
      },
      {
        name: "Pink Curry Curcuma",
        description: "Pain complet, poulet fondant au curry & curcuma maison, pommes croquantes & raisins secs",
        price: "13€",
        badge: null,
        image: "A7400178.jpg",
      },
      {
        name: "Pure Green",
        description: "Pain sans gluten, avocat, pousses fraîches, crudités & huile d'olive citronnée · +oeuf +3€ · +saumon +4€",
        price: "13€",
        badge: "GF · DF",
        image: "IMG_3465.jpg",
      },
      {
        name: "Avocado Eggs Toast",
        description: "Pain complet, crème d'avocat citronnée, oeuf, pousses fraîches, graines torréfiées & huile d'olive · +saumon +4€ · +feta +2€",
        price: "13€",
        badge: null,
        image: "A7403418.jpg",
      },
    ],
  },
  {
    category: "Pains Rustiques",
    items: [
      {
        name: "Chicken Tartare",
        description: "Poulet, sauce tartare, tomates, oignons, salade et crudités · 9€ avec 1 soft",
        price: "7€",
        badge: null,
        image: "A7403512.jpg",
      },
      {
        name: "Burrata & Pesto Verde",
        description: "Burrata, tomates, roquette, oignons rouge, pesto · 9€ avec 1 soft",
        price: "7€",
        badge: null,
        image: "A7403502.jpg",
      },
      {
        name: "Fresh Saumon",
        description: "Saumon, fromage frais, herbes fraîches et crudités · 9€ avec 1 soft",
        price: "7€",
        badge: null,
        image: "A7403492.jpg",
      },
    ],
  },
  {
    category: "Douceurs",
    items: [
      {
        name: "L'Envolée Pistache",
        description: "Pancakes, coulant pistache & fruits de saison",
        price: "13€",
        badge: null,
        image: null,
      },
      {
        name: "La Tentation aux Fruits Rouges",
        description: "Pancakes fruits de saison & coulis intense fruits rouges · +boule de glace +2€",
        price: "12€",
        badge: null,
        image: "A7403289.jpg",
      },
      {
        name: "Peanut Caramel",
        description: "Pancakes caramel beurre salé, bananes & cacahuètes torréfiées · +boule de glace +2€",
        price: "12€",
        badge: null,
        image: "A7403335.jpg",
      },
      {
        name: "Inspiration Tiramisu",
        description: "Pancakes, crème mascarpone, cacao & café",
        price: "12€",
        badge: null,
        image: "A7400505.jpg",
      },
      {
        name: "Pain Perdu Signature 86",
        description: "Pain sans gluten doré, fruits de saison, sirop d'érable & yaourt végétal",
        price: "13€",
        badge: "GF · DF",
        image: "IMG_3530 19.15.09.jpg",
      },
      {
        name: "Gaufres de Liège",
        description: "Gaufre liégeoise · +coulis +2€ · +crème fouettée +2€ · +fruits frais +3€ · +glace +2€",
        price: "5€",
        badge: null,
        image: "A7403397.jpg",
      },
      {
        name: "Cheesecake Caramel",
        description: "Cheesecake maison, coulant caramel beurre salé",
        price: "9€",
        badge: null,
        image: "A7400114 18.44.33.jpg",
      },
      {
        name: "Gâteau Chocolat",
        description: "Moelleux au chocolat fait maison, sucre glace",
        price: "5€",
        badge: null,
        image: "A7400256.jpg",
      },
      {
        name: "Smoothie Bowl",
        description: "Base onctueuse aux fruits, granola, myrtilles, banane & coulis de cerises",
        price: "8€",
        badge: null,
        image: "A7403481.jpg",
      },
    ],
  },
  {
    category: "Boissons",
    items: [
      {
        name: "Cloud Pistachio Latte",
        description: "Latte glacé, crème de pistache, lait & crème fouettée",
        price: "7€",
        badge: null,
        image: "A7400225.jpg",
      },
      {
        name: "Pink Coco Pitaya",
        description: "Lait de coco, coulis de fruits rouges maison & pitaya",
        price: "7€",
        badge: null,
        image: "A7403452.jpg",
      },
      {
        name: "Ube Latte",
        description: "Latte à l'ube (igname violet)",
        price: "7€",
        badge: null,
        image: "A7403309.jpg",
      },
      {
        name: "Hojicha Latte",
        description: "Latte au thé hojicha torréfié",
        price: "7€",
        badge: null,
        image: null,
      },
      {
        name: "Pink Limonade 86",
        description: "Limonade maison, citron frais & sirop de fruits rouges",
        price: "6€",
        badge: null,
        image: "IMG_3338 19.15.09.jpg",
      },
      {
        name: "Iced Coffee",
        description: "Café froid onctueux, servi sur glace",
        price: "6€",
        badge: null,
        image: null,
      },
      {
        name: "Peanut Butter Coffee",
        description: "Café onctueux au beurre de cacahuète",
        price: "6€",
        badge: null,
        image: null,
      },
      {
        name: "Chocolat Viennois",
        description: "Chocolat chaud & crème fouettée",
        price: "6€",
        badge: null,
        image: "A7403410.jpg",
      },
      {
        name: "Tiramisu Coffee",
        description: "Café, crème mascarpone & cacao",
        price: "5,50€",
        badge: null,
        image: "IMG_3292.jpg",
      },
      {
        name: "Pistachio Coffee",
        description: "Café à la pistache",
        price: "5,50€",
        badge: null,
        image: "A7400219.jpg",
      },
      {
        name: "Limonade maison",
        description: "Limonade fraîche maison",
        price: "4,50€",
        badge: null,
        image: null,
      },
    ],
  },
  {
    category: "Matchas",
    items: [
      {
        name: "Matcha Bora Bora",
        description: "Matcha aux notes exotiques",
        price: "8€",
        badge: null,
        image: null,
      },
      {
        name: "Matcha Red Velvet",
        description: "Matcha red velvet",
        price: "8€",
        badge: null,
        image: "A7400153.jpg",
      },
      {
        name: "Salted Maple Matcha",
        description: "Matcha, sirop d'érable & sel rose d'Himalaya",
        price: "7€",
        badge: null,
        image: "A7400245.jpg",
      },
      {
        name: "Matcha Coco Fraise Vanille",
        description: "Matcha, lait de coco, fraise & vanille",
        price: "7€",
        badge: null,
        image: null,
      },
      {
        name: "Matcha Limonade",
        description: "Matcha & limonade maison",
        price: "6€",
        badge: null,
        image: "A7400239 18.44.34.jpg",
      },
      {
        name: "Matcha Verde",
        description: "Matcha pur, lait froid",
        price: "5,50€",
        badge: null,
        image: "A7400205 18.44.33.jpg",
      },
    ],
  },
  {
    category: "Cafés & Thés",
    items: [
      {
        name: "Américano",
        description: "Espresso allongé",
        price: "4,50€",
        badge: null,
        image: null,
      },
      {
        name: "Latte Macchiato",
        description: "Espresso, lait chaud mousseux",
        price: "4€",
        badge: null,
        image: "IMG_3013 19.14.52.jpg",
      },
      {
        name: "Mocha",
        description: "Espresso, chocolat & lait mousseux",
        price: "4,50€",
        badge: null,
        image: null,
      },
      {
        name: "Chocolat chaud",
        description: "Chocolat chaud onctueux",
        price: "4€",
        badge: null,
        image: null,
      },
      {
        name: "Cappuccino",
        description: "Espresso & mousse de lait",
        price: "3,50€",
        badge: null,
        image: "A7400039.jpg",
      },
      {
        name: "Café",
        description: "Café filtre",
        price: "3€",
        badge: null,
        image: null,
      },
      {
        name: "Thé à la menthe",
        description: "Thé à la menthe fraîche",
        price: "3,50€",
        badge: null,
        image: null,
      },
      {
        name: "Thés spéciaux",
        description: "Sélection de thés du moment",
        price: "3,50€",
        badge: null,
        image: null,
      },
      {
        name: "Double Espresso",
        description: "Double shot d'espresso",
        price: "4€",
        badge: null,
        image: null,
      },
      {
        name: "Espresso",
        description: "Espresso serré",
        price: "2,50€",
        badge: null,
        image: null,
      },
      {
        name: "Softs",
        description: "Coca, Sprite, Fanta…",
        price: "3€",
        badge: null,
        image: "A7400143 18.44.33.jpg",
      },
      {
        name: "Eau",
        description: "Eau plate ou pétillante",
        price: "2,50€",
        badge: null,
        image: null,
      },
    ],
  },
  {
    category: "Mocktails",
    items: [
      {
        name: "Mocktail Premium",
        description: "Mocktail créatif du moment, frais & sans alcool",
        price: "9€",
        badge: null,
        image: "IMG_3358-2.jpg",
      },
      {
        name: "Mojito Classique",
        description: "Menthe fraîche, citron vert, sucre de canne & eau pétillante",
        price: "6€",
        badge: null,
        image: "A7403252.jpg",
      },
      {
        name: "Mojito Violette",
        description: "Sirop violette, citron vert & eau pétillante",
        price: "6€",
        badge: null,
        image: null,
      },
      {
        name: "Mojito Fruits Rouges",
        description: "Fruits rouges, citron vert & eau pétillante",
        price: "6€",
        badge: null,
        image: "A7400210.jpg",
      },
    ],
  },
];

interface CardProps {
  name: string;
  description: string;
  price: string;
  badge: string | null;
  image: string | null;
  index: number;
}

function MenuCard({ name, description, price, badge, image, index }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className="group bg-parchment border border-stone/20 hover:border-ember/40 transition-all duration-300 overflow-hidden hover:-translate-y-0.5 hover:shadow-md flex flex-col"
    >
      {/* Header uniforme pour toutes les cartes */}
      <div className="relative aspect-[4/3] w-full overflow-hidden flex-shrink-0">
        {image ? (
          <Image
            src={`/images/${encodeURIComponent(image)}`}
            alt={name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          /* Placeholder élégant pour items sans photo */
          <div className="w-full h-full bg-paper flex items-center justify-center overflow-hidden">
            {/* Diagonal grain pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(44,26,14,0.04) 0px, rgba(44,26,14,0.04) 1px, transparent 1px, transparent 10px)",
              }}
            />
            {/* Prix watermark */}
            <span
              className="font-serif text-ink/10 leading-none select-none pointer-events-none absolute"
              style={{ fontSize: "clamp(4rem, 8vw, 6.5rem)", bottom: "-0.05em", right: "0.3em" }}
              aria-hidden="true"
            >
              {price}
            </span>
            {/* Nom stylisé au centre */}
            <span className="font-serif text-ink/20 text-center px-6 text-lg leading-snug font-light italic relative z-10">
              {name}
            </span>
          </div>
        )}

        {/* Overlay gradient sur les photos */}
        {image && (
          <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
        )}

        {/* Badge — positionné identiquement pour tous */}
        {badge && (
          <span className="absolute top-3 left-3 text-[8px] font-sans font-semibold tracking-[0.18em] uppercase px-2.5 py-1 bg-ember text-parchment z-10">
            {badge}
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-ink text-[1.1rem] font-medium leading-snug group-hover:text-ember transition-colors duration-200 flex-1">
            {name}
          </h3>
          <span className="font-sans font-semibold text-ember text-sm flex-shrink-0 mt-0.5">
            {price}
          </span>
        </div>
        <p className="font-sans text-stone text-[11px] leading-relaxed mt-2 flex-1">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="menu" ref={ref} className="py-28 md:py-40 bg-paper">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mb-16"
        >
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-ember block mb-4">
            Notre carte
          </span>
          <h2
            className="font-serif text-ink font-light leading-tight"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            Le Menu
          </h2>
          <p className="font-sans text-stone text-sm mt-4 max-w-sm">
            Produits frais, locaux et de saison — chaque assiette préparée avec soin.
          </p>
        </motion.div>

        {/* Category tabs — scrollable horizontal list */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex gap-0 mb-12 overflow-x-auto scrollbar-none border-b border-stone/20 pb-0"
          style={{ scrollbarWidth: "none" }}
        >
          {menu.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(i)}
              className={`relative px-5 py-3 text-[10px] font-sans font-medium tracking-[0.2em] uppercase flex-shrink-0 transition-colors duration-200 ${
                activeTab === i
                  ? "text-ink"
                  : "text-stone hover:text-ink/70"
              }`}
            >
              {cat.category}
              {activeTab === i && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-ember"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {menu[activeTab].items.map((item, i) => (
              <MenuCard key={item.name} {...item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="font-sans text-stone/60 text-[10px] mt-12 tracking-wide border-t border-stone/20 pt-6"
        >
          Menu pouvant varier selon les arrivages &nbsp;·&nbsp; Prix TTC service inclus
        </motion.p>
      </div>
    </section>
  );
}
