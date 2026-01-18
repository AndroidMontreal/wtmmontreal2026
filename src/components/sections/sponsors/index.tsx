'use client';

import { useTranslations, useMessages } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { SponsorsMessages } from '@/types/sections';

export default function Sponsors() {
  const t = useTranslations('Sponsors.header');
  const messages = useMessages() as unknown as SponsorsMessages;
  const sponsorsList = messages?.Sponsors?.list || {};

  return (
    <section className="relative py-24 border-t border-slate-100 overflow-hidden bg-white">
      {/* 1. Base Gradient Layer */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-slate-50/50 to-white pointer-events-none" />
      
      {/* 2. Dot Grid Pattern Layer */}
      <div 
        className="absolute inset-0 opacity-60 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', 
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)'
        }} 
      />

      {/* 3. Subtle Texture Layer */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Left-Aligned Header */}
        <div className="text-left mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest">
              {t('tag')}
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight"
          >
            {t('title')} <span className="text-secondary">.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Sponsors Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(sponsorsList).map(([key, sponsor], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group h-36 rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-8 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2"
            >
              {sponsor.logo ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={sponsor.logo} 
                    alt={sponsor.name} 
                    fill 
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ) : (
                <span className="text-lg font-bold text-slate-300 transition-colors duration-300 group-hover:text-primary uppercase tracking-widest">
                  {sponsor.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link 
            href="/sponsors/become" 
            className="inline-flex items-center gap-2 rounded-full bg-[#4285F4] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-600 hover:scale-105 hover:shadow-blue-500/50"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
