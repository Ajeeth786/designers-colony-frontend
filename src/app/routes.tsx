import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";

import { Jobs } from "./pages/Jobs";
import { InternalJobs } from "./pages/InternalJobs";
import { ShareInternalRole } from "./pages/ShareInternalRole";

import ChaiTalks from "./pages/ChaiTalks";
import CreateChaiTalk from "./pages/CreateChaiTalk";

import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Jobs },
      { path: "jobs", Component: Jobs },

      /* COMMUNITY */
      { path: "community", Component: InternalJobs },
      { path: "community/share", Component: ShareInternalRole },

      /* CHAI TALKS */
      { path: "chai-talks", Component: ChaiTalks },
      { path: "chai-talks/create", Component: CreateChaiTalk },
    
      { path: "chai-talks/:id/edit", Component: CreateChaiTalk },
    ],
  },
]);
