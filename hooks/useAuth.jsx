"use client";

import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  });

  return isAuthenticated;
}
