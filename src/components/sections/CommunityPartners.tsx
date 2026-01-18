'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Code, School, Users, Rocket, Lightbulb, Globe, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function CommunityPartners() {
  const t = useTranslations('Common.partners');

  const partners = [
    { name: 'Partner Org', icon: Code },
    { name: 'University', icon: School },
    { name: 'Community', icon: Users },
    { name: 'Startup', icon: Rocket },
    { name: 'Incubator', icon: Lightbulb },
    { name: 'Global', icon: Globe },
  ];

  return (
    <section className="py-20 bg-slate-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with CTA Link */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 pb-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-slate-900"
            >
              {t('title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 mt-2"
            >
              {t('subtitle')}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/partners/join" 
              className="text-primary hover:text-teal-600 text-sm font-bold flex items-center gap-1 mt-4 md:mt-0 transition-colors"
            >
              {t('cta')} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-300 border border-slate-100 group-hover:border-primary group-hover:text-primary group-hover:shadow-md transition-all duration-300">
                <partner.icon className="h-8 w-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-900 transition-colors">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
