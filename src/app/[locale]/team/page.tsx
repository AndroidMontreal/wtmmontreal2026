import { Metadata } from 'next';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { constructMetadata } from '@/lib/metadata';
import { TeamMessages } from '@/types/team';
import TeamGrid from '@/components/sections/team/TeamGrid';
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern';
import FloatingOrb from '@/components/ui/FloatingOrb';
import SectionTitle from '@/components/ui/SectionTitle';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.default' });
  const tPage = await getTranslations({ locale, namespace: 'Metadata.team' });

  return constructMetadata({
    t,
    locale,
    title: tPage('title'),
    description: tPage('description'),
    path: '/team',
  });
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages({ locale });
  const teamMessages = messages.Team as unknown as TeamMessages;

  if (!teamMessages) return null;

  const { header, members } = teamMessages;

  // Data Processing: Sort members by year (Oldest first)
  const sortedMembers = [...members].sort((a, b) => {
    const yearA = a.year || '9999';
    const yearB = b.year || '9999';
    return yearA.localeCompare(yearB);
  });

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden min-h-screen">

      {/* --- Background Layer --- */}

      {/* 1. Static Color Blurs (Corners) */}
      <div className="absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[700px] h-[700px] bg-secondary/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[650px] h-[650px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 2. Animated Floating Orbs (Dynamic Movement) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <FloatingOrb color="rgba(66,133,244,0.50)" size="500px" />
        <FloatingOrb color="rgba(66,133,244,0.45)" size="600px" />
        <FloatingOrb color="rgba(0,168,150,0.55)" size="400px" />
      </div>

      {/* 3. Global Interactive Grid Pattern */}
      <InteractiveGridPattern
        className="opacity-[0.2]"
        dotColor="#cbd5e1"
        spacing={26}
      />

      {/* --- Content Layer --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Page Title */}
        <SectionTitle
          tag={header.tag}
          title={header.title}
          subtitle={header.subtitle}
          highlightColor="text-secondary"
          as="h1"
          tagStyles={{
            bg: 'bg-secondary/10',
            text: 'text-secondary',
            border: 'border-secondary/20'
          }}
        />

        {/* Grid Content */}
        <TeamGrid members={sortedMembers} />
      </div>
    </section>
  );
}
