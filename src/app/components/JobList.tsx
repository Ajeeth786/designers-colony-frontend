import { JobCard } from './JobCard';
import type { Job } from '../../data/job.types';

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  return (
    <div className="flex flex-col gap-4 mb-10">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
