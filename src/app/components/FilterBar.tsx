import { ChevronDown } from "lucide-react";
import { useState } from "react";

type FilterType = "location" | "experienceLevel" | "workMode";

type Filters = {
  location: string | null;
  experienceLevel: string | null;
  workMode: string | null;
};

interface FilterBarProps {
  filters: Filters;
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
  { label: "Bangalore", value: "Bengaluru" },
  { label: "Chennai", value: "Chennai" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Delhi", value: "Delhi" },
  { label: "Gurugram", value: "Gurugram" },
];

export function FilterBar({
  filters,
  onFilterChange,
}: FilterBarProps) {
  const [activeFilter, setActiveFilter] =
    useState<FilterType | null>(null);

  const getLabel = (
    type: FilterType,
    defaultLabel: string
  ) => {
    const value = filters[type];
    if (!value) return defaultLabel;

    const options =
      type === "location"
        ? LOCATION_OPTIONS
        : type === "experienceLevel"
        ? EXPERIENCE_OPTIONS
        : WORK_MODE_OPTIONS;

    const match = options.find(
      (opt) => opt.value === value
    );

    return match?.label ?? defaultLabel;
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Location */}
        <Dropdown
          label={getLabel("location", "Location")}
          isActive={activeFilter === "location"}
          onToggle={() =>
            setActiveFilter(
              activeFilter === "location" ? null : "location"
            )
          }
        >
          {LOCATION_OPTIONS.map((option) => (
            <Option
              key={option.value}
              label={option.label}
              isSelected={filters.location === option.value}
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

        {/* Experience */}
        <Dropdown
          label={getLabel("experienceLevel", "Experience")}
          isActive={activeFilter === "experienceLevel"}
          onToggle={() =>
            setActiveFilter(
              activeFilter === "experienceLevel"
                ? null
                : "experienceLevel"
            )
          }
        >
          {EXPERIENCE_OPTIONS.map((option) => (
            <Option
              key={option.value}
              label={option.label}
              isSelected={
                filters.experienceLevel === option.value
              }
              onClick={() => {
                onFilterChange(
                  "experienceLevel",
                  option.value
                );
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

        {/* Work Mode */}
        <Dropdown
          label={getLabel("workMode", "Work Mode")}
          isActive={activeFilter === "workMode"}
          onToggle={() =>
            setActiveFilter(
              activeFilter === "workMode"
                ? null
                : "workMode"
            )
          }
        >
          {WORK_MODE_OPTIONS.map((option) => (
            <Option
              key={option.value}
              label={option.label}
              isSelected={filters.workMode === option.value}
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
    </div>
  );
}

/* ---------------- UI Components ---------------- */

function Dropdown({
  label,
  isActive,
  onToggle,
  children,
}: {
  label: string;
  isActive: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`inline-flex items-center h-9 sm:h-10 px-3 sm:px-5 rounded-full border transition whitespace-nowrap ${
          isActive
            ? "bg-[#F5F5F4] border-[#D6D3D1]"
            : "bg-white border-[#E7E5E4]"
        }`}
      >
        <span className="text-[13px] sm:text-[14px] font-medium">
          {/* Mobile Short Labels */}
          <span className="sm:hidden">
            {label === "Location"
              ? "Loc"
              : label === "Experience"
              ? "Exp"
              : label === "Work Mode"
              ? "Mode"
              : label}
          </span>

          {/* Desktop Full Labels */}
          <span className="hidden sm:inline">
            {label}
          </span>
        </span>

        <ChevronDown className="ml-1 sm:ml-2 w-4 h-4 text-[#A8A29E]" />
      </button>

      {isActive && (
        <div className="absolute z-50 mt-2 w-48 rounded-xl border border-[#E7E5E4] bg-white shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}

function Option({
  label,
  onClick,
  isSelected,
}: {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full px-4 py-2 text-left text-[14px] ${
        isSelected
          ? "bg-[#F5F5F4] font-medium"
          : "hover:bg-[#F5F5F4]"
      }`}
    >
      {label}
    </button>
  );
}

function Clear({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full px-4 py-2 text-left text-[13px] text-[#78716C] hover:bg-[#F5F5F4]"
    >
      Clear
    </button>
  );
}