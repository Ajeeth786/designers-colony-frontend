import type { Job } from "../../data/job.types";
import { supabase } from "../../lib/supabase";

type Props = {
  job: Job;
  clicks24h?: number;
};

export function JobCard({ job, clicks24h }: Props) {
  const createdAt = new Date(job.postedAt);
  const now = new Date();

  const daysSincePosted =
    (now.getTime() - createdAt.getTime()) /
    (1000 * 60 * 60 * 24);

  let signal: string;

  if (daysSincePosted >= 6 && daysSincePosted < 7) {
    signal = "Expires soon";
  } else if (daysSincePosted < 1) {
    signal = "Just posted";
  } else if (clicks24h && clicks24h >= 8) {
    signal = `${clicks24h} applies · 24h`;
  } else {
    const days = Math.floor(daysSincePosted);
    signal = `Posted ${days} day${days !== 1 ? "s" : ""} ago`;
  }

  return (
    <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6 hover:shadow-sm transition">
      
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

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#F1F0EE]">
        
        <span className="text-[13px] text-[#A8A29E]">
          {signal}
        </span>

        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={async (e) => {
            e.preventDefault();

            await supabase.from("apply_clicks").insert([
              { job_id: job.id }
            ]);

            window.open(job.applyUrl, "_blank");
          }}
          className="
            inline-flex items-center justify-center
            px-4 py-2
            text-[13px] font-medium
            rounded-full
            border border-[#1C1917]
            text-[#1C1917]
            transition
            hover:bg-[#1C1917]
            hover:text-white
          "
        >
          Apply now →
        </a>
      </div>
    </div>
  );
}