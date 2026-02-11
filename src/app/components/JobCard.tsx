import { ArrowRight } from 'lucide-react';

export type { Job } from '../../data/job.types';
import type { Job } from '../../data/job.types';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <a
      href={job.applyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full py-3 sm:py-5 
        transition-colors duration-150 
        hover:bg-[#FAFAF9]/50
        cursor-pointer group"
    >
      {/* Company Name */}
      <div className="text-[12px] sm:text-[13px] font-normal sm:font-medium text-[#A8A29E] tracking-[0.01em] mb-1 sm:mb-1.5 leading-[16px] sm:leading-normal">
        {job.company}
      </div>

      {/* Job Title - HERO */}
      <h2 className="text-[16px] sm:text-[20px] font-semibold text-[#1C1917] leading-[22px] sm:leading-[1.3] tracking-[-0.02em] mb-1.5 sm:mb-2.5 line-clamp-2">
        {job.title}
      </h2>

      {/* Meta Info Line - Inline with dots */}
      <div className="text-[12px] sm:text-[14px] font-normal text-[#A8A29E] leading-[16px] sm:leading-[1.5] mb-1 sm:mb-2.5">
        {job.location} · {job.experience} · {job.workMode}
        {job.isNew && <span className="ml-1 font-medium text-[#1C1917]">· New</span>}
      </div>

      {/* Role Focus - Inline tags */}
      <div className="mb-1.5 sm:mb-3 text-[12px] sm:text-[13px] font-normal text-[#78716C] leading-[16px] sm:leading-normal">
        {job.roleFocus}
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between mt-1 sm:mt-0">
        {/* Posted Time - Hidden on mobile */}
        <span className="hidden sm:inline text-[13px] font-normal text-[#A8A29E]">
          Posted {job.postedTime}
        </span>

        {/* Apply Link - Text only, no button */}
        <div className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] font-medium sm:font-semibold text-[#1C1917] sm:ml-auto leading-[18px] sm:leading-normal">
          <span>View & apply</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </div>
      </div>
    </a>
  );
}