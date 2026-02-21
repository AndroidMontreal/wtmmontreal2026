'use client';

import Button from '@/components/ui/Button';
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern';
import SectionTitle from '@/components/ui/SectionTitle';
import { SponsorsMessages, SponsorTier } from '@/types/sections';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useMessages, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Sponsors() {
  const t = useTranslations('Sponsors.header');
  const messages = useMessages() as unknown as SponsorsMessages;
  const tiers = messages?.Sponsors?.tiers || {};

  const getTierStyles = (tierKey: string) => {
    switch (tierKey.toLowerCase()) {
      case 'platinum':
        return {
          label: 'text-blue-600',
          badge: 'bg-blue-50 text-blue-600 border-blue-100',
          line: 'group-hover:bg-blue-500',
        };
      case 'bronze':
        return {
          label: 'text-amber-600',
          badge: 'bg-amber-50 text-amber-700 border-amber-100',
          line: 'group-hover:bg-amber-500',
        };
      default:
        return {
          label: 'text-slate-500',
          badge: 'bg-slate-100 text-slate-600 border-slate-200',
          line: 'group-hover:bg-slate-400',
        };
    }
  };

  return (
    <section className="relative py-24 border-t border-slate-100 overflow-hidden bg-[#FAFAFA]">
      {/* 1. Base Gradient Layer - Subtle warmth */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-slate-50/30 to-white pointer-events-none" />

      {/* 2. Interactive Dot Pattern */}
      <InteractiveGridPattern
        className="opacity-[0.2]"
        dotColor="#cbd5e1"
        spacing={26}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <SectionTitle
          tag={t('tag')}
          title={t('title')}
          subtitle={t('subtitle')}
          highlightColor="text-secondary"
          tagStyles={{
            bg: 'bg-secondary/10',
            text: 'text-secondary',
            border: 'border-secondary/20'
          }}
        />

        {/* Tiers Container */}
        <div className="flex flex-col gap-24 mt-16">
          {Object.entries(tiers).map(([key, tier]: [string, SponsorTier]) => {
            const styles = getTierStyles(key);

            return (
              <div key={key} className="w-full group">
                {/* Reference-Based Header Design */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-12"
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                        {tier.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${styles.badge}`}>
                        {tier.badge}
                      </span>
                    </div>
                    <p className="text-base text-slate-500 font-medium max-w-lg md:text-right leading-relaxed">
                      {tier.subtitle}
                    </p>
                  </div>
                  {/* Full width separator with hover interaction */}
                  <div className={`w-full h-px bg-slate-200 transition-colors duration-500 ${styles.line}`} />
                </motion.div>

                {/* Logos Container - Flex layout preserves original size and controls spacing better */}
                <div className="flex flex-wrap gap-x-16 gap-y-12 items-center justify-center md:justify-start">
                  {tier.items.map((sponsor, index) => (
                    <motion.div
                      key={sponsor.name}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 50 }}
                      className="group/logo relative flex items-center"
                    >
                      {sponsor.link ? (
                        <a href={sponsor.link} target="_blank" rel="noopener noreferrer" className="w-full flex justify-center md:justify-start">
                          {sponsor.logo ? (
                            <div className="relative inline-flex transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:drop-shadow-2xl hover:brightness-110 hover:saturate-110">
                              <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                width={400}
                                height={250}
                                className="object-contain w-auto h-auto max-w-full"
                                priority={key.toLowerCase() === 'platinum'}
                              />
                            </div>
                          ) : (
                            <span className="text-sm font-bold text-slate-300 uppercase tracking-widest transition-colors duration-300 group-hover/logo:text-secondary">
                              {sponsor.name}
                            </span>
                          )}
                        </a>
                      ) : (
                        <>
                          {sponsor.logo ? (
                            <div className="relative inline-flex transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:drop-shadow-2xl hover:brightness-110 hover:saturate-110">
                              <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                width={400}
                                height={250}
                                className="object-contain w-auto h-auto max-w-full"
                                priority={key.toLowerCase() === 'platinum'}
                              />
                            </div>
                          ) : (
                            <span className="text-sm font-bold text-slate-300 uppercase tracking-widest transition-colors duration-300 group-hover/logo:text-secondary">
                              {sponsor.name}
                            </span>
                          )}
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center"
        >
          <Button
            href={t('cta_link')}
            external
            variant="secondary"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            {t('cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
