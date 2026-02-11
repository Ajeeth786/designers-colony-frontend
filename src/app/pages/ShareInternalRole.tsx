import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { InternalJob } from './InternalJobs';

const STORAGE_KEY = 'designerscolony_internal_jobs';

type FormState = {
  company: string;
  role: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'Onsite';
  experienceRange: string;
  howToApply: string;
  shortNote: string;
};

const initialFormState: FormState = {
  company: '',
  role: '',
  location: '',
  workMode: 'Remote',
  experienceRange: '',
  howToApply: '',
  shortNote: '',
};

export function ShareInternalRole() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    field: keyof FormState,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!form.company || !form.role || !form.location || !form.howToApply) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);

      const raw = localStorage.getItem(STORAGE_KEY);
      const existing: InternalJob[] = raw ? JSON.parse(raw) : [];

      const newJob: InternalJob = {
        id: crypto.randomUUID(),
        company: form.company.trim(),
        role: form.role.trim(),
        location: form.location.trim(),
        workMode: form.workMode,
        experienceRange: form.experienceRange.trim() || undefined,
        howToApply: form.howToApply.trim(),
        shortNote: form.shortNote.trim() || undefined,
        sharedBy: 'Community member',
        sharedDate: new Date().toLocaleDateString(),
        isVerified: false,
      };

      const updated = [newJob, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      navigate('/internal-jobs');
    } catch (err) {
      console.error(err);
      setError('Something went wrong while saving. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="sm:max-w-[720px] sm:mx-auto px-6 sm:px-6 md:px-10 lg:px-10 xl:px-0 pt-[72px] sm:pt-[80px] pb-16">
        <header className="mt-4 sm:mt-8 mb-6 sm:mb-8">
          <h1 className="text-[22px] sm:text-[28px] font-semibold text-[#1C1917] mb-2">
            Share an internal role
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#78716C] max-w-[520px]">
            Share an open role from your company with fellow designers. Please
            avoid posting public job board links – this space is for internal or
            lesser-known opportunities.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#E7E5E4] bg-white p-5 sm:p-6 space-y-5"
        >
          {error && (
            <div className="text-[13px] text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-[#1C1917]">
              Company name<span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full h-10 rounded-lg border border-[#E7E5E4] bg-white px-3 text-[13px] outline-none focus:ring-2 focus:ring-[#1C1917] focus:border-[#1C1917]"
              placeholder="Where is this role open?"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-[#1C1917]">
              Role title<span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full h-10 rounded-lg border border-[#E7E5E4] bg-white px-3 text-[13px] outline-none focus:ring-2 focus:ring-[#1C1917] focus:border-[#1C1917]"
              placeholder="e.g. Product Designer, Design Manager"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-[#1C1917]">
              Location<span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full h-10 rounded-lg border border-[#E7E5E4] bg-white px-3 text-[13px] outline-none focus:ring-2 focus:ring-[#1C1917] focus:border-[#1C1917]"
              placeholder="City, country or region"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-[#1C1917]">
              Work mode<span className="text-[#DC2626]">*</span>
            </label>
            <div className="flex gap-2">
              {(['Remote', 'Hybrid', 'Onsite'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleChange('workMode', mode)}
                  className={`flex-1 h-9 rounded-lg border text-[12px] sm:text-[13px] ${
                    form.workMode === mode
                      ? 'border-[#1C1917] bg-[#1C1917] text-white'
                      : 'border-[#E7E5E4] bg-white text-[#44403C]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-[#1C1917]">
              Experience range
            </label>
            <input
              type="text"
              value={form.experienceRange}
              onChange={(e) => handleChange('experienceRange', e.target.value)}
              className="w-full h-10 rounded-lg border border-[#E7E5E4] bg-white px-3 text-[13px] outline-none focus:ring-2 focus:ring-[#1C1917] focus:border-[#1C1917]"
              placeholder="e.g. 2–4 years, 6–10 years, Any level"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-[#1C1917]">
              Short note
            </label>
            <textarea
              value={form.shortNote}
              onChange={(e) => handleChange('shortNote', e.target.value)}
              className="w-full min-h-[80px] rounded-lg border border-[#E7E5E4] bg-white px-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-[#1C1917] focus:border-[#1C1917] resize-y"
              placeholder="Add any helpful context you’d like to share with the community."
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-[#1C1917]">
              How to apply<span className="text-[#DC2626]">*</span>
            </label>
            <textarea
              value={form.howToApply}
              onChange={(e) => handleChange('howToApply', e.target.value)}
              className="w-full min-h-[120px] rounded-lg border border-[#E7E5E4] bg-white px-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-[#1C1917] focus:border-[#1C1917] resize-y"
              placeholder="Share clear steps on how to apply. This can include an internal referral form, email, or a private link."
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] sm:text-[12px] text-[#A8A29E] max-w-[360px]">
              By sharing, you confirm that this is a genuine role and that
              you’re comfortable sharing it with the Designers Colony community.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center h-10 px-5 rounded-lg bg-[#1C1917] text-white text-[13px] sm:text-[14px] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sharing…' : 'Share role'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

