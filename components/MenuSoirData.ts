import type { MenuCategory } from "@/components/MenuData";

export const menuSoir: MenuCategory[] = [
  {
    category: "Nos Kémias",
    items: [
      {
        name: "Salade marocaine",
        description: "Tomates, concombre, oignons, poivrons finement coupés & épices douces",
        price: "5",
        badge: null,
        image: "A7407043.jpg",
      },
      {
        name: "Zaalouk",
        description: "Caviar d'aubergines & tomates mijotées aux épices marocaines",
        price: "6",
        badge: null,
        image: "A7407040.jpg",
      },
      {
        name: "Perle de couscous",
        description: "Couscous perlé, raisins secs, poivrons & menthe fraîche",
        price: "5",
        badge: null,
        image: "A7407049.jpg",
      },
      {
        name: "Salade de carottes au cumin",
        description: "Carottes fondantes, cumin & huile d'olive",
        price: "5",
        badge: null,
        image: "A7407048.jpg",
      },
      {
        name: "Betteraves à l'orange",
        description: "Betteraves rôties, écorces d'orange confites",
        price: "5",
        badge: null,
        image: "A7407032.jpg",
      },
    ],
  },
  {
    category: "Nos Menus du Soir",
    items: [
      {
        name: "L'Espérience 86",
        description: "+3 pour un Medina Roll Pastilla",
        price: "35",
        badge: "Formule",
        image: null,
        components: ["1 entrée", "1 Medina Roll", "1 dessert", "1 Mojito 86"],
      },
      {
        name: "Duo 86",
        description: "+3 pour un Medina Roll Pastilla",
        price: "65",
        badge: "Formule",
        image: null,
        components: [
          "1 salade marocaine à partager",
          "2 plats au choix",
          "2 desserts au choix",
          "Thés à la menthe fraîche",
        ],
      },
    ],
  },
  {
    category: "Accompagnements",
    items: [
      {
        name: "Batata frit",
        description: "Frites maison",
        price: "4",
        badge: null,
        image: "A7406980.jpg",
      },
      {
        name: "Khobz",
        description: "Pain marocain traditionnel",
        price: "2",
        badge: null,
        image: null,
      },
      {
        name: "Sauce 86",
        description: "Sauce signature de la maison",
        price: "1",
        badge: null,
        image: null,
      },
    ],
  },
  {
    category: "Le Medina Roll",
    items: [
      {
        name: "Medina Roll Pastilla",
        description: "Pastilla feuilletée, sucre glace, amandes & cannelle",
        price: "17",
        badge: null,
        image: "A7407068.jpg",
      },
      {
        name: "Medina Roll Atlas",
        description: "Roll croustillant, agrumes & sauce yaourt",
        price: "15",
        badge: null,
        image: "A7407050.jpg",
      },
      {
        name: "Medina Roll Majorelle",
        description: "Roll croustillant, radis, pousses fraîches, tomates cerises & réduction balsamique",
        price: "14",
        badge: null,
        image: "A7407058.jpg",
      },
    ],
  },
  {
    category: "Les Incontournables",
    items: [
      {
        name: "Boulet liégeois façon 86",
        description: "Boulets sauce liégeoise maison · +3 sans gluten",
        price: "17",
        badge: null,
        image: "A7406977.jpg",
      },
      {
        name: "Burger 86",
        description: "Burger signature de la maison, frites · +5 sans gluten",
        price: "15",
        badge: null,
        image: "A7407004.jpg",
      },
      {
        name: "Les pâtes du 86",
        description: "Pâtes signature de la maison · +3 sans gluten",
        price: "15",
        badge: null,
        image: null,
      },
    ],
  },
  {
    category: "Les Douceurs d'Orient",
    items: [
      {
        name: "Tiramisouk affogato",
        description: "Tiramisu revisité, espresso versé sur glace vanille",
        price: "10",
        badge: null,
        image: null,
      },
      {
        name: "Thé gourmand",
        description: "Thé à la menthe fraîche & mignardises",
        price: "9",
        badge: null,
        image: null,
      },
      {
        name: "Moelleux au chocolat",
        description: "Moelleux au chocolat fait maison",
        price: "10",
        badge: null,
        image: null,
      },
    ],
  },
];
