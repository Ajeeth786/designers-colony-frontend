import type { Job } from './job.types';

/**
 * Maps a raw API/Supabase row into the UI `Job` shape.
 * This is the only place that should know about:
 * - snake_case vs camelCase differences
 * - backend quirks
 * - fallback/default values
 */
export function mapApiJobToJob(apiJob: any): Job {
  return {
    id: String(apiJob?.id ?? ''),
    company: apiJob?.company ?? apiJob?.company_name ?? 'Unknown company',
    title: apiJob?.title ?? apiJob?.role ?? apiJob?.role_title ?? 'Untitled role',
    location: apiJob?.location ?? 'Location not specified',
    experience: apiJob?.experience ?? apiJob?.experience_level ?? 'Experience not specified',
    workMode: apiJob?.workMode ?? apiJob?.work_mode ?? 'Work mode not specified',
    roleFocus: apiJob?.roleFocus ?? apiJob?.role_focus ?? '',
    postedTime: apiJob?.postedTime ?? apiJob?.posted_at ?? 'recently',
    isNew: apiJob?.isNew ?? apiJob?.is_new ?? undefined,
    applyUrl: apiJob?.applyUrl ?? apiJob?.apply_url ?? '#',
  };
}

