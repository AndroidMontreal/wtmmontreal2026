'use client';

import TeamCard from './TeamCard';
import { TeamMember } from '@/types/team';

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 list-none p-0">
      {members.map((member, index) => (
        <TeamCard key={member.name} member={member} index={index} />
      ))}
    </ul>
  );
}
