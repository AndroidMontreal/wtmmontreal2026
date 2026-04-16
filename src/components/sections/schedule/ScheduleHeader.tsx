'use client';

import { ScheduleMessages } from '@/types/schedule';
import SectionTitle from '@/components/ui/SectionTitle';
import { MapPin } from 'lucide-react';
import { generateMapsUrl } from '@/lib/calendar';

interface ScheduleHeaderProps {
  data: ScheduleMessages;
}

/**
 * ScheduleHeader displays the page title and event info using SectionTitle component.
 */
export default function ScheduleHeader({ data }: ScheduleHeaderProps) {
  const venueAddress = 'Collège de Maisonneuve, 2701 rue Nicolet porte B4, Montréal, QC H1X 1Z8';
  
  return (
    <header className="pt-24 pb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="max-w-3xl">
          <SectionTitle
            tag={data.header.tag}
            title="THE EVENT SCHEDULE"
            subtitle={data.header.subtitle}
            highlightColor="text-primary"
            as="h1"
            className="mb-0"
            tagStyles={{
              bg: 'bg-primary/10',
              text: 'text-primary',
              border: 'border-primary/20',
            }}
          />
        </div>
        <div className="flex flex-col gap-2 items-start md:items-end shrink-0">
          <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">Conference Date</span>
          <span className="text-slate-900 text-4xl font-black tracking-tighter uppercase">
            {data.eventInfo.date}
          </span>
          <a
            href={generateMapsUrl(venueAddress)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-slate-600 hover:text-primary transition-colors font-bold text-base mt-1 group"
          >
            <MapPin className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            <span className="group-hover:underline">Collège de Maisonneuve</span>
          </a>
        </div>
      </div>
    </header>
  );
}
