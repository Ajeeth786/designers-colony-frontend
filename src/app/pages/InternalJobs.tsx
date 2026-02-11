import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth.tsx';
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
    // TODO: Implement report functionality
    console.log('Report job:', jobId);
    alert('Thanks for flagging this. We will review it.');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Main Content Container - Matches Jobs page */}
      <main className="sm:max-w-[1120px] sm:mx-auto px-6 sm:px-6 md:px-10 lg:px-10 xl:px-20 pt-[72px] sm:pt-[80px]">
        
        {/* Page Title Section - Matches Jobs page */}
        <div className="mt-4 sm:mt-8 mb-6 sm:mb-8">
          {/* Mobile: Compact title */}
          <h1 className="text-[22px] sm:text-[32px] font-semibold text-[#1C1917] leading-[28px] sm:leading-[1.2] tracking-[-0.03em] mb-1.5 sm:mb-3">
            Roles shared by the community
          </h1>
          
          {/* Subtitle with count */}
          <div className="flex items-center gap-2 text-[13px] sm:text-[14px] font-normal text-[#A8A29E] leading-[18px] sm:leading-[1.5]">
            <span>{jobs.length} {jobs.length === 1 ? 'role' : 'roles'}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Shared by designers for fellow designers</span>
          </div>
        </div>

        {/* Jobs List */}
        {jobs.length === 0 ? (
          // Empty State
          <div className="text-center py-20 sm:py-24">
            <div className="w-16 h-16 mx-auto mb-6 bg-[#F5F5F4] rounded-full flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#A8A29E]">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1C1917] mb-2 leading-[1.3]">
              No community roles yet
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#78716C] mb-8 max-w-[420px] mx-auto leading-[1.6]">
              If your team is hiring, you can help a fellow designer by sharing a role.
            </p>
            {isLoggedIn ? (
              <Link
                to="/community/share"
                className="inline-flex items-center gap-2 h-11 px-6 bg-[#1C1917] text-white rounded-lg text-[14px] font-medium transition-all duration-200 hover:bg-[#292524]"
              >
                Share a role
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 h-11 px-6 bg-[#1C1917] text-white rounded-lg text-[14px] font-medium transition-all duration-200 hover:bg-[#292524]"
              >
                Sign in to share a role
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Job Listings - Clean list style matching Jobs page */}
            <InternalJobList jobs={jobs} onReport={handleReport} />
            
            {/* Bottom CTA if logged in */}
            {isLoggedIn && (
              <div className="mb-16 sm:mb-20 text-center">
                <Link
                  to="/community/share"
                  className="inline-flex items-center gap-2 h-11 px-6 border border-[#E7E5E4] bg-white text-[#1C1917] rounded-lg text-[14px] font-medium transition-all duration-200 hover:border-[#D6D3D1] hover:bg-[#FAFAF9]"
                >
                  Share a role
                </Link>
              </div>
            )}
          </>
        )}

        {/* Mobile FAB for Share - Only when jobs exist */}
        {isLoggedIn && jobs.length > 0 && (
          <Link
            to="/community/share"
            className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#1C1917] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:bg-[#292524] z-40"
            aria-label="Share a role"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </Link>
        )}
      </main>
    </div>
  );
}