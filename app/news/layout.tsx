import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Latest News & Updates - Khoury Youssef of Sereel",
  description: "Stay updated with the latest news, events, and announcements from Khoury Youssef Church in Sereel Village. Watch videos, read updates, and follow our community journey.",
  keywords: [
    "Khoury Youssef news",
    "Mar Mikhael news",
    "church updates",
    "Sereel events",
    "religious news",
    "church announcements",
    "community events",
    "Lebanese church news",
  ],
  url: `${siteConfig.url}/news`,
  type: "article",
  image: `${siteConfig.url}/assets/saint-icon.jpg`,
});

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

