import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { InternalJob } from "./InternalJobs";

const STORAGE_KEY = "designerscolony_internal_jobs";

type FormState = {
  company: string;
  role: string;
  location: string;
  workMode: "Remote" | "Hybrid" | "Onsite";
  experienceRange: string;
  howToApply: string;
  shortNote: string;
};

const initialFormState: FormState = {
  company: "",
  role: "",
  location: "",
  workMode: "Remote",
  experienceRange: "",
  howToApply: "",
  shortNote: "",
};

export function ShareInternalRole() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!form.company || !form.role || !form.location || !form.howToApply) {
      setError("Please fill in all required fields.");
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
        sharedBy: "Community member",
        sharedDate: new Date().toLocaleDateString(),
        isVerified: false,
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([newJob, ...existing])
      );

      navigate("/internal-jobs");
    } catch {
      setError("Something went wrong while saving. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="pt-[56px] sm:pt-[80px]">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 pb-24">

          {/* Page header */}
          <header className="mb-10 max-w-[640px]">
            <h1 className="mb-2 text-[28px] font-semibold text-[#1C1917] sm:text-[32px]">
              Share an internal role
            </h1>
            <p className="text-[15px] leading-[1.6] text-[#78716C]">
              Share an open role from your company with fellow designers.
              Please avoid posting public job board links.
            </p>
          </header>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-[640px] space-y-6 rounded-2xl border border-[#E7E5E4] bg-white p-6"
          >
            {error && (
              <div className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[13px] text-[#B91C1C]">
                {error}
              </div>
            )}

            <Input
              label="Company name"
              required
              value={form.company}
              placeholder="Where is this role open?"
              onChange={(v) => handleChange("company", v)}
            />

            <Input
              label="Role title"
              required
              value={form.role}
              placeholder="e.g. Product Designer"
              onChange={(v) => handleChange("role", v)}
            />

            <Input
              label="Location"
              required
              value={form.location}
              placeholder="City, country or region"
              onChange={(v) => handleChange("location", v)}
            />

            {/* Work mode */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#1C1917]">
                Work mode<span className="text-[#DC2626]">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {(["Remote", "Hybrid", "Onsite"] as const).map((mode) => {
                  const active = form.workMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleChange("workMode", mode)}
                      className={`h-10 rounded-full px-6 text-[14px] font-medium
                        ${
                          active
                            ? "bg-[#1C1917] text-white"
                            : "border border-[#E7E5E4] text-[#78716C]"
                        }`}
                    >
                      {mode}
                    </button>
                  );
                })}
              </div>
            </div>

            <Input
              label="Experience range"
              value={form.experienceRange}
              placeholder="e.g. 2–4 years"
              onChange={(v) => handleChange("experienceRange", v)}
            />

            <Textarea
              label="Short note"
              value={form.shortNote}
              placeholder="Any helpful context for designers"
              minHeight={80}
              onChange={(v) => handleChange("shortNote", v)}
            />

            <Textarea
              label="How to apply"
              required
              value={form.howToApply}
              placeholder="Email, referral form, or private link"
              minHeight={120}
              onChange={(v) => handleChange("howToApply", v)}
            />

            {/* CTA block — MATCHES CREATE CHAI TALK */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-full bg-[#1C1917] text-[14px] font-semibold text-white hover:bg-[#292524] disabled:opacity-60"
              >
                {isSubmitting ? "Sharing…" : "Share role"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/internal-jobs")}
                className="mt-3 w-full text-[13px] text-[#78716C]"
              >
                Cancel
              </button>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Input({
  label,
  value,
  placeholder,
  required,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium text-[#1C1917]">
        {label}
        {required && <span className="text-[#DC2626]">*</span>}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-[#E7E5E4] px-3 text-[14px]"
        placeholder={placeholder}
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  placeholder,
  minHeight,
  required,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  minHeight: number;
  required?: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium text-[#1C1917]">
        {label}
        {required && <span className="text-[#DC2626]">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ minHeight }}
        className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2 text-[14px]"
        placeholder={placeholder}
      />
    </div>
  );
}
