export type ChaiTalkDetailUIProps = {
  title: string;
  description: string;
  city?: string;
  mode: "Online" | "Offline" | "Hybrid";
  date: string;
  hostName: string;
  locationOrJoin: string;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function ChaiTalkDetailUI({
  title,
  description,
  city,
  mode,
  date,
  hostName,
  locationOrJoin,
  onBack,
  onEdit,
  onDelete,
}: ChaiTalkDetailUIProps) {
  return (
    <div className="w-full bg-[#FAFAF9] min-h-screen">
      <main className="mx-auto max-w-[1120px] px-6 pt-[72px] pb-20 sm:px-10 sm:pt-[80px] xl:px-20">
        <div className="max-w-[640px]">

          {/* Top actions */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={onBack}
              className="text-[13px] font-medium text-[#78716C] hover:text-[#1C1917]"
            >
              ← Back to Chai Talks
            </button>

            <div className="flex items-center gap-4 text-[13px] font-medium">
              <button
                onClick={onEdit}
                className="text-[#1C1917] hover:underline"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <h1 className="mb-3 text-[24px] font-semibold leading-[30px] tracking-[-0.03em] text-[#1C1917] sm:text-[28px] sm:leading-[1.2]">
              {title}
            </h1>

            {/* Meta row */}
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#78716C] sm:text-[14px]">
              <span>
                {mode === "Offline" && "☕ Offline"}
                {mode === "Online" && "💻 Online"}
                {mode === "Hybrid" && "🔁 Hybrid"}
              </span>

              {city && (
                <>
                  <span className="text-[#A8A29E]">·</span>
                  <span>{city}</span>
                </>
              )}
            </div>

            <div className="text-[13px] text-[#A8A29E] sm:text-[14px]">
              {date}
            </div>
          </div>

          {/* About */}
          <section className="mb-8 sm:mb-10">
            <h3 className="mb-2 text-[14px] font-semibold text-[#1C1917] sm:text-[15px]">
              About this Chai Talk
            </h3>
            <p className="whitespace-pre-line text-[14px] leading-[1.6] text-[#57534E] sm:text-[15px]">
              {description}
            </p>
          </section>

          {/* Host */}
          <section className="mb-8 sm:mb-10">
            <h3 className="mb-2 text-[14px] font-semibold text-[#1C1917] sm:text-[15px]">
              Host
            </h3>
            <p className="text-[14px] text-[#57534E] sm:text-[15px]">
              {hostName}
            </p>
          </section>

          {/* Location / Join */}
          <section className="mb-10 sm:mb-12">
            <h3 className="mb-2 text-[14px] font-semibold text-[#1C1917] sm:text-[15px]">
              {mode === "Online" ? "Join" : "Location"}
            </h3>
            <p className="break-words text-[14px] text-[#57534E] sm:text-[15px]">
              {locationOrJoin}
            </p>
          </section>

          {/* CTA (visual only) */}
          {mode === "Online" && (
            <div className="mb-12">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1C1917] px-6 text-[14px] font-medium text-white hover:bg-[#292524]"
              >
                Join online
              </button>
            </div>
          )}

          {/* Footer meta */}
          <div className="border-t border-[#E7E5E4] pt-6 text-[12px] text-[#A8A29E] sm:text-[13px]">
            Hosted by {hostName}
          </div>
        </div>
      </main>
    </div>
  );
}
