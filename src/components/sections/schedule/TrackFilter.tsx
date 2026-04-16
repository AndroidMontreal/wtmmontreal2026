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
    <section className="bg-white/40 backdrop-blur-lg py-6 rounded-3xl border border-white/40 shadow-sm">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth px-6">
        {tracks.map((track) => {
          const Icon = getTrackIcon(track.icon);
          const isActive = activeTrackId === track.id;
            
            return (
              <button
                key={track.id}
                onClick={() => onTrackChange(track.id)}
                className={cn(
                  'flex items-center gap-2 px-8 py-4 rounded-full text-xs font-black transition-all shrink-0 uppercase tracking-widest cursor-pointer',
                  isActive
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                    : 'text-slate-500 bg-white border border-primary/20 hover:border-primary hover:text-primary hover:shadow-md hover:bg-primary/5 active:scale-95',
                )}
                aria-pressed={isActive}
              >
                <Icon className={cn("w-5 h-5 transition-colors", isActive ? "animate-pulse text-white" : "")} />
                <span>{track.name.split(':')[0]}</span>
              </button>
            );
          })}
      </div>
    </section>
  );
}
