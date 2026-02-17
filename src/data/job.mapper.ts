import type { Job } from "./job.types";

/**
 * Maps a raw Supabase row into the UI `Job` shape.
 * This is the ONLY place that should handle:
 * - snake_case → camelCase
 * - backend naming differences
 * - safe fallbacks
 */
export function mapApiJobToJob(apiJob: any): Job {
  return {
    id: String(apiJob?.id ?? ""),

    companyName:
      apiJob?.company ??
      apiJob?.company_name ??
      "Unknown company",

    roleTitle:
      apiJob?.role ??
      apiJob?.title ??
      apiJob?.role_title ??
      "Untitled role",

    location:
      apiJob?.location ??
      "Location not specified",

    experienceLevel:
      apiJob?.experience_level ??
      apiJob?.experience ??
      "mid", // safe default from union

    workMode:
      apiJob?.work_mode ??
      apiJob?.workMode ??
      "remote", // safe default from union

    applyUrl:
      apiJob?.apply_url ??
      apiJob?.applyUrl ??
      "#",

    postedAt:
      apiJob?.created_at ??
      new Date().toISOString(),
  };
}
