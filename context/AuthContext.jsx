"use client";

import { getProfileData } from "@/services/user.service"; // your API to get user data
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // overall loading state
  const [user, setUser] = useState(null); // store global user data

  /* -------- FETCH PROFILE DATA -------- */
  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        setIsAuthenticated(true);

        const res = await getProfileData(); // fetch user data
        setUser(res); // save to context
      } catch (err) {
        console.error("Failed to load profile", err);
        toast.error("Failed to load profile data");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuthContext = () => useContext(AuthContext);
