import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

type FilterType = "location" | "experienceLevel" | "workMode";

interface FilterBarProps {
  onFilterChange: (type: FilterType, value: string | null) => void;
}

const EXPERIENCE_OPTIONS = [
  { label: "Junior", value: "junior" },
  { label: "Mid", value: "mid" },
  { label: "Senior", value: "senior" },
];

const WORK_MODE_OPTIONS = [
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Onsite", value: "onsite" },
];

const LOCATION_OPTIONS = [
  { label: "Bangalore", value: "bangalore" },
  { label: "Chennai", value: "chennai" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Pune", value: "pune" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Delhi NCR", value: "delhi" },
  { label: "Remote", value: "remote" },
];

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // 🔥 Local mobile state before applying
  const [mobileFilters, setMobileFilters] = useState<{
    location: string | null;
    experienceLevel: string | null;
    workMode: string | null;
  }>({
    location: null,
    experienceLevel: null,
    workMode: null,
  });

  const applyMobileFilters = () => {
    onFilterChange("location", mobileFilters.location);
    onFilterChange("experienceLevel", mobileFilters.experienceLevel);
    onFilterChange("workMode", mobileFilters.workMode);
    setIsMobileFilterOpen(false);
  };

  const clearMobileFilters = () => {
    setMobileFilters({
      location: null,
      experienceLevel: null,
      workMode: null,
    });
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="relative mb-8 h-12 hidden sm:flex items-center gap-3">
        <Dropdown
          label="Location"
          isActive={activeFilter === "location"}
          onToggle={() =>
            setActiveFilter(activeFilter === "location" ? null : "location")
          }
        >
          {LOCATION_OPTIONS.map((option) => (
            <Option
              key={option.value}
              label={option.label}
              onClick={() => {
                onFilterChange("location", option.value);
                setActiveFilter(null);
              }}
            />
          ))}
          <Clear
            onClick={() => {
              onFilterChange("location", null);
              setActiveFilter(null);
            }}
          />
        </Dropdown>

        <Dropdown
          label="Experience"
          isActive={activeFilter === "experienceLevel"}
          onToggle={() =>
            setActiveFilter(
              activeFilter === "experienceLevel" ? null : "experienceLevel"
            )
          }
        >
          {EXPERIENCE_OPTIONS.map((option) => (
            <Option
              key={option.value}
              label={option.label}
              onClick={() => {
                onFilterChange("experienceLevel", option.value);
                setActiveFilter(null);
              }}
            />
          ))}
          <Clear
            onClick={() => {
              onFilterChange("experienceLevel", null);
              setActiveFilter(null);
            }}
          />
        </Dropdown>

        <Dropdown
          label="Work Mode"
          isActive={activeFilter === "workMode"}
          onToggle={() =>
            setActiveFilter(activeFilter === "workMode" ? null : "workMode")
          }
        >
          {WORK_MODE_OPTIONS.map((option) => (
            <Option
              key={option.value}
              label={option.label}
              onClick={() => {
                onFilterChange("workMode", option.value);
                setActiveFilter(null);
              }}
            />
          ))}
          <Clear
            onClick={() => {
              onFilterChange("workMode", null);
              setActiveFilter(null);
            }}
          />
        </Dropdown>
      </div>

      {/* ================= MOBILE BUTTON ================= */}
      <div className="mb-4 sm:hidden">
        <button
          className="inline-flex items-center h-9 px-4 rounded-full border border-[#E7E5E4] bg-white text-[14px] font-medium"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          Filters
          <ChevronDown className="ml-2 w-4 h-4 text-[#A8A29E]" />
        </button>
      </div>

      {/* ================= MOBILE SHEET ================= */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 sm:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[16px] font-semibold text-[#1C1917]">
                Filters
              </h2>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-[#78716C]" />
              </button>
            </div>

            <MobileSection title="Location">
              {LOCATION_OPTIONS.map((option) => (
                <MobileOption
                  key={option.value}
                  label={option.label}
                  selected={mobileFilters.location === option.value}
                  onClick={() =>
                    setMobileFilters((prev) => ({
                      ...prev,
                      location: option.value,
                    }))
                  }
                />
              ))}
            </MobileSection>

            <MobileSection title="Experience">
              {EXPERIENCE_OPTIONS.map((option) => (
                <MobileOption
                  key={option.value}
                  label={option.label}
                  selected={mobileFilters.experienceLevel === option.value}
                  onClick={() =>
                    setMobileFilters((prev) => ({
                      ...prev,
                      experienceLevel: option.value,
                    }))
                  }
                />
              ))}
            </MobileSection>

            <MobileSection title="Work Mode">
              {WORK_MODE_OPTIONS.map((option) => (
                <MobileOption
                  key={option.value}
                  label={option.label}
                  selected={mobileFilters.workMode === option.value}
                  onClick={() =>
                    setMobileFilters((prev) => ({
                      ...prev,
                      workMode: option.value,
                    }))
                  }
                />
              ))}
            </MobileSection>

            {/* ACTIONS */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={clearMobileFilters}
                className="w-full rounded-lg border border-[#E7E5E4] py-3 text-sm"
              >
                Clear all
              </button>

              <button
                onClick={applyMobileFilters}
                className="w-full rounded-lg bg-black text-white py-3 text-sm font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= UI COMPONENTS ================= */

function Dropdown({ label, isActive, onToggle, children }: any) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`inline-flex items-center h-10 px-5 rounded-lg border transition ${
          isActive
            ? "bg-[#F5F5F4] border-[#D6D3D1]"
            : "bg-white border-[#E7E5E4]"
        }`}
      >
        <span className="text-[14px] font-medium">{label}</span>
        <ChevronDown className="ml-2 w-4 h-4 text-[#A8A29E]" />
      </button>

      {isActive && (
        <div className="absolute z-20 mt-2 w-44 rounded-lg border border-[#E7E5E4] bg-white shadow-sm">
          {children}
        </div>
      )}
    </div>
  );
}

function Option({ label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex w-full px-4 py-2 text-left text-[14px] hover:bg-[#F5F5F4]"
    >
      {label}
    </button>
  );
}

function Clear({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex w-full px-4 py-2 text-left text-[13px] text-[#78716C] hover:bg-[#F5F5F4]"
    >
      Clear
    </button>
  );
}

function MobileSection({ title, children }: any) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-[13px] font-semibold text-[#78716C] uppercase tracking-wide">
        {title}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function MobileOption({ label, selected, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg border px-4 py-3 text-[14px] transition ${
        selected
          ? "bg-black text-white border-black"
          : "border-[#E7E5E4] hover:bg-[#F5F5F4]"
      }`}
    >
      {label}
    </button>
  );
}