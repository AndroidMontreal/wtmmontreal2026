'use client';

import React from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PartnersMessages, Partner } from '@/types/sections';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern';

export default function CommunityPartners() {
  const t = useTranslations('Partners.header');
  const messages = useMessages() as unknown as PartnersMessages;
  const partnersList = messages?.Partners?.list || {};

  return (
    <section className="relative py-24 border-t border-slate-100 overflow-hidden bg-[#FAFAFA]">
      {/* 1. Base Gradient Layer */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-slate-50/30 to-white pointer-events-none" />

      {/* 2. Interactive Dot Pattern  */}
      <InteractiveGridPattern
        className="opacity-[0.3]"
        dotColor="#cbd5e1"
        spacing={32}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Reusable Section Title - Teal Theme */}
        <SectionTitle
          tag={t('tag')}
          title={t('title')}
          subtitle={t('subtitle')}
          highlightColor="text-[#00A896]"
          tagStyles={{
            bg: 'bg-primary/10',
            text: 'text-primary',
            border: 'border-primary/20'
          }}
        />

        {/* Partners Grid - Fixed 3 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 items-center justify-items-center md:justify-items-start mt-16">
          {Object.entries(partnersList).map(([key, partner]: [string, Partner], index) => {
            const Content = (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group relative flex items-center justify-center md:justify-start w-full"
              >
                                {partner.logo ? (
                                  <div className="relative inline-flex transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:drop-shadow-xl hover:brightness-110 hover:saturate-110">
                                    <Image 
                                      src={partner.logo} 
                                      alt={partner.name} 
                                      width={400} 
                                      height={250}
                                      className="object-contain w-auto h-auto max-w-full"
                                    />
                                  </div>
                                ) : (                  <span className="text-sm font-bold text-slate-300 uppercase tracking-wider group-hover:text-[#00A896] transition-colors duration-300 text-center">
                    {partner.name}
                  </span>
                )}
              </motion.div>
            );

            return partner.link ? (
              <a
                key={key}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center"
              >
                {Content}
              </a>
            ) : (
              <div key={key} className="w-full flex justify-center">{Content}</div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center"
        >
          <Button
            href={t('cta_link')}
            external
            variant="primary"
            size="lg"
            shimmer
            icon={<ArrowRight className="h-4 w-4" />}
          >
            {t('cta')}
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
