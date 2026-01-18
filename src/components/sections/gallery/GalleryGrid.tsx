'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GalleryItem {
  src: string;
  alt: string;
  type: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  // Masonry Layout: No fixed aspect ratios, just natural height stacking
  return (
    <div className="columns-1 gap-4 sm:columns-2 md:gap-6 lg:columns-3 space-y-4 md:space-y-6">
      {items.map((item, idx) => (
        <motion.div
          key={item.src}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          className="relative break-inside-avoid overflow-hidden rounded-2xl bg-slate-800 group"
        >
          <img
            src={item.src}
            alt={item.alt}
            className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
        </motion.div>
      ))}
    </div>
  );
}
