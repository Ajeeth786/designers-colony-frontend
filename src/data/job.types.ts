/**
 * Single source of truth for Job typing across the app.
 * This MUST reflect what the UI (JobCard) consumes.
 */
export interface Job {
  id: string;
  roleTitle: string;
  companyName: string;
  location: string;
  workMode: "remote" | "hybrid" | "onsite";
  experienceLevel: "internship" | "junior" | "mid" | "senior";
  applyUrl: string;
  postedAt: string;
}
