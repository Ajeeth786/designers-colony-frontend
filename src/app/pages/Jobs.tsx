import { PageTitle } from '../components/PageTitle';
import { FilterBar } from '../components/FilterBar';
import { JobList } from '../components/JobList';
import { LoadMoreButton } from '../components/LoadMoreButton';
import { Footer } from '../components/Footer';
import { JobsLoadingSkeleton } from '../components/JobCardSkeleton';
import { useEffect, useState } from 'react';
import type { Job } from '../../data/job.types';
import { mapApiJobToJob } from '../../data/job.mapper';

const JOBS_PER_PAGE = 12;

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

  // ✅ FILTER STATE
  const [filters, setFilters] = useState<Filters>({
    location: null,
    experienceLevel: null,
    workMode: null,
  });

  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true);

        const res = await fetch(
          'https://designers-colony-backend.vercel.app/api/jobs?page=1&limit=1000'
        );
        const json = await res.json();

        if (!json.success) {
          throw new Error('Failed to fetch jobs');
        }

        setJobs(
          (Array.isArray(json.jobs) ? json.jobs : []).map(mapApiJobToJob)
        );
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    }

    fetchJobs();
  }, []);

  // ✅ FILTER HANDLER (used by FilterBar)
  const handleFilterChange = (
    type: keyof Filters,
    value: string | null
  ) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));

    // Reset pagination on filter change
    setVisibleCount(JOBS_PER_PAGE);
  };

  // ✅ APPLY FILTERS
  const filteredJobs = jobs.filter((job) => {
    if (filters.location && job.location !== filters.location) return false;
    if (
      filters.experienceLevel &&
      job.experienceLevel !== filters.experienceLevel
    )
      return false;
    if (filters.workMode && job.workMode !== filters.workMode) return false;

    return true;
  });

  // ✅ PAGINATION AFTER FILTERING
  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJobs.length;

  const handleLoadMore = () => {
    if (isLoading) return;
    setVisibleCount((prev) =>
      Math.min(prev + JOBS_PER_PAGE, filteredJobs.length)
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="sm:max-w-[1120px] sm:mx-auto px-6 sm:px-6 md:px-10 lg:px-10 xl:px-20 pt-[72px] sm:pt-[80px]">
        <PageTitle />

        <FilterBar onFilterChange={handleFilterChange} />

        {isInitialLoad ? (
          <JobsLoadingSkeleton />
        ) : filteredJobs.length === 0 ? (
          <div className="mb-10 text-center text-[14px] sm:text-[15px] text-[#A8A29E]">
            No roles match your filters.
          </div>
        ) : (
          <>
            <JobList jobs={visibleJobs} />

            {hasMore && (
              <LoadMoreButton
                onClick={handleLoadMore}
                showing={visibleCount}
                total={filteredJobs.length}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
