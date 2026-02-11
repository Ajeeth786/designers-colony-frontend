import { InternalJob } from '../pages/InternalJobs';

interface InternalJobCardProps {
  job: InternalJob;
  onReport: (jobId: string) => void;
}

export function InternalJobCard({ job, onReport }: InternalJobCardProps) {
  return (
    <div className="bg-white border border-[#E7E5E4] rounded-lg p-6 sm:p-6 p-5 transition-all duration-150 hover:border-[#D6D3D1]">
      {/* Company Name */}
      <div className="text-[13px] font-medium text-[#78716C] mb-1">
        {job.company}
      </div>

      {/* Role Title */}
      <h3 className="text-[18px] sm:text-[18px] text-[16px] font-semibold text-[#1C1917] mb-3 leading-[1.3]">
        {job.role}
      </h3>

      {/* Meta Info */}
      <div className="flex items-center gap-2 text-[13px] text-[#78716C] mb-4">
        <span>{job.location}</span>
        <span>·</span>
        {job.experienceRange && (
          <>
            <span>{job.experienceRange}</span>
            <span>·</span>
          </>
        )}
        <span>{job.workMode}</span>
      </div>

      {/* Short Note */}
      {job.shortNote && (
        <div className="text-[14px] text-[#57534E] leading-[1.6] mb-4 bg-[#FAFAF9] p-4 rounded-lg border border-[#F5F5F4]">
          {job.shortNote}
        </div>
      )}

      {/* How to Apply */}
      <div className="mb-4">
        <div className="text-[13px] font-medium text-[#1C1917] mb-2">
          How to apply
        </div>
        <div className="text-[14px] text-[#57534E] leading-[1.6] whitespace-pre-line">
          {job.howToApply}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#F5F5F4]">
        <div className="flex items-center gap-2 text-[12px] text-[#A8A29E]">
          <span>Shared by {job.sharedBy}</span>
          {job.isVerified && (
            <>
              <span>·</span>
              <span className="text-[#78716C]">Verified designer</span>
            </>
          )}
          <span>·</span>
          <span>{job.sharedDate}</span>
        </div>
        <button
          onClick={() => onReport(job.id)}
          className="text-[12px] text-[#A8A29E] hover:text-[#78716C] transition-colors"
          title="Flag if this doesn't look like a genuine internal role"
        >
          Report
        </button>
      </div>
    </div>
  );
}
