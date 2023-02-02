import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAuthenticatedUser } from "../../stores/user";
import Loader from "../LoaderProgress";

interface IProtectedRoutes {
  children: any;
}

export const ProtectedRoute = ({ children }: IProtectedRoutes) => {
  const { isAuthenticated } = useAuth();

  const isToken = isAuthenticated();

  const { isLoading, data, isError } = useAuthenticatedUser({
    enabled: isToken,
  });
  const location = useLocation();

  if (!isToken) {
    return (
      <Navigate
        to={`/login?callback-url=${location.pathname}`}
        replace
        state={{ from: location }}
      />
    );
  }

  if (isError) {
    return (
      <Navigate
        to={`/login?callback-url=${location.pathname}`}
        replace
        state={{ from: location }}
      />
    );
  }

  if (!isLoading) {
    if (!data) {
      return (
        <Navigate
          to={`/login?callback-url=${location.pathname}`}
          replace
          state={{ from: location }}
        />
      );
    }

    return children;
  }
  return <Loader />;
};
