import { JobCard, Job } from './JobCard';

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  return (
    <div className="mb-10">
      {jobs.map((job, index) => (
        <div key={job.id}>
          <JobCard job={job} />
          
          {/* Separator - except for last item */}
          {index < jobs.length - 1 && (
            <div className="h-[1px] bg-[#F0F0F0]" />
          )}
        </div>
      ))}
    </div>
  );
}