import type { Metadata, Viewport } from "next";
import { Cinzel, Jost } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { SITE_NAME, SITE_URL, restaurantJsonLd } from "@/lib/site";
import { RESTOMAX_STORE_UID, RESTOMAX_WIDGET_SRC } from "@/lib/booking";
import BookingWidget from "@/components/BookingWidget";

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

const description =
  "Brunch fait maison et café de spécialité à Liège (Grivegnée). Carte du soir aux saveurs marocaines le vendredi et samedi, options sans gluten. Lun–Ven 9h–17h · Week-end 10h–17h.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "L'Adresse 86 — Brunch & Coffee à Liège",
    template: "%s · L'Adresse 86",
  },
  description,
  keywords: [
    "brunch liège",
    "brunch grivegnée",
    "coffee shop liège",
    "café de spécialité liège",
    "petit-déjeuner liège",
    "brunch sans gluten liège",
    "restaurant marocain liège",
    "L'Adresse 86",
    "ladresse86",
  ],
  authors: [{ name: SITE_NAME }],
  applicationName: SITE_NAME,
  category: "restaurant",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "L'Adresse 86 — Brunch & Coffee à Liège",
    description,
    url: "/",
    siteName: SITE_NAME,
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Adresse 86 — Brunch & Coffee à Liège",
    description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#2C1A0E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-BE">
      <body className={`${cinzel.variable} ${jost.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        {children}
        <Script id="restomaxbook-config" strategy="afterInteractive">
          {`window.RestomaxBook = { storeUid: '${RESTOMAX_STORE_UID}' };`}
        </Script>
        <Script id="restomaxbook-widget-injector" src={RESTOMAX_WIDGET_SRC} strategy="afterInteractive" />
        <BookingWidget />
      </body>
    </html>
  );
}
