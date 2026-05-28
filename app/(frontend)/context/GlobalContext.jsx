"use client";

import { getGlobalData } from "@/services/global.service";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const GlobalContext = createContext(null);
GlobalContext.displayName = "GlobalContext";

export const GlobalProvider = ({ children }) => {
  const [global, setGlobal] = useState({});
  const [loadingGlobal, setLoadingGlobal] = useState(true);

  const fetchGlobal = useCallback(async () => {
    try {
      setLoadingGlobal(true);
      const res = await getGlobalData();
      setGlobal(res?.data?.data || res?.data || res || {});
    } catch (err) {
      console.error("Failed to load global data", err);
    } finally {
      setLoadingGlobal(false);
    }
  }, []);

  useEffect(() => {
    fetchGlobal();
  }, [fetchGlobal]);

  return (
    <GlobalContext.Provider value={{ global, loadingGlobal, refreshGlobal: fetchGlobal }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};