import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export type ChaiTalk = {
  id: string;
  title: string;
  type: "Offline" | "Online" | "Hybrid";
  city?: string;
  date: string;
  time: string;
  about: string;
  hostedBy: string;
};

const STORAGE_KEY = "designerscolony_chai_talks";
import emptyIllustration from "../../assets/images/chai-talks-empty-rbg.png.png";

export default function ChaiTalks() {
  const navigate = useNavigate();
  const [talks, setTalks] = useState<ChaiTalk[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setTalks(stored ? JSON.parse(stored) : []);
  }, []);

  const isEmpty = talks.length === 0;

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="pt-[56px] sm:pt-[80px]">
        <div className="mx-auto max-w-[1120px] px-6 md:px-10 pb-24">

          {/* ---------- Header ---------- */}
          <div className="mb-10 flex items-start justify-between">
            <div>
              <h1 className="text-[28px] sm:text-[32px] font-semibold text-[#1C1917]">
                Chai Talks
              </h1>
              <p className="mt-1 text-[14px] text-[#78716C]">
                Small, local conversations by designers.
                <br />
                No stages. No pitches. Just designers helping designers.
              </p>
            </div>

            {/* ✅ Show ONLY when talks exist */}
            {!isEmpty && (
              <button
                onClick={() => navigate("/chai-talks/create")}
                className="h-10 rounded-full bg-[#1C1917] px-5 text-[14px] font-medium text-white hover:bg-[#292524]"
              >
                Create a Chai Talk
              </button>
            )}
          </div>

          {/* ---------- Empty State ---------- */}
          {isEmpty && (
            <div className="mt-20 flex flex-col items-center text-center">
              <img
                src={emptyIllustration}
                alt="Chai Talks community"
                className="mb-6 w-[260px] max-w-full"
              />

              <h3 className="mb-1 text-[16px] font-medium text-[#1C1917]">
                No Chai Talks yet
              </h3>

              <p className="max-w-[360px] text-[14px] text-[#78716C]">
                Chai Talks are informal meetups by designers.
                You can start one — even if it’s just a few people.
              </p>

              {/* ✅ ONLY CTA in empty state */}
              <button
                onClick={() => navigate("/chai-talks/create")}
                className="mt-5 h-10 rounded-full bg-[#1C1917] px-6 text-[14px] font-medium text-white hover:bg-[#292524]"
              >
                Create a Chai Talk
              </button>

              <p className="mt-2 text-[12px] text-[#A8A29E]">
                Offline or online. No approval needed.
              </p>
            </div>
          )}

          {/* ---------- List ---------- */}
          {!isEmpty && (
            <div className="space-y-6">
              {talks.map((talk) => (
                <button
                  key={talk.id}
                  onClick={() => navigate(`/chai-talks/${talk.id}`)}
                  className="w-full text-left rounded-2xl border border-[#E7E5E4] bg-white p-6 transition hover:border-[#D6D3D1]"
                >
                  <div className="mb-2 flex items-center gap-2 text-[12px] text-[#78716C]">
                    <span className="rounded-full border border-[#E7E5E4] px-2 py-0.5">
                      {talk.type}
                    </span>
                    {talk.city && <span>{talk.city}</span>}
                  </div>

                  <h3 className="text-[18px] font-semibold text-[#1C1917]">
                    {talk.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-[14px] text-[#44403C]">
                    {talk.about}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-[13px] text-[#78716C]">
                    <span>
                      {talk.date} · {talk.time}
                    </span>
                    <span>Hosted by {talk.hostedBy}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
