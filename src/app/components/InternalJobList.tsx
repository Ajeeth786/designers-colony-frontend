import type { InternalJob } from "../../data/internal-job.types";

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
    <div className="block w-full py-4 transition-colors duration-150 hover:bg-[#FAFAF9]/50 group">

      {/* Company */}
      <div className="text-[13px] text-[#A8A29E] mb-1">
        {job.company}
      </div>

      {/* Role */}
      <h2 className="text-[20px] font-semibold text-[#1C1917] mb-2">
        {job.role}
      </h2>

      {/* Meta */}
      <div className="text-[14px] text-[#A8A29E] mb-3">
        {job.location} · {job.experience_range || "Any level"} · {job.work_mode}
      </div>

      {/* Short note */}
      {job.short_note && (
        <div className="mb-3 text-[14px] text-[#78716C]">
          {job.short_note}
        </div>
      )}

      {/* How to apply */}
      <details className="mb-3">
        <summary className="cursor-pointer text-[14px] font-medium text-[#1C1917]">
          How to apply
        </summary>
        <div className="mt-2 text-[14px] text-[#57534E] whitespace-pre-line">
          {job.how_to_apply}
        </div>
      </details>

      {/* Bottom Row */}
      <div className="flex items-center justify-between text-[12px] text-[#A8A29E]">
        <div>
          Shared by {job.shared_by}
          {job.is_verified && (
            <>
              {" · "}
              <span className="text-[#78716C]">Verified</span>
            </>
          )}
          {" · "}
          {new Date(job.created_at).toLocaleDateString()}
        </div>

        <button
          onClick={() => onReport(job.id)}
          className="hover:text-[#78716C] transition-colors"
        >
          Report
        </button>
      </div>
    </div>
  );
}
