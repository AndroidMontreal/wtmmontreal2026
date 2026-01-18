'use client';

import { useState, useRef } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import GalleryGrid from './GalleryGrid';
import GalleryControls from './GalleryControls';
import FloatingOrb from '@/components/ui/FloatingOrb';
import Button from '@/components/ui/Button';

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
  
  // Scroll Animation Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const [page, setPage] = useState(0);
  
  const allItems = messages?.Gallery?.items || [];
  const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
  
  const currentItems = allItems.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <section ref={containerRef} className="relative bg-gray-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Gradient Bleed */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

      {/* Organic Floating Orbs (Header Focus with Gradient Mask) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)' }}
      >
        <FloatingOrb color="rgba(0,217,192,0.3)" size="600px" />
        <FloatingOrb color="rgba(66,133,244,0.3)" size="550px" />
        <FloatingOrb color="rgba(0,217,192,0.25)" size="500px" />
      </div>

      <motion.div 
        style={{ opacity }}
        className="container mx-auto max-w-7xl relative z-10"
      >
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-sm font-bold text-teal-400 uppercase tracking-widest mb-4"
            >
              #WTMMontreal
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t.rich('title', {
                gradient: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9C0] to-[#00A896]">{chunks}</span>
              })}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg"
            >
              {t('subtitle')}
            </motion.p>
          </div>

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
          viewport={{ once: false, amount: 0.2 }}
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
            variant="glass"
            size="lg"
            shimmer
            icon={<ArrowUpRight className="h-4 w-4 text-teal-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />}
          >
            {t('cta_text')}
          </Button>
        </div>

      </motion.div>
    </section>
  );
}