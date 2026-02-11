export function PageTitle() {
  return (
    <div className="mb-5 sm:mb-8">
      {/* Mobile: Compact title */}
      <h1 className="text-[22px] sm:text-[32px] font-semibold text-[#1C1917] leading-[28px] sm:leading-[1.2] tracking-[-0.03em] mb-1.5 sm:mb-3">
        Today's Jobs
      </h1>
      
      {/* Mobile: Single stats line, Desktop: Description + stats */}
      <div className="sm:hidden">
        <p className="text-[13px] font-normal text-[#78716C] leading-[18px]">
          23 new · 7 remote · 9 mid-level
        </p>
      </div>
      
      <div className="hidden sm:block">
        <p className="text-[15px] sm:text-[16px] font-normal text-[#78716C] leading-[1.6] mb-2">
          Only UX, UI & Product design roles posted in the last 7 days.
        </p>
        <p className="text-[14px] font-normal text-[#A8A29E] leading-[1.5]">
          23 new roles today · 7 remote · 9 mid-level
        </p>
      </div>
    </div>
  );
}