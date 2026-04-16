'use client';

import { Track } from '@/types/schedule';
import { cn } from '@/lib/utils';
import { Layout, Mic, Brain, Code, Hand, Link2 } from 'lucide-react';

interface TrackFilterProps {
  tracks: Track[];
  activeTrackId: string | null;
  onTrackChange: (trackId: string | null) => void;
}

/**
 * TrackFilter provides sticky tabs to filter schedule by track/stage.
 * Matches the reference design with high-quality styling.
 */
export default function TrackFilter({ tracks, activeTrackId, onTrackChange }: TrackFilterProps) {
  const getTrackIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'theater_comedy': return Layout;
      case 'mic': return Mic;
      case 'brain': return Brain;
      case 'code': return Code;
      case 'hand': return Hand;
      case 'link': return Link2;
      default: return Layout;
    }
  };

  return (
    <section className="bg-white/40 backdrop-blur-lg py-4 md:py-6 rounded-2xl md:rounded-3xl border border-white/40 shadow-sm -mx-6 md:mx-0">
      <div className="flex items-center flex-wrap gap-2 md:gap-4 px-3 md:px-6">
        {tracks.map((track) => {
          const Icon = getTrackIcon(track.icon);
          const isActive = activeTrackId === track.id;
            
            return (
              <button
                key={track.id}
                onClick={() => onTrackChange(track.id)}
                className={cn(
                  'flex items-center gap-1 md:gap-2 px-4 md:px-8 py-2.5 md:py-4 rounded-full text-[10px] md:text-xs font-black transition-all uppercase tracking-widest cursor-pointer',
                  isActive
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                    : 'text-slate-500 bg-white border border-primary/20 hover:border-primary hover:text-primary hover:shadow-md hover:bg-primary/5 active:scale-95',
                )}
                aria-pressed={isActive}
              >
                <Icon className={cn("w-4 h-4 md:w-5 md:h-5 transition-colors", isActive ? "animate-pulse text-white" : "")} />
                <span>{track.name.split(':')[0]}</span>
              </button>
            );
          })}
      </div>
    </section>
  );
}
