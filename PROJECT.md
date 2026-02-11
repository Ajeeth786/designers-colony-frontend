## Designers Colony – Frontend Overview

Designers Colony is a React + Vite + Tailwind frontend that showcases design jobs and a simple application tracker, backed by Supabase for job data.

### Tech stack

- **Framework**: React 18 (SPA) with React Router
- **Bundler/Dev server**: Vite
- **Styling**: Tailwind CSS 4 + custom theme styles
- **UI primitives**: Radix UI + custom `ui/*` components
- **Backend-as-a-service**: Supabase (jobs table, anonymous client)

### Project structure (src)

- **`main.tsx`**: Bootstraps React and renders the root `App`.
- **`app/App.tsx`**: Wraps the app with `AuthProvider` and `RouterProvider`.
- **`app/routes.tsx`**: Defines routes for:
  - `/` – public jobs listing (`Jobs`)
  - `/login` – login screen (`LoginScreen`)
  - `/tracker` – application tracker (`Tracker`)
  - `/community` – community/internal jobs (`InternalJobs`)
  - `/community/share` – share an internal role (`ShareInternalRole`)
- **`app/components`**:
  - Layout shell (`Layout`, `Header`, `Footer`, `FloatingActionButton`)
  - Jobs UI: `JobCard`, `JobList`, `JobCardSkeleton`, `FilterBar`, `LoadMoreButton`, `PageTitle`
  - Tracker UI: `TrackerCard`, `TrackerTable`
  - Internal jobs UI: `InternalJobCard`, `InternalJobList`
  - Design system primitives under `ui/*` (buttons, inputs, dialogs, tables, etc.)
- **`app/pages`**:
  - `Jobs.tsx` – main jobs page wired to Supabase
  - `InternalJobs.tsx` – curated internal roles/community jobs
  - `Tracker.tsx` – lightweight application tracker
  - `LoginScreen.tsx` – local-storage–based login gate
  - `ShareInternalRole.tsx` – form to submit/share a role
- **`app/hooks/useAuth.tsx`**: Very lightweight auth context using `localStorage` to gate routes (no Supabase auth).
- **`lib/supabase.ts`**: Creates a Supabase client using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **`styles/*`**: Tailwind setup (`tailwind.css`), global styles (`index.css`), fonts, and theme tokens.

### Jobs data flow

- `src/lib/supabase.ts` exports a configured Supabase client.
- `src/app/pages/Jobs.tsx`:
  - On mount, fetches jobs from the Supabase `jobs` table:
    - `select('*').order('created_at', { ascending: false })`
  - Stores results in local React state and:
    - Shows `JobsLoadingSkeleton` during the initial load
    - Renders `JobList` with a paginated `visibleJobs` slice
    - Drives the `LoadMoreButton` using `showing` and `total` counts
  - Logs Supabase errors to the console only (no user-facing alerts).

### Routing and auth

- Routes are declared in `app/routes.tsx` using `createBrowserRouter`.
- A simple `ProtectedRoute` uses `localStorage` (`designers_colony_auth`) to gate certain routes.
- `AuthProvider` (`hooks/useAuth.tsx`) provides context and helpers to the rest of the app.

### Supabase setup

Environment variables are expected (via Vite) for connecting to Supabase:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

These should be defined in your local `.env` (not committed) and injected by Vite at build time.

### Development

- **Install dependencies**: `npm install`
- **Start dev server**: `npm run dev`
- **Build for production**: `npm run build`

