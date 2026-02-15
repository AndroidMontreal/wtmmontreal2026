'use client';

import { useState, useRef } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GalleryGrid from './GalleryGrid';
import GalleryControls from './GalleryControls';
import FloatingOrb from '@/components/ui/FloatingOrb';
import Button from '@/components/ui/Button';
import SectionTitle from '@/components/ui/SectionTitle';

interface GalleryMessages {
  Gallery: {
    meta: {
      tagline: string;
      title: string;
      subtitle: string;
      cta_text: string;
      cta_link: string;
    };
    items: Array<{
      src: string;
      alt: string;
      type: string;
    }>;
  };
}

const ITEMS_PER_PAGE = 9;

export default function Gallery() {
  const t = useTranslations('Gallery.meta');
  const messages = useMessages() as unknown as GalleryMessages;
  const containerRef = useRef(null);

  const [page, setPage] = useState(0);

  const allItems = messages?.Gallery?.items || [];
  const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);

  const currentItems = allItems.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <section ref={containerRef} className="relative bg-gray-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Background Gradient Bleed */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent z-10" />

      {/* Organic Floating Orbs (Header Focus with Gradient Mask) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)' }}
      >
        <FloatingOrb color="rgba(0,217,192,0.45)" size="600px" />
        <FloatingOrb color="rgba(0,217,192,0.55)" size="400px" />
        <FloatingOrb color="rgba(66,133,244,0.45)" size="550px" />
        <FloatingOrb color="rgba(66,133,244,0.35)" size="450px" />
        <FloatingOrb color="rgba(0,217,192,0.50)" size="500px" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto max-w-7xl relative z-10"
      >

        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <SectionTitle
            tag="#WTMMontreal"
            title={t('title')}
            subtitle={t('subtitle')}
            highlightColor="text-[#00D9C0]"
            titleColor="text-white"
            subtitleColor="text-slate-400"
            className="mb-0 max-w-2xl"
            tagStyles={{
              bg: 'bg-teal-900/30',
              text: 'text-teal-400',
              border: 'border-teal-500/30'
            }}
          />

          <div className="flex items-center gap-6">
            <GalleryControls
              onPrev={prevPage}
              onNext={nextPage}
              hasPrev={page > 0}
              hasNext={page < totalPages - 1}
            />
          </div>
        </div>

        {/* Gallery Grid Container */}
        <motion.div
          className="min-h-[600px]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <GalleryGrid items={currentItems} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA - Using Reusable Button */}
        <div className="mt-16 flex justify-center">
          <Button
            href={messages?.Gallery?.meta?.cta_link || '#'}
            external
            variant="primary"
            size="lg"
            shimmer
            icon={<ArrowRight className="h-4 w-4" />}
          >
            {t('cta_text')}
          </Button>
        </div>

      </motion.div>
    </section>
  );
}
