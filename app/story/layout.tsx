import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "The Life Story of Mar Mikhael of Sereel",
  description: "Discover the inspiring life story of Saint Mar Mikhael of Sereel (Khoury Youssef). Learn about his calling, ministry, miracles, and eternal legacy in Sereel Village, Lebanon.",
  keywords: [
    "Mar Mikhael story",
    "Khoury Youssef biography",
    "Saint Mar Mikhael life",
    "Sereel saint history",
    "Lebanese saint biography",
    "Orthodox saint story",
    "Mar Mikhael calling",
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

