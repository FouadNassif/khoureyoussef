import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Gallery - Khoury Youssef Church & Sereel Village",
  description: "View sacred images, icons, and photos of Khoury Youssef Church, the saint's shrine, and beautiful Sereel Village in Lebanon. Explore the spiritual heritage through visual storytelling.",
  keywords: [
    "Khoury Youssef gallery",
    "Mar Mikhael gallery",
    "church photos",
    "Sereel village images",
    "saint icons",
    "church interior",
    "Lebanese church photos",
    "religious images",
    "sacred art",
  ],
  url: `${siteConfig.url}/gallery`,
  image: `${siteConfig.url}/assets/church-interior.jpg`,
});

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

