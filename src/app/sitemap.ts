import { MetadataRoute } from 'next';
import enSpeakers from '@/messages/en/speakers.json';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wtm-montreal-2026.surge.sh';
  
  // Static Routes
  const staticRoutes = [
    '',
    '/speakers',
    '/code-of-conduct',
    '/team',
    '/schedule'
  ];

  // Dynamic Routes (Speakers)
  const speakers = enSpeakers.Speakers.list;
  const speakerRoutes = speakers.map(s => `/speakers/${s.id}`);

  const allRoutes = [...staticRoutes, ...speakerRoutes];

  const map = allRoutes.flatMap((route) => {
    return ['en', 'fr'].map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }));
  });

  return map;
}
