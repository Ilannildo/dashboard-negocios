import { useRoutes } from "react-router-dom";
import config from "../config";
import { MainRoutes } from "./app.routes";
import { DashboardRoutes } from "./dashboard.routes";

export const AppRoutes = () => {
  return useRoutes([MainRoutes, DashboardRoutes], config.basename);
};
