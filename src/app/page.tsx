import { redirect } from 'next/navigation';
import { constructMetadata } from '@/lib/metadata';

// Root Metadata for Base Domain (wtmmontreal.com)
// This ensures that sharing the bare link shows a preview even if it redirects.
export const metadata = constructMetadata({
  t: (key: string) => {
    // Simple fallback translator for root metadata (English default)
    const map: Record<string, string> = {
      'title': 'WTM Montreal 2026',
      'template': '%s | WTM Montreal 2026',
      'description': "Join us for Montreal's largest celebration of women in technology. Workshops, talks, networking, and empowerment.",
      'keywords': "Women Techmakers, WTM, Montreal, Tech Conference, Women in Tech, GDG, Google Developer Groups, IWD, International Women's Day",
      'openGraph.siteName': 'WTM Montreal 2026',
    };
    return map[key] || key;
  },
  locale: 'en', // Default locale for root metadata
  path: '/',
});

// Root Redirect for Static Export compatibility
// When a user hits '/', we send them to '/fr'
export default function RootPage() {
  redirect('/fr');
}
