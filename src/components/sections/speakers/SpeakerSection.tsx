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
    labs: string;
  };
}

export default function SpeakerSection({ speakers, sessions, labels }: SpeakerSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  // 1. Filter out hidden/associated profiles (isSpeaker: false)
  const visibleSpeakers = speakers.filter(s => s.isSpeaker);

  // 2. Combine Data: Map Speakers to their Sessions
  const combinedList = visibleSpeakers.map((speaker) => {
    const associatedSessions = sessions?.filter((s) => 
      s.speakerIds?.some(id => id.trim() === speaker.id)
    ) || [];
    return { speaker, sessions: associatedSessions };
  });

  // 3. Filter Logic based on speaker.category
  const filteredList = activeFilter === 'all'
    ? combinedList
    : combinedList.filter((item) => 
        item.speaker.category.trim().toLowerCase() === activeFilter.trim().toLowerCase()
      );

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
            No speakers found for {activeFilter === 'talk' ? 'talks' : activeFilter === 'lab' ? 'labs' : 'this category'}.
          </p>
        </div>
      )}
    </>
  );
}
