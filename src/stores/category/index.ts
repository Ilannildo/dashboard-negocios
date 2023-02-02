import { useQuery, UseQueryOptions } from "react-query";
import { ICategory } from "../../models/category";
import { api } from "../../services/api";
import { createUseCategoryKey } from "./keys";

export const useCategory = (options?: UseQueryOptions<ICategory[]>) => {
  return useQuery(
    createUseCategoryKey(),
    () => api.get(`/categories`).then((res) => res.data),
    {
      ...options,
      retry: 0,
      cacheTime: 1000 * 1 * 60,
    }
  );
};
