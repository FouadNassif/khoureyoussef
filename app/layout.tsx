import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Cairo,
  Amiri,
  Noto_Serif,
  Tajawal,
  Noto_Sans_Arabic,
} from "next/font/google";
import "./globals.css";
import "./index.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/components/I18nProvider";
import { generateMetadata as generateSEOMetadata, siteConfig } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";

// Geist Sans (UI)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Geist Mono (code / mono text)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Cairo – modern Arabic + Latin
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Amiri – elegant Arabic/English serif for titles
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
  display: "swap",
});

// Noto Sans Arabic – fallback for Arabic sans
const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Noto Serif – serif for English/Latin
const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Tajawal – modern, clean Arabic font
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = generateSEOMetadata({
  title: "Mar Mikhael of Sereel - Saint's Life, Miracles & Legacy",
  description: "Discover the life, miracles, and spiritual legacy of Saint Mar Mikhael of Sereel. A sacred journey through faith, tradition, and divine grace. Visit the shrine in Sereel Village, Lebanon.",
  keywords: [
    "Mar Mikhael",
    "Saint Michael",
    "Sereel",
    "Lebanese Saints",
    "Orthodox Saints",
    "Miracles",
    "Spiritual Heritage",
    "Khoury Youssef",
    "Mar Mikhael Church",
    "Sereel Village",
    "Lebanon",
    "Christian Saints",
    "Divine Healing",
    "Answered Prayers",
    "Religious Heritage",
    "Zgharta",
    "Lebanese Orthodox Church",
  ],
  alternateLocales: [
    { locale: "en", url: `${siteConfig.url}/en` },
    { locale: "ar", url: `${siteConfig.url}/ar` },
    { locale: "fr", url: `${siteConfig.url}/fr` },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#D4A574" />
        <meta name="msapplication-TileColor" content="#D4A574" />
      </head>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${cairo.variable}
          ${amiri.variable}
          ${notoSansArabic.variable}
          ${notoSerif.variable}
          ${tajawal.variable}
          antialiased
        `}
      >
        <StructuredData />
        <I18nProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

