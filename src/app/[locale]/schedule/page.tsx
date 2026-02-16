import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/metadata';
import SectionTitle from '@/components/ui/SectionTitle';
import FloatingOrb from '@/components/ui/FloatingOrb';
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern';
import { CalendarClock } from 'lucide-react';

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

export default async function SchedulePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Schedule');

  return (
    <section className="relative min-h-screen bg-slate-50 overflow-hidden py-24 flex flex-col items-center">
      
      {/* --- Background Layer --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[700px] h-[700px] bg-secondary/5 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[650px] h-[650px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <FloatingOrb color="rgba(0,168,150,0.15)" size="500px" />
        <FloatingOrb color="rgba(66,133,244,0.15)" size="600px" />
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
            tag={t('header.tag')}
            title={t('header.title')}
            subtitle={t('header.subtitle')}
            highlightColor="text-primary"
            as="h1"
            tagStyles={{
              bg: 'bg-primary/10',
              text: 'text-primary',
              border: 'border-primary/20'
            }}
          />
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-12 max-w-2xl text-left shadow-2xl shadow-primary/5 flex flex-col items-start gap-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
            <CalendarClock size={40} strokeWidth={1.5} />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900">
            {t('comingSoon.title')}
          </h2>
          
          <p className="text-slate-600 text-lg leading-relaxed">
            {t('comingSoon.description')}
          </p>
        </div>

      </div>
    </section>
  );
}
