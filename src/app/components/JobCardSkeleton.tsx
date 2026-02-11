export function JobsLoadingSkeleton() {
  return (
    <div className="mb-10" role="status" aria-label="Loading jobs">
      {[...Array(6)].map((_, i) => (
        <div key={i}>
          <div className="py-3 sm:py-5 animate-pulse">
            {/* Company name skeleton */}
            <div className="h-[16px] sm:h-[18px] bg-[#E7E5E4] rounded w-[120px] sm:w-[140px] mb-1 sm:mb-1.5" />
            
            {/* Title skeleton */}
            <div className="h-[22px] sm:h-[26px] bg-[#E7E5E4] rounded w-[85%] sm:w-[60%] mb-1.5 sm:mb-2.5" />
            
            {/* Meta info skeleton */}
            <div className="h-[16px] sm:h-[18px] bg-[#E7E5E4] rounded w-[70%] sm:w-[45%] mb-1 sm:mb-2.5" />
            
            {/* Role focus skeleton */}
            <div className="h-[16px] sm:h-[18px] bg-[#E7E5E4] rounded w-[50%] sm:w-[30%] mb-1.5 sm:mb-3" />
            
            {/* CTA skeleton */}
            <div className="flex items-center justify-between mt-1 sm:mt-0">
              <div className="hidden sm:block h-[18px] bg-[#E7E5E4] rounded w-[100px]" />
              <div className="h-[18px] bg-[#E7E5E4] rounded w-[100px] sm:w-[120px] sm:ml-auto" />
            </div>
          </div>
          
          {/* Separator - except for last item */}
          {i < 5 && (
            <div className="h-[1px] bg-[#F0F0F0]" />
          )}
        </div>
      ))}
    </div>
  );
}