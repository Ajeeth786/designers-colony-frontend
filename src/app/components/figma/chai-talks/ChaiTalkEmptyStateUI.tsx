/**
 * ChaiTalkEmptyStateUI
 *
 * Pure presentational component for the Chai Talks empty state.
 * - React + Tailwind only
 * - No state, hooks, routing, or side effects
 * - Not responsible for data or behavior – just UI
 */

type ChaiTalkEmptyStateUIProps = {
  onAction?: () => void;
};

export function ChaiTalkEmptyStateUI({
  onAction,
}: ChaiTalkEmptyStateUIProps) {
  return (
    <div className="flex w-full items-center justify-center py-10 sm:py-14">
      <div className="mx-auto max-w-[560px] rounded-3xl border border-[#E7E5E4] bg-white px-6 py-8 text-center shadow-sm sm:px-10 sm:py-10">
        {/* Illustration */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F97316] via-[#FACC15] to-[#22C55E]">
          <div className="relative h-14 w-14 rounded-xl bg-[#050816]">
            <span className="absolute inset-2 rounded-lg border border-white/10" />
            <div className="absolute left-1.5 top-2 h-2 w-6 rounded-full bg-[#FACC15]" />
            <div className="absolute right-2 top-3 h-2.5 w-2.5 rounded-full bg-[#F97316]" />
            <div className="absolute bottom-2 left-2 right-2 h-5 rounded-lg bg-white/5" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-2 text-[20px] font-semibold text-[#1C1917] sm:text-[22px]">
          No Chai Talks yet
        </h1>

        {/* Body */}
        <p className="mx-auto mb-6 max-w-[420px] text-[14px] leading-relaxed text-[#78716C]">
          Share your first Chai Talk to kick things off — stories, learnings, or
          questions you wish someone had shared earlier in your design journey.
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={onAction}
          className="inline-flex h-10 items-center justify-center rounded-full bg-[#1C1917] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#292524]"
        >
          Start a Chai Talk
        </button>
      </div>
    </div>
  );
}
