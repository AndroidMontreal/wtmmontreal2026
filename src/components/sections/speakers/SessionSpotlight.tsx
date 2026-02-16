'use client';

import { Session } from '@/types/session';
import { CalendarPlus, MapPin, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SessionSpotlightProps {
  session: Session;
  onAddToSchedule?: () => void;
}

export default function SessionSpotlight({ session, onAddToSchedule }: SessionSpotlightProps) {
  const t = useTranslations('Speakers.details');
  const tTypes = useTranslations('Speakers.sessionTypes');

  // Simple parser for rich text (paragraphs, bold, bullets)
  const renderFormattedDescription = (text: string) => {
    return text.split('\n\n').map((paragraph, pIdx) => {
      const lines = paragraph.split('\n');
      
      return (
        <div key={pIdx} className="mb-4 last:mb-0">
          {lines.map((line, lIdx) => {
            // Check for bullet points
            const isBullet = line.trim().startsWith('-');
            const cleanLine = isBullet ? line.trim().substring(1).trim() : line;
            
            // Handle bold text **bold**
            const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
            const formattedLine = parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
              }
              return part;
            });

            if (isBullet) {
              return (
                <div key={lIdx} className="flex gap-3 mb-2 pl-2">
                  <span className="text-primary mt-2.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(0,168,150,0.4)]"></span>
                  <span className="text-slate-600 leading-relaxed">{formattedLine}</span>
                </div>
              );
            }

            return (
              <p key={lIdx} className="text-slate-600 leading-relaxed mb-2 last:mb-0">
                {formattedLine}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <section className="relative mt-20 font-sans" data-purpose="session-details">
      <div className="flex items-center gap-4 mb-8">
        <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent"></span>
        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">{t('spotlight')}</h3>
      </div>
      
      <div className="group relative bg-white rounded-[32px] transition-all duration-500 hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-0.5 border border-slate-100 flex flex-col h-full">
        <div className="absolute -inset-4 border border-transparent group-hover:border-primary/40 rounded-[40px] pointer-events-none transition-all duration-500 hidden lg:block"></div>
        
        <div className="p-8 lg:p-14 relative z-10 flex flex-col h-full">
          
          {/* Header: Badge & Minimalist Action Icon */}
          <div className="flex items-center justify-between mb-8">
             {/* Type Badge */}
             <div className={`inline-flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-full w-fit text-white shadow-lg transition-transform duration-300 group-hover:scale-105 ${
              session.type === 'workshop' ? 'bg-secondary shadow-secondary/20' : 'bg-primary shadow-primary/20'
            }`}>
              {session.type === 'workshop' ? tTypes('workshop') : tTypes('talk')}
            </div>

            {/* Icon-Only Action Button */}
            <div className="relative group/tooltip">
              <button 
                onClick={onAddToSchedule}
                className="w-12 h-12 flex items-center justify-center text-primary cursor-pointer rounded-xl transition-all duration-300 ease-in-out hover:bg-primary/10 hover:scale-110 active:scale-95"
                aria-label={t('addToCalendar')}
              >
                <CalendarPlus size={24} className="transition-transform duration-300" />
              </button>
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-20">
                {t('addToCalendar')}
              </span>
            </div>
          </div>

          {/* Title */}
          <h4 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-400 group-hover:text-primary transition-colors duration-500 mb-6 leading-tight">
            {session.title}
          </h4>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10 text-sm font-medium text-slate-500 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-secondary" />
              <span>{t('room')} <span className="font-bold text-slate-700">{t('tbd')}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              <span>{t('duration')} <span className="font-bold text-slate-700">{session.duration}</span></span>
            </div>
          </div>
          
          {/* Formatted Description */}
          <div className="text-slate-600 text-base lg:text-lg leading-relaxed font-normal mb-10 flex-1">
            {renderFormattedDescription(session.description)}
          </div>

          {/* Footer Tags */}
          {session.tags && session.tags.length > 0 && (
            <div className="pt-8 border-t border-slate-100 mt-auto">
              <div className="flex flex-wrap gap-2">
                {session.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 bg-primary/10 text-primary text-[11px] font-bold rounded-full uppercase tracking-wider border border-primary/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
