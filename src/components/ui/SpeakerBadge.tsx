'use client';

import Image from 'next/image';
import { Speaker } from '@/types/speaker';
import { cn } from '@/lib/utils';

interface SpeakerBadgeProps {
  speakerId: string;
  speakers: Speaker[];
  size?: 'sm' | 'md';
  showRole?: boolean;
}

/**
 * SpeakerBadge displays a speaker preview with avatar, name, and optional role.
 * Used inline in schedule cards to show speaker info.
 */
export default function SpeakerBadge({
  speakerId,
  speakers,
  size = 'md',
  showRole = true,
}: SpeakerBadgeProps) {
  const speaker = speakers.find((s) => s.id === speakerId);

  if (!speaker) {
    return (
      <div className={cn('rounded-full bg-slate-200', size === 'sm' ? 'h-8 w-8' : 'h-10 w-10')} />
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Image
          src={speaker.image}
          alt={speaker.name}
          width={size === 'sm' ? 32 : 40}
          height={size === 'sm' ? 32 : 40}
          className="rounded-full object-cover border border-slate-300"
        />
      </div>
      {size === 'md' && (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900">{speaker.name}</span>
          {showRole && <span className="text-xs text-slate-500">{speaker.role}</span>}
        </div>
      )}
    </div>
  );
}
