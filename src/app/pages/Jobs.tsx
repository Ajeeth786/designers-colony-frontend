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
const JOB_VISIBLE_DAYS = 7; // 🔥 Change this anytime

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
    "Bangalore",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Gurgaon",
  ];

  // 🔹 Fetch Jobs
  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true);

        // 🔥 7-day rule calculation
        const visibleFromDate = new Date();
        visibleFromDate.setDate(
          visibleFromDate.getDate() - JOB_VISIBLE_DAYS
        );

        let query = supabase
          .from("jobs")
          .select("*")
          .gte("created_at", visibleFromDate.toISOString())
          .order("created_at", { ascending: false });

        // Location Filter
        if (filters.location) {
          query = query.ilike(
            "location",
            `%${filters.location}%`
          );
        }

        // Experience Filter
        if (filters.experienceLevel) {
          query = query.ilike(
            "experience_level",
            `%${filters.experienceLevel}%`
          );
        }

        // Work Mode Filter
        if (filters.workMode) {
          query = query.ilike(
            "work_mode",
            `%${filters.workMode}%`
          );
        }

        const { data, error } = await query;

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
  }, [filters]);

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

  const visibleJobs = jobs.slice(0, visibleCount);
  const hasMore = visibleCount < jobs.length;

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

          {/* Title */}
          <div className="mb-6 sm:mb-8">
            <PageTitle />
          </div>

          {/* Filter + Chips */}
          <div className="mb-6">
            <div className="flex items-center gap-2 pb-2 overflow-x-auto no-scrollbar">

              {/* Filter Toggle */}
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

              {/* City Chips */}
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

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mb-6 relative z-50">
              <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}

          {/* Jobs */}
          {isInitialLoad ? (
            <JobsLoadingSkeleton />
          ) : jobs.length === 0 ? (
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
                    total={jobs.length}
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