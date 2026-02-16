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
    past_events: {
      title: string;
      items: Array<{ label: string; href: string }>;
    };
    quick_links: {
      title: string;
      items: Array<{ label: string; href: string }>;
    };
    socials: Array<{ name: string; href: string }>;
    newsletter: {
      title: string;
      text: string;
      cta: string;
      href: string;
    };
    copyright: string;
    code_of_conduct: string;
  };
};
