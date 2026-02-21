export interface Sponsor {
  name: string;
  logo: string;
  link?: string;
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

export interface SponsorTier {
  title: string;
  subtitle: string;
  badge: string;
  items: Sponsor[];
}

export interface SponsorsMessages {
  Sponsors: {
    header: SectionHeader;
    tiers: {
      gold: SponsorTier;
      silver: SponsorTier;
      bronze: SponsorTier;
    };
  };
}

export interface PartnersMessages {
  Partners: {
    header: SectionHeader;
    list: Partner[];
  };
}
