'use client';

import { useTranslations } from 'next-intl';

interface SpeakerBioProps {
  bio: string;
}

export default function SpeakerBio({ bio }: SpeakerBioProps) {
  const t = useTranslations('Speakers.bioHeader');
  // Split bio into paragraphs if it contains newlines, or just render as is
  const paragraphs = bio.split(/\r?\n/).filter(p => p.trim() !== '');

  return (
    <section className="mb-16 font-sans" data-purpose="speaker-bio">
      <div className="relative mb-8">
        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          {t('about')} <br/>
          <span className="text-primary opacity-90">{t('theSpeaker')}</span>
        </h2>
      </div>
      
      <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-normal max-w-2xl tracking-normal opacity-90">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
