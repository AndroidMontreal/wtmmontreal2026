export type MenuItem = {
  label: string;
  href: string;
};

export type HeaderMessages = {
  Header: {
    menu: Record<string, MenuItem>;
    cta: {
      ticket: string;
    };
  };
};

export type FooterMessages = {
  Footer: {
    description: string;
    columns: {
      past_events: string;
      quick_links: string;
      stay_connected: string;
    };
    newsletter: {
      text: string;
      cta: string;
      href: string;
    };
    links: Record<string, MenuItem>;
    socials: Array<{ name: string; href: string }>;
    past_events_list: Array<{ label: string; href: string }>;
    copyright: string;
  };
};
