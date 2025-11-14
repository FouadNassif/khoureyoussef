import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "The Life Story of Khoury Youssef of Sereel",
  description: "Discover the inspiring life story of Saint Khoury Youssef of Sereel (Mar Mikhael). Learn about his calling, ministry, miracles, and eternal legacy in Sereel Village, Lebanon.",
  keywords: [
    "Khoury Youssef story",
    "Khoury Youssef biography",
    "Saint Khoury Youssef life",
    "Mar Mikhael story",
    "Sereel saint history",
    "Lebanese saint biography",
    "Orthodox saint story",
    "Khoury Youssef calling",
    "Sereel village history",
  ],
  url: `${siteConfig.url}/story`,
  type: "article",
  image: `${siteConfig.url}/assets/saint-icon.jpg`,
});

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

