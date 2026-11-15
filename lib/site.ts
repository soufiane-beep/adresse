// Single source of truth for the public URL. Set NEXT_PUBLIC_SITE_URL in Vercel
// to override the production domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.adresse86.be").replace(/\/$/, "");

export const SITE_NAME = "L'Adresse 86";

export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "CafeOrCoffeeShop"],
  "@id": `${SITE_URL}/#restaurant`,
  name: SITE_NAME,
  description:
    "Brunch fait maison et café de spécialité à Liège (Grivegnée). Carte du soir aux saveurs marocaines le vendredi et samedi. Options sans gluten.",
  url: SITE_URL,
  image: [`${SITE_URL}/opengraph-image.jpg`, `${SITE_URL}/images/A7403214.jpg`],
  logo: `${SITE_URL}/icon-512.png`,
  menu: `${SITE_URL}/menu`,
  hasMenu: [`${SITE_URL}/menu`, `${SITE_URL}/menu/soir`],
  servesCuisine: ["Brunch", "Café", "Marocaine", "Sans gluten"],
  acceptsReservations: false,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rue Eugène Vandenhoff 86",
    postalCode: "4030",
    addressLocality: "Liège",
    addressRegion: "Wallonie",
    addressCountry: "BE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.6303608,
    longitude: 5.6027906,
  },
  hasMap: "https://www.google.com/maps/search/?api=1&query=Rue+Eug%C3%A8ne+Vandenhoff+86%2C+4030+Li%C3%A8ge",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "10:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "18:30",
      closes: "21:30",
    },
  ],
  sameAs: ["https://www.instagram.com/ladresse86/"],
};
