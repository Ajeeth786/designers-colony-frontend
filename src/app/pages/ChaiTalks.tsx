import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import emptyStateImg from "../../assets/images/chai-talks-empty.png";

export type ChaiTalk = {
  id: string;
  title: string;
  type: "Offline" | "Online" | "Hybrid";
  city?: string;
  date: string;
  time: string;
  about: string;
  host: string;
  locationOrJoinLink: string;
  hostedBy: string;
  createdDate: string;
};

const STORAGE_KEY = "designerscolony_chai_talks";

export default function ChaiTalks() {
  const navigate = useNavigate();
  const [talks, setTalks] = useState<ChaiTalk[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setTalks(stored ? JSON.parse(stored) : []);
  }, []);

  /* ---------- EMPTY STATE ---------- */

  if (talks.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF9]">
        <main className="pt-[56px] sm:pt-[80px]">
          <div className="max-w-[1120px] mx-auto px-6 md:px-10 pb-24">

            {/* Page Header */}
            <header className="mb-10 max-w-[640px]">
              <h1 className="mb-2 flex items-center gap-2 text-[28px] font-semibold tracking-[-0.02em] text-[#1C1917] sm:text-[32px]">
                <span className="text-[24px]">☕</span>
                Chai Talks
              </h1>

              <p className="text-[15px] leading-[1.6] text-[#78716C]">
                Small, local conversations by designers.
                <br />
                No stages. No pitches. Just designers helping designers.
              </p>
            </header>

            {/* Empty State */}
            <section className="flex flex-col items-center text-center">
              <img
                src={emptyStateImg}
                alt="No chai talks yet"
                className="mb-6 w-[280px] max-w-full"
              />

              <h2 className="mb-2 text-[18px] font-semibold text-[#1C1917]">
                No Chai Talks yet
              </h2>

              <p className="mb-6 max-w-[420px] text-[14px] leading-[1.6] text-[#78716C]">
                Chai Talks are informal meetups by designers.
                <br />
                You can start one — even if it’s just a few people.
              </p>

              <button
                onClick={() => navigate("/chai-talks/create")}
                className="h-11 rounded-full bg-[#1C1917] px-6 text-[14px] font-semibold text-white hover:bg-[#292524]"
              >
                Host a Chai Talk
              </button>

              <p className="mt-3 text-[12px] text-[#A8A29E]">
                Offline or online. No approval needed.
              </p>
            </section>

          </div>
        </main>
      </div>
    );
  }

  /* ---------- LIST STATE ---------- */

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="pt-[56px] sm:pt-[80px]">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 pb-24">

          <header className="mb-8 flex items-center justify-between max-w-[720px]">
            <h1 className="text-[24px] font-semibold text-[#1C1917]">
              Chai Talks
            </h1>

            <button
              onClick={() => navigate("/chai-talks/create")}
              className="h-10 rounded-full bg-[#1C1917] px-5 text-[14px] font-medium text-white hover:bg-[#292524]"
            >
              Host
            </button>
          </header>

          <div className="max-w-[720px] space-y-4">
            {talks.map((talk) => (
              <ChaiTalkCard
                key={talk.id}
                talk={talk}
                onClick={() => navigate(`/chai-talks/${talk.id}`)}
              />
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

/* ---------- Card ---------- */

function ChaiTalkCard({
  talk,
  onClick,
}: {
  talk: ChaiTalk;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl border bg-white p-4 text-left hover:border-[#D6D3D1]"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-[#F5F5F4] px-3 py-1 text-[11px] font-medium">
          {talk.type}
        </span>

        {talk.city && (
          <span className="text-[12px] text-[#78716C]">
            {talk.city}
          </span>
        )}
      </div>

      <h3 className="mb-1 text-[16px] font-semibold text-[#1C1917]">
        {talk.title}
      </h3>

      <p className="mb-3 line-clamp-2 text-[13px] text-[#57534E]">
        {talk.about}
      </p>

      <div className="flex items-center justify-between text-[12px] text-[#78716C]">
        <span>
          {talk.date} · {talk.time}
        </span>
        <span>Hosted by {talk.hostedBy}</span>
      </div>
    </button>
  );
}
