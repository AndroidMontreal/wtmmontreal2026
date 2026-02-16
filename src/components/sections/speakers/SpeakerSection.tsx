'use client';

import { useState } from 'react';
import { Speaker } from '@/types/speaker';
import { Session } from '@/types/session';
import SpeakerGrid from './SpeakerGrid';
import SpeakerFilter from './SpeakerFilter';

interface SpeakerSectionProps {
  speakers: Speaker[];
  sessions: Session[];
  labels: {
    all: string;
    talks: string;
    workshops: string;
  };
}

export default function SpeakerSection({ speakers, sessions, labels }: SpeakerSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  // Combine Data: Map Speakers to their Sessions
  // Robust matching: handles potential undefined sessions or whitespace in IDs
  const combinedList = speakers.map((speaker) => {
    const session = sessions?.find((s) => 
      s.speakerIds?.some(id => id.trim() === speaker.id)
    );
    return { speaker, session };
  });

  // Filter Logic
  const filteredList = activeFilter === 'all'
    ? combinedList
    : combinedList.filter((item) => {
        if (!item.session) return false;
        // Robust Case-insensitive comparison
        return item.session.type.trim().toLowerCase() === activeFilter.trim().toLowerCase();
      });

  return (
    <>
      <SpeakerFilter 
        labels={labels} 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
      />

      {filteredList.length > 0 ? (
        <SpeakerGrid key={activeFilter} items={filteredList} />
      ) : (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">
            No speakers found for {activeFilter === 'talk' ? 'talks' : activeFilter === 'workshop' ? 'workshops' : 'this category'}.
          </p>
        </div>
      )}
    </>
  );
}
