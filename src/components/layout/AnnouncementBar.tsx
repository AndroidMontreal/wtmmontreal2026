'use client';

import { useTranslations } from 'next-intl';
import { Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnnouncementBar() {
  const t = useTranslations('Common.announcement');
  const text = t('text');

  return (
    <div className="relative z-50 overflow-hidden bg-primary px-2 md:px-4 py-1.5 md:py-3 text-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center gap-1 md:gap-3 text-[10px] md:text-sm font-normal">
        <Megaphone className="h-3 w-3 md:h-4 md:w-4 shrink-0 animate-pulse" />

        {/* Desktop: Animated Attention Text */}
        <motion.div 
          className="hidden md:flex items-center gap-3 font-semibold tracking-wide"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>{text}</span>
        </motion.div>

        {/* Mobile: Ultra compact with scrolling - hidden on larger screens */}
        <motion.div 
          className="md:hidden flex items-center gap-1 whitespace-nowrap overflow-hidden"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <span className="font-semibold text-[10px]">{text}</span>
          <span className="font-semibold text-[10px] ml-6">{text}</span>
        </motion.div>

      </div>
    </div>
  );
}
