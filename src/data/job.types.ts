// Single source of truth for Job typing across the app.
// Keep this aligned with what the UI (`JobCard`) needs.
export interface Job {
  id: string;
  roleTitle: string;
  companyName: string;
  location: string;
  workMode: 'remote' | 'hybrid' | 'onsite';
  experienceLevel: 'internship' | 'junior' | 'mid' | 'senior';
  applyUrl: string;
  postedAt: string;
}


