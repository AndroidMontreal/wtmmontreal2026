'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Speaker } from '@/types/speaker';
import { Session } from '@/types/session';
import { cn } from '@/lib/utils';

interface SpeakerCardProps {
  speaker: Speaker;
  session?: Session;
}

export default function SpeakerCard({ speaker, session }: SpeakerCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('Speakers');

  return (
    <Link
      href={`/speakers/${speaker.id}`}
      className="relative aspect-[3/4] rounded-3xl overflow-hidden group bg-slate-900 block transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50"
    >
      {/* Shimmer Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-800 z-20 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent animate-[shimmer_1.5s_infinite]" />
        </div>
      )}

      {/* Image with Zoom & Subtle Vibrancy Hover Effect */}
      <Image
        src={speaker.image}
        alt={speaker.name}
        fill
        onLoad={() => setIsLoading(false)}
        className={cn(
          "object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:saturate-110 group-hover:contrast-105",
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Cinematic Gradient Overlay (Deep Slate/Black) */}
      <div
        className="absolute inset-0 transition-all duration-500 ease-out opacity-80 group-hover:opacity-95"
        style={{
          background: 'linear-gradient(to top, rgba(2, 6, 23, 1) 0%, rgba(2, 6, 23, 0.6) 30%, transparent 100%)'
        }}
      />

      {/* Track Tag (Top Left) */}
      {session && (
        <div className="absolute top-6 left-6 z-10">
          <span className={cn(
            "px-3 py-1 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg backdrop-blur-sm bg-opacity-90",
            session.type === 'workshop' ? "bg-blue-600" : "bg-teal-600"
          )}>
            {session.type === 'workshop' ? t('sessionTypes.workshop') : t('sessionTypes.talk')}
          </span>
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end transform transition-transform duration-500 z-10">
        <h3 className="font-headline text-xl md:text-2xl text-white font-bold leading-tight drop-shadow-md">
          {speaker.name}
        </h3>
        {/* Role in Teal-400 as per reference */}
        <p className="text-teal-400 font-medium text-xs md:text-sm mt-0.5 drop-shadow-sm">
          {speaker.role} {speaker.company && <span>@ {speaker.company}</span>}
        </p>

        {/* Hover-only Session Title */}
        <div className="overflow-hidden max-h-0 group-hover:max-h-32 transition-all duration-500 ease-in-out">
          {session && (
            <p className="text-slate-300 text-xs md:text-sm mt-2 leading-relaxed line-clamp-3 font-medium">
              {session.title}
            </p>
          )}
        </div>

        {/* View Details Link with Underline Animation */}
        <div className="mt-3 mb-1 flex justify-between items-center opacity-100">
          <span className="text-white text-[10px] md:text-xs font-medium uppercase tracking-widest relative inline-block group-hover:text-teal-50 transition-colors">
            {t('viewDetails')}
            <span className="absolute bottom-[-3px] left-0 w-0 h-[1px] bg-teal-400 transition-all duration-500 ease-out group-hover:w-full shadow-[0_0_8px_rgba(45,212,191,0.6)]"></span>
          </span>
        </div>
      </div>
    </Link>
  );
}
