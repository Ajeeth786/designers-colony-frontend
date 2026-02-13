import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { InternalJob } from "./InternalJobs";

const STORAGE_KEY = "designerscolony_internal_jobs";

/* ---------- Types ---------- */

type WorkMode = "Remote" | "Hybrid" | "Onsite";

type FormState = {
  company: string;
  role: string;
  location: string;
  workMode: WorkMode;
  experienceRange: string;
  howToApply: string;
  shortNote: string;
};

type InputProps = {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

type TextareaProps = {
  label: string;
  value: string;
  placeholder?: string;
  minHeight: number;
  required?: boolean;
  onChange: (value: string) => void;
};

/* ---------- Initial state ---------- */

const initialFormState: FormState = {
  company: "",
  role: "",
  location: "",
  workMode: "Remote",
  experienceRange: "",
  howToApply: "",
  shortNote: "",
};

/* ---------- Page ---------- */

export function ShareInternalRole() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
        sharedDate: "Today",
        isVerified: false,
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([newJob, ...existing])
      );

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/community", { replace: true });
      }, 1200);
    } catch {
      setError("Something went wrong while saving. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- Success ---------- */

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F5F4]">
            ✓
          </div>
          <p className="text-[15px] text-[#78716C]">
            Role shared successfully 🎉
            <br />
            Redirecting…
          </p>
        </div>
      </div>
    );
  }

  /* ---------- Form ---------- */

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="pt-[56px] sm:pt-[80px]">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 pb-24">

          <header className="mb-10 max-w-[640px]">
            <h1 className="mb-2 text-[28px] font-semibold text-[#1C1917] sm:text-[32px]">
              Share an internal role
            </h1>
            <p className="text-[15px] leading-[1.6] text-[#78716C]">
              Share an open role from your company with fellow designers.
            </p>
          </header>

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
              onChange={(v) => handleChange("company", v)}
            />

            <Input
              label="Role title"
              required
              value={form.role}
              onChange={(v) => handleChange("role", v)}
            />

            <Input
              label="Location"
              required
              value={form.location}
              onChange={(v) => handleChange("location", v)}
            />

            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#1C1917]">
                Work mode<span className="text-[#DC2626]">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {(["Remote", "Hybrid", "Onsite"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleChange("workMode", mode)}
                    className={`h-10 rounded-full px-6 text-[14px] font-medium ${
                      form.workMode === mode
                        ? "bg-[#1C1917] text-white"
                        : "border border-[#E7E5E4] text-[#78716C]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Experience range"
              value={form.experienceRange}
              onChange={(v) => handleChange("experienceRange", v)}
            />

            <Textarea
              label="Short note"
              value={form.shortNote}
              minHeight={80}
              onChange={(v) => handleChange("shortNote", v)}
            />

            <Textarea
              label="How to apply"
              required
              value={form.howToApply}
              minHeight={120}
              onChange={(v) => handleChange("howToApply", v)}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-full bg-[#1C1917] text-white disabled:opacity-60"
            >
              {isSubmitting ? "Sharing…" : "Share role"}
            </button>
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
}: InputProps) {
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
}: TextareaProps) {
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
