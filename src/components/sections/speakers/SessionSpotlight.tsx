'use client';

import { Session } from '@/types/session';
import { Schedule, ScheduleSession } from '@/types/schedule';
import { CalendarPlus, MapPin, Clock, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { openCalendarEvent } from '@/lib/calendar';

interface SessionSpotlightProps {
  session: Session;
  scheduleSession?: ScheduleSession;
  schedule?: Schedule;
  speaker?: { name: string };
}

export default function SessionSpotlight({ session, scheduleSession, schedule, speaker }: SessionSpotlightProps) {
  const t = useTranslations('Speakers.details');

  // Find time slot and calculate actual duration
  let timeSlotInfo = null;
  let roomName = null;
  let formattedStartTime = null;
  
  if (scheduleSession && schedule) {
    const ts = schedule.timeSlots.find(slot => 
      slot.sessions.some(s => s.id === scheduleSession.id)
    );
    if (ts) {
      // Calculate minutes between start and end
      const [startH, startM] = ts.startTime.split(':').map(Number);
      const [endH, endM] = ts.endTime.split(':').map(Number);
      const durationMinutes = (endH * 60 + endM) - (startH * 60 + startM);
      timeSlotInfo = {
        startTime: ts.startTime,
        endTime: ts.endTime,
        duration: `${durationMinutes} min`
      };
      
      // Format start time to 12-hour format
      const period = startH >= 12 ? 'PM' : 'AM';
      const hours12 = startH % 12 || 12;
      formattedStartTime = `${hours12}:${startM.toString().padStart(2, '0')} ${period}`;
    }
    
    // Get room name from track
    const track = schedule.tracks.find(tr => tr.id === scheduleSession.trackId);
    if (track) {
      roomName = track.name;
    }
  }

  const addToCalendar = () => {
    if (!scheduleSession || !schedule || !timeSlotInfo) return;
    
    openCalendarEvent({
      title: session.title,
      description: session.description,
      startTime: timeSlotInfo.startTime,
      endTime: timeSlotInfo.endTime,
      speakerNames: speaker ? [speaker.name] : [],
      duration: timeSlotInfo.duration,
      tags: session.tags || [],
      location: '2701 Rue Nicolet, Montréal, QC H1X 1Z8, Canada'
    });
  };

  // Get session type styling to match SessionCard
  const getTypeStyles = () => {
    switch (session.type) {
      case 'workshop':
        return { bg: 'bg-secondary/10', text: 'text-secondary', label: 'WORKSHOP' };
      case 'atelier':
        return { bg: 'bg-secondary/10', text: 'text-secondary', label: 'ATELIER' };
      case 'panel':
        return { bg: 'bg-purple-500/10', text: 'text-purple-600', label: 'PANEL' };
      case 'community-panel':
        return { bg: 'bg-purple-500/10', text: 'text-purple-600', label: 'COMMUNITY PANEL' };
      case 'community-demo':
        return { bg: 'bg-purple-500/10', text: 'text-purple-600', label: 'COMMUNITY DEMO' };
      case 'keynote':
        return { bg: 'bg-primary/10', text: 'text-primary', label: 'KEYNOTE' };
      default:
        return { bg: 'bg-primary/10', text: 'text-primary', label: session.type.toUpperCase() };
    }
  };

  const typeStyles = getTypeStyles();

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

  // Get tag colors (matching schedule page)
  const getTagColor = (idx: number) => {
    const colors = [
      'bg-blue-100 text-blue-700 border-blue-200',
      'bg-purple-100 text-purple-700 border-purple-200',
      'bg-pink-100 text-pink-700 border-pink-200',
      'bg-green-100 text-green-700 border-green-200',
      'bg-amber-100 text-amber-700 border-amber-200',
      'bg-cyan-100 text-cyan-700 border-cyan-200',
    ];
    return colors[idx % colors.length];
  };

  return (
    <section className="relative mt-16 font-sans" data-purpose="session-details">
      <div className="group relative bg-white rounded-[32px] transition-all duration-500 hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-0.5 border border-slate-100 flex flex-col h-full">
        <div className="absolute -inset-4 border border-transparent group-hover:border-primary/40 rounded-[40px] pointer-events-none transition-all duration-500 hidden lg:block"></div>
        
        <div className="p-8 lg:p-14 relative z-10 flex flex-col h-full">
          
          {/* Header: Type Badge & Duration */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            {/* Type Badge & Duration Info */}
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              <div className={`inline-flex items-center gap-1.5 px-2.5 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-full border ${typeStyles.bg} ${typeStyles.text} border-current/10`}>
                <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
                {typeStyles.label}
              </div>
              {timeSlotInfo && (
                <span className="text-slate-600 text-[10px] md:text-[12px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary/40"></span>
                  {timeSlotInfo.duration}
                </span>
              )}
            </div>

            {/* Calendar Button */}
            {scheduleSession && schedule && timeSlotInfo && (
              <button 
                onClick={addToCalendar}
                title={t('addToCalendar')}
                className="flex items-center justify-center text-primary hover:scale-105 hover:-rotate-12 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer active:scale-95"
              >
                <CalendarPlus className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Title */}
          <h4 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 group-hover:text-primary transition-colors duration-500 mb-4 leading-tight">
            {session.title}
          </h4>

          {/* Time & Room Info - Original Icon Style */}
          {(formattedStartTime || roomName) && (
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-8 text-sm font-medium text-slate-500 uppercase tracking-wider">
              {formattedStartTime && (
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-primary flex-shrink-0" />
                  <span>time: <span className="font-bold text-slate-700">{formattedStartTime}</span></span>
                </div>
              )}
              {roomName && (
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-secondary flex-shrink-0" />
                  <span>room: <span className="font-bold text-slate-700">{roomName}</span></span>
                </div>
              )}
            </div>
          )}
          
          {/* Formatted Description */}
          <div className="text-slate-600 text-base lg:text-lg leading-relaxed font-normal mb-10 flex-1">
            {renderFormattedDescription(session.description)}
          </div>

          {/* Footer Tags - Colorful like schedule page */}
          {session.tags && session.tags.length > 0 && (
            <div className="pt-8 border-t border-slate-100 mt-auto">
              <div className="flex flex-wrap gap-2">
                {session.tags.slice(0, 3).map((tag, idx) => (
                  <span 
                    key={idx} 
                    className={`text-[8px] md:text-[10px] font-semibold tracking-wide px-2 md:px-2.5 py-0.5 rounded border transition-all hover:shadow-md ${getTagColor(idx)}`}
                  >
                    #{tag.replace(/\s+/g, '_').toUpperCase()}
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
