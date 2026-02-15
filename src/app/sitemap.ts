import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wtm-montreal-2026.surge.sh';
  
  // List of all static routes
  const routes = [
    '',
    '/code-of-conduct',
  ];

  const map = routes.flatMap((route) => {
    return ['en', 'fr'].map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }));
  });

  return map;
}
