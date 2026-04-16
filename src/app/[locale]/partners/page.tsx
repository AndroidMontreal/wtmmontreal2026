import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Sponsors from '@/components/sections/home/sponsors';
import CommunityPartners from '@/components/sections/home/partners';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.partners' });
  const tDefault = await getTranslations({ locale, namespace: 'Metadata.default' });

  return constructMetadata({
    t: tDefault,
    locale,
    title: t('title') || 'Partners & Sponsors',
    description: t('description') || 'Meet our sponsors and community partners',
  });
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main className="relative min-h-screen">
      {/* Sponsors Section */}
      <Sponsors />

      {/* Community Partners Section */}
      <CommunityPartners />
    </main>
  );
}
