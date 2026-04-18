/**
 * Schedule Type Definitions
 *
 * Represents the event schedule structure with tracks, timeslots, and sessions.
 * Maintains referential integrity with Speaker and Session types through IDs.
 */

/**
 * Track represents a physical or conceptual "stage" or "lab" at the event.
 * Each track contains multiple time slots with sessions.
 */
export interface Track {
  id: string; // e.g., "main-stage", "lab-1", "lab-2", "lab-3", "lab-4"
  name: string; // e.g., "Main Stage", "Lab 1: Conscience & Code"
  icon: string; // Material Symbol name (e.g., "theater_comedy", "science", "terminal", "construction", "accessibility")
  color: 'primary' | 'secondary' | 'tertiary'; // For badge styling
  description?: string; // Optional subtitle
}

/**
 * TimeSlot represents a block of time in the schedule.
 * Multiple sessions can be grouped under one time (e.g., concurrent sessions across different tracks).
 */
export interface TimeSlot {
  id: string; // e.g., "timeslot-09-00", "timeslot-10-15"
  startTime: string; // ISO 8601 time format or "HH:MM" (e.g., "09:00")
  endTime: string; // ISO 8601 time format or "HH:MM" (e.g., "10:00")
  sessions: ScheduleSession[]; // Sessions running during this time across all tracks
}

/**
 * ScheduleSession is a junction type that links Session, Track, and optionally Speaker info.
 * This allows displaying session context (time, track, speakers) in the schedule view.
 */
export interface ScheduleSession {
  id: string; // e.g., "schedule-session-opening-main-stage"
  sessionId: string; // Reference to Session.id
  trackId: string; // Reference to Track.id
  speakerIds: string[]; // Cached from Session for easy display (Reference to Speaker.id)
  isBreak?: boolean; // True for breaks, lunch, networking events without session details
  location?: string; // Optional room/location info (e.g., "Main Lounge", "Room 201")
}

/**
 * Schedule represents the full event schedule.
 * Acts as the root container for all track and timeslot information.
 */
export interface Schedule {
  id: string; // e.g., "wtm-montreal-2026"
  eventDate: string; // ISO 8601 date (e.g., "2026-10-24")
  eventLocation: string; // e.g., "Palais des congrès de Montréal"
  timezone: string; // e.g., "America/Toronto" (EST)
  tracks: Track[];
  timeSlots: TimeSlot[];
}

/**
 * Stats represents event statistics for display.
 */
export interface StatsItem {
  label: string;
  value: string;
  icon?: string;
}

export interface Stats {
  items: StatsItem[];
}

/**
 * CTA Button represents a call-to-action button with label and href.
 */
export interface CTAButton {
  label: string;
  href: string;
}

/**
 * CTA section with title, highlight text, and buttons
 */
export interface CTA {
  title: string;
  highlight: string;
  agendaButton: CTAButton;
  discordButton: CTAButton;
}

/**
 * Reminder item for event reminders
 */
export interface ReminderItem {
  title: string;
  description: string;
  icon: string;
}

/**
 * Reminders section
 */
export interface Reminders {
  title: string;
  items: ReminderItem[];
}

/**
 * ScheduleMessages is the localized wrapper for schedule data.
 * Mirrors the pattern used for speakers and sessions.
 */
export interface ScheduleMessages {
  header: {
    tag: string; // e.g., "Event Schedule"
    title: string; // e.g., "Plan Your Experience"
    subtitle: string; // e.g., "A full day of inspiration, learning, and connection."
    conferenceDate: string; // e.g., "Conference Date"
    venueName: string; // e.g., "Collège de Maisonneuve"
  };
  eventInfo: {
    date: string; // e.g., "October 24, 2026"
    location: string; // e.g., "Palais des congrès de Montréal"
    timezone: string; // e.g., "EST / EDT"
  };
  filters: {
    allTracks: string; // e.g., "All tracks"
    noSessions: string; // e.g., "No sessions found for this track."
  };
  session: {
    addToCalendar: string; // e.g., "Add to Calendar"
    duration: string; // e.g., "Duration"
    room: string; // e.g., "Room"
    speakers: string; // e.g., "Speakers"
    tags: string; // e.g., "Topics"
    speakerRole: string; // e.g., "Speaker"
  };
  sessionTypes: {
    workshop: string;
    atelier: string;
    panel: string;
    'community-panel': string;
    'community-demo': string;
    keynote: string;
    break: string;
  };
  breaks: {
    lunch: string; // e.g., "Lunch & Networking"
    coffee: string; // e.g., "Coffee Break"
    registration: string; // e.g., "Registration"
  };
  reminders?: Reminders; // Optional reminders section
  cta?: CTA; // Optional CTA section
  qrCard?: {
    label: string;
    title: string;
    button: string;
  };
  stats?: {
    speakers: string;
    attendees: string;
  };
  schedule: Schedule;
}

/**
 * Type guard function to check if a ScheduleSession is a break.
 */
export function isBreakSession(session: ScheduleSession): boolean {
  return session.isBreak ?? false;
}

/**
 * Type guard function to check if a value is a valid Track.
 */
export function isTrack(value: unknown): value is Track {
  if (typeof value !== 'object' || value === null) return false;
  const track = value as Record<string, unknown>;
  return (
    typeof track.id === 'string' &&
    typeof track.name === 'string' &&
    typeof track.icon === 'string' &&
    ['primary', 'secondary', 'tertiary'].includes(track.color as string)
  );
}

/**
 * Type guard function to check if a value is a valid Schedule.
 */
export function isSchedule(value: unknown): value is Schedule {
  if (typeof value !== 'object' || value === null) return false;
  const schedule = value as Record<string, unknown>;
  return (
    typeof schedule.id === 'string' &&
    typeof schedule.eventDate === 'string' &&
    typeof schedule.eventLocation === 'string' &&
    typeof schedule.timezone === 'string' &&
    Array.isArray(schedule.tracks) &&
    Array.isArray(schedule.timeSlots)
  );
}

/**
 * Type guard function to check if a value is a valid TimeSlot.
 */
export function isTimeSlot(value: unknown): value is TimeSlot {
  if (typeof value !== 'object' || value === null) return false;
  const slot = value as Record<string, unknown>;
  return (
    typeof slot.id === 'string' &&
    typeof slot.startTime === 'string' &&
    typeof slot.endTime === 'string' &&
    Array.isArray(slot.sessions)
  );
}
