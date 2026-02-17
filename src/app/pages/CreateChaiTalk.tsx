import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

/* ---------- Types ---------- */

type TalkType = "Offline" | "Online" | "Hybrid";

type FormData = {
  title: string;
  type: TalkType;
  city: string;
  date: string;
  time: string;
  about: string;
  host: string;
  locationOrJoinLink: string;
};

export default function CreateChaiTalk() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    title: "",
    type: "Offline",
    city: "",
    date: "",
    time: "",
    about: "",
    host: "",
    locationOrJoinLink: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Required";
    if (!formData.date.trim()) newErrors.date = "Required";
    if (!formData.time.trim()) newErrors.time = "Required";
    if (!formData.about.trim()) newErrors.about = "Required";
    if (!formData.host.trim()) newErrors.host = "Required";
    if (!formData.locationOrJoinLink.trim())
      newErrors.locationOrJoinLink = "Required";

    if (
      (formData.type === "Offline" || formData.type === "Hybrid") &&
      !formData.city.trim()
    ) {
      newErrors.city = "City required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const { error } = await supabase.from("chai_talks").insert([
        {
          title: formData.title.trim(),
          type: formData.type,
          city:
            formData.type === "Offline" || formData.type === "Hybrid"
              ? formData.city.trim()
              : null,
          date: formData.date.trim(),
          time: formData.time.trim(),
          about: formData.about.trim(),
          host: formData.host.trim(), // optional if exists
          hosted_by: formData.host.trim(), // ✅ REQUIRED FIX
          location_or_join_link: formData.locationOrJoinLink.trim(),
        },
      ]);

      if (error) {
        console.error("Supabase Insert Error:", error);
        throw error;
      }

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/chai-talks");
      }, 1200);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong while creating the talk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- SUCCESS ---------- */

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F5F4]">
            ✓
          </div>
          <p className="text-[15px] text-[#78716C]">
            Your Chai Talk is live ☕
            <br />
            Redirecting…
          </p>
        </div>
      </div>
    );
  }

  /* ---------- FORM ---------- */

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="pt-[56px] sm:pt-[80px]">
        <div className="mx-auto max-w-[1120px] px-6 md:px-10 pb-24">
          <header className="mb-10 max-w-[640px]">
            <h1 className="mb-2 text-[28px] font-semibold text-[#1C1917] sm:text-[32px]">
              Host a Chai Talk
            </h1>
            <p className="text-[15px] leading-[1.6] text-[#78716C]">
              No approval needed. Just create and share.
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="max-w-[640px] rounded-2xl border border-[#E7E5E4] bg-white p-6 sm:p-8 space-y-6"
          >
            <Input
              label="What's the topic?"
              value={formData.title}
              onChange={(v) => setFormData({ ...formData, title: v })}
              error={errors.title}
            />

            <FormatSelector
              selected={formData.type}
              onChange={(type) => setFormData({ ...formData, type })}
            />

            {(formData.type === "Offline" ||
              formData.type === "Hybrid") && (
              <Input
                label="City"
                value={formData.city}
                onChange={(v) => setFormData({ ...formData, city: v })}
                error={errors.city}
              />
            )}

            <Input
              label="Date"
              value={formData.date}
              onChange={(v) => setFormData({ ...formData, date: v })}
              error={errors.date}
            />

            <Input
              label="Time"
              value={formData.time}
              onChange={(v) => setFormData({ ...formData, time: v })}
              error={errors.time}
            />

            <Textarea
              label="About this Chai Talk"
              value={formData.about}
              onChange={(v) => setFormData({ ...formData, about: v })}
              error={errors.about}
            />

            <Input
              label="Your name"
              value={formData.host}
              onChange={(v) => setFormData({ ...formData, host: v })}
              error={errors.host}
            />

            <Textarea
              label={
                formData.type === "Online"
                  ? "Join link"
                  : "Location / details"
              }
              value={formData.locationOrJoinLink}
              onChange={(v) =>
                setFormData({ ...formData, locationOrJoinLink: v })
              }
              error={errors.locationOrJoinLink}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-full bg-black py-3 text-sm font-medium text-white disabled:opacity-60"
            >
              {isSubmitting ? "Creating…" : "Create Chai Talk"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

/* ---------- Components ---------- */

function FormatSelector({
  selected,
  onChange,
}: {
  selected: TalkType;
  onChange: (type: TalkType) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1C1917]">
        Format
      </label>
      <div className="flex gap-3">
        {(["Offline", "Online", "Hybrid"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={`rounded-full px-4 py-2 text-sm ${
              selected === type
                ? "bg-black text-white"
                : "border border-[#E7E5E4] text-[#1C1917]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1C1917]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#E7E5E4] px-4 py-3 text-sm outline-none focus:border-black"
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1C1917]">
        {label}
      </label>
      <textarea
        value={value}
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#E7E5E4] px-4 py-3 text-sm outline-none focus:border-black"
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
