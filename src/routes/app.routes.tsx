import { lazy } from "react";
import { Loadable } from "../layout/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

const Login = Loadable(lazy(() => import("../pages/Auth/Login")));

export const MainRoutes = {
  path: "",
  element: <MinimalLayout />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
  ],
};
