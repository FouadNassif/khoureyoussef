import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Miracles of Mar Mikhael of Sereel - Divine Interventions",
  description: "Explore documented miracles and testimonies of divine healing through the intercession of Saint Mar Mikhael of Sereel. Read stories of answered prayers and miraculous healings.",
  keywords: [
    "Mar Mikhael miracles",
    "divine healing",
    "answered prayers",
    "miraculous healings",
    "saint intercession",
    "spiritual miracles",
    "Lebanese saint miracles",
    "testimonies of faith",
    "divine interventions",
  ],
  url: `${siteConfig.url}/miracles`,
  type: "article",
  image: `${siteConfig.url}/assets/saint-icon.jpg`,
});

export default function MiraclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

