import type { InternalJob } from "../../data/internal-job.types";

interface InternalJobCardProps {
  job: InternalJob;
  onReport: (jobId: string) => void;
}

export function InternalJobCard({ job, onReport }: InternalJobCardProps) {
  return (
    <div className="bg-white border border-[#E7E5E4] rounded-lg p-5 sm:p-6 transition-all duration-150 hover:border-[#D6D3D1]">
      
      {/* Company */}
      <div className="text-[13px] font-medium text-[#78716C] mb-1">
        {job.company}
      </div>

      {/* Role */}
      <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#1C1917] mb-3 leading-[1.3]">
        {job.role}
      </h3>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#78716C] mb-4">
        <span>{job.location}</span>
        <span>·</span>
        <span>{job.work_mode}</span>

        {job.experience_range && (
          <>
            <span>·</span>
            <span>{job.experience_range}</span>
          </>
        )}
      </div>

      {/* How to apply */}
      <div className="mb-4">
        <div className="text-[13px] font-medium text-[#1C1917] mb-2">
          How to apply
        </div>
        <div className="text-[14px] text-[#57534E] leading-[1.6] whitespace-pre-line">
          {job.how_to_apply}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#F5F5F4]">
        <div className="text-[12px] text-[#A8A29E]">
          Shared by {job.shared_by}
        </div>

        <button
          onClick={() => onReport(job.id)}
          className="text-[12px] text-[#A8A29E] hover:text-[#78716C] transition-colors"
        >
          Report
        </button>
      </div>
    </div>
  );
}
