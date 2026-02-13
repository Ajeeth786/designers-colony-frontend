import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { TrackerTable } from "../components/TrackerTable";

export interface Application {
  id: string;
  company: string;
  role: string;
  appliedOn: string;
  currentStage: string;
  interviewNotes: string;
  outcome: string;
  whatILearned: string;
}

const STORAGE_KEY = "designerscolony_applications";

export function Tracker() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<Application[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  /* Persist to localStorage */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const handleAddRow = () => {
    const newApplication: Application = {
      id: Date.now().toString(),
      company: "",
      role: "",
      appliedOn: "",
      currentStage: "Applied",
      interviewNotes: "",
      outcome: "Waiting",
      whatILearned: "",
    };

    setApplications((prev) => [...prev, newApplication]);
  };

  const handleUpdateApplication = (
    id: string,
    field: keyof Application,
    value: string
  ) => {
    setApplications((apps) =>
      apps.map((app) =>
        app.id === id ? { ...app, [field]: value } : app
      )
    );
  };

  const handleDeleteApplication = (id: string) => {
    setApplications((apps) =>
      apps.filter((app) => app.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="sm:max-w-[1120px] sm:mx-auto px-6 md:px-10 xl:px-20 pt-[72px] sm:pt-[80px]">
        {/* Page header */}
        <header className="mb-8 max-w-[640px]">
          <h1 className="mb-2 text-[22px] sm:text-[32px] font-semibold text-[#1C1917] tracking-[-0.03em]">
            My Job Tracker
          </h1>
          <p className="text-[14px] text-[#78716C] leading-[1.6]">
            Track your applications, interview rounds, and learnings — for yourself.
          </p>
        </header>

        {/* Desktop only */}
        <div className="hidden sm:block">
          <TrackerTable
            applications={applications}
            onUpdate={handleUpdateApplication}
            onDelete={handleDeleteApplication}
            onAddRow={handleAddRow}
          />
        </div>

        {/* Mobile message */}
        <div className="sm:hidden pb-20">
          <div className="bg-white border border-[#E7E5E4] rounded-xl p-6 text-center">
            <h3 className="text-[16px] font-semibold text-[#1C1917] mb-2">
              Tracker is desktop-only for now
            </h3>
            <p className="text-[13px] text-[#78716C] mb-5">
              Open this page on desktop to start tracking your applications.
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-full h-11 rounded-lg bg-[#1C1917] text-white text-[14px] font-medium hover:bg-[#292524]"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
