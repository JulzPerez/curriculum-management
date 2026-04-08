"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import api from "../../../lib/axios";

interface User {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await api.get("/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Session expired or invalid:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    const response = await api.post("/login/access-token", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const token = response.data.access_token;

    localStorage.setItem("token", token);

    const userResponse = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(userResponse.data);
    window.location.href = "/dashboard";
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};