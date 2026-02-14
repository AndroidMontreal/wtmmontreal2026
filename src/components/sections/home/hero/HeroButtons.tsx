'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mic, Ticket } from 'lucide-react';

export default function HeroButtons() {
  const t = useTranslations('Navigation.buttons');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.8 }}
      className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 mt-8 w-full sm:w-auto"
    >
      {/* Be a speaker - Semi-Solid -> Solid White (Restored) */}
      <motion.div 
        whileHover={{ y: -4, scale: 1.02 }} 
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="sm:w-auto"
      >
        <Link
          href="/speakers"
          className="group relative flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-slate-900 hover:border-white backdrop-blur-md sm:w-auto"
        >
          <Mic className="h-4 w-4 transition-colors group-hover:text-slate-900" />
          <span>{t('speaker')}</span>
        </Link>
      </motion.div>

      {/* Buy Ticket - Solid Brand Teal (Restored) */}
      <motion.div 
        className="relative sm:w-auto"
        whileHover={{ y: -4, scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="absolute inset-0 rounded-full bg-[#00A896] opacity-20 blur-xl animate-pulse" />
        <a
          href="https://www.eventbrite.ca/e/women-techmakers-montreal-day-2026-tickets-1980339307177"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-2.5 rounded-full border border-[#00A896] bg-[#00A896] px-8 py-3 text-sm font-bold text-white shadow-2xl shadow-teal-900/20 overflow-hidden sm:w-auto"
        >
          <Ticket className="h-4 w-4 relative z-10" />
          <span className="relative z-10">{t('ticket')}</span>
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent z-0" />
        </a>
      </motion.div>
    </motion.div>
  );
}
