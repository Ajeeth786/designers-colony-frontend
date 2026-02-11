import { InternalJob } from '../pages/InternalJobs';

interface InternalJobListProps {
  jobs: InternalJob[];
  onReport: (jobId: string) => void;
}

export function InternalJobList({ jobs, onReport }: InternalJobListProps) {
  return (
    <div className="mb-10">
      {jobs.map((job, index) => (
        <div key={job.id}>
          <InternalJobListItem job={job} onReport={onReport} />
          
          {/* Separator - except for last item */}
          {index < jobs.length - 1 && (
            <div className="h-[1px] bg-[#F0F0F0]" />
          )}
        </div>
      ))}
    </div>
  );
}

interface InternalJobListItemProps {
  job: InternalJob;
  onReport: (jobId: string) => void;
}

function InternalJobListItem({ job, onReport }: InternalJobListItemProps) {
  return (
    <div className="block w-full py-3 sm:py-5 transition-colors duration-150 hover:bg-[#FAFAF9]/50 group">
      {/* Company Name */}
      <div className="text-[12px] sm:text-[13px] font-normal sm:font-medium text-[#A8A29E] tracking-[0.01em] mb-1 sm:mb-1.5 leading-[16px] sm:leading-normal">
        {job.company}
      </div>

      {/* Job Title - HERO */}
      <h2 className="text-[16px] sm:text-[20px] font-semibold text-[#1C1917] leading-[22px] sm:leading-[1.3] tracking-[-0.02em] mb-1.5 sm:mb-2.5">
        {job.role}
      </h2>

      {/* Meta Info Line - Inline with dots */}
      <div className="text-[12px] sm:text-[14px] font-normal text-[#A8A29E] leading-[16px] sm:leading-[1.5] mb-1 sm:mb-2.5">
        {job.location} · {job.experienceRange || 'Any level'} · {job.workMode}
      </div>

      {/* Short Note - If available */}
      {job.shortNote && (
        <div className="mb-1.5 sm:mb-3 text-[12px] sm:text-[13px] font-normal text-[#78716C] leading-[16px] sm:leading-normal">
          {job.shortNote}
        </div>
      )}

      {/* How to Apply - Expandable section */}
      <details className="mb-2 sm:mb-3 group/details">
        <summary className="cursor-pointer text-[13px] sm:text-[14px] font-medium text-[#1C1917] hover:text-[#78716C] transition-colors list-none flex items-center gap-1.5">
          <span>How to apply</span>
          <svg 
            className="w-4 h-4 transition-transform duration-150 group-open/details:rotate-180" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="mt-2 text-[13px] sm:text-[14px] text-[#57534E] leading-[1.6] whitespace-pre-line pl-0 sm:pl-0">
          {job.howToApply}
        </div>
      </details>

      {/* Bottom Row - Metadata */}
      <div className="flex items-center justify-between mt-1 sm:mt-2">
        {/* Shared Info */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] font-normal text-[#A8A29E] leading-[14px] sm:leading-normal">
          <span>Shared by {job.sharedBy}</span>
          {job.isVerified && (
            <>
              <span>·</span>
              <span className="text-[#78716C]">Verified</span>
            </>
          )}
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">{job.sharedDate}</span>
        </div>

        {/* Report Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReport(job.id);
          }}
          className="text-[11px] sm:text-[12px] font-normal text-[#A8A29E] hover:text-[#78716C] transition-colors leading-[14px] sm:leading-normal"
          title="Flag if this doesn't look like a genuine role"
        >
          Report
        </button>
      </div>
    </div>
  );
}
