"use client";

import { getProfileData } from "@/services/user.service";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const readStoredUser = () => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("userData") || "null");
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Define fetchProfile as a reusable function
  const fetchProfile = useCallback(async () => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("authToken");
    const storedUser = readStoredUser();
    const role = (localStorage.getItem("userRole") || "").toLowerCase();
    const roleId = storedUser?.role?.id ?? storedUser?.roleId;
    const roleTitle = (
      storedUser?.role?.title ??
      storedUser?.role?.name ??
      ""
    ).toLowerCase();
    const isAdmin =
      role === "admin" || Number(roleId) === 2 || roleTitle === "admin";

    if (!token || token === "undefined" || token === "null") {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      return;
    }

    // Admin sessions must not call the customer profile endpoint
    // (/auth/user): a 401 there makes the axios interceptor try to
    // refresh and, if that fails, wipe the session -> "auto logout"
    // right after entering /dashboard. Hydrate from login data instead.
    if (isAdmin) {
      setUser(storedUser);
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }

    try {
      const res = await getProfileData();
      setUser(res);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Failed to load profile", err);
      // A 401 is handled by the axios interceptor. For any other error,
      // keep the session alive using the cached login data.
      setUser(storedUser);
      setIsAuthenticated(Boolean(storedUser));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <AuthContext.Provider
      value={{ 
        isAuthenticated, 
        setIsAuthenticated, 
        user, 
        setUser, 
        loading,
        refreshProfile: fetchProfile // Export this function
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
