import type { Job } from "../../data/job.types";
import { track } from "@vercel/analytics";


type Props = {
  job: Job;
};

export function JobCard({ job }: Props) {
  return (
    <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6 hover:shadow-sm transition">

      {/* Content */}
      <div>
        <p className="text-[13px] text-[#78716C] mb-1">
          {job.companyName}
        </p>

        <h3 className="text-[18px] font-semibold text-[#1C1917] mb-2">
          {job.roleTitle}
        </h3>

        <p className="text-[14px] text-[#78716C]">
          {job.location} · {job.experienceLevel} · {job.workMode}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#F1F0EE]">
        <span className="text-[13px] text-[#A8A29E]">
          Posted recently
        </span>

        <a
  href={job.applyUrl}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() =>
    track("apply_click", {
      company: job.companyName,
      role: job.roleTitle,
      location: job.location,
    })
  }
  className="text-[14px] font-medium text-black hover:underline transition"
>
  Apply now →
</a>
      </div>
    </div>
  );
}
