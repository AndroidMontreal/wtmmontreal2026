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
      <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden flex flex-col md:flex-row relative">
        <div className="md:w-36 p-8 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-2 border-b md:border-b-0 md:border-r border-slate-200 shrink-0">
          <span className="text-3xl font-black text-slate-400 leading-none">{startInfo.time}</span>
          <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest opacity-60">
            {startInfo.period} / EST
          </span>
        </div>
        <div className="flex-grow p-10 relative">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
            <Utensils className="w-32 h-32 text-slate-900" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                Break
              </span>
              <span className="text-slate-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/50"></span> {session.duration}
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-slate-900 tracking-tight leading-snug mb-3">
                {session.title}
              </h2>
              {scheduleSession.location && (
                <p className="text-slate-600 text-sm font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={2.5} />
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
    <div className="bg-white/40 border border-slate-200 rounded-3xl overflow-hidden session-card flex flex-col md:flex-row relative group/card transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50">
      <div className="accent-glow"></div>
      {/* Time Panel */}
      <div className="md:w-36 p-8 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-2 border-b md:border-b-0 md:border-r border-slate-200 shrink-0">
        <span className="text-3xl font-black text-slate-900 leading-none">{startInfo.time}</span>
        <div className="flex flex-col md:items-start items-end">
          <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest opacity-60">
            {startInfo.period} / EST
          </span>
          <span className="text-xs font-black text-primary mt-2 flex items-center gap-1">
            <Clock className="w-4 h-4" /> {session.duration.replace(' min', 'M').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-10">
        <div className="flex flex-col h-full">
          {/* Type Badge & Add to Calendar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <span className={cn(
                'flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border',
                typeStyles.bg,
                typeStyles.text,
                'border-current/10'
              )}>
                <TypeIcon className="w-3 h-3" />
                {typeStyles.label}
              </span>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                {scheduleSession.trackId.replace(/-/g, ' ').toUpperCase()}
              </span>
            </div>
            <button
              onClick={addToCalendar}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-black tracking-wider text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer active:scale-95"
            >
              <CalendarPlus className="w-3 h-3" />
              ADD TO CALENDAR
            </button>
          </div>

          {/* Title & Description */}
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl md:text-3xl font-headline font-bold text-slate-900 mb-3 tracking-tight leading-tight group-hover/card:text-primary transition-colors">
              {session.title}
            </h3>
            
            {/* Tags */}
            {session.tags && session.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {session.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold text-slate-500 border border-slate-200 px-2 py-0.5 rounded flex items-center gap-1"
                  >
                    #{tag.replace(/\s+/g, '_').toUpperCase()}
                  </span>
                ))}
              </div>
            )}

            <p className="text-slate-600 text-base leading-relaxed font-medium mb-8">
              {session.description}
            </p>

            {/* Speakers */}
            {sessionSpeakers.length > 0 && (
              <div className="flex flex-wrap gap-6">
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
