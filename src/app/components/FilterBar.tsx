import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type FilterType = 'location' | 'experienceLevel' | 'workMode';

interface FilterBarProps {
  onFilterChange: (type: FilterType, value: string | null) => void;
}

const EXPERIENCE_OPTIONS = [
  { label: 'Junior', value: 'junior' },
  { label: 'Mid', value: 'mid' },
  { label: 'Senior', value: 'senior' },
];

const WORK_MODE_OPTIONS = [
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'Onsite', value: 'onsite' },
];

const LOCATION_OPTIONS = [
  { label: 'Bangalore', value: 'bangalore' },
  { label: 'Chennai', value: 'chennai' },
  { label: 'Hyderabad', value: 'hyderabad' },
  { label: 'Pune', value: 'pune' },
  { label: 'Mumbai', value: 'mumbai' },
  { label: 'Delhi NCR', value: 'delhi' },
  { label: 'Remote', value: 'remote' },
];

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <>
      {/* Desktop Filters */}
      <div className="relative mb-8 h-12 sm:flex hidden items-center gap-3">
        {/* LOCATION DROPDOWN */}
        <div className="relative">
          <button
            className={`inline-flex items-center h-10 px-5 rounded-lg border transition-all duration-150 ${
              activeFilter === 'location'
                ? 'bg-[#F5F5F4] border-[#D6D3D1] text-[#1C1917]'
                : 'bg-white border-[#E7E5E4] text-[#44403C] hover:border-[#D6D3D1]'
            }`}
            onClick={() =>
              setActiveFilter(activeFilter === 'location' ? null : 'location')
            }
          >
            <span className="text-[14px] font-medium">Location</span>
            <ChevronDown className="ml-2 w-4 h-4 text-[#A8A29E]" />
          </button>

          {activeFilter === 'location' && (
            <div className="absolute z-20 mt-2 w-44 rounded-lg border border-[#E7E5E4] bg-white shadow-sm">
              {LOCATION_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className="flex w-full px-4 py-2 text-left text-[14px] text-[#1C1917] hover:bg-[#F5F5F4]"
                  onClick={() => {
                    onFilterChange('location', option.value);
                    setActiveFilter(null);
                  }}
                >
                  {option.label}
                </button>
              ))}
              <button
                className="flex w-full px-4 py-2 text-left text-[13px] text-[#78716C] hover:bg-[#F5F5F4]"
                onClick={() => {
                  onFilterChange('location', null);
                  setActiveFilter(null);
                }}
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* EXPERIENCE DROPDOWN */}
        <div className="relative">
          <button
            className={`inline-flex items-center h-10 px-5 rounded-lg border transition-all duration-150 ${
              activeFilter === 'experienceLevel'
                ? 'bg-[#F5F5F4] border-[#D6D3D1] text-[#1C1917]'
                : 'bg-white border-[#E7E5E4] text-[#44403C] hover:border-[#D6D3D1]'
            }`}
            onClick={() =>
              setActiveFilter(
                activeFilter === 'experienceLevel'
                  ? null
                  : 'experienceLevel'
              )
            }
          >
            <span className="text-[14px] font-medium">Experience</span>
            <ChevronDown className="ml-2 w-4 h-4 text-[#A8A29E]" />
          </button>

          {activeFilter === 'experienceLevel' && (
            <div className="absolute z-20 mt-2 w-40 rounded-lg border border-[#E7E5E4] bg-white shadow-sm">
              {EXPERIENCE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className="flex w-full px-4 py-2 text-left text-[14px] text-[#1C1917] hover:bg-[#F5F5F4]"
                  onClick={() => {
                    onFilterChange('experienceLevel', option.value);
                    setActiveFilter(null);
                  }}
                >
                  {option.label}
                </button>
              ))}
              <button
                className="flex w-full px-4 py-2 text-left text-[13px] text-[#78716C] hover:bg-[#F5F5F4]"
                onClick={() => {
                  onFilterChange('experienceLevel', null);
                  setActiveFilter(null);
                }}
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* WORK MODE DROPDOWN */}
        <div className="relative">
          <button
            className={`inline-flex items-center h-10 px-5 rounded-lg border transition-all duration-150 ${
              activeFilter === 'workMode'
                ? 'bg-[#F5F5F4] border-[#D6D3D1] text-[#1C1917]'
                : 'bg-white border-[#E7E5E4] text-[#44403C] hover:border-[#D6D3D1]'
            }`}
            onClick={() =>
              setActiveFilter(activeFilter === 'workMode' ? null : 'workMode')
            }
          >
            <span className="text-[14px] font-medium">Work Mode</span>
            <ChevronDown className="ml-2 w-4 h-4 text-[#A8A29E]" />
          </button>

          {activeFilter === 'workMode' && (
            <div className="absolute z-20 mt-2 w-40 rounded-lg border border-[#E7E5E4] bg-white shadow-sm">
              {WORK_MODE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className="flex w-full px-4 py-2 text-left text-[14px] text-[#1C1917] hover:bg-[#F5F5F4]"
                  onClick={() => {
                    onFilterChange('workMode', option.value);
                    setActiveFilter(null);
                  }}
                >
                  {option.label}
                </button>
              ))}
              <button
                className="flex w-full px-4 py-2 text-left text-[13px] text-[#78716C] hover:bg-[#F5F5F4]"
                onClick={() => {
                  onFilterChange('workMode', null);
                  setActiveFilter(null);
                }}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter button (unchanged) */}
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
