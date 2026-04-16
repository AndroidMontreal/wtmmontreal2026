'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Session } from '@/types/session';
import { Speaker } from '@/types/speaker';
import { ScheduleSession } from '@/types/schedule';
import { cn } from '@/lib/utils';
import { openCalendarEvent } from '@/lib/calendar';
import { MapPin, Clock, Sparkles, CalendarPlus, Utensils } from 'lucide-react';

interface SessionCardProps {
  scheduleSession: ScheduleSession;
  session: Session;
  speakers: Speaker[];
  startTime: string;
  endTime: string;
}

/**
 * SessionCard displays a single session in the schedule.
 * Matches the reference design from agenda.html exactly.
 */
export default function SessionCard({
  scheduleSession,
  session,
  speakers,
  startTime,
  endTime,
}: SessionCardProps) {
  const isBreak = scheduleSession.isBreak ?? false;
  
  // Format time to 12h with AM/PM
  const formatTime12h = (time24: string) => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return {
      time: `${hours12}:${minutes.toString().padStart(2, '0')}`,
      period
    };
  };

  const startInfo = formatTime12h(startTime);
  const sessionSpeakers = speakers.filter((s) => scheduleSession.speakerIds.includes(s.id));
  
  const addToCalendar = () => {
    openCalendarEvent({
      title: session.title,
      description: session.description,
      startTime,
      endTime,
      speakerNames: sessionSpeakers.map(s => s.name),
      duration: session.duration,
      tags: session.tags || []
    });
  };
  
  // Get session type styling
  const getTypeStyles = () => {
    switch (session.type) {
      case 'workshop':
        return { bg: 'bg-secondary/10', text: 'text-secondary', icon: Sparkles, label: 'WORKSHOP' };
      case 'atelier':
        return { bg: 'bg-secondary/10', text: 'text-secondary', icon: Sparkles, label: 'ATELIER' };
      case 'panel':
        return { bg: 'bg-purple-500/10', text: 'text-purple-600', icon: Sparkles, label: 'PANEL' };
      case 'community-panel':
        return { bg: 'bg-purple-500/10', text: 'text-purple-600', icon: Sparkles, label: 'COMMUNITY PANEL' };
      case 'community-demo':
        return { bg: 'bg-purple-500/10', text: 'text-purple-600', icon: Sparkles, label: 'COMMUNITY DEMO' };
      case 'keynote':
        return { bg: 'bg-primary/10', text: 'text-primary', icon: Sparkles, label: 'KEYNOTE' };
      default:
        return { bg: 'bg-primary/10', text: 'text-primary', icon: Sparkles, label: session.type.toUpperCase() };
    }
  };

  const typeStyles = getTypeStyles();
  const TypeIcon = typeStyles.icon;

  if (isBreak) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row relative -mx-6 md:mx-0">
        <div className="md:w-36 p-4 md:p-8 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-2 border-b md:border-b-0 md:border-r border-slate-200 shrink-0">
          <span className="text-2xl md:text-3xl font-black text-slate-400 leading-none">{startInfo.time}</span>
          <span className="text-slate-400 font-bold text-[9px] md:text-[10px] uppercase tracking-widest opacity-60">
            {startInfo.period} / EST
          </span>
        </div>
        <div className="flex-grow p-4 md:p-10 relative">
          <div className="absolute top-0 right-0 p-6 md:p-10 opacity-[0.03] pointer-events-none">
            <Utensils className="w-20 h-20 md:w-32 md:h-32 text-slate-900" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
              <span className="px-3 md:px-4 py-1 md:py-1.5 bg-slate-900 text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-full">
                Break
              </span>
              <span className="text-slate-600 text-[9px] md:text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> {session.duration}
              </span>
            </div>
            <div className="mb-4 md:mb-6">
              <h2 className="text-lg md:text-3xl font-headline font-bold text-slate-900 tracking-tight leading-snug mb-2 md:mb-3">
                {session.title}
              </h2>
              {scheduleSession.location && (
                <p className="text-slate-600 text-sm md:text-base font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" strokeWidth={2.5} />
                  {scheduleSession.location}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="bg-white/40 border border-slate-200 rounded-2xl md:rounded-3xl overflow-hidden session-card flex flex-col md:flex-row relative group/card transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 -mx-6 md:mx-0 md:rounded-3xl">
        <div className="accent-glow"></div>
        {/* Time Panel */}
        <div className="md:w-36 p-4 md:p-8 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-2 border-b md:border-b-0 md:border-r border-slate-200 shrink-0">
          <span className="text-2xl md:text-3xl font-black text-slate-900 leading-none">{startInfo.time}</span>
          <div className="flex flex-col md:items-start items-end">
            <span className="text-slate-500 font-bold text-[9px] md:text-[10px] uppercase tracking-widest opacity-60">
              {startInfo.period} / EST
            </span>
            <span className="text-[10px] md:text-xs font-black text-primary mt-1 md:mt-2 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {session.duration.replace(' min', 'M').toUpperCase()}
            </span>
          </div>
        </div>

      {/* Content */}
      <div className="flex-grow p-4 md:p-10 relative">
        <div className="flex flex-col h-full">
          {/* Mobile Calendar Button - Top Right */}
          <button
            onClick={addToCalendar}
            title="Add to Calendar"
            className="md:hidden absolute top-4 right-4 flex items-center justify-center text-primary hover:scale-105 hover:-rotate-12 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer active:scale-95 z-10"
          >
            <CalendarPlus className="w-6 h-6" />
          </button>

          {/* Type Badge & Add to Calendar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              <span className={cn(
                'flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-full border',
                typeStyles.bg,
                typeStyles.text,
                'border-current/10'
              )}>
                <TypeIcon className="w-2.5 h-2.5 md:w-3 md:h-3" />
                {typeStyles.label}
              </span>
              <span className="text-slate-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary/40"></span>
                {scheduleSession.trackId.replace(/-/g, ' ').toUpperCase()}
              </span>
            </div>
            <button
              onClick={addToCalendar}
              title="Add to Calendar"
              className="hidden md:flex items-center justify-center text-primary hover:scale-105 hover:-rotate-12 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer active:scale-95"
            >
              <CalendarPlus className="w-6 h-6" />
            </button>
          </div>

          {/* Title & Description */}
          <div className="max-w-3xl mb-4 md:mb-8">
            <h3 className="text-lg md:text-3xl font-headline font-bold text-slate-900 mb-2 md:mb-3 tracking-tight leading-tight group-hover/card:text-primary transition-colors">
              {session.title}
            </h3>
            
            {/* Tags */}
            {session.tags && session.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-6">
                {session.tags.slice(0, 3).map((tag, idx) => {
                  const tagColors = [
                    'bg-blue-100 text-blue-700 border-blue-200',
                    'bg-purple-100 text-purple-700 border-purple-200',
                    'bg-pink-100 text-pink-700 border-pink-200',
                    'bg-green-100 text-green-700 border-green-200',
                    'bg-amber-100 text-amber-700 border-amber-200',
                    'bg-cyan-100 text-cyan-700 border-cyan-200',
                  ];
                  const colorClass = tagColors[idx % tagColors.length];
                  
                  return (
                    <span
                      key={tag}
                      className={`text-[8px] md:text-[10px] font-semibold tracking-wide px-2 md:px-2.5 py-0.5 rounded border transition-all hover:shadow-md ${colorClass}`}
                    >
                      #{tag.replace(/\s+/g, '_').toUpperCase()}
                    </span>
                  );
                })}
              </div>
            )}

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium mb-4 md:mb-8">
              {session.description}
            </p>

            {/* Speakers */}
            {sessionSpeakers.length > 0 && (
              <div className="flex flex-wrap gap-3 md:gap-6">
                {sessionSpeakers.map((speaker) => (
                  <Link
                    key={speaker.id}
                    href={`/speakers/${speaker.id}`}
                    className="flex items-center gap-4 group hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    {speaker.image && (
                      <Image
                        alt={speaker.name}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm group-hover:shadow-md group-hover:border-primary transition-all"
                        src={speaker.image}
                        width={48}
                        height={48}
                      />
                    )}
                    <div>
                      <p className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors">{speaker.name}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                        {speaker.role || 'Speaker'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
