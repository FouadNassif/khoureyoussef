import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marmikhael-sereel.com";
const siteName = "Mar Mikhael of Sereel";
const defaultDescription = "Discover the life, miracles, and spiritual legacy of Saint Mar Mikhael of Sereel. A sacred journey through faith, tradition, and divine grace.";
const defaultKeywords = [
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
  "Religious Heritage"
];

interface SEOConfig {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  locale?: string;
  alternateLocales?: { locale: string; url: string }[];
}

export function generateMetadata({
  title,
  description = defaultDescription,
  keywords = defaultKeywords,
  image = `${siteUrl}/assets/saint-icon.jpg`,
  url = siteUrl,
  type = "website",
  publishedTime,
  modifiedTime,
  author = siteName,
  locale = "en",
  alternateLocales = [],
}: SEOConfig): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const keywordsString = keywords.join(", ");

  const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
      default: fullTitle,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: keywordsString,
    authors: [{ name: author }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type,
      locale: locale,
      url,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@marmikhael",
    },
    alternates: {
      canonical: url,
      ...(alternateLocales.length > 0 && {
        languages: Object.fromEntries(
          alternateLocales.map((alt) => [alt.locale, alt.url])
        ),
      }),
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
    verification: {
      // Add your verification codes here when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
  };

  return metadata;
}

export function generateStructuredData({
  type,
  data,
}: {
  type: "Organization" | "Person" | "WebSite" | "Article" | "BreadcrumbList";
  data: any;
}) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return baseStructuredData;
}

export const siteConfig = {
  name: siteName,
  url: siteUrl,
  description: defaultDescription,
  keywords: defaultKeywords,
  ogImage: `${siteUrl}/assets/saint-icon.jpg`,
  links: {
    facebook: "https://facebook.com/marmikhael",
    instagram: "https://instagram.com/marmikhael",
  },
  contact: {
    phone: "+961 71 797 514",
    address: {
      street: "Church of Mar Mikhael",
      city: "Sereel Village - Zgharta",
      country: "Lebanon",
    },
  },
};

