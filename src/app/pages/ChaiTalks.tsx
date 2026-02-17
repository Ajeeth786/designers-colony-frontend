import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Plus } from "lucide-react";
import emptyIllustration from "../../assets/images/chai-talks-empty-rbg.png.png";

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
  created_at: string;
};

export default function ChaiTalks() {
  const navigate = useNavigate();
  const [talks, setTalks] = useState<ChaiTalk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChaiTalks = async () => {
      const { data, error } = await supabase
        .from("chai_talks")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        const formatted = data.map((talk: any) => ({
          id: talk.id,
          title: talk.title,
          type: talk.type,
          city: talk.city,
          date: talk.date,
          time: talk.time,
          about: talk.about,
          host: talk.host,
          locationOrJoinLink: talk.location_or_join_link,
          created_at: talk.created_at,
        }));

        setTalks(formatted);
      }

      setLoading(false);
    };

    fetchChaiTalks();
  }, []);

  const isEmpty = !loading && talks.length === 0;

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="pt-[56px] sm:pt-[80px]">
        <div className="mx-auto max-w-[1120px] px-6 md:px-10 pb-24">

          {/* ---------- Header ---------- */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

              <div>
                <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#1C1917]">
                  Chai Talks
                </h1>
                <p className="mt-2 text-[14px] sm:text-[15px] text-[#78716C]">
                  Small, local conversations by designers.
                  <br />
                  No stages. No pitches. Just designers helping designers.
                </p>
              </div>

              {/* Desktop CTA */}
              {!isEmpty && (
                <div className="hidden sm:block">
                  <button
                    onClick={() => navigate("/chai-talks/create")}
                    className="h-10 rounded-full bg-black px-5 text-[14px] font-medium text-white hover:opacity-90"
                  >
                    Create a Chai Talk
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ---------- Loading ---------- */}
          {loading && (
            <p className="text-center text-[14px] text-[#78716C]">
              Loading Chai Talks…
            </p>
          )}

          {/* ---------- Empty State ---------- */}
          {isEmpty && (
            <div className="mt-20 flex flex-col items-center text-center">
              <img
                src={emptyIllustration}
                alt="Chai Talks community"
                className="mb-6 w-[260px]"
              />

              <h3 className="mb-1 text-[16px] font-medium text-[#1C1917]">
                No Chai Talks yet
              </h3>

              <p className="max-w-[360px] text-[14px] text-[#78716C]">
                Chai Talks are informal meetups by designers.
                You can start one — even if it’s just a few people.
              </p>

              <button
                onClick={() => navigate("/chai-talks/create")}
                className="mt-5 h-10 rounded-full bg-black px-6 text-[14px] font-medium text-white hover:opacity-90"
              >
                Create a Chai Talk
              </button>

              <p className="mt-2 text-[12px] text-[#A8A29E]">
                Offline or online. No approval needed.
              </p>
            </div>
          )}

          {/* ---------- List ---------- */}
          {!loading && !isEmpty && (
            <div className="space-y-6">
              {talks.map((talk) => (
                <button
                  key={talk.id}
                  onClick={() => navigate(`/chai-talks/${talk.id}`)}
                  className="w-full text-left rounded-2xl border border-[#E7E5E4] bg-white p-6 hover:border-[#D6D3D1] transition"
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
                    <span>Hosted by {talk.host}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ---------- Floating Action Button (Mobile Only) ---------- */}
      {!isEmpty && (
        <button
          onClick={() => navigate("/chai-talks/create")}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg sm:hidden active:scale-95 transition"
        >
          <Plus className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
