export type MenuItem = {
  label: string;
  href: string;
};

export type NavigationMessages = {
  Navigation: {
    menu: Record<string, MenuItem>;
    buttons: {
      ticket: string;
    };
    footer: {
      links: Record<string, MenuItem>;
      socials: Array<{ name: string; href: string }>;
      past_events_list: Array<{ label: string; href: string }>;
    }
  };
};