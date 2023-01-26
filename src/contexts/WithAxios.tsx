import Cookies from "js-cookie";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

const INTERNAL_SERVER_ERROR_MESSAGE = "The token has been blacklisted";

export const WithAxios = ({ children }: any) => {
  const { signOut } = useAuth();

  useMemo(() => {
    api.interceptors.request.use(
      (config) => {
        const _token = Cookies.get("__token");
        if (typeof _token === "string") {
          if (_token) {
            if (config.headers) {
              config.headers.Authorization = `Bearer ${_token}`;
            }
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          if (error.response.status === 500 || error.response.status === 401) {
            if (error.response.data === INTERNAL_SERVER_ERROR_MESSAGE) {
              toast.error("Sua sessão expirou");
              return signOut();
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }, [signOut]);

  return children;
};
