import { lazy } from "react";
import { Loadable } from "../layout/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import { ProtectedRoute } from "../layout/ProtectedRoute";

const Login = Loadable(lazy(() => import("../pages/Auth/Login")));
const Welcome = Loadable(lazy(() => import("../pages/Auth/Welcome")));
const RegisterSeller = Loadable(
  lazy(() => import("../pages/Auth/RegisterSeller"))
);
const RegisterCompany = Loadable(
  lazy(() => import("../pages/Auth/RegisterCompany"))
);

export const MainRoutes = {
  path: "",
  element: <MinimalLayout />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "",
      element: <Welcome />,
    },
    {
      path: "welcome",
      element: <Welcome />,
    },
    {
      path: "register",
      element: <RegisterSeller />,
    },
    {
      path: "register-company",
      element: (
        <ProtectedRoute>
          <RegisterCompany />
        </ProtectedRoute>
      ),
    },
  ],
};
