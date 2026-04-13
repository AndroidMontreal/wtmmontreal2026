export interface Speaker {
  id: string;
  name: string;
  role: string;
  company?: string;
  image: string;
  bio: string;
  category: 'talk' | 'lab';
  isSpeaker: boolean;
  socials?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface SpeakerMessages {
  header: {
    tag: string;
    title: string;
    subtitle: string;
  };
  filters: {
    all: string;
    talks: string;
    labs: string;
  };
  list: Speaker[];
}
