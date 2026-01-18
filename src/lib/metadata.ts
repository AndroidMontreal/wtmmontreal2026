import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * Metadata Factory
 * Generates SEO titles and descriptions automatically from translations.
 * 
 * Usage in page.tsx:
 * export async function generateMetadata(props: Props) {
 *   return constructMetadata(props, 'Metadata.home');
 * }
 */
export async function constructMetadata({ params }: Props, namespace: string): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace });

  return {
    title: t('title'),
    description: t('description'),
    // Bonus: Auto-generate OpenGraph for social sharing
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale,
      type: 'website',
    }
  };
}
