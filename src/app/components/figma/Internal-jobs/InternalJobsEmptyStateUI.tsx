/**
 * InternalJobsEmptyStateUI
 *
 * Pure presentational component for the Internal Roles empty state.
 * - React + Tailwind only
 * - No state, hooks, routing, or side effects
 */

import emptyIllustration from "../../../../assets/images/community-empty-rbg.png.png";

type InternalJobsEmptyStateUIProps = {
  onAction?: () => void;
};

export function InternalJobsEmptyStateUI({
  onAction,
}: InternalJobsEmptyStateUIProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      
      {/* Illustration */}
      <img
        src={emptyIllustration}
        alt="No roles shared yet"
        className="mb-6 w-[240px] sm:w-[280px]"
      />

      {/* Heading */}
      <h2 className="mb-2 text-[20px] font-semibold text-[#1C1917] sm:text-[22px]">
        No roles shared yet
      </h2>

      {/* Description */}
      <p className="mb-6 max-w-[420px] text-[15px] leading-relaxed text-[#78716C]">
        Help another designer by sharing an internal opportunity from your
        company. A simple referral can change someone’s career.
      </p>

      {/* CTA */}
      <button
        type="button"
        onClick={onAction}
        className="inline-flex h-11 items-center justify-center rounded-full bg-[#1C1917] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#292524]"
      >
        Share a Role
      </button>

      <p className="mt-4 text-[13px] text-[#A8A29E]">
        Community-driven referrals. No approval needed.
      </p>
    </div>
  );
}
