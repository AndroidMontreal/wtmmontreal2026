'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TeamMember } from '@/types/team';

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="list-none"
    >
      <a
        href={member.social}
        target="_blank"
        rel="noopener noreferrer"
        className="group team-card bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-transparent flex flex-col transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(66,133,244,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 h-full"
      >
        {/* Image Container */}
        <div className="aspect-square w-full overflow-hidden p-4">
          <div className="w-full h-full relative">
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover object-top transition-transform duration-600 ease-[cubic-bezier(0.2,1,0.3,1)] contrast-110 group-hover:scale-103 rounded-xl  shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-2 flex flex-col grow relative text-left">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-secondary transition-colors">
            {member.name}
          </h3>

          <div className="mt-1 flex flex-col items-start gap-0.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {member.role}
            </p>
            {member.company && (
              <p className="text-sm text-slate-400 line-clamp-2" title={member.company}>
                {member.company}
              </p>
            )}
          </div>
        </div>
      </a>
    </motion.li>
  );
}
