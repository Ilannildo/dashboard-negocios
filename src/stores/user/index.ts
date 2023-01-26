import { useQuery, UseQueryOptions } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { IAuthUser } from "../../models/user";
import { api } from "../../services/api";
import { createUseUserAuthKey } from "./keys";

export const useAuthenticatedUser = (options?: UseQueryOptions<IAuthUser>) => {
  const { isAuthenticated } = useAuth();
  const isToken = isAuthenticated();
  return useQuery(
    createUseUserAuthKey(),
    () => api.get(`/me`).then((res) => res.data),
    {
      ...options,
      retry: 0,
      cacheTime: 1000 * 1 * 60,
      enabled: isToken,
    }
  );
};
