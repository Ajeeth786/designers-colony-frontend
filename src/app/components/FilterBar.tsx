import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type FilterType = 'location' | 'experienceLevel' | 'workMode';

interface FilterBarProps {
  onFilterChange: (type: FilterType, value: string | null) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleFilterClick = (type: FilterType) => {
    const isSame = activeFilter === type;
    setActiveFilter(isSame ? null : type);

    // For now we just toggle filter ON/OFF
    // Actual values (dropdowns) can come later
    onFilterChange(type, isSame ? null : type);
  };

  return (
    <>
      {/* Desktop Filters */}
      <div className="mb-8 h-12 sm:flex hidden items-center gap-3">
        {/* Location */}
        <button
          className={`inline-flex items-center h-10 px-5 rounded-lg border transition-all duration-150 ${
            activeFilter === 'location'
              ? 'bg-[#F5F5F4] border-[#D6D3D1] text-[#1C1917]'
              : 'bg-white border-[#E7E5E4] text-[#44403C] hover:border-[#D6D3D1]'
          }`}
          onClick={() => handleFilterClick('location')}
        >
          <span className="text-[14px] font-medium">Location</span>
          <ChevronDown className="ml-2 w-4 h-4 text-[#A8A29E]" />
        </button>

        {/* Experience */}
        <button
          className={`inline-flex items-center h-10 px-5 rounded-lg border transition-all duration-150 ${
            activeFilter === 'experienceLevel'
              ? 'bg-[#F5F5F4] border-[#D6D3D1] text-[#1C1917]'
              : 'bg-white border-[#E7E5E4] text-[#44403C] hover:border-[#D6D3D1]'
          }`}
          onClick={() => handleFilterClick('experienceLevel')}
        >
          <span className="text-[14px] font-medium">Experience</span>
          <ChevronDown className="ml-2 w-4 h-4 text-[#A8A29E]" />
        </button>

        {/* Work Mode */}
        <button
          className={`inline-flex items-center h-10 px-5 rounded-lg border transition-all duration-150 ${
            activeFilter === 'workMode'
              ? 'bg-[#F5F5F4] border-[#D6D3D1] text-[#1C1917]'
              : 'bg-white border-[#E7E5E4] text-[#44403C] hover:border-[#D6D3D1]'
          }`}
          onClick={() => handleFilterClick('workMode')}
        >
          <span className="text-[14px] font-medium">Work Mode</span>
          <ChevronDown className="ml-2 w-4 h-4 text-[#A8A29E]" />
        </button>
      </div>

      {/* Mobile Filter Button */}
      <div className="mb-3 sm:hidden">
        <button
          className="inline-flex items-center h-9 px-3.5 rounded-[18px] border bg-white border-[#E7E5E4] text-[#44403C] active:bg-[#F5F5F4] transition-colors duration-150"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <span className="text-[13px] font-medium">Filters</span>
          <ChevronDown className="ml-2 w-4 h-4 text-[#A8A29E]" />
        </button>
      </div>
    </>
  );
}
