import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";

import { Jobs } from "./pages/Jobs";
import { Tracker } from "./pages/Tracker";
import { LoginScreen } from "./pages/LoginScreen";
import { InternalJobs } from "./pages/InternalJobs";
import { ShareInternalRole } from "./pages/ShareInternalRole";

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn =
    localStorage.getItem("designers_colony_auth") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Jobs,
      },
      {
        path: "jobs",
        Component: Jobs,
      },
      {
        path: "community",
        element: (
          <ProtectedRoute>
            <InternalJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "tracker",
        Component: Tracker,
      },
      {
        path: "login",
        Component: LoginScreen,
      },
      {
        path: "internal-jobs",
        element: (
          <ProtectedRoute>
            <InternalJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "community/share",
        element: (
          <ProtectedRoute>
            <ShareInternalRole />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
