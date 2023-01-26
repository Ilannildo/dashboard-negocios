import { lazy } from "react";
import { Loadable } from "../layout/Loadable";
import { ProtectedRoute } from "../layout/ProtectedRoute";
import { Dashboard } from "../pages/Dashboard";

const DashboardPanelLayout = Loadable(
  lazy(() => import("../layout/DashboardLayout"))
);

export const DashboardRoutes = {
  path: "dashboard",
  element: (
    <ProtectedRoute>
      <DashboardPanelLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "",
      element: <Dashboard />,
    },
  ],
};
