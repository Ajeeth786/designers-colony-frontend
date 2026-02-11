import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { TrackerTable } from '../components/TrackerTable';
import { TrackerCard } from '../components/TrackerCard';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { LoginGate } from '../components/LoginGate';
import { useAuth } from '../hooks/useAuth.tsx';

export interface Application {
  id: string;
  company: string;
  role: string;
  appliedOn: string;
  currentStage: string;
  interviewNotes: string;
  outcome: string;
  whatILearned: string;
}

const STORAGE_KEY_SIGNED = 'designerscolony_applications';
const STORAGE_KEY_TEMP = 'designerscolony_applications_temp';
const FREE_ROW_LIMIT = 3;

export function Tracker() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>(() => {
    // Load from appropriate storage based on auth state
    const storageKey = isLoggedIn ? STORAGE_KEY_SIGNED : STORAGE_KEY_TEMP;
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  });

  // Migrate temp data to signed storage on login
  useEffect(() => {
    if (isLoggedIn) {
      const tempData = localStorage.getItem(STORAGE_KEY_TEMP);
      if (tempData) {
        const tempApps = JSON.parse(tempData);
        // Merge temp data with any existing signed data
        const signedData = localStorage.getItem(STORAGE_KEY_SIGNED);
        const signedApps = signedData ? JSON.parse(signedData) : [];
        const merged = [...signedApps, ...tempApps];
        setApplications(merged);
        localStorage.setItem(STORAGE_KEY_SIGNED, JSON.stringify(merged));
        // Clear temp storage
        localStorage.removeItem(STORAGE_KEY_TEMP);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const storageKey = isLoggedIn ? STORAGE_KEY_SIGNED : STORAGE_KEY_TEMP;
    localStorage.setItem(storageKey, JSON.stringify(applications));
  }, [applications, isLoggedIn]);

  const handleAddRow = () => {
    // Check if user has hit the free limit
    if (!isLoggedIn && applications.length >= FREE_ROW_LIMIT) {
      return; // Don't add row - gate is shown instead
    }

    const newApplication: Application = {
      id: Date.now().toString(),
      company: '',
      role: '',
      appliedOn: '',
      currentStage: 'Applied',
      interviewNotes: '',
      outcome: 'Waiting',
      whatILearned: '',
    };
    setApplications([...applications, newApplication]);
  };

  const handleUpdateApplication = (id: string, field: keyof Application, value: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const hasHitFreeLimit = !isLoggedIn && applications.length >= FREE_ROW_LIMIT;

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="sm:max-w-[1120px] sm:mx-auto px-6 sm:px-6 md:px-10 lg:px-10 xl:px-20 pt-[72px] sm:pt-[80px]">
        {/* Page Title Section */}
        <div className="mt-4 sm:mt-8 mb-6 sm:mb-8">
          <h1 className="text-[22px] sm:text-[32px] font-semibold text-[#1C1917] leading-[28px] sm:leading-[1.2] tracking-[-0.03em] mb-1.5 sm:mb-3">
            My Job Tracker
          </h1>
          <p className="text-[13px] sm:text-[14px] font-normal text-[#A8A29E] leading-[18px] sm:leading-[1.5]">
            Track your applications, interview rounds, and learnings — for yourself.
          </p>
        </div>

        {/* Desktop: Table View */}
        <div className="hidden sm:block">
          <TrackerTable
            applications={applications}
            onUpdate={handleUpdateApplication}
            onDelete={handleDeleteApplication}
            onAddRow={handleAddRow}
            isReadOnly={hasHitFreeLimit}
            showLoginGate={hasHitFreeLimit}
          />
        </div>

        {/* Mobile: Card View */}
        <div className="sm:hidden pb-20">
          {/* Mobile Not Available Message */}
          <div className="bg-white border border-[#F1F1F1] rounded-[12px] p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-[#FAFAF9] rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#78716C]">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h3 className="text-[16px] font-semibold text-[#1C1917] mb-2">
              Tracker is web-only for now
            </h3>
            <p className="text-[13px] leading-[18px] text-[#78716C] mb-4 max-w-[280px] mx-auto">
              We're designing a mobile experience that feels right — not just shrinking the table. It'll be worth the wait.
            </p>
            <p className="text-[12px] text-[#A8A29E] mb-5">
              Open this page on desktop to start tracking.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full h-11 bg-[#1C1917] text-white rounded-[8px] text-[14px] font-medium transition-all duration-200 hover:bg-[#292524] flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Jobs
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}