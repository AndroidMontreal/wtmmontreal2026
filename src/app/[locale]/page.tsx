import { setRequestLocale, getTranslations } from 'next-intl/server';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/home/hero';
import StatsSection from '@/components/sections/home/Stats';
import Gallery from '@/components/sections/home/gallery';
import Sponsors from '@/components/sections/home/sponsors';
import CommunityPartners from '@/components/sections/home/partners';
import FloatingContact from '@/components/ui/FloatingContact';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.home' });
  const tDefault = await getTranslations({ locale, namespace: 'Metadata.default' });

  return constructMetadata({
    t: tDefault,
    locale,
    title: t('title'),
    description: t('description'),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/30 text-slate-800">
      <FloatingContact />

      {/* Shell */}
      <AnnouncementBar />
      <Navbar />

      {/* Full Page Content */}
      <main className="flex flex-col">
        <Hero />
        <StatsSection />
        <Gallery />
        <Sponsors />
        <CommunityPartners />
      </main>

      <Footer />
    </div>
  );
}
