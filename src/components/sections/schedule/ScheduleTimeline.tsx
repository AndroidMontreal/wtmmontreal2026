'use client';

import { Schedule, ScheduleMessages } from '@/types/schedule';
import { Session } from '@/types/session';
import { Speaker } from '@/types/speaker';
import SessionCard from './SessionCard';

interface ScheduleTimelineProps {
  schedule: Schedule;
  sessions: Session[];
  speakers: Speaker[];
  activeTrackId: string | null;
  scheduleData: ScheduleMessages;
}

/**
 * ScheduleTimeline renders a timeline of sessions grouped by time slot,
 * filtered by the active track.
 */
export default function ScheduleTimeline({
  schedule,
  sessions,
  speakers,
  activeTrackId,
  scheduleData,
}: ScheduleTimelineProps) {
  // Create a map for quick session lookup
  const sessionMap = new Map(sessions.map((s) => [s.id, s]));

  // Filter and group sessions by time slot
  const filteredTimeSlots = schedule.timeSlots.map((timeSlot) => {
    const filteredSessions = timeSlot.sessions.filter((scheduleSes) => {
      if (activeTrackId === null) return true;
      return scheduleSes.trackId === activeTrackId;
    });

    return {
      ...timeSlot,
      sessions: filteredSessions,
    };
  });

  // Only show time slots that have sessions for the active filter
  const visibleTimeSlots = filteredTimeSlots.filter((ts) => ts.sessions.length > 0);

  if (visibleTimeSlots.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
        <p className="text-lg font-semibold text-slate-600">{scheduleData.filters.noSessions}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {visibleTimeSlots.map((timeSlot) => (
        <div key={timeSlot.id} className="space-y-6">
          {timeSlot.sessions.map((scheduleSes) => {
            const session = sessionMap.get(scheduleSes.sessionId);
            if (!session) return null;

            return (
              <SessionCard
                key={scheduleSes.id}
                scheduleSession={scheduleSes}
                session={session}
                speakers={speakers}
                startTime={timeSlot.startTime}
                endTime={timeSlot.endTime}
                scheduleData={scheduleData}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
