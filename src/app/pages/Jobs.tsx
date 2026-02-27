export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PageTitle } from "../components/PageTitle";
import { FilterBar } from "../components/FilterBar";
import { JobList } from "../components/JobList";
import { LoadMoreButton } from "../components/LoadMoreButton";
import { Footer } from "../components/Footer";
import { JobsLoadingSkeleton } from "../components/JobCardSkeleton";

import type { Job } from "../../data/job.types";
import { mapApiJobToJob } from "../../data/job.mapper";
import { supabase } from "../../lib/supabase";

const JOBS_PER_PAGE = 12;
const JOB_VISIBLE_DAYS = 7;

type Filters = {
  location: string | null;
  experienceLevel: string | null;
  workMode: string | null;
};

export function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [visibleCount, setVisibleCount] = useState(JOBS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() => ({
    location: searchParams.get("location"),
    experienceLevel: searchParams.get("experienceLevel"),
    workMode: searchParams.get("workMode"),
  }));

  const quickCities = [
    "Bengaluru",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Gurugram",
  ];

  // ✅ Fetch once (no filter dependency)
  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true);

        const visibleFromDate = new Date();
        visibleFromDate.setDate(
          visibleFromDate.getDate() - JOB_VISIBLE_DAYS
        );

        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .gte("created_at", visibleFromDate.toISOString())
          .order("created_at", { ascending: false });

        if (error) {
          console.error(error);
          return;
        }

        setJobs((data ?? []).map(mapApiJobToJob));
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    }

    fetchJobs();
  }, []);

  // 🔹 Sync URL
  useEffect(() => {
    const params: Record<string, string> = {};

    if (filters.location) params.location = filters.location;
    if (filters.experienceLevel)
      params.experienceLevel = filters.experienceLevel;
    if (filters.workMode) params.workMode = filters.workMode;

    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (
    type: keyof Filters,
    value: string | null
  ) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setVisibleCount(JOBS_PER_PAGE);
  };

  // ✅ Local filtering
  const filteredJobs = jobs.filter((job) => {
    if (
      filters.location &&
      !job.location?.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.experienceLevel &&
      job.experienceLevel !== filters.experienceLevel
    ) {
      return false;
    }

    if (
      filters.workMode &&
      job.workMode !== filters.workMode
    ) {
      return false;
    }

    return true;
  });

  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJobs.length;

  // ✅ Counts from full dataset
  const cityCounts = quickCities.reduce((acc, city) => {
    acc[city] = jobs.filter((job) =>
      job.location?.toLowerCase().includes(city.toLowerCase())
    ).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="pt-[40px] sm:pt-[72px]">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-6 md:px-10">

          <div className="mb-6 sm:mb-8">
            <PageTitle />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 pb-2 overflow-x-auto no-scrollbar">

              <button
                onClick={() =>
                  setShowAdvancedFilters((prev) => !prev)
                }
                className={`flex items-center justify-center w-10 h-10 rounded-full border transition shrink-0
                  ${
                    showAdvancedFilters
                      ? "bg-black text-white border-black"
                      : "bg-white border-[#E7E5E4] hover:border-black"
                  }`}
              >
                ☰
              </button>

              {quickCities.map((city) => {
                const isActive =
                  filters.location?.toLowerCase() ===
                  city.toLowerCase();

                return (
                  <button
                    key={city}
                    onClick={() => {
                      handleFilterChange(
                        "location",
                        isActive ? null : city
                      );
                      setShowAdvancedFilters(false);
                    }}
                    className={`whitespace-nowrap px-4 h-10 text-[13px] rounded-full border transition flex items-center gap-1 shrink-0
                      ${
                        isActive
                          ? "bg-black text-white border-black"
                          : "bg-white text-[#57534E] border-[#E7E5E4] hover:border-black"
                      }`}
                  >
                    {city}
                    <span className="text-[12px] opacity-70">
                      ({cityCounts[city]})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {showAdvancedFilters && (
            <div className="mb-6 relative z-50">
              <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}

          {isInitialLoad ? (
            <JobsLoadingSkeleton />
          ) : filteredJobs.length === 0 ? (
            <div className="mt-14 text-center text-[14px] text-[#A8A29E]">
              No roles match your filters.
            </div>
          ) : (
            <>
              <JobList jobs={visibleJobs} />

              {hasMore && (
                <div className="mt-10">
                  <LoadMoreButton
                    onClick={() =>
                      setVisibleCount((c) => c + JOBS_PER_PAGE)
                    }
                    showing={visibleCount}
                    total={filteredJobs.length}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}