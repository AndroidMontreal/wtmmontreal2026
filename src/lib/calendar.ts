/**
 * Calendar utility functions for adding events to Google Calendar
 */

export interface CalendarEventDetails {
  title: string;
  description: string;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  speakerNames: string[];
  duration: string;
  tags: string[];
  location?: string;
}

/**
 * Generate a Google Calendar event URL with full event details
 * Event will open in Google Calendar with all details pre-filled
 */
export function generateGoogleCalendarUrl(
  event: CalendarEventDetails
): string {
  // Build event title with "Women Techmakers Montreal 2026 - " prefix
  const eventTitle = `Women Techmakers Montreal 2026 - ${event.title}`;
  
  // Build detailed event description
  const eventDescription = [
    event.description,
    '',
    `Speakers: ${event.speakerNames.join(', ') || 'TBD'}`,
    `Duration: ${event.duration}`,
    `Topics: ${event.tags.join(', ') || 'N/A'}`,
    '',
    'Event: Women Techmakers Montreal 2026',
    'Date: April 18, 2026',
    `Location: ${event.location || 'Collège de Maisonneuve, Montreal'}`
  ].join('\n');
  
  // Format times: April 18, 2026
  const eventStart = `20260418T${event.startTime.replace(':', '')}00`;
  const eventEnd = `20260418T${event.endTime.replace(':', '')}00`;
  
  // Encode parameters for URL
  const encodedTitle = encodeURIComponent(eventTitle);
  const encodedDescription = encodeURIComponent(eventDescription);
  const encodedLocation = encodeURIComponent(event.location || 'Collège de Maisonneuve, 2701 rue Nicolet porte B4, Montréal, QC H1X 1Z8');
  
  // Build Google Calendar URL
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&details=${encodedDescription}&location=${encodedLocation}&dates=${eventStart}/${eventEnd}`;
}

/**
 * Open Google Calendar event in new tab
 */
export function openCalendarEvent(event: CalendarEventDetails): void {
  const url = generateGoogleCalendarUrl(event);
  window.open(url, '_blank');
}

/**
 * Generate Google Maps URL for venue
 */
export function generateMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
}
