export interface Session {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g. "45 min"
  type: 'talk' | 'workshop' | 'panel' | 'keynote';
  tags: string[]; // Hashtags like ["AI", "Web"]
  speakerIds: string[]; // Links to Speaker.id
}

export interface SessionMessages {
  list: Session[];
}
