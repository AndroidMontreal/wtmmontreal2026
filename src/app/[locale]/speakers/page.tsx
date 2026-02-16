import { Metadata } from 'next';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { constructMetadata } from '@/lib/metadata';
import { SpeakerMessages } from '@/types/speaker';
import { SessionMessages } from '@/types/session';
import SpeakerSection from '@/components/sections/speakers/SpeakerSection';
import SectionTitle from '@/components/ui/SectionTitle';
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern';
import FloatingOrb from '@/components/ui/FloatingOrb';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.default' });
  
  return constructMetadata({
    t,
    locale,
    title: "Speakers",
    description: "Meet the voices of innovation.",
    path: '/speakers',
  });
}

export default async function SpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages({ locale });
  const speakerData = messages.Speakers as unknown as SpeakerMessages;
  const sessionData = messages.Sessions as unknown as SessionMessages;

  if (!speakerData || !sessionData) return null;

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden min-h-screen">
      
      {/* --- Background Layer --- */}
      <div className="absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[700px] h-[700px] bg-secondary/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[650px] h-[650px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <FloatingOrb color="rgba(0,168,150,0.15)" size="500px" />
        <FloatingOrb color="rgba(66,133,244,0.15)" size="600px" />
        <FloatingOrb color="rgba(0,168,150,0.15)" size="400px" />
      </div>

      <InteractiveGridPattern
        className="opacity-[0.2]"
        dotColor="#cbd5e1"
        spacing={26}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <SectionTitle
            tag={speakerData.header.tag}
            title={speakerData.header.title}
            subtitle={speakerData.header.subtitle}
            highlightColor="text-primary"
            as="h1"
            tagStyles={{
              bg: 'bg-primary/10',
              text: 'text-primary',
              border: 'border-primary/20'
            }}
          />
        </div>

        {/* Client-side Filtering & Grid */}
        <SpeakerSection 
          speakers={speakerData.list} 
          sessions={sessionData.list} 
          labels={speakerData.filters} 
        />

      </div>
    </section>
  );
}
