'use client';

import { useTranslations } from 'next-intl';
import { Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnnouncementBar() {
  const t = useTranslations('Common.announcement');
  const text = t('text');
  const button = t('button');
  const link = t('link');

  return (
    <div className="relative z-50 overflow-hidden bg-primary px-4 py-2 text-white shadow-sm">
      <div className="flex items-center justify-center gap-3 text-sm font-normal flex-wrap">
        <Megaphone className="h-4 w-4 shrink-0 animate-pulse" />

        {/* Desktop: Animated Attention Text with Button */}
        <motion.p 
          className="hidden md:flex items-center gap-3 font-semibold tracking-wide"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>{text}</span>
          <Link 
            href={link}
            className="px-3 py-1 bg-white text-primary rounded font-bold hover:bg-slate-100 transition-colors text-xs"
          >
            {button}
          </Link>
        </motion.p>

        {/* Mobile: Infinite Marquee with Button */}
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
            <span className="flex items-center gap-2">{text}</span>
            <span className="flex items-center gap-2">{text}</span>
            <span className="flex items-center gap-2">{text}</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
