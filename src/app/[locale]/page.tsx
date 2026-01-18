import { setRequestLocale } from 'next-intl/server';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/hero';
import Gallery from '@/components/sections/gallery';
import SponsorsGrid from '@/components/sections/SponsorsGrid';
import CommunityPartners from '@/components/sections/CommunityPartners';
import FloatingContact from '@/components/ui/FloatingContact';

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
        <Gallery />
        <SponsorsGrid />
        <CommunityPartners />
      </main>

      <Footer />
    </div>
  );
}
