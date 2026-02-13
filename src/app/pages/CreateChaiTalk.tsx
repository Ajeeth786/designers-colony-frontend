import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { ChaiTalk } from "./ChaiTalks";

const STORAGE_KEY = "designerscolony_chai_talks";

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

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
};

type TextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

/* ---------- Page ---------- */

export default function CreateChaiTalk() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newTalk: ChaiTalk = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      type: formData.type,
      city: formData.city.trim() || undefined,
      date: formData.date.trim(),
      time: formData.time.trim(),
      about: formData.about.trim(),
      host: formData.host.trim(),
      locationOrJoinLink: formData.locationOrJoinLink.trim(),
      hostedBy: formData.host.trim(),
      createdDate: "Today",
    };

    const stored = localStorage.getItem(STORAGE_KEY);
    const talks: ChaiTalk[] = stored ? JSON.parse(stored) : [];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([newTalk, ...talks])
    );

    setShowSuccess(true);

    setTimeout(() => {
      navigate("/chai-talks", { replace: true });
    }, 1200);
  };

  /* ---------- SUCCESS STATE ---------- */

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
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 pb-24">

          <header className="mb-10 max-w-[640px]">
            <h1 className="mb-2 text-[28px] font-semibold text-[#1C1917] sm:text-[32px]">
              Host a Chai Talk
            </h1>
            <p className="text-[15px] leading-[1.6] text-[#78716C]">
              No approval needed. Just create and share.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="max-w-[640px] space-y-6">
            <Input
              label="What's the topic?"
              value={formData.title}
              onChange={(v) => setFormData({ ...formData, title: v })}
              error={errors.title}
              placeholder="UX Portfolio Review"
            />

            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#1C1917]">
                Format
              </label>
              <div className="flex flex-wrap gap-3">
                {(["Offline", "Online", "Hybrid"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, type })}
                    className={`h-10 rounded-full px-6 text-[14px] font-medium
                      ${
                        formData.type === type
                          ? "bg-[#1C1917] text-white"
                          : "border border-[#E7E5E4] text-[#78716C]"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {(formData.type === "Offline" || formData.type === "Hybrid") && (
              <Input
                label="City"
                value={formData.city}
                onChange={(v) => setFormData({ ...formData, city: v })}
                error={errors.city}
              />
            )}

            <Input label="Date" value={formData.date} onChange={(v) => setFormData({ ...formData, date: v })} error={errors.date} />
            <Input label="Time" value={formData.time} onChange={(v) => setFormData({ ...formData, time: v })} error={errors.time} />

            <Textarea label="About this Chai Talk" value={formData.about} onChange={(v) => setFormData({ ...formData, about: v })} error={errors.about} />

            <Input label="Your name" value={formData.host} onChange={(v) => setFormData({ ...formData, host: v })} error={errors.host} />

            <Textarea
              label={formData.type === "Online" ? "Join link" : "Location / details"}
              value={formData.locationOrJoinLink}
              onChange={(v) =>
                setFormData({ ...formData, locationOrJoinLink: v })
              }
              error={errors.locationOrJoinLink}
            />

            <button type="submit" className="h-11 w-full rounded-full bg-[#1C1917] text-white">
              Create Chai Talk
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Input({ label, value, onChange, placeholder, error }: InputProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium">{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border px-3"
      />
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function Textarea({ label, value, onChange, error }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium">{label}</label>
      <textarea
        value={value}
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border px-3 py-2"
      />
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
}
