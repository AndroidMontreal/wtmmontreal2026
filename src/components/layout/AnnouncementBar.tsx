'use client';

import { useTranslations } from 'next-intl';
import { Megaphone } from 'lucide-react';

export default function AnnouncementBar() {
  const t = useTranslations('Common.announcement');
  const text = t('text');

  return (
    <div className="relative z-50 bg-primary text-white shadow-sm overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3">
        <Megaphone className="h-3 w-3 md:h-4 md:w-4 shrink-0 animate-pulse" />

        {/* Desktop: Static animated text */}
        <div className="hidden md:flex flex-1 items-center gap-3 font-semibold tracking-wide">
          <span className="text-sm">{text}</span>
        </div>

        {/* Mobile: Marquee scrolling text */}
        <div className="md:hidden flex-1 overflow-hidden">
          <div className="marquee whitespace-nowrap font-semibold text-[10px]">
            <span className="inline-block">{text}</span>
            <span className="inline-block ml-4">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
