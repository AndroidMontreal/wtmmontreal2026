import { Metadata } from 'next';
import { getTranslations, setRequestLocale, getMessages } from 'next-intl/server';
import { constructMetadata } from '@/lib/metadata';
import SchedulePage from '@/components/sections/schedule/SchedulePage';
import { ScheduleMessages } from '@/types/schedule';
import { Session } from '@/types/session';
import { Speaker } from '@/types/speaker';
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern';
import FloatingOrb from '@/components/ui/FloatingOrb';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.default' });
  const tPage = await getTranslations({ locale, namespace: 'Metadata.schedule' });

  return constructMetadata({
    t,
    locale,
    title: tPage('title'),
    description: tPage('description'),
    path: '/schedule',
  });
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages({ locale });
  const scheduleMessages = messages.Schedule as unknown as ScheduleMessages;
  const sessionsObj = messages.Sessions as { list?: Session[] };
  const speakersObj = messages.Speakers as { list?: Speaker[] };
  const statsMessages = messages.Stats as { items?: { label: string; value: string; icon?: string }[] } | undefined;

  if (!scheduleMessages) {
    return null;
  }

  const sessionsData = sessionsObj?.list || [];
  const speakersData = speakersObj?.list || [];
  const statsData = statsMessages?.items ? { items: statsMessages.items } : undefined;

  return (
    <section className="relative py-24 bg-background overflow-hidden min-h-screen">
      {/* --- Background Layer --- */}
      <div className="absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[700px] h-[700px] bg-secondary/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[650px] h-[650px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <FloatingOrb color="rgba(0,168,150,0.15)" size="500px" />
        <FloatingOrb color="rgba(66,133,244,0.15)" size="600px" />
      </div>

      <InteractiveGridPattern className="opacity-[0.2]" dotColor="#cbd5e1" spacing={26} />

      {/* --- Content Layer --- */}
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <SchedulePage
          data={scheduleMessages}
          schedule={scheduleMessages.schedule}
          sessions={sessionsData}
          speakers={speakersData}
          stats={statsData}
        />
      </div>
    </section>
  );
}
