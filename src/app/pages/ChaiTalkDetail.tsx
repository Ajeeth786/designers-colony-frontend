import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type ChaiTalk = {
  id: string;
  title: string;
  type: "Offline" | "Online" | "Hybrid";
  city?: string;
  date: string;
  time: string;
  about: string;
  host: string;
  locationOrJoinLink?: string;
  hostedBy: string;
};

const STORAGE_KEY = "designerscolony_chai_talks";

export default function ChaiTalkDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [talk, setTalk] = useState<ChaiTalk | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw || !id) {
      setIsLoaded(true);
      return;
    }

    const talks: ChaiTalk[] = JSON.parse(raw);
    const found = talks.find((t) => t.id === id);

    setTalk(found || null);
    setIsLoaded(true);
  }, [id]);

  /* ---------- Not found state (clean exit) ---------- */
  if (isLoaded && !talk) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center gap-4">
        <p className="text-[14px] text-[#78716C]">
          Chai Talk not found ☕
        </p>
        <button
          onClick={() => navigate("/chai-talks")}
          className="text-[13px] font-medium text-[#1C1917]"
        >
          ← Back to Chai Talks
        </button>
      </div>
    );
  }

  if (!talk) return null;

  /* ---------- Detail view ---------- */
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="pt-[56px] sm:pt-[80px]">
        <div className="mx-auto max-w-[720px] px-6 pb-24">

          {/* Back */}
          <button
            onClick={() => navigate("/chai-talks")}
            className="mb-6 text-[13px] text-[#78716C] hover:text-[#1C1917]"
          >
            ← Back to Chai Talks
          </button>

          {/* Title */}
          <h1 className="text-[28px] font-semibold text-[#1C1917] sm:text-[32px]">
            {talk.title}
          </h1>

          {/* Meta */}
          <div className="mt-2 flex items-center gap-2 text-[13px] text-[#78716C]">
            <span className="rounded-full border border-[#E7E5E4] px-2 py-0.5">
              {talk.type}
            </span>
            {talk.city && <span>· {talk.city}</span>}
          </div>

          <p className="mt-1 text-[14px] text-[#78716C]">
            {talk.date} · {talk.time}
          </p>

          {/* About */}
          <section className="mt-8">
            <h2 className="mb-2 text-[14px] font-medium text-[#1C1917]">
              About this Chai Talk
            </h2>
            <p className="text-[14px] leading-[1.6] text-[#44403C]">
              {talk.about}
            </p>
          </section>

          {/* Host */}
          <section className="mt-6">
            <h2 className="mb-1 text-[14px] font-medium text-[#1C1917]">
              Host
            </h2>
            <p className="text-[14px] text-[#44403C]">
              {talk.host}
            </p>
          </section>

          {/* Location / Join */}
          {talk.locationOrJoinLink && (
            <section className="mt-6">
              <h2 className="mb-1 text-[14px] font-medium text-[#1C1917]">
                Location / Join details
              </h2>
              <p className="text-[14px] text-[#44403C]">
                {talk.locationOrJoinLink}
              </p>
            </section>
          )}

          {/* Footer */}
          <div className="mt-10 border-t border-[#E7E5E4] pt-4 text-[13px] text-[#78716C]">
            Hosted by {talk.hostedBy}
          </div>

        </div>
      </main>
    </div>
  );
}
