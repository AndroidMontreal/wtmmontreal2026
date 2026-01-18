export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Session {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  speakerId: string;
  track?: 'Main Stage' | 'Workshop' | 'Community';
}
