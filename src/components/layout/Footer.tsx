'use client';

import React from 'react';
import { useTranslations, useMessages } from 'next-intl';
import Image from 'next/image';
import { Linkedin, Instagram, Facebook, Youtube, Send, Music, Twitter } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { NavigationMessages } from '@/types/navigation';
import Button from '@/components/ui/Button';

// Icon Map
const socialIconMap: Record<string, React.ComponentType<{ className?: string; fill?: string }>> = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Facebook: Facebook,
  Twitter: Twitter,
  Discord: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.48 13.48 0 0 0-1.063 2.192 18.067 18.067 0 0 0-4.57 0 13.48 13.48 0 0 0-1.066-2.192.074.074 0 0 0-.079-.037A19.743 19.743 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.946 2.42-2.157 2.42z"/>
    </svg>
  ),
  YouTube: Youtube,
  Spotify: Music
};

export default function Footer() {
  const t = useTranslations('Navigation.footer');
  const messages = useMessages() as unknown as NavigationMessages;

  // Dynamic Data
  const socials = messages?.Navigation?.footer?.socials || [];
  const pastEvents = messages?.Navigation?.footer?.past_events_list || [];
  const links = messages?.Navigation?.footer?.links || {};

  return (
    <footer className="bg-[#111111] text-slate-300 py-16 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative h-24 w-48">
                <Image
                  src="/logo/logo.svg"
                  alt="WTM Montreal"
                  fill
                  className="object-contain object-left invert brightness-0"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {t('description')}
            </p>
            <div className="flex gap-4">
              {socials.map((social) => {
                const Icon = socialIconMap[social.name] || Send;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-[#00A896] transition-colors duration-300"
                    aria-label={social.name}
                  >
                    {/* Reverted to Outline for clarity (except Discord which is custom solid) */}
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Past Events */}
          <div>
            <h3 className="text-white font-bold mb-6">{t('columns.past_events')}</h3>
            <ul className="space-y-3 text-sm">
              {pastEvents.map((event, idx) => (
                <li key={idx}>
                  <a
                    href={event.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00A896] transition-colors"
                  >
                    {event.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">{t('columns.quick_links')}</h3>
            <ul className="space-y-3 text-sm">
              {Object.entries(links).map(([key, item]) => (
                <li key={key}>
                  <Link href={item.href} className="hover:text-[#00A896] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6">{t('columns.stay_connected')}</h3>
            <p className="text-sm text-slate-400 mb-6">
              {t('newsletter.text')}
            </p>
            <Button
              href={t('newsletter.href')}
              external
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
            >
              {t('newsletter.cta')}
            </Button>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 text-center md:text-left text-xs text-slate-600">
          {t('copyright')}
        </div>

      </div>
    </footer>
  );
}
