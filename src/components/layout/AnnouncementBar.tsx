'use client';

import { useTranslations } from 'next-intl';
import { Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnnouncementBar() {
  const t = useTranslations('Navigation.announcement');
  const text = t('text');

  return (
    <div className="relative z-50 overflow-hidden bg-primary px-4 py-2 text-white shadow-sm">
      <div className="flex items-center justify-center gap-3 text-sm font-normal">
        <Megaphone className="h-4 w-4 shrink-0 animate-pulse" />

        {/* Desktop: Static Text */}
        <p className="hidden md:block truncate">
          {text}
        </p>

        {/* Mobile: Infinite Marquee */}
        <div className="md:hidden relative w-full overflow-hidden h-5">
          <motion.div
            className="absolute whitespace-nowrap flex gap-8"
            animate={{ x: "-50%" }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity
            }}
          >
            <span>{text}</span>
            <span>{text}</span>
            <span>{text}</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
