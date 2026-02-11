import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.tsx';
import { InternalJob } from './InternalJobs';

const STORAGE_KEY = 'designerscolony_internal_jobs';

export function ShareInternalRole() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    workMode: 'Remote' as 'Remote' | 'Hybrid' | 'Onsite',
    experienceRange: '',
    howToApply: '',
    shortNote: '',
  });

  // Redirect if not logged in
  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.company.trim()) {
      newErrors.company = 'Please fill in the required details.';
    }
    if (!formData.role.trim()) {
      newErrors.role = 'Please fill in the required details.';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Please fill in the required details.';
    }
    if (!formData.howToApply.trim()) {
      newErrors.howToApply = 'Please fill in the required details.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create new job
    const newJob: InternalJob = {
      id: Date.now().toString(),
      company: formData.company.trim(),
      role: formData.role.trim(),
      location: formData.location.trim(),
      workMode: formData.workMode,
      experienceRange: formData.experienceRange.trim() || undefined,
      howToApply: formData.howToApply.trim(),
      shortNote: formData.shortNote.trim() || undefined,
      sharedBy: 'a designer', // TODO: Replace with actual user name
      sharedDate: getRelativeTime(new Date()),
      isVerified: true, // TODO: Replace with actual verification logic
    };

    // Save to localStorage
    const existingJobs = localStorage.getItem(STORAGE_KEY);
    const jobs = existingJobs ? JSON.parse(existingJobs) : [];
    jobs.unshift(newJob);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));

    // Show success message
    setShowSuccess(true);
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/community');
    }, 2000);
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'today';
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#F5F5F4] rounded-full flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1C1917]">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p className="text-[15px] text-[#78716C] leading-[1.6]">
            Thanks for sharing.<br />
            This will help a fellow designer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Mobile-first container: Full width with 24px padding on mobile, max-width on desktop */}
      <main className="w-full max-w-[680px] mx-auto px-6 sm:px-6 md:px-10 lg:px-10 pt-[84px] sm:pt-[84px] pb-24 sm:pb-24">
        
        {/* Header Section - Tight, not landing-page */}
        <div className="mb-5 sm:mb-6">
          <h1 className="text-[20px] sm:text-[24px] md:text-[36px] lg:text-[40px] font-semibold text-[#1C1917] leading-[1.3] tracking-[-0.02em] mb-[6px]">
            Share a role
          </h1>
          <p className="text-[13px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-[#78716C] leading-[1.4] sm:leading-[1.6]">
            This will be visible only to designers on Designers Colony.
          </p>
        </div>

        {/* Form - Mobile-first vertical stacking */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-[12px] font-medium text-[#1C1917] mb-[6px]">
              Company
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => {
                setFormData({ ...formData, company: e.target.value });
                if (errors.company) {
                  setErrors({ ...errors, company: '' });
                }
              }}
              placeholder="Your company name"
              className={`w-full h-[44px] px-3 bg-white border rounded-[10px] text-[14px] text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#1C1917] focus:ring-offset-0 transition-all ${
                errors.company ? 'border-[#DC2626]' : 'border-[#EAEAEA]'
              }`}
            />
            {errors.company && (
              <p className="mt-[6px] text-[11px] text-[#DC2626]">{errors.company}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-[12px] font-medium text-[#1C1917] mb-[6px]">
              Role
            </label>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={(e) => {
                setFormData({ ...formData, role: e.target.value });
                if (errors.role) {
                  setErrors({ ...errors, role: '' });
                }
              }}
              placeholder="Product Designer / UX Designer"
              className={`w-full h-[44px] px-3 bg-white border rounded-[10px] text-[14px] text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#1C1917] focus:ring-offset-0 transition-all ${
                errors.role ? 'border-[#DC2626]' : 'border-[#EAEAEA]'
              }`}
            />
            {errors.role && (
              <p className="mt-[6px] text-[11px] text-[#DC2626]">{errors.role}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-[12px] font-medium text-[#1C1917] mb-[6px]">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => {
                setFormData({ ...formData, location: e.target.value });
                if (errors.location) {
                  setErrors({ ...errors, location: '' });
                }
              }}
              placeholder="Chennai / Bangalore / Remote"
              className={`w-full h-[44px] px-3 bg-white border rounded-[10px] text-[14px] text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#1C1917] focus:ring-offset-0 transition-all ${
                errors.location ? 'border-[#DC2626]' : 'border-[#EAEAEA]'
              }`}
            />
            {errors.location && (
              <p className="mt-[6px] text-[11px] text-[#DC2626]">{errors.location}</p>
            )}
          </div>

          {/* Work Mode - Full-width segmented control */}
          <div>
            <label className="block text-[12px] font-medium text-[#1C1917] mb-[6px]">
              Work mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Remote', 'Hybrid', 'Onsite'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setFormData({ ...formData, workMode: mode })}
                  className={`h-[40px] rounded-[20px] text-[13px] font-medium transition-all ${
                    formData.workMode === mode
                      ? 'bg-[#1C1917] text-white'
                      : 'bg-white text-[#78716C] border border-[#EAEAEA] hover:border-[#D6D3D1]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Range */}
          <div>
            <label htmlFor="experienceRange" className="block text-[12px] font-medium text-[#1C1917] mb-[6px]">
              Experience range (optional)
            </label>
            <input
              type="text"
              id="experienceRange"
              value={formData.experienceRange}
              onChange={(e) => setFormData({ ...formData, experienceRange: e.target.value })}
              placeholder="2–4 years"
              className="w-full h-[44px] px-3 bg-white border border-[#EAEAEA] rounded-[10px] text-[14px] text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#1C1917] focus:ring-offset-0 transition-all"
            />
            <p className="mt-[6px] text-[11px] text-[#A8A29E]">Approximate is fine.</p>
          </div>

          {/* How to Apply - Auto-grow textarea */}
          <div>
            <label htmlFor="howToApply" className="block text-[12px] font-medium text-[#1C1917] mb-[6px]">
              How should candidates apply?
            </label>
            <textarea
              id="howToApply"
              value={formData.howToApply}
              onChange={(e) => {
                setFormData({ ...formData, howToApply: e.target.value });
                if (errors.howToApply) {
                  setErrors({ ...errors, howToApply: '' });
                }
              }}
              placeholder="DM me on LinkedIn&#10;or&#10;Share referral link&#10;or&#10;Email me at …"
              rows={4}
              className={`w-full min-h-[96px] px-3 py-3 bg-white border rounded-[10px] text-[14px] leading-[1.43] text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#1C1917] focus:ring-offset-0 transition-all resize-y ${
                errors.howToApply ? 'border-[#DC2626]' : 'border-[#EAEAEA]'
              }`}
            />
            {errors.howToApply ? (
              <p className="mt-[6px] text-[11px] text-[#DC2626]">{errors.howToApply}</p>
            ) : (
              <p className="mt-[6px] text-[11px] text-[#A8A29E]">This will be visible to designers only.</p>
            )}
          </div>

          {/* Short Note - Auto-grow textarea */}
          <div>
            <label htmlFor="shortNote" className="block text-[12px] font-medium text-[#1C1917] mb-[6px]">
              Anything candidates should know?
            </label>
            <textarea
              id="shortNote"
              value={formData.shortNote}
              onChange={(e) => setFormData({ ...formData, shortNote: e.target.value })}
              placeholder="Good if you're strong in UX fundamentals.&#10;Case study discussion heavy.&#10;Team is design-led."
              rows={4}
              className="w-full min-h-[96px] px-3 py-3 bg-white border border-[#EAEAEA] rounded-[10px] text-[14px] leading-[1.43] text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#1C1917] focus:ring-offset-0 transition-all resize-y"
            />
            <p className="mt-[6px] text-[11px] text-[#A8A29E]">Optional, but helpful.</p>
          </div>

          {/* Action Area - Mobile-first: Stacked buttons */}
          <div className="pt-6 sm:pt-4">
            <button
              type="submit"
              className="w-full h-[44px] bg-[#1C1917] text-white rounded-[22px] text-[14px] font-semibold transition-all duration-200 hover:bg-[#292524]"
            >
              Share role
            </button>
            <button
              type="button"
              onClick={() => navigate('/community')}
              className="w-full mt-3 text-[13px] text-[#78716C] font-medium transition-colors hover:text-[#1C1917]"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
