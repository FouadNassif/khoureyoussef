import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact & Visit Mar Mikhael Church - Sereel, Lebanon",
  description: "Plan your visit to Mar Mikhael Church in Sereel Village, Zgharta, Lebanon. Find contact information, service times, location map, and directions to the sacred shrine.",
  keywords: [
    "Mar Mikhael church contact",
    "visit Sereel",
    "church location",
    "service times",
    "Zgharta church",
    "Lebanon church visit",
    "church address",
    "prayer times",
  ],
  url: `${siteConfig.url}/contact`,
  image: `${siteConfig.url}/assets/church-interior.jpg`,
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

