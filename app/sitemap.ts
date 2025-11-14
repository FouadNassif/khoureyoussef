import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/story',
    '/miracles',
    '/gallery',
    '/news',
    '/contact',
  ];

  // Generate sitemap entries for each language
  const languages = ['en', 'ar', 'fr'];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    languages.forEach((lang) => {
      const url = lang === 'en' 
        ? `${baseUrl}${route || '/'}` 
        : `${baseUrl}/${lang}${route || ''}`;
      
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: route === '' ? 'weekly' : route === '/news' ? 'daily' : 'monthly',
        priority: route === '' ? 1.0 : route === '/story' ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            languages.map((l) => [
              l,
              l === 'en' 
                ? `${baseUrl}${route || '/'}` 
                : `${baseUrl}/${l}${route || ''}`,
            ])
          ),
        },
      });
    });
  });

  return sitemapEntries;
}

