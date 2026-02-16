import { notFound } from 'next/navigation';
import { getMessages, getTranslations } from 'next-intl/server';
import SpeakerProfileCard from '@/components/sections/speakers/SpeakerProfileCard';
import SpeakerBio from '@/components/sections/speakers/SpeakerBio';
import SessionSpotlight from '@/components/sections/speakers/SessionSpotlight';
import { Speaker, SpeakerMessages } from '@/types/speaker';
import { Session, SessionMessages } from '@/types/session';
import FloatingOrb from '@/components/ui/FloatingOrb';
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern';

// We need to import the JSONs dynamically or use a helper. 
// For generateStaticParams, we can import the default (en) one.
import enSpeakers from '@/messages/en/speakers.json';

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const speakers = enSpeakers.Speakers.list;
  return speakers.map((speaker) => ({
    slug: speaker.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  
  // Load data via standard getMessages
  const messages = await getMessages({ locale });
  const speakersData = messages.Speakers as unknown as SpeakerMessages;
  
  const speaker = speakersData.list.find((s: Speaker) => s.id === slug);

  if (!speaker) {
    return {
      title: 'Speaker Not Found',
    };
  }

  return {
    title: speaker.name,
    description: speaker.bio.substring(0, 160) + '...',
    openGraph: {
      images: [speaker.image || '/opengraph-image.png'],
    },
  };
}

export default async function SpeakerDetailsPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'Speakers' });

  // Load Data via standard getMessages
  const messages = await getMessages({ locale });
  const speakersData = messages.Speakers as unknown as SpeakerMessages;
  const sessionsData = messages.Sessions as unknown as SessionMessages;
  
  const speaker = speakersData.list.find((s: Speaker) => s.id === slug);
  
  if (!speaker) {
    notFound();
  }

  // Find associated session(s)
  // Robust matching using trim and lowercase just in case
  const session = sessionsData.list.find((s: Session) => 
    s.speakerIds?.some((id: string) => id.trim().toLowerCase() === speaker.id.trim().toLowerCase())
  );

  // Determine Role Type based on session type (e.g. Keynote)
  const roleKey = session?.type === 'keynote' ? 'keynote' : 'speaker';
  const roleLabel = t(`roles.${roleKey}`);

  return (
    <div className="relative min-h-screen bg-slate-50">
      
      {/* --- Background Layer (Clipped to prevent overflow) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[700px] h-[700px] bg-secondary/5 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[650px] h-[650px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

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

       {/* Giant WTM Watermark (Preserved but layered correctly) */}
       <div className="fixed right-[-5vw] top-[10vh] pointer-events-none z-0 select-none overflow-hidden opacity-[0.015]">
          <div className="text-[25vw] font-black tracking-widest leading-none flex gap-16 text-slate-900 font-sans">
            <span>W</span><span>T</span><span>M</span>
          </div>
       </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24 font-sans">
        {/* Breadcrumb */}
        <nav className="mb-16 flex items-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          <a href={`/${locale}/speakers`} className="hover:text-primary transition-colors">{t('details.breadcrumb')}</a>
          <span className="mx-3 text-slate-300 text-lg font-light">/</span>
          <span className="text-slate-900">{speaker.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
            <SpeakerProfileCard speaker={speaker} roleType={roleLabel} />
          </div>

          {/* Right Column: Bio & Session */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <SpeakerBio bio={speaker.bio} />
            
            {session && (
              <SessionSpotlight session={session} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
