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
    <div className="relative z-50 overflow-hidden bg-primary px-2 md:px-4 py-1.5 md:py-3 text-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-1 md:gap-3 text-[10px] md:text-sm font-normal h-5">
        <Megaphone className="h-3 w-3 md:h-4 md:w-4 shrink-0 animate-pulse" />

        {/* Desktop: Animated Attention Text with Button */}
        <motion.div 
          className="hidden md:flex items-center gap-3 font-semibold tracking-wide whitespace-nowrap"
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
        </motion.div>

        {/* Mobile: Ultra compact */}
        <div className="md:hidden flex items-center gap-1 whitespace-nowrap overflow-hidden">
          <span className="font-semibold text-[10px] truncate">{text}</span>
          <Link 
            href={link}
            className="px-1.5 py-0.5 bg-white text-primary rounded font-bold hover:bg-slate-100 transition-colors text-[9px] shrink-0"
          >
            {button}
          </Link>
        </div>

      </div>
    </div>
  );
}
