export interface TeamMember {
  name: string;
  role: string;
  company?: string;
  image: string;
  social: string;
  year: string;
}

export interface TeamMessages {
  header: {
    tag: string;
    title: string;
    subtitle: string;
  };
  members: TeamMember[];
}
