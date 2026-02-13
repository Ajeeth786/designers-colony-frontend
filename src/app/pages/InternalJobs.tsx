import { useState } from "react";
import { Link } from "react-router-dom";
import { InternalJobList } from "../components/InternalJobList";
import communityEmptyImg from "../../assets/images/community-roles-empty.png";

export interface InternalJob {
  id: string;
  company: string;
  role: string;
  location: string;
  workMode: "Remote" | "Hybrid" | "Onsite";
  experienceRange?: string;
  howToApply: string;
  shortNote?: string;
  sharedBy: string;
  sharedDate: string;
  isVerified: boolean;
}

const STORAGE_KEY = "designerscolony_internal_jobs";

export function InternalJobs() {
  const [jobs] = useState<InternalJob[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const handleReport = (jobId: string) => {
    console.log("Report job:", jobId);
    alert("Thanks for flagging this. We will review it.");
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="pt-[56px] sm:pt-[80px]">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 pb-24">

          {/* ===== Page Header ===== */}
          <header className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-[640px]">
              <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#1C1917] sm:text-[32px]">
                Roles shared by the community
              </h1>

              <p className="text-[15px] leading-[1.6] text-[#78716C]">
                {jobs.length} {jobs.length === 1 ? "role" : "roles"} · Shared by designers for fellow designers
              </p>
            </div>

            {jobs.length > 0 && (
              <Link
                to="/community/share"
                className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-[#1C1917] px-6 text-[14px] font-semibold text-white hover:bg-[#292524] sm:mt-0"
              >
                Share a role
              </Link>
            )}
          </header>

          {/* ===== Empty State / List ===== */}
          {jobs.length === 0 ? (
            <section className="flex flex-col items-center text-center">
              <img
                src={communityEmptyImg}
                alt="No community roles yet"
                className="mb-6 w-[320px] max-w-full"
              />

              <h2 className="mb-2 text-[18px] font-semibold text-[#1C1917]">
                No community roles yet
              </h2>

              <p className="mb-6 max-w-[420px] text-[14px] leading-[1.6] text-[#78716C]">
                If your team is hiring, you can help a fellow designer by sharing a role.
              </p>

              <Link
                to="/community/share"
                className="inline-flex h-11 items-center rounded-full bg-[#1C1917] px-6 text-[14px] font-semibold text-white hover:bg-[#292524]"
              >
                Share a role
              </Link>
            </section>
          ) : (
            <InternalJobList jobs={jobs} onReport={handleReport} />
          )}

        </div>
      </main>
    </div>
  );
}
