"use client";

import { useEffect } from "react";
import { generateStructuredData, siteConfig } from "@/lib/seo";

export default function StructuredData() {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = generateStructuredData({
      type: "Organization",
      data: {
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/assets/saint-icon.jpg`,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address.street,
          addressLocality: siteConfig.contact.address.city,
          addressCountry: siteConfig.contact.address.country,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.contact.phone,
          contactType: "Religious Organization",
        },
        sameAs: [
          siteConfig.links.facebook,
          siteConfig.links.instagram,
        ],
      },
    });

    // Person Schema (Saint Mar Mikhael)
    const personSchema = generateStructuredData({
      type: "Person",
      data: {
        name: "Mar Mikhael of Sereel",
        alternateName: ["Saint Michael of Sereel", "Khoury Youssef", "Mar Mikhael"],
        description: "Saint Mar Mikhael of Sereel, also known as Khoury Youssef, is a revered saint in the Lebanese Orthodox tradition. Known for his miracles and divine intercession, he is the patron saint of Sereel Village.",
        jobTitle: "Saint",
        knowsAbout: ["Christianity", "Orthodox Faith", "Miracles", "Divine Healing"],
        affiliation: {
          "@type": "Organization",
          name: "Lebanese Orthodox Church",
        },
      },
    });

    // WebSite Schema
    const websiteSchema = generateStructuredData({
      type: "WebSite",
      data: {
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    });

    // BreadcrumbList Schema (for navigation)
    const breadcrumbSchema = generateStructuredData({
      type: "BreadcrumbList",
      data: {
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Story",
            item: `${siteConfig.url}/story`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Miracles",
            item: `${siteConfig.url}/miracles`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Gallery",
            item: `${siteConfig.url}/gallery`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "News",
            item: `${siteConfig.url}/news`,
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Contact",
            item: `${siteConfig.url}/contact`,
          },
        ],
      },
    });

    // Add all schemas to the page
    const scripts = [
      organizationSchema,
      personSchema,
      websiteSchema,
      breadcrumbSchema,
    ];

    scripts.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      script.id = `structured-data-${schema["@type"]}`;
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      scripts.forEach((schema) => {
        const script = document.getElementById(`structured-data-${schema["@type"]}`);
        if (script) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
}

