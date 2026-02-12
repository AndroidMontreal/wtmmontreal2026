export interface Sponsor {
  name: string;
  logo: string;
}

export interface Partner {
  name: string;
  icon: string;
  logo?: string; // Optional if we transition from icons to logos
  link?: string;
}

export interface SectionHeader {
  tag: string;
  title: string;
  subtitle: string;
  cta: string;
}

export interface SponsorsMessages {
  Sponsors: {
    header: SectionHeader;
    list: Record<string, Sponsor>;
  };
}

export interface PartnersMessages {
  Partners: {
    header: SectionHeader;
    list: Record<string, Partner>;
  };
}
