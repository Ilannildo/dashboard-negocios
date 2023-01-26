import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { IAuthUser } from "../models/user";
import { api } from "../services/api";

type AuthContextProps = {
  initialized: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<IAuthUser>;
  isAuthenticated: () => boolean;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  const isAuthenticated = () => {
    try {
      const token = Cookies.get("__token");
      return !!token;
    } catch (error) {
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    return new Promise<IAuthUser>(async (resolve, reject) => {
      setIsLoading(true);
      try {
        const res = await api.post<IAuthUser>("/auth/login", {
          email,
          password,
        });
        Cookies.set("__token", res.data.access_token, {
          expires: 1,
          secure: true,
          sameSite: "lax",
        });
        setIsLoading(false);
        resolve(res.data);
      } catch (error: any) {
        setIsLoading(false);
        reject(error);
      }
    });
  };
  const signOut = async () => {
    return new Promise<void>((resolve, reject) => {
      setIsLoading(true);
      setInitialized(false);

      Cookies.remove("__token");
      setIsLoading(false);
      window.location.reload();
      resolve();
    });
  };

  return (
    <AuthContext.Provider
      value={{
        initialized,
        isLoading,
        signIn,
        signOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
