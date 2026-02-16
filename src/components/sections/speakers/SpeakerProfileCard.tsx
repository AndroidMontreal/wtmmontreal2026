'use client';

import { Speaker } from '@/types/speaker';
import Image from 'next/image';
import { Linkedin, Twitter, Globe } from 'lucide-react';

interface SpeakerProfileCardProps {
  speaker: Speaker;
  roleType?: string; // e.g. "Keynote", "Speaker"
}

export default function SpeakerProfileCard({ speaker, roleType = 'Speaker' }: SpeakerProfileCardProps) {
  // Map platform strings to Lucide components
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <Linkedin size={20} />;
      case 'twitter': return <Twitter size={20} />;
      case 'website': return <Globe size={20} />;
      default: return null;
    }
  };

  return (
    <div className="relative group w-full font-sans" data-purpose="speaker-portrait-card">
      {/* Outer Border Effect */}
      <div className="absolute -inset-4 border border-primary/20 rounded-[40px] pointer-events-none group-hover:border-primary/40 transition-colors duration-500 hidden lg:block"></div>
      
      {/* Main Card */}
      <div className="relative bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-secondary/5">
        
        {/* Image Container */}
        <div className="aspect-[4/5] overflow-hidden relative bg-slate-100 isolate">
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 ease-out scale-110 group-hover:scale-105 transform-gpu will-change-transform"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        {/* Info Content */}
        <div className="p-8 lg:p-10 bg-white relative">
          {/* Badge */}
          <div className="absolute top-0 right-8 lg:right-10 -translate-y-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-lg z-10">
            {roleType}
          </div>

          <div className="flex flex-col gap-0.5 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1 block">
              {speaker.role}
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight leading-none text-slate-900">
              {speaker.name}
            </h1>
            {speaker.company && (
              <span className="text-lg lg:text-xl font-semibold text-primary/80 tracking-tight mt-1.5 block">
                {speaker.company}
              </span>
            )}
          </div>
          
          {/* Socials (Professional Icons) */}
          {speaker.socials && (
            <div className="flex gap-5 mt-8 pt-6 border-t border-slate-50">
              {Object.entries(speaker.socials).map(([platform, url]) => {
                const icon = getSocialIcon(platform);
                return (
                  url && icon && (
                    <a 
                      key={platform} 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-primary transition-all duration-300 hover:scale-110"
                      title={platform}
                    >
                      {icon}
                    </a>
                  )
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
