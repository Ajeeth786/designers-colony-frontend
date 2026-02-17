import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!form.company || !form.role || !form.location || !form.howToApply) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const { error } = await supabase.from("internal_roles").insert([
        {
          company: form.company.trim(),
          role: form.role.trim(),
          location: form.location.trim(),
          work_mode: form.workMode,
          experience_range: form.experienceRange.trim() || null,
          how_to_apply: form.howToApply.trim(),
          short_note: form.shortNote.trim() || null,
          shared_by: "Community member",
          is_verified: false,
        },
      ]);

      if (error) throw error;

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/community", { replace: true });
      }, 1200);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while sharing. Please try again.");
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

          {/* Header aligned exactly like Chai Talks */}
          <header className="mb-10 max-w-[640px]">
            <h1 className="mb-2 text-[28px] font-semibold text-[#1C1917] sm:text-[32px]">
              Share an internal role
            </h1>
            <p className="text-[15px] leading-[1.6] text-[#78716C]">
              Share an open role from your company with fellow designers.
            </p>
          </header>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="max-w-[640px] space-y-6 rounded-2xl border border-[#E7E5E4] bg-white p-8"
          >
            {error && (
              <div className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">
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

            {/* Work mode */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#1C1917]">
                Work mode<span className="text-[#DC2626]">*</span>
              </label>
              <div className="flex gap-3">
                {(["Remote", "Hybrid", "Onsite"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleChange("workMode", mode)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                      form.workMode === mode
                        ? "bg-black text-white"
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
              className="h-11 w-full rounded-full bg-black text-white font-medium transition hover:opacity-90 disabled:opacity-60"
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

type InputProps = {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

function Input({ label, value, placeholder, required, onChange }: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1C1917]">
        {label}
        {required && <span className="text-[#DC2626]">*</span>}
      </label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#E7E5E4] px-4 py-3 text-sm outline-none focus:border-black"
      />
    </div>
  );
}

type TextareaProps = {
  label: string;
  value: string;
  placeholder?: string;
  minHeight: number;
  required?: boolean;
  onChange: (value: string) => void;
};

function Textarea({
  label,
  value,
  placeholder,
  minHeight,
  required,
  onChange,
}: TextareaProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1C1917]">
        {label}
        {required && <span className="text-[#DC2626]">*</span>}
      </label>
      <textarea
        value={value}
        placeholder={placeholder}
        style={{ minHeight }}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#E7E5E4] px-4 py-3 text-sm outline-none focus:border-black"
      />
    </div>
  );
}
