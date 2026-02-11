import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { InternalJobList } from '../components/InternalJobList';

export interface InternalJob {
  id: string;
  company: string;
  role: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'Onsite';
  experienceRange?: string;
  howToApply: string;
  shortNote?: string;
  sharedBy: string;
  sharedDate: string;
  isVerified: boolean;
}

const STORAGE_KEY = 'designerscolony_internal_jobs';

export function InternalJobs() {
  const { isLoggedIn } = useAuth();

  const [jobs] = useState<InternalJob[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const handleReport = (jobId: string) => {
    console.log('Report job:', jobId);
    alert('Thanks for flagging this. We will review it.');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="sm:max-w-[1120px] sm:mx-auto px-6 sm:px-6 md:px-10 lg:px-10 xl:px-20 pt-[72px] sm:pt-[80px]">
        <div className="mt-4 sm:mt-8 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-[22px] sm:text-[32px] font-semibold text-[#1C1917] mb-2">
              Roles shared by the community
            </h1>
            <p className="text-[14px] text-[#A8A29E]">
              {jobs.length} {jobs.length === 1 ? 'role' : 'roles'} · Shared by designers
            </p>
          </div>

          {jobs.length > 0 && isLoggedIn && (
            <Link
              to="/community/share"
              className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-[#1C1917] text-white text-[14px] whitespace-nowrap"
            >
              Share a role
            </Link>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-[18px] font-semibold mb-2">
              No community roles yet
            </h3>
            <p className="text-[14px] text-[#78716C]">
              Help fellow designers by sharing a role from your company.
            </p>
          </div>
        ) : (
          <InternalJobList jobs={jobs} onReport={handleReport} />
        )}
      </main>
    </div>
  );
}
