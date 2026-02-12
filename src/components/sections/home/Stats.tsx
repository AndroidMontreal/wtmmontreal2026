'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

interface Stat {
  value: string;
  label: string;
  color: string;
}

export default function StatsSection() {
  const t = useTranslations('Home');
  const stats = t.raw('stats') as Stat[];

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        ease: "easeOut"
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "backOut" },
    },
  };

  return (
    <section className="relative w-full py-24 bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              {t.rich('statsSection.title', {
                gradient: (chunks) => (
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00D9C0] to-[#00A896]">
                    {chunks}
                  </span>
                ),
              })}
            </h2>

            <p className="text-base md:text-lg text-slate-400 font-normal leading-relaxed max-w-md">
              {t('statsSection.subtitle')}
            </p>

            {/* Decorative Line */}
            <div className="w-20 h-1 bg-linear-to-r from-[#00D9C0] to-transparent rounded-full mt-2" />
          </motion.div>

          {/* Right Column: Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 gap-4 md:gap-5"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className={`group relative flex flex-col items-center justify-center aspect-square p-6 
                  bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl
                  hover:bg-slate-900 hover:border-white/20 hover:shadow-2xl hover:shadow-black/60
                  transition-all duration-500 ease-out
                  ${idx % 2 !== 0 ? 'lg:translate-y-10' : ''} 
                `}
              >
                <div className={`text-6xl md:text-7xl font-bold mb-3 tracking-normal group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                  <AnimatedCounter value={stat.value} duration={2.5} delay={0.5} />
                </div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-teal-400 transition-colors duration-300 text-center">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
