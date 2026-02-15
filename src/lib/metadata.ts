import { Metadata } from 'next';

type MetadataProps = {
  t: (key: string) => string; // Translator function
  locale: string;
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  path?: string; // Optional specific path like '/speakers'
};

export function constructMetadata({
  t,
  locale,
  title,
  description,
  image = '/opengraph-image.png',
  noIndex = false,
  path = '',
}: MetadataProps): Metadata {
  return {
    metadataBase: new URL('https://wtmmontreal.com'),
    title: {
      default: title || t('title'),
      template: t('template'),
    },
    description: description || t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: title || t('title'),
      description: description || t('description'),
      url: `/${locale}${path}`,
      siteName: t('openGraph.siteName'),
      locale: locale === 'fr' ? 'fr_CA' : 'en_US',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || t('title'),
      description: description || t('description'),
      creator: '@WTMMontreal',
      site: '@WTMMontreal',
      images: [image],
    },
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        'en': `/en${path}`,
        'fr': `/fr${path}`,
      },
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}
