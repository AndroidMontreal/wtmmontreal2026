'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SponsorsGrid() {
  const t = useTranslations('Common.sponsors');

  // Placeholder sponsors with different hover colors
  const sponsors = [
    { name: 'SPONSOR', color: 'group-hover:text-primary' },
    { name: 'SPONSOR', color: 'group-hover:text-blue-500' },
    { name: 'SPONSOR', color: 'group-hover:text-indigo-500' },
    { name: 'SPONSOR', color: 'group-hover:text-purple-500' },
    { name: 'SPONSOR', color: 'group-hover:text-pink-500' },
    { name: 'SPONSOR', color: 'group-hover:text-orange-500' },
    { name: 'SPONSOR', color: 'group-hover:text-teal-500' },
    { name: 'SPONSOR', color: 'group-hover:text-cyan-500' },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group h-32 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer hover:shadow-md hover:-translate-y-1"
            >
              <span className={cn("text-lg font-bold text-slate-300 transition-colors duration-300", sponsor.color)}>
                {sponsor.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
