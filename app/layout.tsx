import type { Metadata } from "next";
import { Inter, Playfair_Display, Cairo, Amiri } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Arabic fonts for RTL support
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kitchen Core - Luxury Palace & Villa Kitchen Design",
  description:
    "Premier luxury kitchen design and fit-out specialists for palaces, villas, and exclusive estates. Bespoke culinary spaces combining Italian craftsmanship, premium appliances, and smart technology for discerning clients.",
  keywords: [
    "luxury kitchen design",
    "palace kitchen fit-out",
    "villa kitchen design",
    "high-end kitchen installation",
    "bespoke kitchen cabinetry",
    "luxury residential kitchens",
    "smart kitchen technology",
    "Dubai kitchen design",
    "Italian kitchen craftsmanship",
    "European kitchen appliances",
  ],
  authors: [{ name: "Kitchen Core" }],
  creator: "Kitchen Core",
  publisher: "Kitchen Core",
  icons: {
    icon: [
      { url: "/logos/favicon.svg", type: "image/svg+xml" },
      { url: "/logos/logo-icon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [
      { url: "/logos/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kitchencore.com",
    title: "Kitchen Core - Luxury Palace & Villa Kitchen Design",
    description:
      "Premier luxury kitchen design and fit-out specialists for palaces, villas, and exclusive estates. Bespoke culinary spaces combining Italian craftsmanship, premium appliances, and smart technology.",
    siteName: "Kitchen Core",
    images: [
      {
        url: "/logos/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Kitchen Core Logo - Luxury Kitchen Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen Core - Luxury Palace & Villa Kitchen Design",
    description:
      "Premier luxury kitchen design and fit-out specialists for palaces, villas, and exclusive estates.",
    images: ["/logos/og-image.svg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  category: "Interior Design",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  // Note: This root layout does NOT set lang/dir attributes
  // Those are set in app/[locale]/layout.tsx based on the current locale
  // This allows locale-specific layouts to control HTML attributes
  // while admin routes can use a different layout structure
  return children;
}
