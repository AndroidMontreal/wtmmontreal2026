'use client';

import React from 'react';
import {useMessages, useTranslations} from 'next-intl';
import Image from 'next/image';
import {motion, Variants} from 'framer-motion';
import {Facebook, Instagram, Linkedin, Mail, Send, Twitter, Youtube} from 'lucide-react';
import {FaDiscord, FaSpotify} from 'react-icons/fa';
import {Link} from '@/i18n/routing';
import {FooterMessages} from '@/types/navigation';
import Button from '@/components/ui/Button';

// Icon Map
const socialIconMap: Record<string, React.ComponentType<{ className?: string; fill?: string }>> = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Facebook: Facebook,
  Twitter: Twitter,
  Discord: FaDiscord,
  YouTube: Youtube,
  Spotify: FaSpotify
};

export default function Footer() {
  const t = useTranslations('Footer');
  const messages = useMessages() as unknown as FooterMessages;

  // Dynamic Data
  const socials = messages?.Footer?.socials || [];

  const pastEventsData = messages?.Footer?.past_events;
  const pastEventsTitle = pastEventsData?.title || 'Past Events';
  const pastEvents = pastEventsData?.items || [];

  const quickLinksData = messages?.Footer?.quick_links;
  const quickLinksTitle = quickLinksData?.title || 'Quick Links';
  const quickLinks = quickLinksData?.items || [];

  const newsletterData = messages?.Footer?.newsletter;
  const newsletterTitle = newsletterData?.title || 'Stay Connected';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#111111] text-slate-300 py-16 border-t border-white/10 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 mb-16 justify-items-start"
        >

          {/* Column 1: Brand */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative h-24 w-48 transition-all duration-500 hover:scale-105">
                <Image
                  src="/logo/logo.svg"
                  alt="WTM Montreal"
                  fill
                  className="object-contain object-left invert brightness-0 hover:invert-0 hover:brightness-100 transition-all duration-500"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {t('description')}
            </p>

            <a
              href="mailto:socials@wtmmontreal.com"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-[#00A896] transition-colors duration-300"
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">socials@wtmmontreal.com</span>
            </a>

            <div className="flex gap-4">
              {socials.map((social) => {
                const Icon = socialIconMap[social.name] || Send;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-slate-500 hover:text-[#00A896] transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Column 2: Past Events */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold mb-6">{pastEventsTitle}</h3>
            <ul className="space-y-3 text-sm">
              {pastEvents.map((event, idx) => (
                <li key={idx}>
                  <a
                    href={event.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00A896] transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {event.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold mb-6">{quickLinksTitle}</h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((item, idx) => {
                const isExternal = item.href.startsWith('http');
                return (
                  <li key={idx}>
                    {isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#00A896] transition-colors inline-block hover:translate-x-1 duration-200"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className="hover:text-[#00A896] transition-colors inline-block hover:translate-x-1 duration-200">
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold mb-6">{newsletterTitle}</h3>
            <p className="text-sm text-slate-400 mb-6">
              {t('newsletter.text')}
            </p>
            <Button
              href={t('newsletter.href')}
              external
              variant="primary"
              size="md"
              className="w-full sm:w-auto transform hover:-translate-y-1 transition-transform"
            >
              {t('newsletter.cta')}
            </Button>
          </motion.div>

        </motion.div>

        {/* Bottom Bar: Copyright & Code of Conduct */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-sm text-slate-500 font-medium">
            {t('copyright')}
          </div>
          <Link href="/code-of-conduct" className="text-xs text-slate-400 hover:text-primary transition-colors">
            {t('code_of_conduct')}
          </Link>
        </motion.div>

      </div>
    </motion.footer>
  );
}
