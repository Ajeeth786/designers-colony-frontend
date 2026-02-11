interface LoadMoreButtonProps {
  onClick: () => void;
  showing: number;
  total: number;
  isLoading?: boolean;
}

export function LoadMoreButton({ onClick, showing, total, isLoading }: LoadMoreButtonProps) {
  if (showing >= total) return null;

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 mb-12 sm:mb-16">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="h-10 sm:h-11 px-6 sm:px-8 rounded-lg bg-white border border-[#E7E5E4] 
          text-[13px] sm:text-[14px] font-medium sm:font-semibold text-[#1C1917] 
          hover:border-[#D6D3D1] hover:bg-[#FAFAF9]
          active:bg-[#F5F5F4]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-150"
      >
        {isLoading ? 'Loading...' : 'Load more roles'}
      </button>
      
      <p className="text-[13px] sm:text-[13px] font-normal text-[#A8A29E]">
        Showing {showing} of {total} roles
      </p>
    </div>
  );
}