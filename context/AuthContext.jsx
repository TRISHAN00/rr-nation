"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    setHydrated(true);
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear();
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, hydrated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
