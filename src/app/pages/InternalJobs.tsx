import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { InternalJobCard } from "../components/InternalJobCard";
import { InternalJobsEmptyStateUI } from "../components/figma/Internal-jobs/InternalJobsEmptyStateUI";
import type { InternalJob } from "../../data/internal-job.types";

export function InternalJobs() {
  const [jobs, setJobs] = useState<InternalJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInternalJobs() {
      const { data, error } = await supabase
        .from("internal_roles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setJobs(data);
      }

      setIsLoading(false);
    }

    fetchInternalJobs();
  }, []);

  const isEmpty = !isLoading && jobs.length === 0;

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="pt-[80px]">
        <div className="mx-auto w-full max-w-[1120px] px-6 md:px-10 pb-24">

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              
              <div>
                <h1 className="mb-2 text-[26px] sm:text-[32px] font-semibold text-[#1C1917] leading-tight">
                  Roles shared by the community
                </h1>

                <p className="text-[14px] sm:text-[15px] text-[#78716C]">
                  Shared by designers for fellow designers
                </p>
              </div>

              {/* Desktop CTA */}
              {!isEmpty && (
                <div className="hidden sm:block">
                  <Link
                    to="/community/share"
                    className="rounded-full bg-black px-5 py-2.5 text-[14px] font-medium text-white transition hover:opacity-90"
                  >
                    Share a role
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="py-10 text-[14px] text-[#A8A29E]">
              Loading roles...
            </div>
          ) : isEmpty ? (
            <div className="flex items-center justify-center py-20">
              <InternalJobsEmptyStateUI
                onAction={() => navigate("/community/share")}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {jobs.map((job) => (
                <InternalJobCard
                  key={job.id}
                  job={job}
                  onReport={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button - Mobile Only */}
      {!isEmpty && (
        <button
          onClick={() => navigate("/community/share")}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg sm:hidden active:scale-95 transition"
        >
          <Plus className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
