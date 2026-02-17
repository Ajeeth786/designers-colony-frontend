export interface InternalJob {
  id: string;

  company: string;
  role: string;
  location: string;

  work_mode: string;
  experience_range: string | null;

  how_to_apply: string;
  short_note: string | null;

  shared_by: string;
  created_at: string;

  is_verified: boolean;
}
