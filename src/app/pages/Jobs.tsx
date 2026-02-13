import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PageTitle } from '../components/PageTitle';
import { FilterBar } from '../components/FilterBar';
import { JobList } from '../components/JobList';
import { LoadMoreButton } from '../components/LoadMoreButton';
import { Footer } from '../components/Footer';
import { JobsLoadingSkeleton } from '../components/JobCardSkeleton';

import type { Job } from '../../data/job.types';
import { mapApiJobToJob } from '../../data/job.mapper';
import { supabase } from '../../lib/supabase';

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

  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() => ({
    location: searchParams.get('location'),
    experienceLevel: searchParams.get('experienceLevel'),
    workMode: searchParams.get('workMode'),
  }));

  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true);

        const location = filters.location?.trim() || null;
        const experience = filters.experienceLevel?.toLowerCase() || null;
        const workMode = filters.workMode?.toLowerCase() || null;

        let query = supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });

        if (location) query = query.ilike('location', `%${location}%`);
        if (experience) query = query.eq('experience_level', experience);
        if (workMode) query = query.eq('work_mode', workMode);

        const { data, error } = await query;

        if (error) {
          console.error('Supabase error:', error);
          return;
        }

        setJobs((data ?? []).map(mapApiJobToJob));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    }

    fetchJobs();
  }, [filters.location, filters.experienceLevel, filters.workMode]);

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
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
    setVisibleCount(JOBS_PER_PAGE);
  };

  const visibleJobs = jobs.slice(0, visibleCount);
  const hasMore = visibleCount < jobs.length;

  const handleLoadMore = () => {
    if (isLoading) return;
    setVisibleCount((prev) =>
      Math.min(prev + JOBS_PER_PAGE, jobs.length)
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="pt-[56px] sm:pt-[80px]">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <PageTitle />
          <FilterBar onFilterChange={handleFilterChange} />

          {isInitialLoad ? (
            <JobsLoadingSkeleton />
          ) : jobs.length === 0 ? (
            <div className="mt-12 mb-16 text-center text-[14px] sm:text-[15px] text-[#A8A29E]">
              No roles match your filters.
            </div>
          ) : (
            <>
              <JobList jobs={visibleJobs} />

              {hasMore && (
                <LoadMoreButton
                  onClick={handleLoadMore}
                  showing={visibleCount}
                  total={jobs.length}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
