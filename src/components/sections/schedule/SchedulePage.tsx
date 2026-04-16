'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ScheduleMessages, Schedule, Stats } from '@/types/schedule';
import { Session } from '@/types/session';
import { Speaker } from '@/types/speaker';
import ScheduleHeader from './ScheduleHeader';
import TrackFilter from './TrackFilter';
import ScheduleTimeline from './ScheduleTimeline';
import { QrCode, AlertCircle, Users, Laptop } from 'lucide-react';

interface SchedulePageProps {
  data: ScheduleMessages;
  schedule: Schedule;
  sessions: Session[];
  speakers: Speaker[];
  stats?: Stats;
}

/**
 * SchedulePage is the main wrapper component.
 * Uses official JSON data for all fields including stats and event info.
 */
export default function SchedulePage({ data, schedule, sessions, speakers, stats }: SchedulePageProps) {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(schedule.tracks[0]?.id || null);

  return (
    <div className="w-full px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* 1. Page Header - Dynamic Data from data.eventInfo */}
        <ScheduleHeader data={data} />

        {/* 2. Track Filter - Sticky with proper width constraint */}
        <div className="sticky top-20 z-40 mb-12">
          <TrackFilter
            tracks={schedule.tracks}
            activeTrackId={activeTrackId}
            onTrackChange={setActiveTrackId}
          />
        </div>

        {/* 3. Content Flex Wrapper */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-24 items-start relative -mx-6 md:mx-0 px-6 md:px-0">
          {/* 3a. Agenda List Block */}
          <div className="flex-grow w-full">
            <div className="hidden md:block bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm overflow-hidden">
              <ScheduleTimeline
                schedule={schedule}
                sessions={sessions}
                speakers={speakers}
                activeTrackId={activeTrackId}
              />
            </div>
            <div className="md:hidden">
              <ScheduleTimeline
                schedule={schedule}
                sessions={sessions}
                speakers={speakers}
                activeTrackId={activeTrackId}
              />
            </div>
          </div>

          {/* 3b. Sidebar Block - Sticky */}
          <aside className="w-full lg:w-96 shrink-0 space-y-8 lg:sticky lg:top-40">
            {/* QR Code Card */}
            <div className="bg-white/40 backdrop-blur-md border border-slate-200/60 p-4 md:p-6 lg:p-8 rounded-2xl lg:rounded-[2.5rem] shadow-xl overflow-hidden group/sidebar relative">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                <QrCode className="w-32 h-32 text-slate-900" />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6 lg:mb-8 px-2">
                  <div>
                    <p className="text-[9px] font-black tracking-[0.4em] text-primary uppercase mb-1">
                      Verified Link
                    </p>
                    <h4 className="text-xl lg:text-2xl font-black tracking-tighter text-slate-900 uppercase">
                      Schedule File
                    </h4>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                </div>

                <a 
                  href="https://www.canva.com/design/DAHF4p63fJQ/l0-z9yMu0ohZMKNI6jg5gQ/view?utm_content=DAHF4p63fJQ&utm_campaign=designshare&utm_medium=link&utm_source=viewer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-slate-100 p-4 lg:p-6 rounded-2xl lg:rounded-3xl mb-6 lg:mb-8 flex flex-col items-center cursor-pointer hover:shadow-lg transition-all group active:scale-95"
                >
                  <div className="w-60 h-60 lg:w-72 lg:h-72 p-2 flex items-center justify-center bg-transparent rounded-lg">
                    <Image src="/images/schedule/canva_agenda_qr.svg" alt="Canva Agenda QR Code" width={288} height={288} className="w-full h-full" />
                  </div>

                </a>

                <a 
                  href="https://www.canva.com/design/DAHF4p63fJQ/l0-z9yMu0ohZMKNI6jg5gQ/view?utm_content=DAHF4p63fJQ&utm_campaign=designshare&utm_medium=link&utm_source=viewer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-slate-950 text-white font-black text-xs rounded-xl tracking-[0.2em] hover:bg-primary transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 uppercase cursor-pointer"
                >
                  OPEN ON CANVA
                </a>
              </div>
            </div>

            {/* Important Reminders */}
            {data.reminders && (
              <div className="space-y-6">
                <h4 className="text-[11px] font-black tracking-[0.3em] text-slate-400 uppercase flex items-center gap-3 px-2">
                  <span className="w-8 h-[2px] bg-primary"></span>
                  {data.reminders.title}
                </h4>
                <div className="grid gap-4">
                  {data.reminders.items.map((item, index) => {
                    const iconMap: Record<string, React.ReactNode> = {
                      AlertCircle: <AlertCircle className="w-5 h-5 text-primary" />,
                      Users: <Users className="w-5 h-5 text-primary" />,
                      Laptop: <Laptop className="w-5 h-5 text-primary" />,
                    };
                    const Icon = iconMap[item.icon];
                    
                    return (
                      <div key={index} className="bg-white border border-slate-200/60 p-6 rounded-2xl hover:border-primary hover:shadow-lg transition-all group">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                            {Icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-2.5 leading-tight">{item.title}</p>
                            <p className="text-sm text-slate-700 font-medium leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Attendee Intel */}
            {/* REMOVED - Not required */}

            {/* Live Status */}
            {/* REMOVED - Not required */}
          </aside>
        </div>

        {/* Sync the Vibe - Dynamic Data from cta prop */}
        <section className="py-16 md:py-32 overflow-hidden relative rounded-2xl md:rounded-[3rem] mb-16 md:mb-24">
          <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="space-y-8 md:space-y-16">
              <div className="grid grid-cols-2 gap-x-6 md:gap-x-16 gap-y-6 md:gap-y-12">
                {stats?.items?.map((item: { value?: string; label: string; icon?: string }, index: number) => (
                  <div key={index}>
                    <span className="text-4xl md:text-7xl font-black text-primary block mb-1 md:mb-2 tracking-tighter font-headline">
                      {item.value || (item.icon === 'Infinity' ? '∞' : '')}
                    </span>
                    <span className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] line-clamp-2">
                      {item.label}
                    </span>
                  </div>
                ))}
                {!stats && (
                  <>
                    <div>
                      <span className="text-4xl md:text-7xl font-black text-primary block mb-1 md:mb-2 tracking-tighter font-headline">40+</span>
                      <span className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Speakers</span>
                    </div>
                    <div>
                      <span className="text-4xl md:text-7xl font-black text-slate-900 block mb-1 md:mb-2 tracking-tighter font-headline">1.2K</span>
                      <span className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Attendees</span>
                    </div>
                  </>
                )}
              </div>
              <h2 className="text-3xl md:text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[1] md:leading-[0.95] lg:leading-[0.9] uppercase font-headline">
                {data.cta?.title} <span className="text-primary">{data.cta?.highlight}</span>
              </h2>
            </div>
            <div className="flex flex-col justify-center items-start md:items-end gap-3 md:gap-6">
              <a 
                href={data.cta?.agendaButton?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-6 md:px-12 py-3 md:py-6 bg-primary text-white font-black text-xs md:text-sm rounded-lg md:rounded-2xl hover:bg-primary/90 transition-all tracking-[0.15em] md:tracking-[0.2em] uppercase shadow-lg shadow-primary/30 active:scale-95 cursor-pointer inline-flex items-center justify-center"
              >
                {data.cta?.agendaButton?.label}
              </a>
              <a 
                href={data.cta?.discordButton?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-6 md:px-12 py-3 md:py-6 border-2 border-primary text-slate-900 font-black text-xs md:text-sm rounded-lg md:rounded-2xl hover:bg-primary/10 transition-all tracking-[0.15em] md:tracking-[0.2em] uppercase active:scale-95 cursor-pointer inline-flex items-center justify-center"
              >
                {data.cta?.discordButton?.label}
              </a>
            </div>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
}