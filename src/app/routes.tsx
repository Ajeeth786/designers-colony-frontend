import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";

import { Jobs } from "./pages/Jobs";
import { Tracker } from "./pages/Tracker";
import { InternalJobs } from "./pages/InternalJobs";
import { ShareInternalRole } from "./pages/ShareInternalRole";

import ChaiTalks from "./pages/ChaiTalks";
import CreateChaiTalk from "./pages/CreateChaiTalk";
import ChaiTalkDetail from "./pages/ChaiTalkDetail";

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

      /* ======================
         COMMUNITY — PUBLIC
      ====================== */
      {
        path: "community",
        Component: InternalJobs,
      },
      {
        path: "community/share",
        Component: ShareInternalRole,
      },

      /* ======================
         CHAI TALKS — PUBLIC
      ====================== */
      {
        path: "chai-talks",
        Component: ChaiTalks,
      },
      {
        path: "chai-talks/create",
        Component: CreateChaiTalk,
      },
      {
        path: "chai-talks/:id",
        Component: ChaiTalkDetail,
      },
      {
        path: "chai-talks/:id/edit",
        Component: CreateChaiTalk,
      },

      /* ======================
         TRACKER — PUBLIC (for now)
      ====================== */
      {
        path: "tracker",
        Component: Tracker,
      },
    ],
  },
]);
