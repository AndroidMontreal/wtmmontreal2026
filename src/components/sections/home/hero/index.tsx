'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Imported Sub-components
import FloatingOrb from '@/components/ui/FloatingOrb';
import HeroButtons from './HeroButtons';
import Countdown from './Countdown';
import ScrollIndicator from '@/components/ui/ScrollIndicator';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative flex min-h-[calc(100vh-120px)] w-full items-center justify-center overflow-hidden py-16 px-4 bg-slate-950">

      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg-second.jpg"
          alt="WTM Montreal Event"
          fill
          className="object-cover grayscale"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/75 to-black/70" />
      </div>

      {/* Animated Background Effects */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <FloatingOrb color="rgba(66,133,244,0.40)" size="650px" />
        <FloatingOrb color="rgba(0,217,192,0.35)" size="600px" />
        <FloatingOrb color="rgba(66,133,244,0.40)" size="550px" />
      </div>

      {/* Main Content */}
      <div className="container relative z-20 mx-auto max-w-5xl">
        <div className="text-center">

          {/* Date & Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full bg-white/8 backdrop-blur-md text-white text-xs font-semibold border border-white/20 uppercase tracking-widest shadow-lg"
          >
            <div className="relative flex items-center justify-center h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-ping opacity-75"></span>
            </div>
            <span>{t('date')}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white mb-6 md:mb-10"
          >
            {t.rich('title', {
              gradient: (chunks) => (
                <span className="relative inline-block ml-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9C0] via-[#4285F4] to-[#00D9C0] animate-gradient bg-[length:200%_auto]">
                    {chunks}
                  </span>
                </span>
              )
            })}
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 max-w-3xl mx-auto"
          >
            <p className="text-base md:text-lg lg:text-xl leading-relaxed font-normal text-white px-4">
              {t.rich('subtitle', {
                bold: (chunks) => <span className="font-bold text-white/90">{chunks}</span>
              })}
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Countdown />
          </motion.div>

          {/* Buttons Component */}
          <HeroButtons />

        </div>
            </div>

            {/* Seamless Blend to Gallery Section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-gray-950 to-transparent z-15 pointer-events-none" />

            {/* Scroll Indicator */}
            <ScrollIndicator />
        </section>
    );
}
