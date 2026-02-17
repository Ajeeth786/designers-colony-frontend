export function PageTitle() {
  return (
    <div className="mb-5 sm:mb-8">
      {/* Mobile: Compact title */}
      <h1 className="text-[22px] sm:text-[32px] font-semibold text-[#1C1917] leading-[28px] sm:leading-[1.2] tracking-[-0.03em] mb-1.5 sm:mb-3">
        Recent Jobs
      </h1>

      {/* Mobile: Single stats line */}
      <div className="sm:hidden">
        <p className="text-[13px] font-normal text-[#78716C] leading-[18px]">
          UX · UI · Product design roles
        </p>
      </div>

      {/* Desktop: Description + stats */}
      <div className="hidden sm:block">
        <p className="text-[15px] sm:text-[16px] font-normal text-[#78716C] leading-[1.6] mb-2">
          Only UX, UI & Product design roles posted recently.
        </p>
        <p className="text-[14px] font-normal text-[#A8A29E] leading-[1.5]">
          Updated regularly · Remote & onsite roles
        </p>
      </div>
    </div>
  );
}
