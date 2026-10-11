import type { Metadata } from "next";
import { Cairo, Amiri } from "next/font/google";
import "./globals.css";
import "./index.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/components/I18nProvider";
import { generateMetadata as generateSEOMetadata, siteConfig } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/next"

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

export const metadata: Metadata = generateSEOMetadata({
  title: "Khoury Youssef (khoure youssef) - Saint's Life, Miracles & Legacy | Sereel",
  description: "Khoury Youssef (khoure youssef) - Discover the life, miracles, and spiritual legacy of Saint Khoury Youssef of Sereel. Learn about Khoury Youssef Abi Maroun Maatouk, his divine intercession, and visit his shrine in Sereel Village, Lebanon.",
  keywords: [
    "Khoury Youssef",
    "khoure youssef",
    "Khoury Youssef of Sereel",
    "khoure youssef sereel",
    "Khoury Youssef Abi Maroun Maatouk",
    "khoure youssef abi maroun",
    "Saint Khoury Youssef",
    "الخوري يوسف",
    "Mar Mikhael",
    "Saint Michael",
    "Sereel",
    "Lebanese Saints",
    "Orthodox Saints",
    "Miracles",
    "Spiritual Heritage",
    "Khoury Youssef Church",
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
        <meta name="google-site-verification" content="1UK1bedaJ8qTEvJT7_cxNoYpiZjmtJZ7pugbFyG6Dhk" />
      </head>
      <body
        className={`
          ${cairo.variable}
          ${amiri.variable}
          antialiased
        `}
      >
        <StructuredData />
        <I18nProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}

