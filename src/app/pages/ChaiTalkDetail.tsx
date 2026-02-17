import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";

type ChaiTalkForm = {
  title: string;
  type: "Offline" | "Online" | "Hybrid";
  city: string;
  date: string;
  time: string;
  about: string;
  hosted_by: string;
  location_or_join_link: string;
};

export default function CreateChaiTalk() {
  const navigate = useNavigate();

  const [form, setForm] = useState<ChaiTalkForm>({
    title: "",
    type: "Offline",
    city: "",
    date: "",
    time: "",
    about: "",
    hosted_by: "",
    location_or_join_link: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("chai_talks").insert([
      {
        title: form.title,
        type: form.type,
        city: form.city || null,
        date: form.date,
        time: form.time,
        about: form.about,
        hosted_by: form.hosted_by,
        location_or_join_link: form.location_or_join_link || null,
      },
    ]);

    if (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    navigate("/chai-talks");
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="pt-[56px] sm:pt-[80px]">
        <div className="mx-auto max-w-[640px] px-6 pb-24">

          {/* Header */}
          <button
            onClick={() => navigate("/chai-talks")}
            className="mb-6 text-[13px] text-[#78716C]"
          >
            ← Back to Chai Talks
          </button>

          <h1 className="text-[28px] font-semibold text-[#1C1917]">
            Create a Chai Talk
          </h1>

          <p className="mt-1 text-[14px] text-[#78716C]">
            Small, honest conversations over chai ☕
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">

            <input
              name="title"
              placeholder="Chai Talk title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-[#E7E5E4] px-3 py-2 text-[14px]"
            />

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-md border border-[#E7E5E4] px-3 py-2 text-[14px]"
            >
              <option>Offline</option>
              <option>Online</option>
              <option>Hybrid</option>
            </select>

            <input
              name="city"
              placeholder="City (optional)"
              value={form.city}
              onChange={handleChange}
              className="w-full rounded-md border border-[#E7E5E4] px-3 py-2 text-[14px]"
            />

            <div className="flex gap-4">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-[#E7E5E4] px-3 py-2 text-[14px]"
              />
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-[#E7E5E4] px-3 py-2 text-[14px]"
              />
            </div>

            <textarea
              name="about"
              placeholder="What is this Chai Talk about?"
              value={form.about}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-md border border-[#E7E5E4] px-3 py-2 text-[14px]"
            />

            <input
              name="hosted_by"
              placeholder="Hosted by"
              value={form.hosted_by}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-[#E7E5E4] px-3 py-2 text-[14px]"
            />

            <input
              name="location_or_join_link"
              placeholder="Location or join link (optional)"
              value={form.location_or_join_link}
              onChange={handleChange}
              className="w-full rounded-md border border-[#E7E5E4] px-3 py-2 text-[14px]"
            />

            {error && (
              <p className="text-[13px] text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#1C1917] px-6 py-2 text-[14px] font-medium text-white disabled:opacity-60"
            >
              {loading ? "Creating…" : "Create Chai Talk"}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}
